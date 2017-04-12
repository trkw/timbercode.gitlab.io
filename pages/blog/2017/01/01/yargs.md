---
layout:     post
title:      "Yargs! Parametryzacjo skryptu, nie boję się ciebie!"
description: >
    Na co dzień fruwasz w obłokach czystego kodu, a parametryzacja skryptu
    to brudny i czasochłonny temat, który odpycha na kilometr?
    Czas to zmienić wraz z biblioteką Yargs,
    dla Node.js, która uczyni Twój kod wygodnym
    w czytaniu i modyfikowaniu, a skrypt sam będzie podpowiadał,
    jak go użyć.
image:      "/images/covers/yargs.png"
categories: ["tools"]
tags:       ["node", "JavaScript", "yargs"]
---

![Obrazek wpisu "{{page.title}}"]( {{IMAGES_BASE_URL}}/images/covers/yargs.png )

Na co dzień fruwasz w obłokach czystego kodu, a parametryzacja skryptu
to brudny i czasochłonny temat, który odpycha na kilometr?
Czas to zmienić wraz z [biblioteką Yargs]( http://yargs.js.org/ ){:target="blank"},
dla [Node.js]( https://nodejs.org ){:target="blank"}, która uczyni Twój kod wygodnym
w czytaniu i modyfikowaniu, a skrypt sam będzie podpowiadał,
jak go użyć 🤓
  
# Zadanie &mdash; skrypt ładujący dane demo

Masz do napisania skrypt. Dajmy na to&hellip; klient chce pokazać
pisaną przez Ciebie aplikację swojemu potencjalnemu klientowi
i potrzebuje danych demo, więc przyda Ci się skrypt, który te dane
wrzuci na serwer. Najlepiej za pomocą API, które wystawia napisany
przez Ciebie backend &mdash; wszak to najlepszy sposób na zachowanie
spójności danych, żadne tam inserty do bazy, omijające logikę
biznesową.

Chcesz, aby skrypt był elastyczny? Ktoś by zapytał "Po co? Przecież to
jednorazowa akcja *[parsknięcie śmiechem, wyrażające brak poparcia dla
jakiejkolwiek pracy większej niż minimalna]*".
Ty jednak przewidujesz, że za dwa tygodnie klient poprosi
o zmiany w danych, a może nawet o to, aby zależnie od potrzeby dało się
wrócić do "tych starych" lub "tych nowych". A, i na niektórych
prezentacjach będzie trzeba użyć danych z godzinami mającymi sens
w strefie czasowej innej niż
[GMT]( https://www.timeanddate.com/time/zones/gmt ){:target="blank"}.

Nie oznacza to, że masz słabego klienta, który nie może zdecydować
raz a dobrze. O nie. To oznacza, że masz do czynienia z Życiem
i masz okazję zapobiec Typowym Sytuacjom i, gdy klient poprosi
o zmiany, powiedzieć, "Spoko, jeszcze dziś po południu sprawdzisz,
czy poprawione dane Ci odpowiadają, a jutro rano naniosę poprawki
i wgram wszystko na czysto."

# Problem &mdash; parametryzacja skryptu

Zabierasz się za napisanie skryptu. Jeśli ma być wygodny w użyciu,
zapewne chcesz sparametryzować jego działanie. Mógłbyś zrobić to za pomocą stałych
na początku pliku, ale przecież nie chcesz kolejny raz skończyć z takim kodem:
```javascript
//const ENVIRONMENT = 'localhost';
// const ENVIRONMENT = 'testing';
const ENVIRONMENT = 'staging';
//const ENVIRONMENT = 'production';

//const DATA_FILE = './data/company-the-big.json';
//const DATA_FILE = './data/that-fancy-startup.json';
const DATA_FILE = './data/geekit-conference.json';

//const TIME_ZONE_OFFSET = 0;
// const TIME_ZONE_OFFSET = +2;
const TIME_ZONE_OFFSET = -7;
```

Skoro zdecydowałeś, że żonglerka stałymi i komentarzami to słabe rozwiązanie, możesz
użyć parametrów wywołania. Odczytasz je z 
[tablicy `process.argv`]( https://nodejs.org/docs/latest/api/process.html#process_process_argv ){:target="blank"}.

OK, ale jak bardzo elastyczny i wygodny kod napiszesz? Czy będzie przyjmował 
parametry w dowolnej kolejności? Czy będą one nazwane i opisane
w zrozumiały sposób? Czy skrypt będzie honorował zarówno krótkie,
jak i długie nazwy parametrów (nie wiem, jak Ty, ale ja przywykłem, 
że "z palca" mogę napisać `npm i -DE lodash`, zaś w powtarzalnym kodzie
czy jakimś `README.md` nikt mi nie broni jaśniej doprecyzować
`npm install --save-dev --save-exact`)?

Podejrzewam, że u wielu osób (u mnie też) rozsądek nakazałby
oszczędzać budżet klienta (czas to pieniądz, niestety) i ograniczyć
się do najłatwiejszego w implementacji rozwiązania. Dajmy na to każdy parametr
ma swoją ustaloną pozycję na liście i jedynie ostatnie z nich mogą być opcjonalne.
Wyglądałoby to następująco:
```bash
node ./load-data_array.js staging ./data/geekit-conference.json -7
```

A także pomijając przesunięcie strefy czasowej:
```bash
node ./load-data_array.js staging ./data/geekit-conference.json
```

Jak to mówią anglojęzyczni klienci, "I'm not a big fan of that".
Rzeczywiście, szczyt wygody i czytelności to to nie jest.

# Rozwiązanie &mdash; Yargs!

[Yargs]( http://yargs.js.org/ ){:target="blank"} to taka milusia biblioteka, która 
rozwiązuje opisany powyżej problem. To, co dostarcza, to
[DSL (Domain-Specific Language)]( https://en.wikipedia.org/wiki/Domain-specific_language ){:target="blank"}
do definiowania parametrów wywołania. Dzięki yargs mój skrypt mogę
wywołać w taki oto sposób:
```bash
node ./load-data_yargs.js \
   --environment staging \
   --dataFile ./data/geekit-conference.json \
   --timeZoneOffset -7
```

Wygląda zbyt rozwlekle? Ja bym się cieszył, gdybym zobaczył tak opisane wywołanie
skryptu przez&hellip; inny skrypt. A jeśli chcę jedynie skupić się podanych wartościach
i sprawnie je podmieniać, mogę skorzystać z krótkich nazw:
```bash
node ./load-data_yargs.js -e stage -d ./data/geekit-conference.json -z -7
```

Nikt nie broni mi także zmieniać kolejności parametrów czy pomijać tych, które
są opcjonalne:
```bash
node ./load-data_yargs.js -d ./data/geekit-conference.json -e staging
```

Parametry mają określone typy. Można też ograniczyć ich wartości do określonego
zestawu. Dzięki temu nie muszę obawiać się, że omyłkowe podanie środowiska
`stage` zamiast `staging` zamiast przerwać działanie programu, doprowadzi
do niespodziewanych efektów (np. do użycia innego, domyślnego środowiska&hellip;
byle nie była to produkcja!).

Na koniec wspomnę o dwóch opcjach, które są moim zdaniem bardzo, ale to bardzo istotne.
Po pierwsze w Yargs można włączyć tryb `strict`, który nie pozwala na przekazywania
nieprzewidzianych parametrów. Wydaje się nieprzydatne? A czym innym jest literówka 
w nazwie parametru, jak nie podaniem innego, nadmiarowego parametru?

Drugą przydatną funkcją jest generowanie pomocy w przypadku jakiegokolwiek błędu oraz
gdy wywołasz skrypt z flagą `--help`. Dowiesz się w ten sposób, jak poprawnie
używać skryptu oraz jakie jest znaczenie poszczególnych parametrów.
Oto przykładowy komunikat:
```bash
Options:
  -e, --environment     Which environment to use (will result with URL of API)
  [string] [required] [choices: "localhost", "testing", "staging", "production"]
  -d, --dataFile        Path to file with data to use        [string] [required]
  -z, --timeZoneOffset  Time Zone offset used to adjust timestamps of created
                        data                    [number] [required] [default: 0]
  --help                Show help                                      [boolean]

Invalid values:
  Argument: e, Given: "stage", Choices: "localhost", "testing", "staging", "production"
```

A jak wygląda kod, który wykorzystuje Yargs? Na przykład tak:
```javascript
const argv = yargs
    .strict()
    .option('e', {
        alias: 'environment',
        type: 'string',
        describe: 'Which environment to use (will result with URL of API)',
        choices: [
            'localhost',
            'testing',
            'staging',
            'production'
        ],
        demand: true
    })
    .option('d', {
        alias: 'dataFile',
        type: 'string',
        describe: 'Path to file with data to use',
        demand: true
    })
    .option('z', {
        alias: 'timeZoneOffset',
        type: 'number',
        describe: 'Time Zone offset used to adjust timestamps of created data',
        default: DEFAULT_TIME_ZONE_OFFSET,
        demand: true
    })
    .help()
    .detectLocale(false)
    .argv;

const ENVIRONMENT = argv['environment'];
const DATA_FILE = argv['dataFile'];
const TIME_ZONE_OFFSET = argv['timeZoneOffset'];
```

Czy to zbyt wiele linii? Moim zdaniem nie. W czytelny sposób udało
się zdefiniować całą skomplikowaną logikę czytania parametrów wejściowych,
a także zminimalizować frustrację własną i innych programistów, którzy
będą z tego skryptu korzystali 😀

# Co dalej?

W tym wpisie pokazałem Ci (mam nadzieję 😉), że parametryzacja skryptu w Node.js
może być prosta i czytelna dzięki bibliotece Yargs. Jeśli chcesz dowiedzieć się 
o niej więcej, zachęcam Cię do przeczytania [dokumentacji]( http://yargs.js.org/docs/ ){:target="blank"}
(choć nie jest ona przykładem mistrzostwa w kategorii "klarowność"&hellip;).

Kod, który wykorzystałem, udostępniłem w postaci
[repozytorium]( https://gitlab.com/timbercode/yargs-example ){:target="blank"} wraz z
[instrukcją, jak go uruchomić]( https://gitlab.com/timbercode/yargs-example/blob/master/README.md ){:target="blank"}.

I jeszcze jedno&hellip; Totalnie nie zgadzasz się z tym, co napisałem? A może Yargs
jest Twoim dzisiejszym objawieniem? Zostaw komentarz pod tym wpisem, a z chęcią
go przeczytam i odpowiem 🙂