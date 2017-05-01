---
permalink:   "/2017/04/18/lambda-slack-health-check-3/"
title:       "Lambda + Slack = health-check #3 — projekt z zależnościami"
date:        2017-04-18T02:40:00+02:00
description: >
    W ostatnim wpisie serii dowiesz się, jak prostą funkcję na AWS Lambda
    rozwijać w postaci pełnowartościowego projektu i nie postradać
    przy tym zmysłów. Zapraszam!
image:       "{{IMAGES_BASE_URL}}/images/covers/lambda-slack-health-check-3.png"
categories:  ["tools"]
tags:        ["lambda-slack", "daj-sie-poznac-2017", "jvm-bloggers", "aws", "lambda", "slack", "health-check", "node", "claudia.js"]
---

Czas na *ostatni wpis z serii "Lambda + Slack = health-check"* 🙂

Moim celem jest pokazać Ci:
* jak skonfigurować i zintegrować ze sobą [AWS Lambda]( https://aws.amazon.com/lambda )
  wraz z popularnym komunikatorem [Slack]( https://slack.com/ )
  ([wpis nr 1]( /blog/2017/03/25/lambda-slack-health-check-1/ )),
* jak napisać funkcję w [node.js]( https://nodejs.org/en/ ),
  która co 5 minut wykona health-check wskazanego serwisu
  ([wpis nr 2]( /blog/2017/04/03/lambda-slack-health-check-2/ )),
* jak podzielić funkcję na pliki i deploywać ją wraz z zewnętrznymi
  zależnościami
  ([wpis nr 3, który właśnie czytasz]( /blog/2017/04/18/lambda-slack-health-check-3/ )).

Podobnie jak poprzednio, *ten wpis także wymaga zerknięcia do kodu źródłowego*.
[Projekt w Node.js udostępniłem na GitLabie w katalogu `step-3/`]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-3/ ).
Jest to z grubsza ta sama funkcja co ostatnio, tylko w formie projektu z zewnętrznymi
zależnościami. Tym razem także będziesz musiał zdefiniować następujące zmienne
środowiskowe na AWS Lambda lub, jeśli wolisz, już w trakcie tworzenia funkcji
za pomocą
[claudia.js]( https://claudiajs.com/ ):
* `SLACK_WEBHOOK` – URL webhooka Slacka, na który będą wysyłane wiadomości,
* `SLACK_CHANNEL` – kanał Slacka, na który będą wysyłane wiadomości,
* `HEALTH_CHECK_URL` – URL zewnętrznego systemu, który zwraca informację
  o stanie systemu (najlepiej ze statusem `200 OK` i ciałem odpowiedzi
  w formacie JSON),
* `SYSTEM_NAME` – nazwa systemu, która zostanie użyta w treści wiadomości na Slacka.
 
# Konfiguracja AWS

Zanim skorzystasz z dobrodziejstwa, jakim jest 
[claudia.js]( https://claudiajs.com/ ), 
*musisz utworzyć
użytkownika, który będzie mógł wykonywać operacje na AWS z poziomu konsoli*.
W tym celu otwórz [IAM]( https://console.aws.amazon.com/iam )
i w zakładce "Users" kliknij "Add user":

1. W polu "User name" podaj dowolną nazwę użytkownika, która będzie wystarczająco
   jasno mówiła Tobie, że jest to konto z dostępem do AWS poprzez CLI.
   Jako "Access type" wybierz "Programmatic access".
   ![AWS IAM - nowy użytkownik - nazwa i typ dostępu]( {{IMAGES_BASE_URL}}/images/content/lambda-slack-health-check-3/iam-new-user-name-and-access-type.png )
   
2. W dalszych krokach musisz określić uprawnienia nowego użytkownika.
   Jednym ze sposobów na to jest zdefiniowanie grupy z tymi uprawnieniami
   i przypisanie użytkownika do niej. Podczas tworzenia grupy wskaż uprawnienia
   o następujących "Police name":
   * `AWSLambdaFullAccess`
   * `AmazonAPIGatewayAdministrator`
   * `IAMFullAccess`
   ![AWS IAM - nowy użytkownik - nowa grupa]( {{IMAGES_BASE_URL}}/images/content/lambda-slack-health-check-3/iam-new-user-new-group-policies.png )
  
3. Na koniec zobaczysz klucze dostępowe wygenerowane przez AWS dla nowego użytkownika:
   * "Access key ID"
   * "Secret access key"
   
   Umieść je w pliku `.aws/credentials` (ścieżka względem Twojego katalogu
   domowego) jako nazwany profil, np. `cli`:
    ```bash
    [cli]
    aws_access_key_id = ABCD1234
    aws_secret_access_key = EFGH5678
    ```
    Oczywiście powyżej moje klucze zastąpiłem wartościami
    `ABCD1234` oraz `EFGH5678` 😉
    
# claudia.js
        
*Od teraz powinieneś być w stanie zarządzać AWS Lambda za pomocą
[claudia.js]( https://claudiajs.com/ ).* Jest to
narzędzie, które upraszcza tworzenie funkcji na Lambda
oraz wgrywanie jej nowych wersji. Są dostępne też inne możliwości,
np. proxy'owanie komunikacji HTTP przez API Gateway i Lambda do
"zapakowanej" w funkcję aplikacji serwerowej opartej na
Node/Express, ale to wykracza poza opisywany przykład.

Pamiętaj, że każda operacja za pomocą claudia.js wymaga 
dostępu do AWS. Tutaj właśnie przyda się zdefiniowany
w `.aws/credentials` profil, a w ramach niego — klucze
dostępowe. Profil można przekazać na dwa sposoby:

1. Za pomocą parametru wywołania `--profile`, np.:
    ```bash
    claudia update --profile cli
    ```
2. Za pomocą zmiennej środowiskowej `AWS_PROFILE`, np.
    ```bash
    env AWS_PROFILE=cli claudia update
    ```

*Do utworzenia funkcji na AWS Lambda służy polecenie
`claudia create`.* Otrzymuje ono wiele parametrów: możesz
podać nazwę funkcji czy też region AWS, w którym ma zostać
utworzona. Efektem wywołania tego polecenia jest wygenerowany plik
`claudia.json`, dzięki któremu dalsze *aktualizacje funkcji za pomocą
`clauda update`* wymagają mniejszej liczby parametrów 🙂
Po dokładną instrukcję jak za pomocą claudia.js utworzyć funkcję
opisaną w tym wpisie, zajrzyj do
[pliku README.md w repozytorium]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-3/README.md ).

*Gdy już zaktualizujesz funkcję, możesz uruchomić ją (zdalnie na AWS Lambda)
z zadanym eventem. W tym celu użyj polecenia `claudia test-lambda`.*
[W pliku `scheduled-event.test.json`]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-3/scheduled-event.test.json )
przygotowałem event podobny do eventów generowanych przez periodyczny trigger
opisany w poprzednim wpisie.

# Projekt zamiast funkcji

No dobrze, ale *co takiego miało dać wykorzystanie
[claudia.js]( https://claudiajs.com/ )?*
Z perspektywy funkcji do health-checka,
główną zaletą narzędzia jest możliwość szybkiego aktualizowania
funkcji. Zamiast "ręcznie" wgrywać paczkę pełną plików, możesz
napisać `claudia update`, a wszystkie pliki niezbędne do działania
funkcji wylądują w chmurze. Włącznie z zależnościami instalowanymi
za pomocą `npm`!

*Jak wskazać te pliki?* Domyślnie są to wszystkie pliki z katalogu
projektu z pominięciem pewnych "oczywistych" pozycji, takich jak
`.git/` czy `/node_modules/`. Ta druga może Ciebie zdziwić:
jak to, przecież zależności projektu też miały znaleźć się w funkcji,
a nie zostać zignorowane! Tak, ale w tym celu claudia.js instaluje
"w locie" zależności produkcyjne. Oznacza to, że ani nie przekroczysz
limitu rozmiaru funkcji (50 MB) poprzez nieopatrznie dołączone zależności
potrzebne do developmentu ani nie wgrasz przypadkiem zmodyfikowanego
lokalnie kodu biblioteki. OK, ale jeśli jednak wolisz oprzeć się
na zdefiniowanej wprost liście plików do uwzględnienia, możesz
to zrobić za pomocą
[pola `files` w pliku `package.json`]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-3/package.json#L9 ).

W kodzie health-checka *wykorzystałem podział na pliki tak,
aby oddzielić od siebie różne odpowiedzialności*. Przykładowo
[konfiguracja projektu]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-3/src/config.js )
to coś zgoła innego niż
[wysyłanie wiadomości na Slacka]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-3/src/slack.js ).

*Wprowadziłem także jedną bibliotekę:* zamiast
[bazować na natywnym module `http`]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-2/simple-health-check.lambda.js#L108 ),
skorzystałem z `request-promise`,
[co pozwoliło mi oprzeć kod na promise'ach]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-3/src/httpClient.js#L29 ). 

Powyższe zmiany ułatwiły jeszcze jedno:
*tym razem napisanie testów było znacznie prostsze!* 😀
Gdy zajrzysz do
[katalogu `test/`]( https://gitlab.com/timbercode/lambda-slack-example/tree/master/step-3/test )
to przekonasz się, że duża część działania health-checka pokryta
jest testami. Możesz uruchomić je za pomocą `npm test`.

# To już koniec

Tym wpisem kończę serię o health-checku na AWS Lambda, który wysyła
wiadomości na Slacka. Opisywany health-check nie jest być może bardzo
przydatny w pisaniu "poważnych systemów" (
[Serverless Architecture]( https://martinfowler.com/articles/serverless.html )
to to nie jest 😉
), ale liczę, że właśnie jego prostota przekona Cię do wypróbowania
AWS Lambda. Ja zacząłem dokładnie w ten sposób w projekcie komercyjnym,
a teraz pracuję nad trudniejszym użyciem AWS Lambda, tzn. próbuję
w funkcję zapakować całe [timbercode.pl]( http://timbercode.pl ) 😜

Życzę Ci powodzenia i… proszę o feedback. Jeśli coś w tej serii przypadło Ci
do gustu lub możesz wskazać mi, co mogło być zrobionej lepiej,
z chęcią sią o tym dowiem 🙂
