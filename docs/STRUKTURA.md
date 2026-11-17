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
│   ├── pocitacova_grafika_exercises.js
│   ├── elektrotechnika_exercises.js
│   ├── kyberneticka_bezpecnost_exercises.js
│   ├── hardware_exercises.js
│   ├── operacni_systemy_exercises.js
│   ├── nemcina_exercises.js
│   ├── site_2_rocnik_exercises.js, vwa_2_rocnik_exercises.js, pgr_letak_exercises.js
│   ├── osy_2_rocnik_exercises.js, zdb_sql_server_exercises.js, programovani_specifikace_exercises.js
│   ├── nemcina_doplneni_exercises.js, anglictina_exercises.js
│   ├── ekonomika_exercises.js, obcanska_nauka_exercises.js
│   └── study_guides.js
├── scripts/
│   ├── validate_questions.js
│   ├── validate_study_guides.js
│   └── test_nemcina.js
├── materialy/
│   ├── programovani/zdroj/
│   ├── literatura/zdroj/
│   ├── cislicova-technika/zdroj/
│   ├── nemcina/zdroj/
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

Modul `Kybernetická bezpečnost` načítá `data/kyberneticka_bezpecnost_exercises.js` do pole `CYBERSECURITY_EXERCISES`, které aplikace připojí ke společnému katalogu. Obsahuje 110 úloh v 11 tématech. Zdroj a textový export OrgPadu jsou v `materialy/kyberneticka-bezpecnost/zdroj/`; dvě stručná opakování jsou v `data/study_guides.js`. Oba datové validátory zahrnují nový modul.

Modul `Hardware` používá `data/hardware_exercises.js` a pole `HARDWARE_EXERCISES`. Obsahuje 150 úloh v 15 tématech; zdrojový text a redakční zpřesnění jsou v `materialy/hardware/zdroj/`. Knihovna zahrnuje dvě navazující opakování SSD a USB. Modul je zahrnut v obou validátorech a v runtime načítání z `index.html`.

Modul `Operační systémy` používá `data/operacni_systemy_exercises.js` a pole `OPERATING_SYSTEMS_EXERCISES`: 100 úloh v 10 tématech a dva přehledy. Podklad je v `materialy/operacni-systemy/zdroj/`. Modul načítá `index.html` a kontrolují ho oba datové validátory.

Modul `Němčina` používá `data/nemcina_exercises.js` a pole `GERMAN_EXERCISES`: 265 úloh v 7 tématech a čtyři přehledy. Slovní zásoba má 152 úloh, z toho 133 samostatných otázek pokrývá všechny položky slovníčku. Přepisy obou stránek Notion a vymezení pokrytí jsou v `materialy/nemcina/zdroj/`. Zapojení zajišťují `index.html`, `app.js` a oba validátory. `scripts/test_nemcina.js` porovnává všechny slovníkové položky s podkladem a kontroluje vykreslení v obou režimech i hodnocení doplňování.

## Zápisy 2. ročníku z Notionu (17. 11. 2026)

Z databáze Zápisy 2.D (2026/2027) přibylo 499 úloh v deseti souborech. Každý soubor je samostatná IIFE s vlastním globálním polem (`NETWORK_2_EXERCISES`, `WEBDEV_2_EXERCISES`, `PC_GRAPHICS_2_EXERCISES`, `OPERATING_SYSTEMS_2_EXERCISES`, `DATABASE_2_EXERCISES`, `PRG_SPEC_EXERCISES`, `GERMAN_2_EXERCISES`, `ENGLISH_EXERCISES`, `ECONOMICS_EXERCISES`, `CIVICS_EXERCISES`) a ID s vlastní předponou (`psi2-`, `vwa2-`, `pgr2-`, `osy2-`, `zdb2-`, `prg-spec-`, `nej2-`, `anj-`, `eko-`, `obn-`). Pole spojuje `app.js`, načítá je `index.html` a kontrolují oba validátory.

Nové předměty Anglický jazyk, Ekonomika a Občanská nauka mají v `app.js` ikonu, barvu a popis a v `data/study_guides.js` vlastní přehledy. Podklady s mapou stránek Notionu na témata: `materialy/anglictina/zdroj/`, `materialy/ekonomika/zdroj/`, `materialy/obcanska-nauka/zdroj/` a soubory `notion-*.md` v ostatních složkách `materialy/*/zdroj/`.

## Kde se upravuje aplikace

- `index.html` – struktura stránky a CSS
- `app.js` – chování aplikace
- `scripts/validate_questions.js` – kontrola dat

## Studijní přehledy

- `data/study_guides.js` – statický obsah 34 přehledů pro patnáct předmětů; vazba na otázky používá přesné `subject` a `topic`.
- `study-guides.js` – katalog, hledání bez diakritiky, čtení a spuštění nové sady k tématu.
- `study-guides.css` – responzivní styly knihovny a článků pro oba motivy.
- `appearance.css` – společné barvy, typografie, karty a mobilní vzhled; načítá se za styly modulů.
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
