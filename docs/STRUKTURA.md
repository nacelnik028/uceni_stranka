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
│   ├── vyvoj-webovych-aplikaci/zdroj/
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


## Zdrojový materiál – Vývoj webových aplikací

Materiál `materialy/vyvoj-webovych-aplikaci/zdroj/header-a-favicon.md` obsahuje podklady k tématu headerů a favicon. Z něj jsou vytvořeny aktivní úlohy `vwa-header-*` a `vwa-favicon-*` v `data/exercises.js`.

## Runtime funkce

`app.js` obsahuje také kombinované filtry včetně obtížnosti, dva režimy (`Učení` a `Test`), lokální statistiku dokončené sady a generátor nových úloh pro Číslicovou techniku. Generované úlohy jsou pouze runtime data a neukládají se do zdrojových `data/*.js`.

Lokální statistiky používají `localStorage` a jsou oddělené od serveru i GitHub Pages.

## Zdrojový materiál – Databáze

Materiál `materialy/databaze/zdroj/zdb.md` a původní PDF `ZDB.pdf` slouží jako podklad pro aktivní úlohy `db-*` v `data/exercises.js`.
