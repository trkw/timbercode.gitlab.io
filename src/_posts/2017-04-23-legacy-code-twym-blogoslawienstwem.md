---
layout:      post
title:       "Legacy code Twym błogosławieństwem"
date:        2017-04-23T15:15:00+02:00
description: >
    Kto by chciał pracować z legacy code, gdy obok są projekty
    nowe i ciekawe? Jednak warto wiedzieć, że rozwijanie 
    takiego odziedziczonego kodu może wiele nauczyć.
    Przedstawiam dwa przykłady, jak wiele zyskałem
    dzięki pracy z legacy code.
image:      "/images/covers/legacy-code-twym-blogoslawienstwem.png"
categories: ["soft"]
tags:       ["daj-sie-poznac-2017", "jvm-bloggers", "legacy-code", "self-development"]
---

![Obrazek wpisu "{{page.title}}"]( /images/covers/legacy-code-twym-blogoslawienstwem.png )

*Kto by chciał pracować z legacy code?* Po obejrzeniu kilku prezentacji
na konferencjach można by uznać, że kod odziedziczony to zło koniecznie,
które trzeba utrzymywać, bo niestety, ale… odniosło sukces
biznesowy i jest nadal potrzebne 😉

Ja jednak uważam, że *warto choć raz w życiu spędzić wiele czasu
w projekcie legacy*. Postaram się na dwóch przykładach pokazać, dlaczego.

> Warto, abym wyjaśnił, czym jest "legacy code" w kontekście
tego wpisu. Chodzi mi na przykład o projekt, który był już rozwijany
dobre kilka lat, prawdopodobnie nie przez Ciebie. Zaglądasz do kodu
i widzisz, że "tak już się teraz nie pisze", a Ty niestety masz dopisać
nowy feature albo zmodyfikować jedno z wymagań biznesowych.
Niekoniecznie jest to kod pełen błędów, "sypiący się", czy źle
zaprojektowany. Znam osoby, które uważają wręcz, że Twój własny kod
po niespełna miesiącu zasługuje na miano "legacy code".

# Przykład 1: aplikacja rozwijana od 5 lat

Kilka lat temu trafiłem do projektu, który miał już ponad 5 lat na karku.
Przetrwał wiele wersji i drobnych przemian, ale główne cele biznesowe
pozostawały te same. Ponadto te same pozostawały technologie
wykorzystane pod spodem: Java 6, Spring 3 oraz… 
[Swing]( https://en.wikipedia.org/wiki/Swing_(Java) ){:target="blank"}.
*Nie spotkałem wtedy osoby, która słysząc o Swingu odparłaby "Jak super,
że macie GUI na Swingu, a nie w postaci front-endu webowego!".* 😉

Czy było więc coś, co kompensowało trud pisania kodu w niezbyt atrakcyjnej
i niezbyt wygodnej technologii? Jak najbardziej! Otóż to jedyny projekt,
w którym *miałem okazję uczyć się pokory w programowaniu*. Gdy już nabyłem wprawy,
każdego tygodnia trafiałem na kawałek kodu, z którego można by się pośmiać.
Wytknąć palcem to, w jaki sposób autor zaprojektował daną klasę czy to, o jakim
przypadku brzegowym zapomniał. Jednak *im głębiej sięgałem po te starsze
fragmenty kodu, tym bardziej widziałem, że są one dobrze przemyślane*. Większość tego,
co znalazłem, miało sens w kontekście, w którym powstawało.
I nie jest winą autora to, że kontekst zmienia się z miesiąca
na miesiąc – takie jest życie i nie jesteś w stanie napisać kodu
"odpornego" na przyszłość 🤓

*Po pewnym czasie nawet więcej pokory uzyskiwałem, gdy… trafiałem na swój własny kod
sprzed roku!* Tylko czas pozwolił zweryfikować czy coś, co uważałem
kiedyś za świetny refactoring, opłaciło się, czy nie rzuciło
nowych kłód pod nogi. W takiej sytuacji jeszcze lepiej widziałem,
że *nie ma sensu czepianie się programisty o kod, który napisał dawno temu.
To, co jest istotne, to co zrobi on z tym kodem teraz.*

Nie ma też co ukrywać: dzięki pracy z rozwijanym przez lata kodem
pisanym przez starszych, bardziej doświadczonych kolegów, *zobaczyłem
niejeden wzorzec projektowy w praktyce*. Natknąłem się zarówno na  ciekawy
przykład [prototypu]( https://en.wikipedia.org/wiki/Prototype_pattern ){:target="blank"},
jak i na [fabryki]( https://en.wikipedia.org/wiki/Factory_(object-oriented_programming) ){:target="blank"}
fabryk, tworzących fabryki… 🏭

# Przykład 2: aplikacja napisana 5 lat temu w obcej technologii

5 lat temu jeden z moich znajomych popełnił kawałek oprogramowania
na zamówienie. Aplikacja wygląda estetycznie i realizuje 
to, czego od niej oczekiwano. Praca nad kodem została zamknięta,
a temat zapomniany. Do czasu, gdy kilka miesięcy temu
zostałem poproszony o wprowadzenie kilku "drobnych" zmian i dostosowanie
programu do nowszych wymagań 🙂 *Problem był chyba tylko jeden: stos technologiczny.*
Aplikacja jest napisana w C++, którego ostatnio dotykałem na studiach,
jej GUI oparte jest na starej wersji Qt, a użytkownik potrzebuje,
aby binarka działała na jego Windowsie, podczas gdy ja posiadam MacBooka 😀

Czy i tym razem praca z legacy code dała mi coś wartościowego? Oczywiście!
*Pracując z tym kodem uczyłem się, jak w możliwie krótkim czasie dostarczyć to,
czego naprawdę potrzebuje użytkownik.* Mam niewiele czasu w tygodniu na takie
dodatkowe zlecenia, zaś ten konkretnie projekt potrafił pochłaniać ogromne jego
ilości: a to trzeba skonfigurować na macOS development programu napisanego
pod kątem Windowsa, a to wygrzebać stary laptop z Windowsem, aby co jakiś czas
sprawdzić na nim efekt końcowy, a to zrozumieć, jak w C++ parsuje się 
dane z plików tekstowych, a to dopytać o to, co oznacza kolejny 
termin specyficzny dla bardzo wyspecjalizowanej domeny projektu.
*Już po krótkim czasie przekonałem się, że muszę powstrzymać swoje
ręce przed każdym zbędnym refactoringiem i zahamować wyobraźnię,
która chciała dodawać do programu kolejne "na pewno" bardzo przydatne,
"drobne" ulepszenia* 😉

# Twoje przykłady

Przedstawiłem Ci dwa przykłady z mojego życia, które przekonały mnie,
że dobrze jest mieć czas jakiś legacy code do rozwijania.

A może chcesz podzielić się jakimś doświadczeniem ze swojej kariery?
Zachęcam do komentowania! 🙂 

