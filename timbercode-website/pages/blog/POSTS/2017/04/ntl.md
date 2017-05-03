---
permalink:   "/2017/04/09/ntl/"
title:       "ntl — jeden skrypt, by wszystkimi rządzić"
date:        2017-04-09T13:45:00+02:00
description: >
    Dziś prezentuję ntl — narzędzie, które pozwala na
    interaktywny wybór skryptu npm. 
image:       "{{IMAGES_BASE_URL}}/images/covers/ntl.png"
category:    "tools"
tags:        ["daj-sie-poznac-2017", "node", "npm", "ntl"]
---

Dziś będzie bardzo krótko 🙂

[ntl, czyli "Npm Task List"]( https://github.com/ruyadorno/ntl )
to narzędzie, które pozwala na interaktywny wybór skryptu
[npm]( https://www.npmjs.com/ )

Jak to wygląda w praktyce? Wpisujesz `ntl` i dostajesz
listę skryptów zdefiniowanych w `package.json` z możliwością
wskazania, który ma zostać uruchomiony:
![ntl - proste wywołanie]( {{IMAGES_BASE_URL}}/images/content/ntl/ntl-simple.png )

Być może jest to dla Ciebie lepszy sposób na przypomnienie sobie, jakie
skrypty są dostępne, niż przeglądanie zawartości `package.json`, gdzie
są one zdefiniowane.

Dostępne jest także kilka flag:

* `--all` uwzględnia na liście również pre- i post-skrypty, np. `prebuild`.
  Przy okazji warto, abyś zwrócił uwagę, czy któryś z Twoich skryptów nie
  może zostać błędnie sklasyfikowany. W moim przypadku `prepare` jest traktowane
  jako preskrypt dla `pare` 😉

* `--info` obok nazw skryptów wypisuje także komendy, które się pod nimi kryją.
   Szkoda tylko, że polecenia nie są wyrównanie początkiem do jednej kolumny
   (może warto zgłosić Pull Request?).

* `--multiple` pozwala wskazać kilka skryptów do uruchomienia jeden po drugim.
   W moim przykładzie zamiast `prebuild` robi to samo, co uruchomione po kolei
   `clean` oraz `prepare`.
   
![ntl - flagi]( {{IMAGES_BASE_URL}}/images/content/ntl/ntl-flags.png )
   
Jeśli nie lubisz instalowania narzędzi npm-a globalnie, możesz dodać `ntl`
jako zależność Twojego projektu oraz uruchomić go jednym ze skryptów. Którym?
Moim zdaniem najwłaściwszym będzie `start`, który jest jednym z kilku
domyślnych skryptów npm-a (obok np. `test` czy `install`), czyli można
go uruchomić nie tylko poleceniem `npm run start`, lecz także `npm start`.

![ntl jako skrypt]( {{IMAGES_BASE_URL}}/images/content/ntl/ntl-as-script.png )

Przykładowy projekt Node.js do próbowania ntl jest dostępny na
[gitlab.com/timbercode/ntl-example]( https://gitlab.com/timbercode/ntl-example )