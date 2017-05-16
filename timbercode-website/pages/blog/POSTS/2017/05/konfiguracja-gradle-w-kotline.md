---
permalink:   "/konfiguracja-gradle-w-kotline"
title:       "Konfiguracja Gradle w… Kotlinie"
date:        2017-05-16T23:15:00+02:00
description: >
    Chciałbyś korzystać ze statycznego typowania w Gradle?
    To świetnie, ponieważ dziś opowiem Ci o wsparciu dla 
    Kotlina w Gradle! A także o jego wadach i zaletach.
image:       "{{IMAGES_BASE_URL}}/images/covers/konfiguracja-gradle-w-kotline.png"
category:    "tools"
tags:        ["daj-sie-poznac-2017", "jvm-bloggers", "gradle", "kotlin", "intellij-idea"]
---

Czy korzystasz z [Gradle](https://gradle.org/)?
A czy pisząc w nim konfigurację swojego projektu chciałbyś korzystać
z podpowiadania składni i innych dobrodziejstw języków typowanych? 
Jeśli na obydwa pytania odpowiedziałeś pozytywnie, to mam dla Ciebie 
dobrą wiadomość – *konfigurację Gradle możesz pisać w
[Kotlinie](https://kotlinlang.org/)* 😎

# gradle-script-kotlin

Wsparcie dla Kotlina w Gradle nazywa się (nie zgadniesz…)
[gradle-script-kotlin](https://github.com/gradle/gradle-script-kotlin).
Jak zajrzysz pod umieszczony w poprzednim zdaniu link, to zobaczysz,
że to repozytorium jest utrzymywane przez Gradle. To daje nadzieję,
że projekt będzie się rozwijał do stabilnej wersji 1.0 i dalej 🙂

Wiedz jednak, że korzystając z Kotlina w Gradle, nie uzyskasz dostępu
do nowych opcji konfiguracyjnych czy zupełnie innej składni.
W uproszczeniu można rzec, że *wsparcie dla Kotlina opiera się na
tych samych słowach kluczowych, funkcjach i
[DSL-ach](https://en.wikipedia.org/wiki/Domain-specific_language),
jakich używasz, pisząc w domyślnym języku, czyli w 
[Groovy](http://groovy-lang.org/)*. To, co zyskujesz, to statyczne 
typowanie oraz idące za tym lepsze wsparcie
[IntelliJ IDEA](https://www.jetbrains.com/idea).

Przykładowy kod wygląda następująco:
```kotlin
buildscript {
    extra.apply {
        set("version_of_assertj", "3.7.0")
        set("version_of_funktionale", "1.0.1")
        set("version_of_junit4", "4.12")
        set("version_of_junitparams", "1.0.5")
        set("version_of_kotlin", "1.1.2-3")
        set("version_of_kotlin_logging", "1.4.4")
    }
    repositories {
        jcenter()
    }
    dependencies {
        val version_of_kotlin: String by extra
        classpath(kotlinModule("gradle-plugin", version_of_kotlin))
    }
}

apply {
    plugin("kotlin")
}

repositories {
    jcenter()
}

dependencies {

    val version_of_assertj: String by extra
    val version_of_funktionale: String by extra
    val version_of_junit4: String by extra
    val version_of_junitparams: String by extra
    val version_of_kotlin: String by extra
    val version_of_kotlin_logging: String by extra

    compile(project(":http-client"))
    compile(project(":domain"))

    compile(group = "org.jetbrains.kotlin",
            name = "kotlin-stdlib",
            version = version_of_kotlin)
    compile(group = "io.github.microutils",
            name = "kotlin-logging",
            version = version_of_kotlin_logging)
    compile(group = "org.funktionale",
            name = "funktionale-try",
            version = version_of_funktionale)

    testCompile(group = "junit",
                name = "junit",
                version = version_of_junit4)
    testCompile(group = "org.assertj",
                name = "assertj-core",
                version = version_of_assertj)
    testCompile(group = "pl.pragmatists",
                name = "JUnitParams",
                version = version_of_junitparams)
}
```

# Zalety…

Niewątpliwie *wykorzystanie Kotlina w Gradle pozwoli Ci skorzystać
z kilku supermocy*.

* Jeśli w Twój kod wkradnie się literówka, dowiesz się o tym już w trakcie
  pisania go:
  ![Literówka wykryta przez IntelliJ]( {{IMAGES_BASE_URL}}/images/content/konfiguracja-gradle-w-kotline/unresolved-reference-error.png )
  
* Gdy szukasz pomocy, dokumentacja czeka tuż za rogiem:
  ![Dokumentacja funkcji w Gradle dostępna w IntelliJ]( {{IMAGES_BASE_URL}}/images/content/konfiguracja-gradle-w-kotline/gradle-documentation.png )
  
* Jeśli odważysz się dostać w dynamiczny sposób do nieistniejącej 
  zmiennej, dowiesz się o błędzie od razu, gdy uruchomisz build:
  ![Komunikat o korzystaniu z niezdefiniowanej zmiennej]( {{IMAGES_BASE_URL}}/images/content/konfiguracja-gradle-w-kotline/undefined-property.png )
  
# … i wady

Niestety korzystanie z Kotlina w Gradle nie jest usłane różami.

Ze względu na wszechobecne statyczne typowanie bez problemu możesz
skorzystać z podpowiadania składni. Pozostaje jednak pytanie, czy
to, co zobaczysz, jakoś szczególnie Ci pomoże? *Lista możliwych opcji 
posiada po kilka wariantów prawie każdej metody, a opisy parametrów 
raczej odstraszają*: 
![Podpowiedzi składni w IntelliJ]( {{IMAGES_BASE_URL}}/images/content/konfiguracja-gradle-w-kotline/autocompletion.png )

*Problemem jest także kolejność ewaluacji konfiguracji.* Blok `buildscript`
wykonywany jest w pierwszej kolejności, a dopiero potem reszta skryptu.
Spójrz na poniższy kod:
```kotlin
// 1. Zmienną deklaruję na początku pliku.
val version_of_kotlin = "1.1.2-3"

buildscript {
    // ...
    dependencies {
        // 2. Tu nie mogę z niej skorzystać, choć składnia jest poprawna, …
        classpath(kotlinModule("gradle-plugin", version_of_kotlin))
    }
}

// ...

dependencies {
    compile(group = "org.jetbrains.kotlin",
            name = "kotlin-stdlib",
            // 3. … a tutaj mogę.
            version = version_of_kotlin)
}
```
Powyżej próbuję w dwóch miejscach skorzystać ze zdefiniowanej na początku
pliku zmiennej `version_of_kotlin`. Według składni języka nie ma problemu,
abym skorzystał z niej zarówno wewnątrz `buildscript` jak i `dependencies`.
Niestety dopiero uruchomienie Gradle ujawnia fakt, że w momencie
wykonywania `buildscript` nie istnieje jeszcze wspomniana zmienna.

W takiej sytuacji w Groovy mógłbym zdefiniować zmienną `version_of_kotlin`
wewnątrz bloku `buildscript` i odwołać się do niej także w innych miejscach.
Ta sama koncepcja w Kotlinie wygląda następująco:
```kotlin
buildscript {
    // 1. Tym razem zmienną deklaruję wewnątrz `buildscript`.
    val version_of_kotlin = "1.1.2-3"
    // ...
    dependencies {
        // 2. Tutaj mogę z niej bez problemu skorzystać, …
        classpath(kotlinModule("gradle-plugin", version_of_kotlin))
    }
}

// ...

dependencies {
    compile(group = "org.jetbrains.kotlin",
            name = "kotlin-stdlib",
            // 3. … ale tutaj już nie, ponieważ kompilator jej nie "widzi".
            version = version_of_kotlin)
}
```
Czy będzie OK? Okazuje się, że też nie, ponieważ według kompilatora
na zewnątrz bloku `buildscript` moja zmienna nie istnieje ☹️

Jak obejść powyższy problem? Zahaczając o świat "dynamiczny", na przykład
korzystając z [extra properties](https://docs.gradle.org/current/dsl/org.gradle.api.plugins.ExtraPropertiesExtension.html)
dostępnych w Gradle:
```kotlin
buildscript {
    extra["version_of_kotlin"] = "1.1.2-3"
    // ...
    dependencies {
        classpath(kotlinModule("gradle-plugin", extra["version_of_kotlin"] as String))
    }
}

// ...

dependencies {
    compile(group = "org.jetbrains.kotlin",
            name = "kotlin-stdlib",
            version = extra["version_of_kotlin"] as String)
}
```

# Jak zacząć?

Pokazałem Ci kilka zalet i wad [gradle-script-kotlin](https://github.com/gradle/gradle-script-kotlin).
Jeśli chcesz samemu spróbować wykorzystać wsparcie dla Kotlina,
zacznij od skopiowania Gradle Wrappera dostępnego w [jednym
z przykładowych projektów](https://github.com/gradle/gradle-script-kotlin/tree/v0.8.0/samples/hello-world). 
To dlatego, że w celu skorzystania z aktualnej wersji gradle-script-kotlin 
(tag `v0.8.0`), potrzebujesz specjalnej dystrybucji Gradle. Będzie Cię 
interesować katalog `./gradle`, a także pliki `./gradlew` i `./gradlew.bat`.

Gdy już uda Ci się zbudować z sukcesem
[`hello-world`](https://github.com/gradle/gradle-script-kotlin/tree/v0.8.0/samples/hello-world),
zajrzyj do
[katalogu `samples`](https://github.com/gradle/gradle-script-kotlin/tree/v0.8.0/samples)
repozytorium – znajdziesz tam wiele przykładów! 

*Spróbuj sam, i koniecznie daj znać, co sądzisz o pisaniu konfiguracji 
Gradle w Kotlinie* 🙂
