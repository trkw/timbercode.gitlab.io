---
permalink:   "/2017/03/25/lambda-slack-health-check-1/"
title:       "Lambda + Slack = health-check #1 — konfiguracja"
date:        2017-03-25T02:22:00+01:00
description: >
    Słyszałeś o AWS Lambda, ale nie wiesz, jak zacząć korzystać z tej usługi?
    Pokażę Ci, jak za darmo za pomocą Lambdy i Slacka utworzyć
    periodyczny health-check. W tym wpisie skonfigurujemy 
    wysyłanie wiadomości z AWS Lambda na Slacka.
image:       "{{IMAGES_BASE_URL}}/images/covers/lambda-slack-health-check-1.png"
categories:  ["tools"]
tags:        ["lambda-slack", "daj-sie-poznac-2017", "jvm-bloggers", "aws", "lambda", "slack", "health-check"]
---

Być może słyszałeś o *[AWS Lambda]( https://aws.amazon.com/lambda )*
 i chciałbyś zobaczyć, jak z tej usługi skorzystać, ale przerażają Cię
 zawiłości konfiguracji AWS. A może jesteś ciekaw, jak wygląda
 pisanie i deployment funkcji przy podejściu
 [Serverless Architecture]( https://martinfowler.com/articles/serverless.html ).
 Tak czy siak dobrze trafiłeś 🙂 

Chcę Ci pokazać:
* jak skonfigurować i zintegrować ze sobą [AWS Lambda]( https://aws.amazon.com/lambda )
  wraz z popularnym komunikatorem [Slack]( https://slack.com/ )
  ([wpis nr 1, który właśnie czytasz]( /blog/2017/03/25/lambda-slack-health-check-1/ )),
* jak napisać funkcję w [node.js]( https://nodejs.org/en/ ),
  która co 5 minut wykona health-check wskazanego serwisu
   ([wpis nr 2]( /blog/2017/04/03/lambda-slack-health-check-2/ )),
* jak podzielić funkcję na pliki i deploywać ją wraz z zewnętrznymi
  zależnościami
  ([wpis nr 3]( /blog/2017/04/18/lambda-slack-health-check-3/ )).
  
*Po przeczytaniu tego wpisu będziesz umiał utworzyć funkcję na AWS Lambda,
 której ręczne uruchomienie spowoduje wysłanie wiadomości na kanał Slacka.*
 
Na potrzeby tego i kolejnych wpisów przygotowałem *projekt
 [`lambda-slack-example`]( https://gitlab.com/timbercode/lambda-slack-example ),
 zawierający opisywany tutaj kod i pomocnicze skrypty*.
  
# Kasa, kasa, kasa…
 
Na wstępie chciałbym podkreślić jeszcze jedną bardzo istotną kwestię:
 *to, co opiszę jest w pełni darmowe!* Jak to możliwe?
 * Slack jest darmowy w podstawowym wykorzystaniu (np. z ograniczoną
   historią wiadomości),
 * AWS Lambda też jest darmowa. Otóż *w ramach darmowego planu nieograniczonego
   czasowo dostajesz 1 milion wywołań Twojej funkcji oraz ponad 3 miliony sekund
   czasu wykonania tejże*. W miesiącu jest mniej niż 45 tysięcy minut, a to
   oznacza, że nawet gdyby Twój health-check wykonywał się co minutę i trwał
   minutę, to limitów nie przekroczysz (oczywiście jeśli chcesz posiadać kilka
   funkcji, to dobrą praktyką będzie określenie znacznie niższego limitu czasu
   wykonania 😜 ). Szczegóły dostępne są na stronie 
   [AWS Free Tier]( https://aws.amazon.com/free/ )
  
# Konfiguracja Slacka

Zacznijmy więc od tego, co proste i przyjemne, czyli od skonfigurowania
 webhooka na Slacku. Załóżmy, że masz wszelkie uprawnienia do tego, aby 
 dodawać integracje.
 
1. Utwórz kanał, na który chcesz, aby były wysyłane wiadomości,
   np. `#hello-from-lambda`.
   
2. Z menu Twojego teamu wybierz "Apps & integrations". Zostaniesz przeniesiony
   na stronę, na której można wybierać aplikacje i integracje do skonfigurowania
   na Slacku.
   ![Aplikacje i integracje w menu teamu na Slacku]( {{IMAGES_BASE_URL}}/images/content/lambda-slack-health-check-1/slack-team-menu-apps.png )
   
3. Znajdź integrację "Incoming WebHooks" i wybierz "Add Configuration":
   ![Wyszukiwanie aplikacji "Incoming WebHooks"]( {{IMAGES_BASE_URL}}/images/content/lambda-slack-health-check-1/slack-apps-incoming-webhooks.png )

4. Jako "Post to Channel" wskaż ten kanał, który utworzyłeś na początku,
   np. `#hello-from-lambda`. Kliknij "Add Incoming WebHooks integration"

5. W tym momencie trafiasz na stronę utworzonej przez Ciebie integracji.
   Jest na niej niejedna przydatna informacja, wiele do dostosowania 
   (np. nazwa bota na Slacku i jego ikona), ale *w tym momencie wystarczy
   nam "Webhook URL". Jest to adres, pod który możesz
   wykonywać zapytania HTTP, aby tworzyć wpisy na Slacku.* Nie powinieneś
   udostępnia nigdzie tego webhooka, ponieważ jednym z jego elementów jest
   token autentykacyjny – posiadanie
   samego tylko adresu wystarczy, aby wysyłać dowolne wiadomości
   na Twój komunikator. 
   
6. *Sprawdź, czy działa wysyłanie wiadomości na Slacka za pomocą
   uzyskanego webhooka* (poniżej przykładowy URL).
   W tym celu możesz skorzystać z narzędzia `curl`:
   ```bash
   $ curl \
         -X POST \
         -H 'Content-Type: application/json' \
         --data '{ "text": "Hello!" }' \
         https://hooks.slack.com/services/T12345678/B98765432/12346578hgfedcba87654321
   ```
   
Jeśli wszystko przebiegło pomyślnie, na Slacku zobaczysz wiadomość `Hello!` 🤓

![Wiadomość dostarczona na Slacka]( {{IMAGES_BASE_URL}}/images/content/lambda-slack-health-check-1/slack-webhook-test.png )

# Konfiguracja AWS

Teraz czas na tę bardziej skomplikowaną część… choć też powinno obyć się bez
 większych trudności. Tak naprawdę to kroków jest niewiele i są proste, o ile
 wiesz, czego nie konfigurować oraz nie zgubisz się w interfejsie AWS 😉
 
1. W webowej konsoli AWS przejdź do
   [AWS Lambda (link dla regionu `eu-central-1`)]( https://eu-central-1.console.aws.amazon.com/lambda )
   i kliknij w "Get Started Now". W ten sposób znajdziesz się na stronie
   tworzenia Twojej pierwszej funkcji. W przypadku kolejnej funkcji
   proces wygląda inaczej: link prowadzi Cię na dashboard AWS Lambda,
   gdzie klikasz w "Create a Lambda function".
   
2. Jako blueprint wybierz "Blank Function". Na tym etapie nie potrzebujemy "gotowca".
   ![Wybór "Blank Function" jako blueprint dla funkcji AWS Lambda]( {{IMAGES_BASE_URL}}/images/content/lambda-slack-health-check-1/aws-blank-function-blueprint.png )

3. Na stronie "Configure triggers" przejdź dalej bez wybierania żadnego triggera.
   Swoja pierwszą funkcję będziesz uruchamiał ręcznie.

4. Na kolejnej stronie podaj nazwę swojej "lambdy", np. `hello-to-slack`,
   a jako "runtime" wskaż `Node.js 6.10`. Pozostaw przykładowy kod funkcji.
   Poniżej wybierz "Create new role from template(s)" jako rolę
   i nadaj nazwę nowej roli, np. `hello-to-slack-executor`.
   
5. Przejdź do końca konfiguracji, aż znajdziesz się na ekranie utworzonej funkcji.
   Kliknij w przycisk "Test", aby sprawdzić, że przykładowy kod wykonuje się poprawnie.
   Za pierwszą próbą przetestowania funkcji zostaniesz zapytany o to, jaki
   event ma być wysłany do funkcji jako dane wejściowe. W przypadku 
   naszej prostej notyfikacji na Slacka nie będzie to miało znaczenia,
   dlatego możesz zatwierdzić domyślnie wybrany szablon "Hello World".
   Kliknij "Save and test", aby zatwierdzić wybór eventu
   i przetestować funkcję.
   
6. Jeśli wykonanie funkcji przebiegnie bez problemu, Twój ekran będzie wyglądał
   mniej więcej tak:
   ![Udane wykonanie przykładowej funkcji na AWS Lambda]( {{IMAGES_BASE_URL}}/images/content/lambda-slack-health-check-1/lambda-hello-world-success.png )
   
7. Teraz usuń kod przykładowej funkcji i wstaw, która wysyła wiadomość na Slacka.
   W tym celu wklej kod z pliku
   [`step-1/hello-to-slack.lambda.js`]( https://gitlab.com/timbercode/lambda-slack-example/blob/master/step-1/hello-to-slack.lambda.js ).
   Następnie pod edytorem kodu znajdź sekcję, w której ustawia się zmienne
   środowiskowe. Tam zdefiniuj zmienną `SLACK_WEBHOOK`, której wartością
   jest URL Twojego slackowego webhooka.
   
8. Kliknij "Test", aby sprawdzić działanie funkcji.

Jeśli nic się po drodze nie zepsuło, zobaczysz taką wiadomość na swoim Slacku:
![Wiadomość z Lambdy dostarczona na Slacka]( {{IMAGES_BASE_URL}}/images/content/lambda-slack-health-check-1/slack-lambda-test.png )
   
# Co dalej?

Teraz, gdy umiesz już wysłać wiadomość na Slacka za pomocą funkcji 
 AWS Lambda, mogę pokazać Ci, jak dodać do zestawu periodyczny
 health-check wybranego serwisu. O tym opowiem w kolejnym wpisie z serii 🙂
 Jeśli chcesz dowiedzieć się o nim, jak tylko się pojawi, możesz wykorzystać
 [kanał RSS serii]( /blog/tag/lambda-slack/feed.xml )
