---
permalink:   "/dsp17-redesign-na-czysto"
title:       "DSP'17 — Redesign \"na czysto\""
date:        2017-05-09T23:50:00+02:00
description: >
    Zacząłem redesign timbercode.pl. Na początek trzeba
    wyczyścić przygotować stronę w stanie surowym.
image:       "{{IMAGES_BASE_URL}}/images/covers/dsp17-redesign-na-czysto.png"
category:    "timbercode"
tags:        ["daj-sie-poznac-2017", "blog", "design", "timbercode", "css"]
---

Dwa miesiące temu pisałem o tym, jak
[zmagałem się z designem timbercode.pl](/blog/2017/03/12/dsp17-zmagania-z-designem/).
Po czterech iteracjach rysowania i analizy zdecydowałem, że
dalsze kroki będą już miały miejsce w kodzie. Że po "ułożeniu"
tematu w głowie efektywniej będę ubierał blog w nowe szaty,
podmieniając to i owo w HTML i CSS strony.

> Jest to kolejny wpis na temat rozwoju [timbercode.pl](https://timbercode.pl)
w ramach konkursu [Daj Się Poznać 2017]( http://devstyle.pl/daj-sie-poznac/ ).

Temat redesignu został wstrzymany… aż do teraz. Ale *jak pracować
nad nowym ostylowaniem, gdy na stronie jest już obecny jakiś motyw?*
Oczywiście, że się da, ale nie jest to droga, którą ja bym wybrał.
Zdając się na modyfikacje obecnego stylu, jedynie naginałbym
i korygował CSS tak długo, aż osiągnąłbym oczekiwany efekt wizualny.
Efekt, który by się "popsuł" na pierwszym lepszym smartfonie.
A następnie na tablecie z poziomą orientacją ekranu itd. 🙁

Jeśli chce się coś zbudować całkowicie na nowo, bez bagażu przeszłości,
trzeba zacząć od zrównania z ziemią tego, co jest. Dlatego przygotowałem
[kopię głównej strony bloga](https://gitlab.com/timbercode/timbercode.gitlab.io/blob/redesign/timbercode-website/pages/redesign.vue)
pozbawioną jakichkolwiek własnych modyfikacji stylu. Jednocześnie zadbałem,
aby jej struktura była zgodna z [Semantic HTML](https://en.wikipedia.org/wiki/Semantic_HTML).
Zgodnie z tym podejściem *preferuję znaczniki takie jak
`<header>` czy `<article>` ponad abstrakcyjny `<div>`*. Tak zmieniona strona wygląda
następująco:
![Blog w postaci surowej]({{IMAGES_BASE_URL}}/images/content/dsp17-redesign-na-czysto/raw-blog.png)

Strona z tytułem i listą tytułów wpisów to za mało, aby pracować nad
spójnym designem. Dlatego utworzyłem dodatkowy wpis (z baaardzo przyszłą 
datą publikacji 😉), który zawiera różnorakie elementy:
* listy,
* listy zagnieżdżone,
* wytłuszczenia,
* linki,
* emoji, 🚀
* fragmenty kodu "inline",
* bloki kodu,
* obrazki,
* obrazki na poziomie podpunktów listy,
* film z [YouTube](https://www.youtube.com/),
* prezentację ze [Speaker Deck](https://speakerdeck.com/),
* i inne…

Fragment tego wpisu wygląda przedstawia poniższy zrzut ekranu:
![Wpis w postaci surowej]({{IMAGES_BASE_URL}}/images/content/dsp17-redesign-na-czysto/raw-post.png)

Oczywiście konieczne było, abym w taki sposób pozbawił ostylowania wpis próbny,
co by nie zmienić nic w designie pozostałych wpisów.
Globalnie zdefiniowane CSS przeniosłem do
[komponentu layoutu używanego przez wszystkie podstrony](https://gitlab.com/timbercode/timbercode.gitlab.io/blob/redesign/timbercode-website/layouts/default.vue)
za wyjątkiem tych nowych, surowych.

Jedyny globalny CSS, jaki pozostawiłem, to [normalize.css](https://necolas.github.io/normalize.css/).
Jest to bardzo przydatny "podstawowy" zestaw styli, który:
* normalizuje CSS tak, aby strona wyglądała identycznie niezależnie
  od użytej przeglądarki internetowej,
* poprawia błędy domyślnych styli w niektórych przeglądarkach.

*Tak przygotowany mogę ruszać do dzieła!* I to dzieła… plastycznego! 🍞😉 
