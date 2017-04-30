---
permalink:   "/2017/04/11/dsp17-w-polowie-drogi/"
title:       "DSP'17 — W połowie drogi"
date:        2017-04-11T23:04:00+02:00
description: >
    Za mną 5 tygodni blogowania w ramach konkursu
    Daj Się Poznać 2017. Oto moje przemyślenia
    w połowie drogi.
image:       "{{IMAGES_BASE_URL}}/images/covers/dsp17-w-polowie-drogi.png"
categories:  ["timbercode"]
tags:        ["daj-sie-poznac-2017", "blog", "timbercode"]
---

W ramach konkurs
[Daj Się Poznać 2017]( http://devstyle.pl/daj-sie-poznac/ )
należy przez 10 tygodni pisać 2 posty tygodniowo: jeden o rozwijanym
projekcie, drugi dowolny, byle w ramach tematów związanych z IT.
*Tym wpisem kończę 5. tydzień, czyli… jestem w połowie drogi 🙂*
To dobry czas, abym stanął obok trasy i rozejrzał się. Spojrzał 
na to, co za mną, wyciągnął wnioski oraz skierował wzrok na 
horyzont przed sobą i oszacował na nowo swoje możliwości.

# Założenia projektowe kontra rzeczywistość

Na [konkursowej stronie profilowej]( http://uczestnicy.dajsiepoznac.pl/profil/pawel-barszcz )
napisałem:
> Przy pomocy Daj Się Poznać chcę zmierzyć się ze swoim perfekcjonizmem. 
> Dbałość o detale i estetykę to moja cecha rozpoznawcza i karta 
> przetargowa, jednak w arsenale dobrego programisty musi się też 
> znaleźć maksymalizacja efektów przy minimalizacji pracy. Mając 
> jedynie kilka godzin tygodniowo jest to jedyny sposób, abym 
> dotarł do końca konkursu :-)

Brzmi dumnie, a co! 😉 *Tylko ta "maksymalizacja efektów przy
minimalizacji pracy" coś niezbyt wchodzi w życie…* Do takiego wniosku
dochodzę widząc, że 
[już od prawie miesiąca pracuję nad migracją bloga]( /blog/2017/03/21/dsp17-nuxt-nowym-fundamentem-timbercode-pl/ )
z jekylla na Nuxt.js,
a [następnie na rozwiązanie serwerowe]( /blog/2017/03/28/dsp17-jeden-feature-ktory-zmienia-stos-technologiczny/ ).
To ostatnie też tylko brzmi banalnie, ponieważ chciałem w tym celu wykorzystać Express
(z wepchniętym do środka Nuxt.js, o ile się uda)
zdeployowane na [AWS Lambda]( https://aws.amazon.com/lambda ).
Brzmi po mojemu, czyli jak… przekombinowanie 😜

Z drugiej jednak strony… nie jest tak źle 🙂 W całej tej motaninie z łączeniem
ze sobą bibliotek i narzędzi *stopniowo odpuszczałem co ambitniejsze plany*.
Na przykład ostatnio pozbyłem się Nuxt.js, ponieważ mimo że to narzędzie
ma ułatwiać pisanie prostej strony, to jednocześnie jest to kolejny
koncept w niebotycznie rozrośniętym świecie JavaScriptu, który to
koncept trzeba zrozumieć i zmierzyć się z jego problemami. 
A problemy pojawiają się zawsze, gdy chce się zrobić coś w nietypowy sposób
(w tym przypadku chociażby Lambda jako "hosting" serwera).

Z każdą godziną kodowania przekonuję się, że *te słowa idealnie wskazują
prawidłowy sposób pracy w ekosystemie JavaScriptu:*

> first do it, then do it right, then do it better

# Być blogerem…

*Nie jest łatwo być blogerem z deadlinem*, oj nie. Z okazji konkursu taki deadline 
mam dwa razy w tygodniu. Co prawda nie wrzucam wpisów zbyt regularnie, ale wciąż
udaje mi się utrzymać rytm dwóch na tydzień (przy liczeniu tygodnia od
[pierwszego wpisu w trakcie trwania konkursu]( /blog/2017/03/08/intellij-idea-jak-uruchomic-testy-ze-wszystkich-modulow/ ),
czyli od środy). Publikując treści chciałbym stosować dwie reguły:

1. *Wpisy mają być dla Ciebie przydatne.* Podejrzewam, że niekoniecznie interesuje
   Cię jakiej biblioteki użyłem ostatnio w projekcie.
   Pewnie nie przejmujesz się też zanadto moimi rozterkami
   nad rozwojem strony. Zamiast tego chciałbyś wiedzieć, co Ci
   ta biblioteka da oraz jakie wnioski wyciągnąłem ze swoich 
   zmagań, abyś Ty mógł pójść lepszą drogą.

2. *Wpisy muszą być wysokiej jakości.* Nie chcę budować marki Timbercode w oparciu
   o słabo napisane teksty, przykłady kodu z błędami czy zasypywanie
   Cię masą treści bez wartości.
   
Niestety przy tym, w jaki sposób myślę i pracuję oraz przy bardzo ograniczonym
czasie na rozwój bloga (lub, ujmując to inaczej, przy ustawieniu bloga na niższym
priorytecie niż wiele innych spraw codziennych) obie *powyższe reguły
nie są zachowywane*. Przykład możesz znaleźć choćby w ostatnich dniach, gdy
przyszła kolej na ogólny wpis z tematyk IT. Mógłbym dopisać trzecią
(ostatnią) część serii "Lambda + Slack = health-check". Uznałem jednak, że to nie
fair kończyć cykl tekstem pisanym na szybko, byle jak, "na kolanie".
Skoro nie Lambda, to co? 🤔 Miałem już skrobnąć byle co, choćby ponarzekać
na to, że nie mam tematu (hah 🤓 ). *Na szczęście przypomniało mi się, że ostatnio
skorzystałem z narzędzia ntl*,
którego opisanie wraz z przykładem nie powinno zająć zbyt wiele czasu.
Owocem jest [poprzedni wpis]( /blog/2017/04/09/ntl/ ).
Udało mi się wybrać prosty temat, który można opisać w kilku akapitach
zamiast "po łebkach" potraktować temat trudny. Uff… 😉

Mógłbyś zapytać, *dlaczego w ogóle biorę udział w konkursie, który wymaga
ode mnie "klepania" wpisów* zamiast powolnego cyzelowania każdego tekstu
przez miesiąc. Tutaj znów nawiążę do
[opisu na moim profilu]( http://uczestnicy.dajsiepoznac.pl/profil/pawel-barszcz ):
> (…) chcę zmierzyć się ze swoim perfekcjonizmem (…)

Jestem świadomy tego, że *próbując pisać bloga dobrze, mogę go nigdy nie napisać*.
Że zmuszając się do dwóch tekstów każdego tygodnia, zyskam wprawę oraz content
(śmiesznie się pracuje z layoutem strony, gdy na liście jest tylko jeden wpis 😉 ).
Liczę, że udział w konkursie okażę się pragmatycznym (a nie idealnym)
początkiem, dzięki któremu nabiorę prędkości. Jak dotąd odnoszę wrażenie, 
że tak właśnie jest 🙂

I jeszcze jedno – *czasem moje "nie dość dobrze" to dla innych "bardzo dobrze"*. Czy
warto więc się starać uzyskać 100% jakości, gdy większość efektu
uzyskać mogę przy 80%? 😜

# Plany na kolejne 5 tygodni

Jak w takim razie widzę drugą połowę mojej konkursowej drogi?

*Daję sobie jeszcze tydzień na doprowadzenie migracji strony* do stanu, w którym
będę widział, że rezygnacja z jekylla się opłaca. Jeśli za tydzień okażę się
natomiast, że nadal błądzę we mgle… to będzie najwyższy czas, aby ostatnie 4
tygodnie poświęcić na rozwój strony jako takiej ("o mnie", strony kategorii,
nowy design itp.), nie ruszając dającego jako tako radę stosu technologicznego.
Ten deadline jest wsparty faktem, że równo za tydzień mam zaprezentować
efekt migracji bloga na AWS Lambda w ramach wewnętrznego meetupu
[w moim miejscu pracy – firmie Polidea]( https://www.polidea.com/ ).

Natomiast *w kwestii samego blogowania – nic nie zmieniam, jest OK* 🙂

Chyba że masz dla mnie rady, które zmienią te postanowienia… 😉