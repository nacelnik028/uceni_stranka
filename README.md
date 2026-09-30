# Procvičovna

Statická webová aplikace pro procvičování školních materiálů. GitHub Pages ji spouští přímo z kořene repozitáře, takže **`index.html` musí zůstat v kořeni**.

## Aktuální předměty

- Programování
- Vývoj webových aplikací
- Počítačové sítě
- Literatura
- Číslicová technika

Aktuální runtime obsahuje 342 úloh: 86 v obecném souboru `exercises.js` (30 v Programování, 56 ve Vývoji webových aplikací), 110 ze sítí, 106 z literatury a 40 z číslicové techniky.

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

## Režimy procvičování a nové funkce

Aplikace je určená pro sdílení více lidmi. Osobní výsledky proto nejsou spojeny s účtem ani posílány na server.

### Filtry

V režimu procvičování lze kombinovat:

- předmět,
- téma,
- podtéma,
- typ úlohy,
- obtížnost 1–5.

Úlohy z existujících dat bez explicitního `difficulty` dostanou při načtení automaticky odvozenou obtížnost. Pokud je `difficulty` uvedeno přímo v datu, musí být celé číslo 1–5.

### Učení vs. Test

**Učení** vyhodnocuje jednotlivé odpovědi ihned a dovoluje zobrazit řešení. V záhlaví je také tlačítko **Zobrazit shrnutí sady**, takže lze průběžné výsledky zobrazit i před dokončením všech úloh. Po zodpovězení celé sady se shrnutí zobrazí automaticky.

**Test** schová nápovědy a řešení, průběžně neukazuje správnost a odpovědi pouze zaznamenává. Výsledek se zobrazí po tlačítku **Dokončit test**. U kódových úloh je potřeba program před dokončením spustit, aby ho bylo možné zahrnout do výsledku.

### Generované úlohy

V předmětu **Číslicová technika** lze tlačítkem **Generovat nové příklady** vytvořit nové varianty zejména pro převody soustav a Hornerovo schéma. Tyto úlohy jsou vytvořené pouze v runtime pro aktuální relaci, nepřepisují zdrojová data a mají označení `generováno`.

Generování respektuje vybranou obtížnost, pokud je filtr nastavený konkrétně. Nové příklady se zapojují do aktuálního poolu a mohou být součástí běžné náhodné sady.

### Lokální statistika konkrétní sady

Po dokončení celé sady se zobrazí. V režimu **Učení** lze stejné shrnutí zobrazit také ručně tlačítkem **Zobrazit shrnutí sady**, i když ještě nejsou zodpovězené všechny úlohy. Při další odpovědi se staré shrnutí obnoví až podle aktuálního stavu sady.

Shrnutí obsahuje:

- celkové skóre z hodnotitelných úloh,
- počet zodpovězených úloh,
- počet otevřených `text` self-checků,
- rozpad výsledku podle témat.

Výsledky posledních sad se ukládají pouze do `localStorage` v konkrétním prohlížeči. Server, GitHub Pages ani ostatní návštěvníci k nim nemají přístup. Aplikace nevyžaduje přihlášení.

## UI a ovládání

UI je navržené jako sdílená školní procvičovna: bez přihlášení, bez osobního účtu a bez serverového ukládání výsledků. Novější rozhraní používá prvky, které zrychlují orientaci a zlepšují používání na mobilu.

### Režim Učení / Test

Přepínač režimu je zobrazen jako dvě výrazné volby **📘 Učení** a **📝 Test**. Druhý řádek každé volby stručně vysvětluje rozdíl mezi režimy. Tlačítko `finishSet` mění podle režimu text na **Zobrazit shrnutí sady** nebo **Dokončit test**.

### Mobilní filtry

Na šířce do 760 px jsou filtry zabalené do rozbalovacího panelu **⚙ Filtry**, aby na telefonu nezabíraly většinu obrazovky ještě před první otázkou. Panel se po změně filtru na mobilu automaticky zavře. Na desktopu zůstává otevřený.

Krátký text vedle názvu panelu zobrazuje aktivní výběr, například `Literatura · Antika +1`.

### Průběh sady

Pod volbou velikosti sady je progress bar s počtem zodpovězených úloh. Stav se přepočítává po kontrole odpovědi, u kódových úloh po spuštění programu, při změně sady a po resetu.

### Shrnutí sady

Shrnutí používá výraznější skóre a kruhový indikátor, rozpad podle témat a dvě rychlé akce: **🔁 Opakovat tuto sadu** a **🎲 Nová náhodná sada**. Výsledky zůstávají lokální.

Tyto UI změny nemění datový formát existujících úloh.

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


## Revize UI – 30. 9. 2026

Do aplikace byly doplněny tyto uživatelské funkce:

- **Světlý motiv s přepínačem** – světlý motiv je výchozí, volba se ukládá lokálně do `localStorage` a lze přepnout na tmavý motiv. Barvy používají CSS proměnné.
- **Vyhledávání v úlohách** – hledá se v názvu, otázce, předmětu, tématu, podtématu, tazích a také v textu kódových úloh a řešení. Počet výsledků se zobrazuje dynamicky podle skutečného runtime poolu.
- **Kódové úlohy** – editor zobrazuje čísla řádků a základní zvýraznění syntaxe pro Python/JavaScript. `Tab` vloží čtyři mezery a `Shift+Tab` odsadí aktuální řádek/blok. Chyby spuštěného programu se zobrazují jako červený výstup a u Pythonu se uvádí i řádek chyby, pokud ho prostředí vrátí.
- **Sticky kontrola na mobilu** – na šířkách do 760 px je dole připnuté tlačítko **Zkontrolovat**, které kontroluje právě aktivní úlohu; aktivní úloha se určuje podle posledního dotyku/fokusu.
- **Procvičování chyb po sadě** – shrnutí sady nabízí **Procvičit jen chyby**. Tato akce vytvoří novou sadu pouze z hodnocených úloh, které byly označené jako nesprávné; otevřené textové self-checky se mezi chyby nezařazují.

### Ověření po této revizi

Při kontrole 30. 9. 2026 byly ověřeny syntaxe JS, aktivní datový validator a runtime DOM v Chromium na šířkách 320, 375, 390, 768 a 1280 px. Kontrolován byl také horizontální overflow, přepínání motivu, vyhledávání, kódový editor, `Tab`, sticky kontrola a workflow **Procvičit jen chyby**. Prohlížečový test použil self-contained DOM harness; přímá navigace sandboxem na `file://`/lokální HTTP byla blokována prostředím.

**Poznámka k počtu úloh:** původní `README.md` v dodaném ZIPu uvádí 377 úloh, ale aktivní soubory `data/*.js` obsahují podle validatoru 342 úloh (30 Programování, 56 Vývoj webových aplikací, 110 Počítačové sítě, 106 Literatura, 40 Číslicová technika). UI proto počet úloh bere přímo z načtených dat a nepoužívá pevně zapsané číslo 377.
