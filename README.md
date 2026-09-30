# Procvičovna

Statická webová aplikace pro procvičování školních materiálů. GitHub Pages ji spouští přímo z kořene repozitáře, takže **`index.html` musí zůstat v kořeni**.

## Aktuální předměty

- Programování
- Vývoj webových aplikací
- Počítačové sítě
- Literatura
- Číslicová technika

Aktuální runtime obsahuje 307 úloh: 51 v obecném souboru `exercises.js`, 110 ze sítí, 106 z literatury a 40 z číslicové techniky.

## Struktura projektu

```text
procvicovna-github/
│
├── index.html                         # vstupní stránka GitHub Pages + CSS
├── app.js                             # UI, filtry, session, kontrola odpovědí
├── data/                              # AKTIVNÍ runtime data (načítá index.html)
│   ├── exercises.js
│   ├── network_exercises.js
│   ├── literature_exercises.js
│   └── cislicova_technika_exercises.js
│
├── scripts/
│   └── validate_questions.js          # validace všech aktivních dat
│
├── materialy/                         # ZDROJOVÉ MATERIÁLY A GENERÁTORY
│   ├── programovani/
│   │   └── zdroj/seznam_osobnosti.txt
│   ├── literatura/
│   │   └── zdroj/literatura.md
│   ├── cislicova-technika/
│   │   └── zdroj/ciselne_soustavy.md
│   └── pocitacove-site/
│       ├── zdroj/
│       │   ├── pocitacove-site-1-rocnik.canvas
│       │   └── zpracovani/
│       │       ├── canvas_dump.txt
│       │       ├── canvas_clean_nodes.txt
│       │       ├── nodes_json.json
│       │       └── nodes_summary.txt
│       ├── generatory/
│       │   ├── build_part1.js
│       │   ├── build_part2.js
│       │   ├── build_part3.js
│       │   ├── build_part4.js
│       │   └── build_part5.js
│       └── vystupy/
│           ├── exercises_part1.json
│           ├── exercises_part2.json
│           ├── exercises_part3.json
│           ├── exercises_part4.json
│           └── exercises_part5.json
│
├── archiv/                            # pomocné/legacy kopie, NENÍ to runtime
│   └── puvodni-koren/
│       ├── README.txt
│       ├── README_upravena_verze.md
│       ├── ...
│       ├── generatory/
│       └── vystupy/
│
├── favicon.svg
├── .nojekyll
├── README.md
└── docs/
    └── STRUKTURA.md
```

### Co je aktivní

Aktivní soubory jsou pouze `index.html`, `app.js`, soubory v `data/` a validátor v `scripts/`. `index.html` načítá data v tomto pořadí:

```html
<script src="data/exercises.js"></script>
<script src="data/network_exercises.js"></script>
<script src="data/literature_exercises.js"></script>
<script src="data/cislicova_technika_exercises.js"></script>
<script src="app.js"></script>
```

`app.js` pak spojí globální pole `EXERCISES`, `NETWORK_EXERCISES`, `LITERATURE_EXERCISES` a `DIGITAL_TECHNICS_EXERCISES` do jednoho seznamu.

### Co je v `archiv/`

V archivu jsou ponechány starší kořenové generátory, dílčí JSON a diagnostické výpisy, aby se nic podstatného ze vstupního balíku neztratilo. **Na web se nenačítají.**

Duplicitní `.canvas` kopie byly záměrně sloučeny: všech osm kopií ve vstupním ZIPu mělo stejné binární SHA-256. Zachována je jedna čistě pojmenovaná kopie:

```text
materialy/pocitacove-site/zdroj/pocitacove-site-1-rocnik.canvas
```

## Datový formát úloh

Každá úloha musí mít:

```js
{
  subject: 'Číslicová technika',
  topic: 'Číselné soustavy',
  subtopic: 'Základy',
  id: 'ct-zaklady-001',
  type: 'choice',
  title: '...',
  question: '...'
}
```

Povinná pole: `subject`, `topic`, `subtopic`, `id`, `type`, `title`, `question`.

Typy aktuálně podporované aplikací:

- `choice` – jedna správná možnost (`choices` + `answer`)
- `multi` – více správných možností (`choices` + `answers`)
- `match` – párování (`pairs: [{ left, right }]`)
- `order` – řazení (`order: [...]`)
- `text` – otevřená odpověď / self-check
- `fill` – krátké doplnění (`answer`)
- `number` – číselná odpověď (`answer`)
- `code` – spuštění Pythonu (`starterCode`, `solution`, `expectedOutput`)
- `conversion` – převod mezi číselnými soustavami (`value`, `fromBase`, `toBase`, `answer`)

### `conversion` – nový typ úlohy

Používá se pro úlohy z číslicové techniky, kde se převádí číslo mezi základy.

```js
{
  subject: 'Číslicová technika',
  topic: 'Převody mezi soustavami',
  subtopic: 'Do dvojkové soustavy',
  id: 'ct-prevody-001',
  type: 'conversion',
  title: 'Převod z desítkové do dvojkové',
  question: 'Převeď číslo 45 z desítkové do dvojkové soustavy.',
  value: '45',
  fromBase: 10,
  toBase: 2,
  answer: '101101',
  solution: '45₁₀ = 101101₂; lze ověřit Hornerovým schématem nebo postupným dělením dvěma.',
  hint: 'Postupuj od dělení základem 2 a čti zbytky odspodu.'
}
```

Aplikace při kontrole ignoruje mezery a velikost písmen, takže `2a`, `2A` i `2 A` se pro hexadecimální výsledek chovají stejně.

## Obsah číslicové techniky

Modul `data/cislicova_technika_exercises.js` vychází z dodaných poznámek o:

- základech číselných soustav,
- binární, čtyřkové, osmičkové, desítkové a šestnáctkové soustavě,
- symbolech A–F v hexadecimální soustavě,
- převodu do dekadické soustavy,
- Hornerově schématu,
- převodu z dekadické do dvojkové soustavy,
- postupném dělení základem a čtení zbytků,
- kontrole výsledku převodu.

Nové úlohy jsou záměrně rozdělené mezi `choice`, `multi`, `match`, `order`, `number` a `conversion`, aby procvičování nebylo jen výběr z možností.

## Kontrola dat

Z kořene projektu:

```bash
node scripts/validate_questions.js
```

Validator kontroluje mimo jiné:

- unikátní ID v celém projektu,
- povolené typy úloh,
- povinná pole,
- správné vazby u `choice`, `multi`, `match`, `order` a `conversion`,
- číselné odpovědi u `number`,
- `expectedOutput` a `solution` u `code`.

## Kontrola syntaxe

```bash
node --check app.js
node --check data/exercises.js
node --check data/network_exercises.js
node --check data/literature_exercises.js
node --check data/cislicova_technika_exercises.js
node --check scripts/validate_questions.js
```

Generátory lze kontrolovat stejně:

```bash
node --check materialy/pocitacove-site/generatory/build_part1.js
# … až build_part5.js
```

## Ověření webu

Web je statický. Pro lokální test je lepší použít HTTP server než `file://`:

```bash
python -m http.server 8000
```

Potom otevři `http://localhost:8000/`.

Zkontroluj alespoň:

1. Úvodní stránka a všechny předměty.
2. Filtry předmětu, tématu, podtématu a typu úlohy.
3. Náhodné sady 5 / 10 / 15 / vše.
4. `choice`, `multi`, `match`, `order`, `text`, `fill`, `number`, `code` a `conversion`.
5. Enter jako zkratku pro kontrolu (u `code` musí Enter zůstat nový řádek).
6. Reset odpovědí a řešení.
7. `×` v řadicích úlohách – odstraní konkrétní vybranou položku a znovu ji zpřístupní v paletě.
8. Mobilní šířky 320, 375 a 390 px bez horizontálního přetečení.

## Přidávání nových předmětů

Pro nový předmět vytvoř vlastní runtime soubor v `data/`, přidej jeho `<script>` do `index.html` **před `app.js`** a přidej odpovídající globální pole do `state.exercises` v `app.js`.

Zdroj materiálu drž v `materialy/<predmet>/zdroj/`. Generátory a pomocné výstupy drž u konkrétního materiálu. Nic pracovního nenechávej v kořeni, pokud to není skutečný runtime soubor.

## Pravidla pro obsah

- Otázky tvoř z dodaného studijního materiálu.
- Každé ID je unikátní v celém projektu.
- U `choice` je `answer` přesně jedna hodnota z `choices`.
- U `multi` jsou všechny `answers` uvnitř `choices`.
- U `match` jsou `left` i `right` unikátní v rámci úlohy.
- U `order` nejsou duplicitní položky.
- U `conversion` je základ celé číslo 2–36 a odpověď není prázdná.
- U `number` je odpověď skutečně číselná.
- U `text` se správnost automaticky neklasifikuje; jde o self-check.
- U `code` musí existovat `solution` a `expectedOutput`.

## Poznámka k GitHub Pages

`.nojekyll` je v kořeni záměrně. Při nahrávání změn do existujícího Git repozitáře **nepřepisuj `.git`** soubory z tohoto ZIPu. Tento balík obsahuje pouze čistý projektový obsah; Git historie patří do tvého lokálního repozitáře.
