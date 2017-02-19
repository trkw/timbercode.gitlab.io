---
layout:     post
title:      "Dwie sztuczki w .gitignore"
description: >
    Dwie sztuczki w .gitignore, które stosuję w każdym projekcie.
image:      "/images/covers/gitignore-2-sztuczki.png"
categories: ["tricks"]
tags:       ["git", "intellij", "gradle", "java"]
---

![Obrazek wpisu "{{page.title}}"]( /images/covers/gitignore-2-sztuczki.png )

Dzisiaj przedstawię Ci dwie sztuczki w `.gitignore`, które stosuję
w praktycznie każdym projekcie: ścieżki absolutne
oraz [whitelista]( https://en.wikipedia.org/wiki/Whitelist ).

Czym jest `.gitignore` tłumaczył nie będę,
bo albo korzystasz z [Gita]( https://git-scm.com/ ) i doskonale wiesz,
do czego służy ten plik albo nie korzystasz i poniższa wiedza do
niczego Ci się nie przyda 🙂
  
# Sztuczka nr 1: ścieżki absolutne

Piszesz projekt skonfigurowany na [Gradle]( https://gradle.org/ ).
To narzędzie "wypluwa" zbudowaną apkę do katalogu `build`, toteż 
na 99% w swoim `.gitignore` masz fragment podobny do tego:
```
# Gradle build directory
build/
```
Brakuje tam jednego istotnego szczegółu... znaku `/`
na początku linijki. Wraz z nim plik wyglądałby tak:
```
# Gradle build directory
/build/
```

Czemu to istotne? Ponieważ bez niego zignorowany będzie *każdy* katalog
`build`, nieważne czy znajduje się on w głównym katalogu projektu
czy gdzieś głębiej w drzewie. Nadal nie brzmi to przekonująco?
Już biegnę z przykładem&hellip;

## Przykład z życia

W domenie jednego z projektów, który współtworzyłem, istnieje pojęcie `Build`.
Jak może nazywać się pakiet Java z klasami dotyczącymi tej części domeny?
Ano na przykład `com.superfirma.fajnyprojekt.domain.build`&hellip; Już wiesz
do czego zmierzam? Otóż taki pakiet odpowiada w drzewie katalogów ścieżce
`src/main/java/com/superfirma/fajnyprojekt/domain/build/`. Dopiero po
jakimś czasie, gdy zajrzałem do statusu naszego
[Continuous Integration]( https://en.wikipedia.org/wiki/Continuous_integration)
zorientowałem się, że brakuje wszystkich plików, które dodałem
we wspomnianym katalogu. Wszak `.gitignore` miał wyraźnie napisane,
aby takie katalogi ignorować 😉

## A co, jeśli&hellip;

A co, jeśli mój projekt ma zdefiniowanych wiele podprojektów Gradle?
Czyli gdy jego struktura wygląda mniej więcej tak:
```
.
├── .gitignore
├── build
├── build.gradle
├── domain
│   ├── build
│   ├── build.gradle
│   └── src
├── http-api
│   ├── build
│   ├── build.gradle
│   └── src
├── integration-tests
│   ├── build
│   ├── build.gradle
│   └── src
├── persistence
│   ├── build
│   ├── build.gradle
│   └── src
└── runner
    ├── build
    ├── build.gradle
    └── src
```

Cóż, nie pozostaje nic innego, jak utworzyć osobne pliki `.gitignore`
w każdym z podprojektów, każdy z osobnym wpisem `/build/`:
```
.
├── .gitignore
├── build
├── build.gradle
├── domain
│   ├── .gitignore
│   ├── build
│   ├── build.gradle
│   └── src
├── http-api
│   ├── .gitignore
│   ├── build
│   ├── build.gradle
│   └── src
├── integration-tests
│   ├── .gitignore
│   ├── build
│   ├── build.gradle
│   └── src
├── persistence
│   ├── .gitignore
│   ├── build
│   ├── build.gradle
│   └── src
└── runner
    ├── .gitignore
    ├── build
    ├── build.gradle
    └── src
```

# Sztuczka nr 2: whitelista

`.gitignore` to zazwyczaj typowa [blacklista]( https://en.wikipedia.org/wiki/Blacklisting ):
mówimy, co ma zostać pominięte przez Gita. Jednak czasami (bardzo rzadko,
ale jednak) wolelibyśmy powiedzieć, co *nie* ma być zignorowane, czyli
interesuje nas zdefiniowanie [whitelisty]( https://en.wikipedia.org/wiki/Whitelist ).

Jak utworzyć taką w `.gitignore`? Poprzez zignorowanie wszystkiego, co
znajduje się w danym katalogu za pomocą znaku `*`, a następnie utworzeniu
wyjątków na poszczególne ścieżki, prefiksując je znakiem `!`. Jak wygląda
to w praktyce? Na przykład tak:
```
/jakis/katalog/*
!/jakis/katalog/ten_plik_nie_ma_byc_ignorowany.txt
```

## Przykład z życia

Większość projektów piszę w IDE [IntelliJ IDEA]( https://www.jetbrains.com/idea/ ).
W trakcie pracy z kodem modyfikuję niektóre ustawienia dotyczące spójnego 
stylu kodowania czy też włączam lub wyłączam poszczególne inspekcje
statycznej analizy kodu. Zależy mi na tym, abym dokładnie te same 
ustawienia miał na każdym komputerze. Chciałbym też, aby inne osoby, 
które pracują z tym samym kodem, miały domyślnie włączone w IDE nasze
wspólnie wypracowane ustawienia.

Najlepszym sposobem na osiągnięcie tego celu, jaki znam, jest dodanie
odpowiednich plików konfiguracyjnych do repozytorium. Zazwyczaj
programiści ignorują wszystkie pliki konfiguracyjne IDE, jako że większosć
z nich jest bardzo związana z konkretnym komputerem lub dotyczy
osobistych preferencji osoby. Dodają więc do swojego `.gitignore` fragment
podobny do tego:
```
# IntelliJ configuration
/.idea/
*.iml
```

Jednak jeśli zależy nam na synchronizowaniu w zespole konfiguracji IDE,
możemy skonfigurować `.gitignore` w taki sposób:
```
# IntelliJ configuration
/.idea/*
!/.idea/codeStyleSettings.xml
!/.idea/inspectionProfiles/
*.iml
```

# Co dalej?

A czy Ty masz jakieś swoje ulubione sztuczki lub dobre praktyki dotyczące
`.gitignore`? Jeśli tak, podziel się nimi w komentarzu 🙂