---
layout:     post
title:      "DSP'17 &mdash; zmagania z designem na kartce papieru"
description: >
    Dodawanie designu do gotowej apki czy strony to prosta droga do porażki.
    Ogólny zarys jest konieczny już od samego początku. A skoro w ramach Daj Się Poznać
    2017 chcę zdefiniować na nowo timbercode.pl, to i ja powinienem coś zaprojektować.
    Z wątpliwym skutkiem 😉
image:      "/images/covers/dsp17-zmagania-z-designem.png"
categories: ["timbercode"]
tags:       ["daj-sie-poznac-2017", "pen-and-paper", "design"]
---

![Obrazek wpisu "{{page.title}}"]( /images/covers/dsp17-zmagania-z-designem.png )

Dodawanie designu do gotowej apki czy strony to prosta droga do porażki.
Tak słyszałem. Widziałem też projekty, w których jakikolwiek UX/design nie mógł
zagościć ze względu na podjęte dawno temu decyzje, zabetonowane w kodzie po wsze
czasy. *Ogólny zarys wyglądu i działania strony jest konieczny już od samego początku.*
A skoro w ramach [Daj Się Poznać 2017]( http://devstyle.pl/daj-sie-poznac/ ){:target="blank"}
chcę zdefiniować na nowo
[timbercode.pl]( http://timbercode.pl ){:target="blank"}, to i ja powinienem
coś zaprojektować.

# Aktualny design

Na aktualny design nie narzekam jakoś szczególnie. Jest to dostępny na licencji MIT
motyw [Hagura]( https://github.com/sharu725/hagura ){:target="blank"}
przygotowany przez [WebJeda]( https://blog.webjeda.com/ ){:target="blank"}.
Po kilku modyfikacjach na mojej stronie wygląda on tak:

![Aktualny design - strona główna]( /images/content/dsp17-zmagania-z-designem/current_design_home.png ){: .post__image }

![Aktualny design - wpis na blogu]( /images/content/dsp17-zmagania-z-designem/current_design_post.png ){: .post__image }

Na szybki start jest on dokładnie w sam raz: posiada czytelny layout bez niepotrzebnego
szumu, nie atakuje feerią barw, oraz, co istotne, wygląda równie dobrze na ekranach
urządzeń mobilnych.

Chciałbym jednak zredefiniować stronę zgodnie z moim sposobem myślenia, przy okazji
biorąc pod uwagę nowe potrzeby, takie jak podstrony kategorii czy linki do mediów
społecznościowych.

# Przygotowanie
 
Podobno *najlepiej zacząć od czystej kartki papieru*. Podobno tak jest taniej,
niż od razu zaprzęgać do pracy ciężkie (lub lżejsze, bo w chmurze&hellip; 🍞 )
oprogramowanie. Tak też zrobiłem! A do tej kartki coś do rysowania:

* dopiero co kupione w tym celu dwa *markery
  [Winsor & Newton ProMarker]( http://www.winsornewton.com/row/shop/graphic-markers/promarker ){:target="blank"}
  w kolorach XB Black oraz R866 Orange* (miał być O547 Honeycomb, ale dopiero teraz
  przy okazji pisania tego wpisu zorientowałem się, że zbyt mocny odcień pomarańczu
  wynika z pomyłki sprzedawcy 🙁 )
* zawsze wierne i niezawodne *cienkopisy
  [Stabilo point 88]( https://www.stabilo.com/uk/product/1560/writing/stabilo-point-88 ){:target="blank"}*

Kolor Honeycomb (tzn. Orange, wrrr) ma być drugim (po czerni) kolorem na stronie.
Ni to brązowy ni to pomarańczowy: coś pomiędzy drewnem z nazwy firmy a moją żywą
naturą. Kolor zielony mnie odpychał, niebieski wydawał się zbyt oklepany, odcienie
różu są zbyt modne, a fiolet... nie, zbyt wzniośle i profesjonalnie (w patetycznym
tego słowa znaczeniu).

Tak zaopatrzony przystąpiłem do rysowania! 🎨

# Podejście pierwsze

Poniżej widzisz efekt mojej pierwszej próby:

![Pierwsza wersja projektu strony]( /images/content/dsp17-zmagania-z-designem/concept1.jpeg ){: .post__image }

Jak dotąd na timbercode.pl nie uświadczysz nic innego niż moje wpisy. Skąd zaś masz
dowiedzieć się, jak nazywa się autor lub kim ja w ogóle jestem? Dlatego *dodałem
nawigację pomiędzy blogiem ("blog") i stroną o mnie ("firma")*. Ułożyłem je poziomo
poniżej logotypu firmy. Już tutaj pojawił się problem: jeśli będą tylko dwie takie podstrony,
to oba linki będą bardzo rozstrzelone w poziomie.

*Wpisy ułożyłem "klasycznie", jeden po drugim*, jednakże nie zdecydowałem się na
umieszczanie zajawki: wystarczy cover photo i tytuł. Ale co jest pierwsze, zdjęcie czy
tytuł? Na tym rysunku nie widać wyraźnie tego, który obrazek jest do pary do którego 
tekstu.

Pomarańczowe podkreślenie jednego z tytułów wpisów to przykład wyróżnienia go
po najechaniu na niego myszą (stan `hover` w CSS). 

A co to ta linia po prawej? To *oś czasu wraz z datami wpisów*. Coś podobnego już
gdzieś widziałem i chciałem spróbować, jak by to wyglądało u mnie.

Efekt: na rysunku jest tłok, a ja nie jestem ani trochę przekonany&hellip;

# Podejście drugie

Oto druga próba. Jest poprawa:

![Druga wersja projektu strony]( /images/content/dsp17-zmagania-z-designem/concept2.jpeg ){: .post__image }

*Zrezygnowałem z dużego logotypu.* Dzięki temu nawigacja pomiędzy dwiema stronami mieści się
w tej samej poziomej przestrzeni. A logotyp w dużym rozmiarze może się jeszcze kiedyś
pojawi; np. gdy na landing page zamieszczę stronę "dla biznesu" z chwytliwymi hasłami
i przekonującymi obrazkami 😉 

Chciałem rozwiązać problem łączenia obrazków z tytułami wpisów, dlatego *wprowadziłem
poziomie separatory*: najpierw szare kreski pomiędzy wpisami, ale potem też
linię z cieniem pod nagłówkiem strony. Bez tego nagłówek zlał by się w jeden element 
z pierwszym wpisem. Niestety nie podoba mi się to, jak bardzo wpisy wyglądają na&hellip;
kafle czy też paski. Wydaje mi się, że to z powodu szerokości separatorów &ndash; zajmują
całą szerokość strony.

*Przeniosłem oś czasu na lewą stronę* i wyrównałem jej treść do prawej. Chciałem w ten
sposób uzyskać wizualny pion z przyklejonymi z lewej strony datami a z prawej wpisami.
Nawet jeśli poprawiło to ogólną estetykę osi, to nie usunęło innego problemu, które
dostrzegłem: duże numery dni miesiąca mogą wywoływać zdziwienie, jeśli nazwa miesiąca
jest gdzieś tam powyżej i mniejszym fontem. Skąd wiedzieć, że to w ogóle data, a nie,
przykładowo, liczba polubień? 😜

Jeszcze jeden szczegół: "firma" zmieniła się we "whoami". Mniej powagi, więcej geeka 🤓 

# Podejście trzecie

Trzecia próba to powiew zmian:

![Trzecia wersja projektu strony]( /images/content/dsp17-zmagania-z-designem/concept3.jpeg ){: .post__image }

Kategorie! Przecież będę ich potrzebował: chcę dać możliwość oddzielenia wpisów 
z poradami od, dajmy na to, wpisów o tym, że testowanie jest dobre
([TDD]( https://en.wikipedia.org/wiki/Test-driven_development ){:target="blank"} rządzi!).
*Linki do podstron z kategoriami umieściłem pod nagłówkiem.*
O ile dla podstron "blog" i "o autorze" (coś to "whoami" mi nie leżało&hellip;)
osobny wiersz był zbyt obszerny, to dla kategorii może w nim nawet brakować miejsca.

Wraz z kategoriami przyszło mi do głowy, aby widoczne były też tagi, które definiuję
dla każdego wpisu (ale nie ma jak się do nich dostać). *Tagi umieściłem jeden obok
drugiego pod każdym wpisem, w kolorze i poprzedzone znakiem `#`.* Mam nadzieję, że to
wystarczająco pokazuje, że:

* tagi są klikalne &ndash; kliknięcie w tag ma otworzyć stronę z tagami danego wpisu,
* tagi są&hellip; tagami 😉

Skoro kliknięcie w tag pozwala przefiltrować wpisy, to może warto wprowadzić ogólny
mechanizm filtrowania? *Wyszukiwarka znalazła swoje miejsce w osobnej kolumnie
na prawym brzegu strony.* Pod nią także *przyciski social media*. Warto zauważyć,
że przy okazji tych przycisków przemyciłem *link do formularza kontaktowego* (o ile
taki utworzę). To zbyt nieistotny "temat", aby zasługiwał na osobne miejsce
w głównej nawigacji, a w sam raz, aby przedstawić go za pomocą ikony poczty obok
[Twittera]( https://twitter.com/timbercodepl ){:target="blank"} czy
[Facebooka]( https://www.facebook.com/timbercode ){:target="blank"}.
 
W drugim rysunku irytowały mnie zbyt szerokie separatory. Dlatego tym razem
*separatory są delikatnymi kreskami zajmującymi tylko część szerokości kolumny
z wpisami*. Jednocześnie *usunąłem cień spod nagłówka*, wystarczy kreska.
Czemu akurat w tym miejscu miałby pojawić się cień, skoro nie ma nigdzie indziej
żadnych cieni?

Czy widzisz oś czasu? Dokładnie! *Zrezygnowałem z osi czasu na rzecz typowych
dat pisanych w osobnej linii przy wpisie* (tak jak tytuł czy tagi). Tutaj
konkretnie ponad cover photo.

Jedna rzecz w tym projekcie nie daje mi spokoju &ndash; *nadmiar pustej przestrzeni
po prawej stronie*. Jest wyszukiwanie, są ikony social media&hellip; i tyle, dalej
pustka. Czym ją zapełnić?

# Podejście czwarte

Czwarta próba okazała się ostatnią. Choć na pewno nie jest ona ostatecznym designem!
Oto i ona:

![Czwarta wersja projektu strony]( /images/content/dsp17-zmagania-z-designem/concept4.jpeg ){: .post__image }

Zacznę od zmian kosmetycznych: *tagi przybrały formę "chmurek", a daty powędrowały
pod tytuł wpisu*.

*Na dole strony dodałem nawigację pomiędzy kolejnymi stronami wpisów.* Przedtem nie
zastanawiałem się nad tym, gdzie umieścić nadmiar wpisów. Niestety im
dłużej patrzę na ten samotny wiersz z linkami "nowsze" i "starsze", tym bardziej
jestem przekonany, że to słaby pomysł. Może lepiej zastosować rozwiązanie, w którym
wpisy doładowują się wraz z przewijaniem strony do dołu (tzw. "infinity scroll")?

## Kategorie a wyszukiwanie
 
Najważniejszą zmianą (choć może tego nie widać) jest *przeniesienie kategorii z wiersza
pod nagłówkiem do kolumny z wyszukiwaniem*. Tu nie chodzi jedynie o wygląd strony, tu 
chodzi o spójność logiczną. Moim zamiarem jest, aby wszystkie trzy sposoby na filtrowanie
wpisów działały w podobny sposób:
* wyszukiwanie,
* wybór taga,
* wybór kategorii.

To oznacza, że kategorie nie mogą być nadrzędnym wyborem nawigacji, w ramach którego
będziesz szukał odpowiedniego wpisu. Wolę, abyś albo wyszukiwał albo wybrał "zdefiniowane
wyszukiwanie", jakim jest kategoria.

Jest to zawiłe? Spróbuję wyjaśnić na przykładzie 🙂

Załóżmy, że szukasz
[wpisu o uruchamianiu testów ze wszystkich modułów w IntelliJ IDEA]( /blog/2017/03/08/intellij-idea-jak-uruchomic-testy-ze-wszystkich-modulow/ ){:target="blank"},
który zamieściłem kiedyś w kategorii "Tips&Tricks" (ale o tym nie pamiętasz).
Wpisujesz więc `intellij` w wyszukiwarkę. Jednak wpisu nie widać na liście. Czemu?
Ponieważ przedtem wszedłeś w kategorię "Biblioteki", a w niej nie ma takiego wpisu.
To jest przykład kategorii będących nadrzędnymi w stosunku do wyszukiwania.
Natomiast co, jeśli kategorie byłyby na tym samym "poziomie" nawigacji co wyszukiwanie?
Spróbujmy raz jeszcze: wpisujesz `intellij`, a wśród wyników widać szukany przez
Ciebie wpis. Jednocześnie znika podświetlenie kategorii "Biblioteki", a podświetloną
staje się wyszukiwarka 🤓

Niestety&hellip; takie umieszczenie kategorii co prawda zmniejsza ilość białej pustki
w prawej kolumnie, ale nie usuwa jej wystarczająco.

# Co dalej?

Przede wszystkim *te cztery próby pokazały mi, jak trudną pracą jest projektowanie!*
Designerzy, UX-owcy, chylę czoła!

*W trackie pracy nad projektem strony zadałem sobie wiele pytań.* Część z nich spróbowałem
zaadresować, jednak wiele z nich zostało bez odpowiedzi. Nie mam żadnego pomysłu
na responsywność strony (jak będzie wyglądała zależnie od wymiarów ekranu i dostępności
myszy). Nie wiem, czy i gdzie umieścić stopkę: przyklejoną do dołu okna czy poniżej 
nieskończenie ładujących się wpisów (ups, bez sensu). Nie są też zdefiniowane
przejścia pomiędzy stronami czy animacje interaktywnych elementów.

Co ciekawe, *kolejne wersje projektu są coraz bardziej podobne do typowych motywów
blogowych*. Czyżby typowy klasyczny design miał sens? 😉

Wciąż nie jestem przekonany do uzyskanego rezultatu, ale wydaje mi się, że wystarczy
prób na papierze. Czuję już z grubsza, jakie problemy będę miał do rozwiązania,
zaś część moich wątpliwości uda mi się rozwiązać dopiero podczas pracy 
z HTML i CSS na statycznej treści.

Mam nadzieję, że już za kilka tygodni zobaczycie nowe
[timbercode.pl]( http://timbercode.pl ){:target="blank"} 🙂
