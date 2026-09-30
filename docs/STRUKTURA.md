# Struktura projektu Procvičovny

## Přehled

Kořen repozitáře obsahuje jen to, co GitHub Pages potřebuje ke spuštění webu. Aktivní data jsou oddělená od zdrojových materiálů a pracovní/legacy soubory jsou v `archiv/`.

```text
procvicovna-github/
├── index.html
├── app.js
├── data/
│   ├── exercises.js
│   ├── network_exercises.js
│   ├── literature_exercises.js
│   └── cislicova_technika_exercises.js
├── scripts/
│   └── validate_questions.js
├── materialy/
│   ├── programovani/zdroj/
│   ├── literatura/zdroj/
│   ├── cislicova-technika/zdroj/
│   └── pocitacove-site/
│       ├── zdroj/
│       ├── generatory/
│       └── vystupy/
├── archiv/
│   └── puvodni-koren/
├── docs/
│   └── STRUKTURA.md
├── favicon.svg
├── .nojekyll
└── README.md
```

## Kde se upravují otázky

Aktivní otázky jsou v `data/*.js`. Zdrojové materiály nejsou načítané přímo webem.

## Kde se upravuje aplikace

- `index.html` – struktura stránky a CSS
- `app.js` – chování aplikace
- `scripts/validate_questions.js` – kontrola dat

## Proč je tu `archiv/`

Ve vstupním ZIPu byly pracovní soubory a staré kořenové kopie smíchané s runtime. Tyto soubory jsou zachované, ale oddělené od aktivního webu, aby náhodou nefungovaly jako druhá kopie projektu.

Identické kopie stejného `.canvas` souboru byly deduplikovány na jednu kanonickou kopii s bezpečným názvem.
