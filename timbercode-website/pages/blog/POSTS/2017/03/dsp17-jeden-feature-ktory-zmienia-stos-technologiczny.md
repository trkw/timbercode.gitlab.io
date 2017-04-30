---
permalink:   "/2017/03/28/dsp17-jeden-feature-ktory-zmienia-stos-technologiczny/"
title:       "DSP'17 — Jedna funkcjonalność, która zmienia stos technologiczny"
date:        2017-03-28T23:30:00+02:00
description: >
    Ledwo co zdecydowałem się zmigrować timbercode.pl na statycznie
    serwowany Nuxt.js, przypomniałem sobie o jednej funkcjonalności,
    która zmieniła moje plany. Cóż tot takiego? 
image:       "{{IMAGES_BASE_URL}}/images/covers/dsp17-jeden-feature-ktory-zmienia-stos-technologiczny.png"
categories:  ["timbercode"]
tags:        ["daj-sie-poznac-2017", "jvm-bloggers", "nuxt", "node", "rss", "xml", "JavaScript", "blog", "timbercode"]
---

Jeszcze tydzień temu 
 [planowałem przeniesienie bloga z Jekylla na Nuxt.js (statycznie serwowany)]( /blog/2017/03/21/dsp17-nuxt-nowym-fundamentem-timbercode-pl/ ),
 a dzisiaj już *jestem w trakcie implementacji serwerowej opartej na
 [node.js]( https://nodejs.org/en/ )*. Jak do tego doszło?
 
# Zmiana stosu technologicznego – podejście pragmatyczne

Czego jest pewien w programowaniu? Tego, że *nie wiem wszystkiego*.
 Tego, że choćbym "wszystko" przeanalizował, to i tak dopiero zmierzenie się
 problemem na polu bitewnym usłanym liniami kodu zaowocuje we właściwe pytania
 i odpowiedzi. Z każdą kolejną taką sytuacją utrwala się moja wiara
 w *podejście iteracyjne*: zamiast próbować wszystko przewidzieć,
 zaatakuj problem, zweryfikuj rezultat, zmień taktykę, uderz ponownie.

Czy wystarczy "po prostu zacząć"? Stanowczo nie. *Bardzo istotne jest, aby iść
 w kierunku tych elementów, które cechują się największą niepewnością.*
 Im szybciej zweryfikujesz swoje tezy, im szybciej udowodnisz, że danej 
 funkcjonalności nie da się zrealizować, tym lepiej dla Ciebie.
 
W przypadku migracji [timbercode.pl]( http://timbercode.pl )
 na statyczną stronę generowaną przez
 [Nuxt.js]( https://nuxtjs.org/ ), ostylowanie strony
 czy przeniesienie treści postów zostawiłem na później, ponieważ
 spodziewałem się trudności w następujących obszarach:
 
 1. *Wykrycie w procesie budowania wszystkich plików wpisów blogowych*
    i zebranie ich w kolekcję, na podstawie której można
    wygenerować stronę z listą wpisów czy feed RSS wybranej kategorii.
    
 2. *Konwersja wpisów z formatu 
    [kramdown]( https://kramdown.gettalong.org/ )
    na strony HTML.*
    
 3. *Przyjazność dla
    [SEO]( https://en.wikipedia.org/wiki/Search_engine_optimization )*,
    tzn. strona powinna być możliwa do zanalizowania przez crawlery
    i poprawnie zindeksowana w Google.
    
 4. *Generowanie podstron dla kategorii, tagów, miesięcy, lat…*
    Nie chciałbym tworzyć takich stron ręcznie, jeśli da się to
    zautomatyzować bazując na wszystkich kategoriach,
    tagach i datach występujących we wpisach.
    
 5. *Generowanie feedów RSS dla kategorii i tagów* (problem analogiczny do
    poprzedniego).
     
 6. *Automatyczne publikowanie wpisów w przyszłości*: dzisiaj dodaję commit
    do repozytorium, wpis widoczny jest dopiero jutro rano (a ja nie muszę
    skoro świt uruchamiać deploymentu zaktualizowanej strony).

# Problem nie do przeskoczenia – przyszłe wpisy + RSS
  
*Większość wymienionych powyżej problemów udało mi się rozwiązać:*
 niektóre funkcjonalności można zaimplementować w bardzo prosty sposób dzięki
 cechom frameworka (tutaj np. pojawia się wyższość Nuxt.js nad czystym Vue.js
 pod kątem stron SEO-friendly), inne rozwiązałem za pomocą dodatkowych
 "haków" w kodzie (wykrywanie wpisów, I'm looking at you…).
 Jeszcze inne uprościłem – to, co uzyskiwałem poprzez zastosowanie kramdown
 zamiast [markdown]( https://daringfireball.net/projects/markdown/ ),
 mogę otrzymać za pomocą innych rozwiązań.

Pozostała jedna kwestia: wpisy z przyszłości. Dokładniej zaś *wpisy z przyszłości
 w kontekście RSS*. Jeśli chcę, aby wpis pojawił się samoistnie po minięciu
 określonej daty, muszę zapewnić dwie funkcjonalności:
 * strona musi pobrać aktualną datę po stronie użytkownika
   i na jej podstawie zdecydować czy wyświetlić wpis czy raczej 
   komunikat ["Page not found"]( https://http.cat/404 ),
 * *RSS pobrany przed datą publikacji powinien nie zawierać przyszłego wpisu*,
   zaś po zaplanowanym momencie już go uwzględniać
   
RSS jest serwowany w postaci pliku XML. Jeżeli nie implementuję własnej
 aplikacji serwerowej, lecz tworzę stronę statyczną, to *jedynym sposobem na
 dostarczenie pliku XML jest wrzucenie go na serwer*. To oznacza, że do momentu
 kolejnego deploymentu będzie tam "leżał" wciąż jeden i ten sam plik. Bez
 możliwości zmienienia w nim czegokolwiek. Dla odmiany podstrony HTML mogą być
 jak najbardziej dynamiczne na stronie statycznej. Czemu? Ponieważ tak naprawdę
 są one generowane przez JavaScript osadzony w jednym wspólnym statycznym
 `index.html`. Tak, całą "dynamiczność"
 [SPA]( https://en.wikipedia.org/wiki/Single-page_application)
 zapewnia routing, a Ty, czytelniku, oglądasz jedną i tę samą stronę. 
 Tylko treść podmienia się w locie.
 
Być może powyższe spostrzeżenie jest dla Ciebie oczywiste, ale dla mnie, jak
 widać, nie było 🙂 Dlatego *cieszę się, że zacząłem migrację od weryfikacji
 tego, co potencjalnie sprawi trudność* i szybko przekonałem się, że mój 
 plan technologicznie nie jest wykonalny.
 
# Co dalej?

Skoro statycznie serwowana strona nie pozwala mi uzyskać jednej
 z funkcjonalności, którą chcę niedługo wprowadzić, to *pozostaje jedno –
 serwować bloga z własnego serwera* 🤓 Teraz nie uważam już tego rozwiązania
 za overkill, ponieważ mam konkretną potrzebę, której nie zaadresuję
 w inny sposób.

Co z kwestią opłat? Przecież nie chcę generować kosztów na etapie, gdy 
 mój blog jest w fazie bardzo początkowego rozwoju…
 Otóż dzięki [eksperymentom z AWS Lambda]( /blog/2017/03/25/lambda-slack-health-check-1/ )
 wiem już, że mogę skorzystać z jej potencjału i jednocześnie nie przekroczyć
 ograniczeń darmowego pakietu. *Kod serwera i serwowanych stron osadzę w funkcji
 [AWS Lambda]( https://aws.amazon.com/lambda/ )*
 (brzmi bez sensu? porozmawiajmy o tym, gdy już osiągnę to,
 co zaplanowałem 😉 ), a dostęp po HTTP wystawię za pomocą
 [Amazon API Gateway]( https://aws.amazon.com/api-gateway ).
 Wszystko w pełni zautomatyzowane (zero wyklikiwania konfiguracji na AWS)
 dzięki świetnemu narzędziu, jakim jest
 [claudia.js]( https://claudiajs.com/ ) 🙂
 
Taki jest mój zaktualizowany plan na rozwój
 [timbercode.pl]( http://timbercode.pl ).
 Jego realizację możesz obserwować na
 [branchu `server`]( https://gitlab.com/timbercode/timbercode.gitlab.io/tree/server ) 🙂 
