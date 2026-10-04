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
│   ├── cislicova_technika_exercises.js
│   └── pocitacova_grafika_exercises.js
├── scripts/
│   └── validate_questions.js
├── materialy/
│   ├── programovani/zdroj/
│   ├── literatura/zdroj/
│   ├── cislicova-technika/zdroj/
│   ├── vyvoj-webovych-aplikaci/zdroj/
│   ├── pocitacova-grafika/zdroj/
│   │   ├── rastrová-vektorová-grafika.md
│   │   └── media/
│   │       ├── export-grafiky-affinity.png
│   │       └── rastrová-vektorová-grafika.png
│   ├── databaze/
│   │   └── zdroj/
│   │       ├── zdb.md
│   │       └── ZDB.pdf
│   └── pocitacove-site/
│       ├── zdroj/
│       ├── generatory/
│       └── vystupy/
├── archiv/
│   └── puvodni-koren/
├── docs/
│   ├── STRUKTURA.md
│   └── TYPY_OTAZEK.md
├── favicon.svg
├── .nojekyll
└── README.md
```

## Kde se upravují otázky

Aktivní otázky jsou v `data/*.js`. Zdrojové materiály nejsou načítané přímo webem. Modul `Počítačová grafika` má vlastní runtime data v `data/pocitacova_grafika_exercises.js`; přiložené infografiky se zobrazují přímo u vybraných úloh.

## Kde se upravuje aplikace

- `index.html` – struktura stránky a CSS
- `app.js` – chování aplikace
- `scripts/validate_questions.js` – kontrola dat

## Studijní přehledy

- `data/study_guides.js` – statický obsah 12 přehledů pro sedm předmětů; vazba na otázky používá přesné `subject` a `topic`.
- `study-guides.js` – katalog, hledání bez diakritiky, čtení a spuštění nové sady k tématu.
- `study-guides.css` – responzivní styly knihovny a článků pro oba motivy.
- `scripts/validate_study_guides.js` – kontrola obsahu, zdrojů a propojení na aktivní úlohy.

Přehledy se načítají běžnými skripty z `index.html`. Jsou součástí statického webu na GitHub Pages. Otevření knihovny ze studia pouze skryje studijní obrazovku, takže návrat zachová rozpracované odpovědi. Tlačítko Procvičit téma naopak vytváří novou sadu a přepíná do režimu Učení.

## UI a lokální rozpracovaná sada

`study-ux.js` spravuje karty témat, rychlé akce na úvodu, přepínání Jedna otázka / Celá sada a ukládání rozpracované sady do localStorage. `study-ux.css` doplňuje oba motivy a mobilní rozložení. V režimu Jedna otázka jsou ostatní úlohy skryté v DOM, aby navigace neměnila jejich odpovědi; hodnocení i shrnutí pracují stále s celou sadou.

Klíče `procvicovna-draft:v1`, `procvicovna-layout:v1` a `procvicovna-outcomes:v1` obsahují rozpracovanou sadu, preferované rozložení a poslední hodnocení jednotlivých úloh. Původní historie a statistiky používají své dosavadní klíče. Ukládání je volitelné: při nedostupném úložišti funguje procvičování dál.

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

## Interaktivní typy úloh

Aplikace kromě klasických typů podporuje také `scenario`, `diagnostic`, `classification`, `compare` a `image-choice`. Podrobný princip a datové schéma je v `docs/TYPY_OTAZEK.md`. Nové typy jsou navržené jako univerzální interakce použitelné napříč předměty.
