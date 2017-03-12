---
layout:     post
title:      "IntelliJ IDEA &mdash; jak uruchomić testy ze wszystkich modułów"
description: >
    Jak uruchomić testy ze wszystkich modułów projektu Gradle z poziomu
    IntelliJ IDEA.
image:      "/images/covers/intellij-idea-jak-uruchomic-testy-ze-wszystkich-modulow.png"
categories: ["tips-and-tricks"]
tags:       ["daj-sie-poznac-2017", "jvm-bloggers", "testing", "intellij-idea", "gradle"]
---

![Obrazek wpisu "{{page.title}}"]( /images/covers/intellij-idea-jak-uruchomic-testy-ze-wszystkich-modulow.png )

Jeśli jesteś zwolennikiem pisania testów, to być może zdarzyła Ci się taka chęć:
chciałbym uruchomić *wszystkie* testy zdefiniowane w projekcie. Czy wiesz jak to zrobić
w IntelliJ IDEA, jeśli projekt posiada więcej niż 1 moduł? Ja dowiedziałem się niedawno
i żałuję, że dopiero teraz 🙂

# Założenia

Przyjmuję następujące założenia dotyczące projektu i sposobu pracy:

* projekt posiada wiele modułów &ndash; są to na przykład podprojekty Gradle,
* więcej niż jeden z tych modułów posiada testy, które da się łatwo uruchomić
  w IntelliJ IDE
* uruchomienie testów w IntelliJ IDEA oznacza integrację IDE z testami, np. możliwość
  przejścia od informacji o niespełnionym teście bezpośrednio do kodu tego testu,
  a nie jedynie podgląd logu wywołania `./gradlew test` .
  
Przykładowa struktura takiego projektu:
```
.
├── build/
├── build.gradle
├── domain/
│   ├── build/
│   ├── build.gradle
│   └── src/
│       ├── main/
│       └── test/
├── http-api/
│   ├── build/
│   ├── build.gradle
│   └── src/
│       ├── main/
│       └── test/
├── integration-tests/
│   ├── build/
│   ├── build.gradle
│   └── src/
│       ├── main/
│       └── test/
├── persistence/
│   ├── build/
│   ├── build.gradle
│   └── src/
│       ├── main/
│       └── test/
└── runner/
    ├── build/
    ├── build.gradle
    └── src/
        ├── main/
        └── test/
```
  
# Rozwiązanie

Po sesji googlania i eksperymentowania z IDE dotarłem do następującego rozwiązania:

1. Utwórz konfiguracje testowe poszczególnych modułów, np. `All in persistence_test`
   (taką nazwę generuje moje IDE dla testów modułu `persistence`)
   czy `All in integration-tests_test`
1. Wejdź do `Run | Edit Configurations...` i zapisz te z konfiguracji,
   które nie są jeszcze zapisane. Niezapisane konfiguracje rozpoznasz po tym, że ich
   ikony są przyszarzone.
1. Wejdź w edycję tej konfiguracji, która ma być ostatnią z wielu. Na przykład
   chcesz, aby testy modułu `integration-tests` były uruchomione na samym końcu.
1. W sekcji `Before launch` dodaj kroki, które mają wykonać się przed uruchomieniem
   aktualnie edytowanej konfiguracji. Są to kroki typu `Add Another Configuration`.
   W ten sposób możesz dodać po kolei wszystkie konfiguracje z testami z innych modułów.
   Istotne, abyś nie dodał testów modułu, którego konfigurację właśnie edytujesz &ndash;
   raczej nie chcesz czekać na ich wykonanie dwa razy dłużej 😉
1. Przypilnuj, aby dopiero co dodane kroki występowały *po* kroku `Build`, a nie przed
   nim.
1. Zmień nazwę edytowanej konfiguracji na taką, która lepiej odzwierciedli jej nowe
   znaczenie, np. `ALL TESTS`.

Uruchomienie tak przygotowana konfiguracji zaowocuje uruchomieniem jedna po drugiej
konfiguracji zdefiniowanych w sekcji `Before launch`, a po nich &ndash; tej ostatniej.

W przypadku mojego projektu lista konfiguracji wygląda tak:

![Konfiguracje testowe wraz z konfiguracją zbiorczą "{{page.title}}"]( /images/content/intellij-idea-jak-uruchomic-testy-ze-wszystkich-modulow/all-tests-edit.png ){: .post__image }

Konfiguracja `ALL TESTS` to de facto testy modułu
`integration-tests` poprzedzone uruchomieniem innych konfiguracji: 

![Szczegóły konfiguracji zbiorczej "{{page.title}}"]( /images/content/intellij-idea-jak-uruchomic-testy-ze-wszystkich-modulow/all-tests-before-launch.png ){: .post__image }

Uruchomienie jej skutkuje wykonaniem sekwencji:

* `All in domain_test`
* `All in persistence_test`
* `All in http-api_test`
* `All in runner_test`
* `ALL TESTS`

![Uruchomiona sekwencja konfiguracji "{{page.title}}"]( /images/content/intellij-idea-jak-uruchomic-testy-ze-wszystkich-modulow/all-tests-sequence.png ){: .post__image }

# Podsumowanie

Rozwiązanie, które przedstawiłem, nie jest bez wad. Głównym problemem jest,
moim zdaniem, konieczność "wyklikania" zbiorczej konfiguracji, a potem utrzymywania
wraz z dodawaniem, usuwaniem i edytowaniem modułów projektu.
Nie zmienia to jednak faktu, że taka zbiorcza konfiguracja testowa może się
czasem przydać.

Czy przyda się Tobie? Ja tego nie wiem, ale Ty być może chcesz podzielić
się przemyśleniami w komentarzu do tego wpisu 🙂 A może znasz lepsze
rozwiązanie, które mi się przyda? 😉