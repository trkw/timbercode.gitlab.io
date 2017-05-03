---
permalink:   "/dsp17-migracja-zakonczona"
title:       "DSP'17 — Migracja zakończona, czyli nowe horyzonty!"
date:        2017-05-02T23:00:00+02:00
description: >
    Zakończyłem migrację bloga na AWS Lambda! W tym wpisie
    dowiesz się, co się (nie) zmieniło, co się jeszcze zmieni,
    a także… po co to wszystko 😀
image:       "{{IMAGES_BASE_URL}}/images/covers/dsp17-migracja-zakonczona.png"
category:    "timbercode"
tags:        ["daj-sie-poznac-2017", "blog", "timbercode", "express", "nuxt", "aws", "lambda"]
---

Tak! W końcu! *Zmigrowałem [timbercode.pl]( https://timbercode.pl )
na nowy stos technologiczny!* 😀

Jeśli chcesz wiedzieć, o co w ogóle chodzi z tą migracją, to zajrzyj
do [wpisów o rozwoju Timbercode]( /blog/category/timbercode ),
które przygotowałem w ramach [konkursu Daj Się Poznać 2017]( Daj Się Poznać 2017 ).

Czy obyło się bez problemów? Oczywiście, że nie 🙂
[Niedawno zamieściłem prezentację]( /blog/2017/04/24/dsp17-prezentacja-o-migracji-bloga/ ),
na której pod koniec przedstawiam wybrane 11 przeszkód w migracji.
Przykładowo, na AWS Lambda blog potrafił się ładować nawet 6 sekund.
Na szczęście nawet ten problem rozwiązałem. Jak można zgadnąć, 
zwiększyłem dostępną pamięć i moc procesora dla mojej funkcji Lambda 💰

Kod po migracji znajdziesz na gałęzi `master`
[repozytorium kodu tego bloga]( https://gitlab.com/timbercode/timbercode.gitlab.io ).

# Co się zmieniło

*Zmiany po migracji są praktycznie niezauważalne. W pewnym sensie był to refactoring –
zmienić to i owo, nie naruszając efektu końcowego.* A czym było "to i owo"?

* *Strona webowa jest generowana przez [Nuxt]( https://nuxtjs.org/ )*,
  czyli de facto na [Vue]( https://vuejs.org/ ), ale z różnymi "wodotryskami",
  między innymi z renderowaniem zarówno po stronie klienta jak i serwera.
  Gdy już raz załadujesz stronę, to potem nawigujesz po niej w ramach
  pobranego lokalnie kodu, bez wykonywania zbędnych zapytań do serwera.
  Jednocześnie nie pobierasz kodu całej strony od razu przy pierwszym załadowaniu
  strony, gdyż *zbędne na pierwszej stronie paczki pobierane są w tle
  w drugiej kolejności z wykorzystaniem
  [`<script prefetch ... />`]( https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ ).*
  
* Zarówno Nuxtowa strona jak i feed Atom serwowane są przez
  [Express]( https://expressjs.com/ ).
  
* *Całość jest hostowana na [AWS Lambda]( https://aws.amazon.com/lambda ).*
  Oznacza to, że serwer jest bezstanowy, a każde zapytanie do niego to
  osobne wywołanie "od zera" funkcji generującej stronę 😱
  Nie jest jednak tak strasznie… większość procesu budowania dzieje się raz,
  podczas deploymentu. Na serwerze pozostaje tylko uruchomienie Nuxt, obsługa
  ścieżki URL oraz wyświetlenie wpisu.
  
* Ze względu na specyfikę Lambda (np. opłata za czas wykonania funkcji),
  grafiki wydzieliłem ze strony i umieściłem na
  [AWS CloudFront]( https://aws.amazon.com/cloudfront ), czyli na
  [Content Delivery Network]( https://en.wikipedia.org/wiki/Content_delivery_network )
  od Amazona.
  
* Hmmm, czyżbym nie wspomniał o jednej z najbardziej "odczuwalnych" zmian? 🤔
  Tak! Otóż *od teraz cała logika strony jest napisana w JavaScript*.
  Dla jednych to może zmiana na gorsze 😜, jednak ja stanowczo preferuję
  rozwijać kod w języku, który znam. Dla wyjaśnienia – poprzednia wersja
  opierała się na [Jekyllu]( https://jekyllrb.com/ ), który bazuje
  na języku Ruby.
  
# Co się nie zmieniło

Niezmiennikiem, który chciałem zachować podczas pracy z blogiem, był sposób
tworzenia treści. *Wpisy były i są napisane w formacie
[Markdown]( https://en.wikipedia.org/wiki/Markdown )*, który łączy 
w miarę wygodną wizualną prezentację "kodu" strony z faktem, że jest
to format tekstowy, czyli "lubiany" przez Gita i programistów w ogóle 😉

Oczywiście, gdybym mógł sobie ot tak wejść na mieście z telefonu
do edytora [WYSIWYG]( https://en.wikipedia.org/wiki/WYSIWYG )
i zedytować wpis, to było by nawet milej. Jednakże na razie
osiągnięcie czegoś takiego przy zachowaniu formatu tekstowego
i wersjonowania wpisów w repozytorium kodu byłoby mordęgą.
Może kiedyś…
  
# Co się jeszcze zmieni

*Zmigrowanie na nowy stos technologiczny to dopiero początek.*
To pierwszy fragment trasy, którego przebycie odsłania przede mną
kolejne drogi, ścieżki i rozwidlenia. Wśród nich są odcinki takie,
których efekty zauważysz na stronie:
* nowy design, 🎨
* wyszukiwarka z filtrowanie w trakcie wpisywania zapytania, 🔎
* subskrypcja mailowa, 📩
* plakietki z tagami, podstrony kategorii, 🔀
* strony "o mnie" i "portfolio", 👱
* paginacja wpisów, 📖
* informacja o spodziewanym czasie czytania wpisu. ⏱

Nie byłbym sobą, gdybym też nie zechciał ulepszyć czegoś "niewidocznego".
Pierwsze tematy, które przychodzą mi na myśl, to:
* wyczyszczenie kodu, ✨
* [TypeScript]( https://www.typescriptlang.org/ ), 🤓
* testy! 🚀

# Po co to wszystko?

Być może zastanawiasz się, po co to wszystko. *Czy warto zajmować się takimi
szczegółami, zamiast "po prostu wziąć" Wordpressa, dorzucić kilka pluginów
i posypać całość garścią haków, obejść i innych "drobnych poprawek"?*
Jaki jest sens takiej pracy, takiego "wymyślania koła na nowo"? 🤔

Przede wszystkim *bardzo wiele się nauczyłem w trakcie walki z migracją*.
Miałem momenty zwątpienia oraz takie, w których ćwiczyłem
pisanie "po łebkach", byle działało. Wykorzystałem technologie, o których przedtem
jedynie co nieco słyszałem, a teraz znam je lepiej niż niejedna osoba, która
zatrzymała sie na etapie Hello World. A także… *nie gubię się już tak bardzo
w świecie usług AWS*. Liczę też, że dzięki Lambda dostanę na koniec miesiąca 
niższy rachunek niż w przypadku "tradycyjnego" hostingu 😜

Jest jeszcze jeden powód, dla którego blog wzbogacił się o własny serwer, dla
którego porzuciłem framework blogowy z gotowymi rozwiązaniami. Ty powodem jest…
przyszły kształt marki Timbercode. *W Timbercode nie chodzi
tylko o to, aby szybko osiągnąć minimalny, wystarczający efekt.*
Timbercode to także detale. Te niewidoczne drobne niuanse, które powodują,
że produkt końcowy jest dopracowany. *To ten moment, gdy użytkownik
czuje się zrozumiany i widzi, że autor włożył serce, by zadbać nawet o to,
co jeszcze nie zostało wyartykułowane.*

Ups… zrobiło się poważnie. Rozluźniająca emotka na koniec podstawą sukcesu 😉
