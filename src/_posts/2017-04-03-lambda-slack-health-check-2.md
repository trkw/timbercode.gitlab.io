---
layout:      post
title:       "Lambda + Slack = health-check #2 — periodyczna funkcja"
date:        2017-04-03T18:40:00+02:00
description: >
    Wiesz już jak połączyć Lambdę ze Slackiem. Tym razem pokażę
    Ci, jak na tych narzędziach oprzeć health-check systemu
    wykonywany co 5 minut. Zapraszam do lektury!
image:      "/images/covers/lambda-slack-health-check-2.png"
categories: ["tools"]
tags:       ["lambda-slack", "daj-sie-poznac-2017", "jvm-bloggers", "aws", "lambda", "slack", "health-check", "node"]
---

![Obrazek wpisu "{{page.title}}"]( /images/covers/lambda-slack-health-check-2.png )

Witaj ponownie! *Przed Tobą kolejny wpis z serii nt. "Lambda + Slack = health-check".*
Moim celem jest pokazać Ci:
* jak skonfigurować i zintegrować ze sobą [AWS Lambda]( https://aws.amazon.com/lambda ){:target="blank"}
  wraz z popularnym komunikatorem [Slack]( https://slack.com/ ){:target="blank"}
  ([wpis nr 1]( /blog/2017/03/25/lambda-slack-health-check-1/ ){:target="blank"}),
* jak napisać funkcję w [node.js]( https://nodejs.org/en/ ){:target="blank"},
  która co 5 minut wykona health-check wskazanego serwisu
  ([wpis nr 2, który właśnie czytasz]( /blog/2017/04/03/lambda-slack-health-check-2/ ){:target="blank"}),
* jak podzielić funkcję na pliki i deploywać ją wraz z zewnętrznymi
  zależnościami (wpis nr 3).

W dzisiejszym wpisie:
* pokażę Ci *kod, który wykonuje health-check zewnętrznego systemu*
  i, zależnie od rezultatu, wysyła wiadomość na Slacka,
* wyjaśnię, *jak zrobić, aby AWS uruchamiał ten kod co 5 minut*, 
* wskażę *problemy pracy z Lambda* (dla których rozwiązanie
  opiszę w kolejnym wpisie z serii 🤓 ), 

# Kod źródłowy

Pełen *kod funkcji opisanej w dzisiejszym wpisie*
[udostępniłem na GitLabie w pliku `step-2/simple-health-check.lambda.js`]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-2/simple-health-check.lambda.js ){:target="blank"}.
Do jego prawidłowego działania musisz zdefiniować 4 zmienne środowiskowe
na AWS Lambda:
* `SLACK_WEBHOOK` – URL webhooka Slacka, na który będą wysyłane wiadomości,
* `SLACK_CHANNEL` – kanał Slacka, na który będą wysyłane wiadomości,
* `HEALTH_CHECK_URL` – URL zewnętrznego systemu, który zwraca informację
  o stanie systemu (najlepiej ze statusem `200 OK` i ciałem odpowiedzi
  w formacie JSON),
* `SYSTEM_NAME` – nazwa systemu, która zostanie użyta w treści wiadomości na Slacka.
 
## Health-check

Załóżmy, że Twój zewnętrzny system wystawia *URL, pod który można
 wysłać zapytanie, aby dowiedzieć się czy system działa*. Jeśli
 nie wykryto problemów, zwrócony jest status HTTP `200 OK`,
 a w ciele odpowiedzi znajduje się JSON z listą podsystemów, które
 zostały sprawdzone, np. taki:
```json
{
  "system": "OK",
  "subsystems": {
    "payments": "OK",
    "orders": "OK"
  }
}
```

Kod sprawdzenia stanu systemu może być następujący:
```javascript
function checkSystemHealth() {
    return makeHttpsRequest({
        method : 'GET',
        url    : process.env.HEALTH_CHECK_URL
    }).then(response => ({
        isHealthy     : response.status === 200,
        healthDetails : {
            status : response.status,
            body   : response.body
        }
    })).catch(error => ({
        error : error
    }));
}
```

Powyżej wykorzystałem zdefiniowaną w tym samym pliku
 funkcję`makeHttpsRequest`, która zwraca
 [Promise]( https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Promise ){:target="blank"}
 z sukcesem w przypadku uzyskania odpowiedzi od serwera i z porażką, 
 jeśli wystąpiły jakieś problemy, np. z nawiązaniem połączenia.
 
Odpowiedź health-checka jest zmapowana na obiekt zawierający flagę `isHealthy`
 oraz dodatkowe szczegóły w `healthDetails`. W przypadku problemów
 zamiast tego zwracany jest `error`. Wszystkie te informacje
 przydadzą się w miejscu wywołania funkcji.
 
Przyda się jeszcze jedno udogodnienie: *sformatować zwróconego JSON-a*
 tak, aby zawierał nowe linie i wcięcia,co zwiększy jego czytelność.
 Można to wykonać taką funkcją:
```javascript
function prettified(text) {
    const indentationSpaces = 2;
    const asJson = JSON.parse(text);
    return JSON.stringify(asJson, null, indentationSpaces);
}
```
Niestety taki kod może się "wywalić", jeśli okaże się, że ciało odpowiedzi
 nie jest JSON-em, a np. domyślną HTML-ową stroną 404 wygenerowaną przez serwer
 dla błędnego adresu URL. Jak temu zaradzić? Np. w taki sposób:
```javascript
function prettified(text) {
    let asJson;
    try {
        asJson = JSON.parse(text)
    } catch (error) {
        return text;
    }
    const indentationSpaces = 2;
    return JSON.stringify(asJson, null, indentationSpaces);
}
```
Taką funkcję możesz wykorzystać w poprzednim fragmencie, przekazując `prettified(response.body)`
 zamiast czystego `response.body` 🙂
 
## Wiadomość na Slacku

Kolejnym elementem Twojej "lambdy" będzie *wysyłanie wiadomości na Slacka*.
Może on wyglądać tak:
```javascript
function sendMessageToSlackChannel({ message }) {
    const requestData = JSON.stringify({
        channel : process.env.SLACK_CHANNEL,
        text    : message
    });
    return makeHttpsRequest({
        method  : 'POST',
        url     : process.env.SLACK_WEBHOOK,
        data    : requestData,
        headers : {
            'Content-Type'   : 'application/json',
            'Content-Length' : requestData.length
        }
    }).then(response => {
        if (response.status < 200 || response.status >= 300) {
            return Promise.reject(
                `Slack notification request returned ${response.status} ` +
                `instead of 2xx with body: ${response.body}`);
        }
    });
}
```
Powyższy kod sprowadza się do wysłania odpowiedniego żądania `POST`
do API Slacka wraz z przygotowanymi odpowiednio ciałem. W ciele
żądania znajduje się treść wiadomości oraz nazwa kanału Slacka,
na który ma zostać ona wysłana (tak, co prawda utworzenie integracji
"Incoming WebHooks" na Slacku wymagało wybrania "głównego" kanału,
ale mimo to można wskazać inny dla konkretnej wiadomości; pozwala
to używać jednej konfiguracji dla kilku kanałów).

## Połączenie elementów

Skoro Twój kod jest w stanie zapytać o zdrowie systemu
oraz wysłać wiadomość na Slacka, *czas połączyć to w jedną "lambdę"*:
```javascript
exports.handler = (event, context, callback) => {
    checkSystemHealth()
        .then(({ error, isHealthy, healthDetails }) => {
            if (error) {
                return sendMessageToSlackChannel({
                    message : healthCheckFailureSlackMessage({ error : error })
                }).then(() => ({
                    lambdaFailure : error
                }));
            }
            if (!isHealthy) {
                return sendMessageToSlackChannel({
                    message : systemIsUnhealthySlackMessage({ details : healthDetails })
                }).then(() => ({
                    lambdaSuccess : 'system is NOT healthy'
                }));
            }
            return {
                lambdaSuccess : 'system is healthy'
            };
        })
        .catch(error => ({
            lambdaFailure : error
        }))
        .then(({ lambdaSuccess, lambdaFailure }) => {
            if (lambdaFailure) callback(lambdaFailure, null);
            else callback(null, lambdaSuccess)
        });
};
```
Połączyłem tu kilka elementów:
* uzależniłem wysyłanie wiadomości na Slacka od tego czy health-check się
  udał oraz od jego wyniku,
* wychwytuję wszelkie inne problemy (w metodzie `.catch(error => ...)`),
* kończę obsługę funkcji wywołanej przez AWS Lambda.

Ostatni z tych elementów zasługuje na więcej uwagi. Niezależnie od tego, czy w kodzie
korzystam z Promise'ów czy z innych mechanizmów pracy z kodem asynchronicznym,
rezultat funkcji muszę zwrócić w sposób taki, jaki jest obsługiwany przez
AWS Lambda. Jest to *funkcja `callback` przekazana jako parametr naszej "lambdy"*.
W przypadku udanego wykonania "lambdy" należy wywołać `callback` z drugim
parametrem, zaś w przypadku problemu – z pierwszym (np. obiektem błędu).

# Kod w działaniu

Jeśli wszystko wykonasz poprawnie i podepniesz funkcję pod API swojego systemu,
powinieneś dostać wiadomość na Slacku, gdy system na zapytanie o zdrowie
odpowie, że ma jakiś problem (albo w ogóle nie odpowie 😉 ).
Dla ułatwienia możesz zmodyfikować lekko kod wklejony na AWS Labmda, aby
"udawać", że serwer zwrócił błąd (np. zmieniając oczekiwany status HTTP).

U mnie rezultat wygląda następująco:
![Wiadomości na Slacku o błędach zewnętrznego systemu]( /images/content/lambda-slack-health-check-2/health-failure-on-slack.png ){: .post__image }

## Wywołanie "lambdy" co 5 minut

Wszystko pięknie, ale… *przecież chodziło o to, aby health-check wykonywał się
periodycznie!* Już pokazuję, jak to zrobić 🙂

1. Wejdź na [stronę swoich "lambd"]( https://console.aws.amazon.com/lambda/home ){:target="blank"}
   i wybierz funkcję, nad którą pracujesz.
 
2. Przejdź do zakładki "Triggers" i wybierz "Add trigger":
   ![Dodawanie triggera]( /images/content/lambda-slack-health-check-2/lambda-add-trigger.png ){: .post__image }

3. Wybierz "CloudWatch Events - Schedule" jako typ triggera:
   ![Wybór rodzaju triggera]( /images/content/lambda-slack-health-check-2/lambda-choose-trigger.png ){: .post__image }

4. Skonfiguruj trigger:
   * Jako "Rule name" nowego triggera możesz wpisać cokolwiek Ci pasuje,
     ale weź pod uwagę, że jeden trigger może zostać przez Ciebie
     wykorzystany przez wiele funkcji. Przykładowo, jeśli będziesz wykonywał
     health-checku każdego środowiska Twojego systemu (np. "testing", "staging",
     "production"), będziesz potrzebował osobnych "lambd" (każda z innym
     adresem systemu w zmiennych środowiskowych), ale trigger wystarczy Ci jeden
     wspólny.
    * Jako "Schedule expression" wybierz czas, co jaki chcesz wykonywać health-check,
      np. `rate(5 minutes)`.
    * Jeśli chcesz, włącz od razu nowy trigger za pomocą opcji "Enable trigger".
    * Kliknij "Submit", aby zakończyć konfigurację.

5. Powinieneś zobaczyć utworzony trigger:
   ![Utworzony trigger widoczny w konfiguracji]( /images/content/lambda-slack-health-check-2/lamba-trigger-created.png ){: .post__image }

6. Jeśli chcesz, aby testowanie za pomocą przycisku "Test" było bardziej zbliżone
   do realiów wywoływania przez trigger, zmień "test event", którym testujesz
   funkcję:
   * Z menu "Actions" wybierz "Configure test event",
     ![Zmiana eventu testowego]( /images/content/lambda-slack-health-check-2/lambda-change-test-event.png ){: .post__image }
   * Jako szablon wybierz "Scheduled Event", co spowoduje podmienienie JSON-a
     eventu testowego:
     ![Wybór szablonu eventu testowego]( /images/content/lambda-slack-health-check-2/lambda-choose-test-event-template.png ){: .post__image }
   * Zapisz zmiany za pomocą "Save and test"
   
Od teraz Twoja funkcja powinna wykonywać się co 5 minut 🙂

# Problemy

Pewnie zauważyłeś w trakcie pracy z omawianą funkcją kilka niedogodności:
 
1. Przygotowany przeze mnie kod jest całkiem złożony – ma już 135 linii!
   *Może chciałbyś go rozbić na kilka plików?* Oddzielić odpowiedzialność
   obsługi handlera AWS Lambda od logiki health-checka?
   Jest to możliwe, ale wtedy proces edycji i wgrywania nowych wersji na 
   AWS Lambda (szczególnie w trakcie aktywnego rozwoju, na etapie prób 
   i błędów) może okazać się bardzo żmudny. Nie możesz w takiej sytuacji 
   korzystać z edytora, do którego wklejasz cały kod za jednym razem, 
   lecz musisz wgrywać paczkę z plikami.
   
2. W celu ułatwienia sobie życia przygotowałem funkcję `makeHttpsRequest(...)`, 
   która opakowuje
   [komunikację HTTP opartą na streamach z Node.js]( https://nodejs.org/dist/latest-v6.x/docs/api/http.html ){:target="blank"}
   w o wiele wygodniejsze
   [Promise API]( https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Promise ){:target="blank"}.
   Czemu, skoro na to są gotowe biblioteki, takie jak
   [request-promise]( https://github.com/request/request-promise ){:target="blank"}?!
   Dlatego, że *proces wgrywania na AWS Lambda kodu funkcji wraz z jej zależnościami
   jest skomplikowany* w porównaniu do wklejania kodu funkcji w edytorze online.

3. *Kod na AWS Lambda edytuję ręcznie na stronie* (lub lokalnie w IDE, po czym klejam go 
   na stronie AWS Lambda). Gdzie jest automatyzacja, gdy jej potrzeba?

4. Czy ktoś widzi tu jakiekolwiek *testy automatyczne?* 🔥

Cierpliwości! *Wszystkie te problemy zaadresuję w kolejnym wpisie z serii* 🤓
 