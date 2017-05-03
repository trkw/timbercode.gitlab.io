---
permalink:   "/2017/04/18/dsp17-status-migracji-na-aws-lambda/"
title:       "DSP'17 — Status migracji na AWS Lambda"
date:        2017-04-18T23:59:00+02:00
description: >
    Jak postępują prace nad migracją timbercode.pl
    na AWS Lambda? Wymieniam, co udało mi się osiągnąć
    w ramach Proof of Concept, a co jeszcze czeka na
    zaimplementowanie.
image:       "{{IMAGES_BASE_URL}}/images/covers/dsp17-status-migracji-na-aws-lambda.png"
category:    "timbercode"
tags:        ["daj-sie-poznac-2017", "blog", "timbercode", "node.js", "express", "nuxt", "aws", "lambda", "claudia.js"]
---

W [poprzednim wpisie na temat rozwoju timbercode.pl]( /blog/2017/04/11/dsp17-w-polowie-drogi/ )
pisałem o tym, że *nie idzie mi zbyt dobrze migracja ze statycznej strony
generowanej jekyllem na stronę serwowaną z AWS Lambda*. Że błądzę,
wracam się, zmieniam decyzje, a co ma działać, nie chce działać.
Zdecydowałem też, że dam sobie jeszcze tydzień, zanim porzucę całkowicie
temat migracji.

Nie minęły dwa dni, a nagle wszystko zaczęło układać się
w spójny obraz. *Proof of Concept zmigrowanego bloga
działa i ma już zaimplementowaną większość potrzebnych 
funkcjonalności.* Doświadczenie i wiedza, które zdobyłem na nieudanych
próbach, zaowocowały konkretnymi efektami.

Warto, abyś wiedział,
że poszło mi tak dobrze między innymi dlatego, że *porzuciłem wszelkie
dobre praktyki programistyczne*. Przestałem dbać o atomowość
commitów, zrezygnowałem ze starania się o wygodną w użyciu strukturę katalogową,
powtarzałem kod o takim samym znaczeniu w kilku miejscach.
Dopiero teraz, gdy biblioteki zaczęły ze sobą współpracować, 
a strona uruchomiona lokalnie działa praktycznie tak samo jak
po wrzuceniu na AWS Lambda, będzie czas na czyszczenie
i "układanie" kodu.

# Zaadresowane problemy

Chciałbym Ci skrótowo wymienić co ciekawsze problemy,
które udało mi się rozwiązać w ramach Proof of Concept:

1. *Serwowanie favicony*

    Już tutaj zaczęły się schody. Okazało się, że nie mam pojęcia, jak
    [w mojej wymarzonej konfiguracji projektu]( https://claudiajs.com/tutorials/serverless-express.html )
    serwować grafikę z AWS Lambda. Z pomocą przyszedł mi sam twórca 
    [claudia.js]( https://claudiajs.com/ ), Gojko Adzic,
    który polecił, aby faviconę umieścić na 
    [S3]( https://console.aws.amazon.com/s3 )
    i wystawić na świat za pomocą
    [CloudFront]( https://console.aws.amazon.com/cloudfront ),
    czyli CDN w ramach AWS.
    
1. *Serwowanie obrazków*

    Wyświetlanie obrazków we wpisach to analogiczny problem jak dla favicony, aczkolwiek w tym przypadku
    mógłbym wykorzystać [file-loader z Webpacka]( https://github.com/webpack-contrib/file-loader ),
    aby zagnieździć grafikę wewnątrz paczek JavaSript. Ale czy chcę
    "rozpychać" skrypty niemałymi plikami binarnych. Co więcej, AWS Lambda 
    nie pozwala na wgranie "funkcji" o rozmiarze przekraczającym 50 MB.
    Tutaj też CDN wydał się
    najwłaściwszym rozwiązaniem. Istotne było jednak, aby podczas developmentu
    obrazki były czytane z dysku w celu łatwego ich dodawania i podmieniania.

1. *Nuxt jako część aplikacji Express.js*

    Co prawda istnieje [przykład połączenia Nuxt z Express.js]( https://github.com/nuxt/express ),
    nie oznacza to jednak, że wykonanie tego samego na produkcji jest trywialne.
    Tym bardziej, jeśli hostingiem jest AWS Lambda schowana za API Gateway
    z adresem, który zawiera ścieżkę (np.
    [https://adres.twojej.lambdy/production]( https://adres.twojej.lambdy/production )
    ).
    
1. *Transformacja wpisów w Markdown na komponenty i routingi Nuxta*

    Nuxt generuje routing na podstawie drzewa katalogów: skanuje je i dla każdego znalezionego
    [Single File Component]( https://vuejs.org/v2/guide/single-file-components.html )
    tworzy routing do strony o takiej samej ścieżce.
    Ja natomiast chciałbym
    przenieść (prawie bez zmian) wpisy ze starego bloga napisane w formacie Markdown.
    Tym bardziej, że ten format cechuje się świetną równowagą pomiędzy
    światem programisty a twórcy treści. Musiałem więc napisać
    własny loader dla Webpacka i dla każdego pliku `.md` dopisać 
    siostrzany plik `.vue`, który importuje ten pierwszy za pomocą
    wspomnianego loadera i uzyskaną treść HTML wstrzykuje do 
komponentu `<Post>`.

1. *RSS*

    Aby wygenerować XML feedu (RSS lub Atom), trzeba znać metadane wszystkich
    wpisów. Te czytałem już za pomocą specjalnego loadera w ramach
    Nuxta… tutaj jednak potrzebowałem zdobyć te same dane poza Nuxtem.
    W Single Page Application nie uzyskam czystego XML-a, tak więc
    to zadanie musiałem zlecić samemu Express.js.
    
1. *Publikacja w przyszłości*

    O tej funkcjonalności pisałem w
    [osobnym wpisie]( /blog/2017/03/28/dsp17-jeden-feature-ktory-zmienia-stos-technologiczny/ )
    i to z jej powodu zdecydowałem się na migrację na rozwiązanie serwerowe.
    Chodzi o to, abym mógł dzisiaj wrzucić post, który Ty zobaczysz
    dopiero jutro. Taki post nie może pojawić się ani na liście wpisów
    ani w RSS.
    
1. *Permalinki*

    To jedna z moich ulubionych funkcjonalności. Z jednej strony korzystam
    z Nuxt, aby zminimalizować boilperplate potrzebny do zbudowania
    kompletnej Single Page Application, która jest zarówno
    serwowana przez serwer, jak i posiada własny routing po stronie
    klienckiej. To, czego nie chcę, to mapowanie struktury
    katalogowej na adresy wpisów. Zamiast tego wolę, aby 
    każdy wpis miał zdefiniowany permalink, dzięki któremu
    ich adresy nie "zepsują się" nawet wtedy, gdy dokonam większych zmian
    w strukturze projektu. Ale jak zmienić routing tak, aby
    wpasować się w założenia obecne w Nuxt, aby te zmiany zadziałały?
   
# Problemy czekające na rozwiązanie

Oczywiście niejeden problem czeka jeszcze na swoje rozwiązanie. Oto
kilka z nich:

1. *Automatyzacja wgrywania obrazków na CDN*

    Skoro obrazki do nowego wpisu muszą znaleźć się na CDN, to może warto 
    nie wgrywać każdego "ręcznie", lecz napisać skrypt?
    
1. *Google Analytics*

    Wydawało by się, że dodanie Google Analytics jest proste…
    Sytuacja jednak zmienia się, gdy zamiast HTML-a piszesz
    komponenty Vue, a cała strona to Single Page Application
    z jednym routingiem. Do którego dostęp jest utrudniony,
    ponieważ zarządza nim Nuxt, a nie programista.
    
 1. *Redirect z `/` na `/blog`*
 
    Tworząc [timbercode.pl]( http://timbercode.pl )
    staram się myśleć perspektywicznie: jeśli blog zyska na popularności,
    to będzie mi zależało, aby adresy starych wpisów nie zmieniały się,
    aby nadal działały linki krążące swobodnie w internecie.
    Dlatego zależy mi, żeby ścieżki wszystkich wpisów zaczynały się
    od `/blog/`, nawet jeśli na razie blog jest jedyną funkcją
    timbercode.pl. Jak się okazało, poprawne zdefiniowanie przekierowania
    ze ścieżki `/` na `/blog` nie jest trywialne, gdy routingiem zarządza
    Nuxt.
 
# Podsumowanie

Jestem bardzo dobrej myśli i sądzę, że mogę już finalizować
prace nad Proof of Concept i zacząć realne przenoszenie bloga
wraz z wpisami na AWS Lambda. Mam nadzieję, że niedługo
będę mógł ogłosić, że to, co właśnie czytasz, to tekst
na stronie bazującej na nowym, ciekawym stosie technologicznym 🙂
