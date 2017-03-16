---
layout:     post
title:      "Bezpieczny frontend #0"
description: >
    O bezpieczeństwie webaplikacji niewiele się mówi, co nie pomaga w poszerzaniu
    wiedzy z tego zarkesu. Tym wpisem zaczynam serię tekstów na temat bezpieczeństwa
    aplikacji frontendowej. 
image:      "/images/covers/bezpieczny-frontend-0.png"
categories: ["security"]
tags:       ["daj-sie-poznac-2017", "bezpieczny-frontend", "security", "frontend", "web", "http", "csrf", "xss"]
---

![Obrazek wpisu "{{page.title}}"]( /images/covers/bezpieczny-frontend-0.png )

Napisanie swojej pierwszej webaplikacji jest bardzo proste: zaglądasz do
 [tutoriala Reacta]( https://facebook.github.io/react/tutorial/tutorial.html){:target="blank"},
 [Vue]( https://vuejs.org/v2/guide/ ){:target="blank"} czy innego 
 [Angulara]( https://angular.io/docs/ts/latest/quickstart.html ){:target="blank"}
 i po chwili masz już kilka widoków i szczyptę logiki. Przyda Ci się backend do zestawu?
 Proszę bardzo &ndash; skorzystaj z 
 [Node'a]( https://nodejs.org/en/ ){:target="blank"}
 i [Expressa]( https://expressjs.com/en/starter/installing.html ){:target="blank"}
 w celu szybkiego zdefiniowania API.
 
Mija kolejna chwila, a Twoje obydwie aplikacje komunikują się ze sobą po HTTP! Pięknie,
 ale&hellip; czy ta komunikacja jest bezpieczna? *Czy możesz spokojnie wypuścić kod tej
 nowiutkiej strony wprost do przeglądarek użytkowników i zagwarantować im chociaż
 podstawowe bezpieczeństwo?* OK, może dbanie o security to nie jest to,
 na czym powinieneś się skupić na początku projektu. Jednak życie pokazało mi,
 że temat nieraz traktowany jest po macoszemu również na dalszych etapach
 rozwoju aplikacji 🙁
 
*O bezpieczeństwie frontendu niewiele się mówi*, bo też nie ma zbyt wielkiej ku
 temu potrzeby. Wiele frameworków ma wbudowane podstawowe
 mechanizmy zabezpieczające. W efekcie Ci co rozumieją obecne zagrożenia,
 nie mają powodu, aby specjalnie o tym opowiadać, a Ci co nie rozumieją, nie
 są nawet świadomi możliwych problemów. W takiej sytuacji łatwo o proste "obejścia"
 zamiast rozwiązań wymagających wiedzy. 
  
Po zmaganiu się z "corsami" we własnej aplikacji i wysłuchaniu
 [prezentacji Roberta Szarejko na temat web security]( https://www.meetup.com/Warszawa-JUG/events/238022619/ ){:target="blank"}
 uznałem, że czas pochylić się nad tematem. *Ten wpis jest wstępem do serii
 tekstów na temat bezpieczeństwa aplikacji frontendowej.*
 Chciałbym, abyś po jej przeczytaniu wiedział, czym różni się
 [XSS]( https://en.wikipedia.org/wiki/Cross-site_scripting ){:target="blank"} od
 [CSRF]( https://en.wikipedia.org/wiki/Cross-site_request_forgery ){:target="blank"}
 i nie musiał już zastanawiać się, czemu Chrome krzyczy w konsoli o braku
 headera `Access-Control-Allow-Origin` zamiast po prostu wykonać request HTTP.

Tyle na dziś z mojej strony. A Ty, Czytelniku, masz jakieś oczekiwania wobec tej
 serii wpisów? 🙂
