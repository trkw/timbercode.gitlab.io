---
layout:      post
title:       "DSP'17 &mdash; Nuxt.js nowym fundamentem timbercode.pl"
date:        2017-03-21T02:13:00+01:00
description: >
    Przewidując problemy z rozwojem timbercode.pl zdecydowałem zmienić
    bazową technologię. Po długich rozważaniach wybór padł nad Nuxt.js
    &ndash; narzędzie wspomagające budowanie statycznych stron opartych
    na Vue.js.
image:      "/images/covers/dsp17-nuxt-nowym-fundamentem-timbercode-pl.png"
categories: ["timbercode"]
tags:       ["daj-sie-poznac-2017", "nuxt", "spa", "web", "node", "JavaScript", "blog", "timbercode"]
---

![Obrazek wpisu "{{page.title}}"]( /images/covers/dsp17-nuxt-nowym-fundamentem-timbercode-pl.png )

W [poprzednim wpisie]( /blog/2017/03/12/dsp17-zmagania-z-designem/ ){:target="blank"}
 na temat rozwoju [timbercode.pl]( http://timbercode.pl ){:target="blank"}
 opisywałem mój proces tworzenia designu strony. Nie poruszyłem tam jednak
 tematu technologii, która byłaby wykorzystana pod spodem.
 
Aktualnie *timbercode.pl jest generowane za pomocą
 [jekylla]( https://jekyllrb.com/ ){:target="blank"}*.
 Jest to narzędzie do generowania *statycznych stron internetowych*:
 Ty przygotowujesz treść wpisów oraz szablony HTML, zaś jekyll zamienia to
 na HTML-e, i taką paczkę plików możesz wrzucić prosto na serwer i gotowe.
 To rozwiązanie świetnie też współgra z
 [GitHub Pages]( https://pages.github.com/ ){:target="blank"} oraz 
 [GitLab Pages]( https://docs.gitlab.com/ee/user/project/pages/index.html ){:target="blank"}
 (na których hostowane jest timbercode.pl), a to niewątpliwie zaleta:
 strona dostępna w internecie 24h na dobę bez żadnych opłat 🙂
 
Problem, który zaczął dostrzegać podczas pracy nad designem, to 
 *komponenty o dynamicznej "naturze"*: wyszukiwarka czy doładowywanie wpisów
 na liście podczas odkrywania dalszych jej części. Podejrzewam, że 
 wszelkie takie bajery można uzyskać za pomocą odpowiedniej dawki JavaScriptu.
 Ewentualnie z pomocą pluginów pisanych w Ruby. Obawiam się jednak, że
 przy tak bardzo "statycznym" jekyllu skończyłbym na łataniu łat i obchodzeniu
 obejść. *Czy w takim razie nadszedł czas na zmianę technologii, na której oparte jest
 timbercode.pl?*

# Alternatywy

*Rozważyłem dwie ścieżki* &ndash; napisać całą stronę zgodnie z trendami, tworząc
 [Single-Page Application]( https://en.wikipedia.org/wiki/Single-page_application ){:target="blank"}
 opartą na jednym z popularnych frameworków lub dać sobie maksimum władzy nad
 zachowaniem aplikacji, serwując z ją "klasycznie" z backendu (np. napisanego w 
 [node.js]( https://nodejs.org/en/ ){:target="blank"}).
 
## Single-Page Application

Utworzenie bloga jako SPA brzmi kusząco: strona internetowa jako *jedna spójna
 aplikacja ze swoim własnym routingiem*, pozwalającym oddzielić adresy URL
 od struktury plików kodu źródłowego. Strona, na której *przejście z jednego miejsca
 w drugie nie skutkuje irytującym przeładowaniem karty przeglądarki* (mignięcie białego
 tła). Technologia, którą sobie upatrzyłem w tym celu to
 [Vue.js]( https://vuejs.org/ ){:target="blank"} &ndash; framework, który jest podobno
 równie sexy co [React]( https://facebook.github.io/react/ ){:target="blank"},
 zapewniając jednocześnie łatwiejsze rozpoczęcie pracy z pomocą przejrzystej
 dokumentacji. Co istotne, jest duża szansa, że Vue.js nie działa
 na przekór automatycznemu testowaniu aplikacji.
 
Niestety głównym problemem związanym ze SPA są *kłopoty z
 [SEO]( https://en.wikipedia.org/wiki/Search_engine_optimization ){:target="blank"}*.
 Taka webaplikacja zazwyczaj ładuje swoją treść asynchronicznie i jest w ogóle
 tak bardzo "dynamiczna" w swej istocie, że&hellip; crawlery nie będą w stanie
 wykryć na niej wpisów blogowych i podpowiadać ich w wynikach wyszukiwania Google 🙁
 Są na to rozwiązania, ale&hellip; to raczej obejścia niż rozwiązania leżące u podstaw
 danej technologii.
 
## Backend serwujący frontend
 
Gdybym wybrał drugie rozwiązanie, to *uzyskałbym większą swobodę pisania kodu*.
 Mój backend mógłby dowolnie decydować, jaki HTML przesłać dla zadanego adresu URL.
 Mógłbym dostarczać użytkownikowi tylko tyle wpisów, ile mu potrzeba dla danego
 wyszukiwania, zamiast ładować na start wszystkie wpisy, które istnieją.
 Treści przyszłych wpisów mogłyby czekać cierpliwie poza przeglądarką użytkownika
 (w podejściu bez backendu mógłbym je ukrywać, ale i tak byłyby już pobrane przez
 klienta). No a także security&hellip; Jak ukryć tokeny dostępowe do innych serwisów
 bez możliwości "schowania" kodu na serwerze?
 
Niestety *dodanie backendu to generowanie kosztów*. Backend utrzymywany
 na [Heroku]( https://www.heroku.com ){:target="blank"} to przynajmniej
 $7 miesięcznie. Darmowy plan też wchodzi w grę, ale&hellip; skutkuje on usypianiem
 backendu co jakiś czas. Efekt? Użytkownikowi strona internetowa ładuje się kilka 
 dłuuugich sekund (bo "Heroku wstaje").
 
## Nuxt.js &ndash; niespodziewany zwycięzca

I tak oto docieramy do zwycięzcy, którym jest [Nuxt.js]( https://nuxtjs.org/ ){:target="blank"}.
 *Jest to narzędzie oparte na Vue.js, które łączy w sobie cechy przyjemnie pisanej
 nowoczesnej webaplikacji z zaletami&hellip; statycznie generowanych stron.*
 Otóż jedną z głównych funkcji Nuxt.js jest możliwość wygenerowania strony statycznej
 za pomocą komendy `nuxt generate`. Tak przygotowany blog nie sprawia problemów
 crawlerom i można go hostować bez wykorzystania własnego backendu.
 
Nie dość, że będę mógł wygodnie oskryptować stronę, to jeszcze nie będę musiał
 pisać boilerplate'u związanego z routingiem czy budowaniem aplikacji. Nuxt.js dostarcza
 oparty na [Webpacku]( https://webpack.js.org/ ){:target="blank"} proces budowania
 (można go łatwo dokonfigurować na swoje potrzeby), generuje routing
 (na bazie struktury katalogów), a także wykorzystuje wygodną składnię
 [Single File Components]( https://vuejs.org/v2/guide/single-file-components.html ){:target="blank"},
 w których style definiujemy w kontekście HTML-a i jego skryptów. I to wszystko
 nadal w ramach darmowych GitLab Pages! 🤓
 
Jakże się cieszę, że trafiłem na to narzędzie! 🙂

# Podsumowanie

Przewidując problemy z rozwojem [timbercode.pl]( http://timbercode.pl ){:target="blank"}
 zdecydowałem zmienić technologię bazową. Po długiej rozterce odkryłem
 [Nuxt.js]( https://nuxtjs.org/ ){:target="blank"},
 który chwilę później stał się moim wyborem. Rozpocząłem migrację bloga, którą możesz
 obserwować na
 [gałęzi `migration_to_nuxt` repozytorium kodu strony]( https://github.com/nkoder/timbercode.gitlab.io/tree/migration_to_nuxt ){:target="blank"}.
 
Mam nadzieję, że z pomocą tego narzędzia ułatwię sobie dalszą pracę, a także
 nauczę się czegoś nowego i ciekawego 😉

