# Procvičovna

Jednoduchá statická webová aplikace pro procvičování školních materiálů. Projekt je navržen tak, aby do něj mohl další člověk nebo AI agent průběžně přidávat nové otázky bez nutnosti měnit samotné UI.

## DŮLEŽITÉ PRO DALŠÍ AI AGENTY

Tento soubor je hlavní technická dokumentace projektu. Před přidáváním dalších otázek si ho vždy přečti celý nebo alespoň sekce **Struktura**, **Formát úlohy**, **Jak přidávat otázky** a **Kontrola před odevzdáním**.

### Základní pravidla

1. **Neměň chování aplikace kvůli jedné sadě otázek.** Nejprve pracuj s daty. UI a `app.js` měň jen tehdy, pokud je potřeba nová funkce.
2. Každá úloha musí mít **unikátní `id`** v celém projektu, ne pouze v jednom souboru.
3. Každá úloha musí mít `subject`, `topic`, `subtopic`, `type`, `title` a `question`.
4. Obsah otázek tvoř **výhradně z dodaného studijního materiálu**. Nevymýšlej fakta, která v materiálu nejsou, pokud zadání výslovně neříká jinak.
5. U `choice` musí být správná odpověď přesně jednou mezi `choices` a musí být uvedena v `answer`.
6. U `number` musí být `answer` skutečně číselná hodnota, protože aplikace ji porovnává numericky.
7. U `fill` se odpověď kontroluje jako text bez ohledu na velikost písmen.
8. U `text` aplikace používá úlohu primárně jako **self-check**; uživatelovu odpověď automaticky nevyhodnocuje jako správnou/špatnou.
9. U `code` musí být vyplněné `solution` a `expectedOutput`.
10. Nepřidávej citlivá osobní data, hesla, tokeny ani zbytečné externí odkazy.
11. Klávesa `Enter` se chová podle typu úlohy: u `code` vloží nový řádek do editoru kódu; u ostatních úloh slouží jako zkratka pro kontrolu odpovědi.
12. U všech úloh typu `choice` se pořadí možností automaticky náhodně promíchává při vykreslení úlohy napříč všemi moduly. Správná odpověď se záměrně nezobrazuje na první pozici. `answer` zůstává zdrojovou správnou odpovědí a kontrola podle ní funguje i po promíchání možností.

---

## Jak projekt funguje

Aplikace je čistý statický web. Nepoužívá backend ani databázi.

Hlavní tok je:

```text
index.html
   │
   ├── exercises.js              → existující obecné úlohy
   ├── network_exercises.js      → úlohy z počítačových sítí
   │
   └── app.js                    → načte obě pole, sjednotí je a vykreslí UI
```

V `app.js` se na začátku vytvoří společný seznam:

```js
const state = {
  exercises: [
    ...(Array.isArray(window.EXERCISES) ? window.EXERCISES : []),
    ...(Array.isArray(window.NETWORK_EXERCISES) ? window.NETWORK_EXERCISES : []),
  ],
  ...
};
```

To znamená, že nový obsah musí být buď:

- přidán do `window.EXERCISES`, nebo
- přidán do dalšího globálního pole a následně načten v `app.js` a `index.html` stejným způsobem.

Pro běžné doplňování je jednodušší rozšířit existující tematický soubor.

---

## Aktuální předměty

Projekt aktuálně obsahuje:

- **Programování**
- **Vývoj webových aplikací**
- **Počítačové sítě**

Počítačové sítě jsou rozdělené do těchto témat:

1. Základy a rozdělení sítí
2. Topologie a prvky sítí
3. Přenosová média a kabeláž
4. Síťové modely
5. Adresace a konfigurace
6. Služby a protokoly

---

## Struktura projektu

```text
procvicovna-github/
│
├── index.html                    # HTML aplikace a pořadí načítání skriptů
├── app.js                        # celé chování aplikace
├── exercises.js                  # existující úlohy z dalších předmětů
├── network_exercises.js          # aktivní úlohy z počítačových sítí
├── README.md                     # tato dokumentace
├── README.txt                    # starý soubor, pouze pro kompatibilitu/odkaz
├── .nojekyll                     # GitHub Pages
│
├── materialy/
│   ├── pocitacove-site/
│   │   ├── zdroj/
│   │   │   ├── Počítačové sítě - 1. ročník.canvas
│   │   │   └── zpracovani/
│   │   │       ├── canvas_dump.txt
│   │   │       ├── canvas_clean_nodes.txt
│   │   │       ├── nodes_json.json
│   │   │       └── nodes_summary.txt
│   │   ├── generatory/
│   │   │   ├── build_part1.js
│   │   │   ├── build_part2.js
│   │   │   ├── build_part3.js
│   │   │   ├── build_part4.js
│   │   │   └── build_part5.js
│   │   └── vystupy/
│   │       ├── exercises_part1.json
│   │       ├── exercises_part2.json
│   │       ├── exercises_part3.json
│   │       ├── exercises_part4.json
│   │       └── exercises_part5.json
│   │
│   └── programovani/
│       └── zdroj/
│           └── seznam_osobnosti.txt
│
└── scripts/
    └── validate_questions.js      # kontrola dat před odevzdáním
```

### Co je zdrojový materiál a co je runtime

- `materialy/**/zdroj/` = **zdrojové materiály**, ze kterých se mají otázky tvořit.
- `materialy/**/zdroj/zpracovani/` = pomocné výpisy a extrakce použité při zpracování materiálu. Nejsou samy o sobě autoritativním zdrojem.
- `materialy/**/generatory/` = skripty, které připravují dílčí JSON s otázkami.
- `materialy/**/vystupy/` = generované/dílčí datové výstupy.
- `exercises.js` a `network_exercises.js` v kořeni = **aktivní runtime data**, která načítá web.
- `app.js` a `index.html` = aplikační logika; bez důvodu je neměň.

---

# Formát jedné úlohy

Nejpoužívanější obecný tvar je:

```js
{
  subject: 'Počítačové sítě',
  topic: 'Základy a rozdělení sítí',
  subtopic: 'Definice a rozlehlost',
  id: 'ps-zaklady-001',
  type: 'choice',
  title: 'Co je to počítačová síť?',
  question: 'Jaká je správná definice počítačové sítě?',
  choices: [
    'Správná odpověď',
    'Špatná možnost 1',
    'Špatná možnost 2',
    'Špatná možnost 3'
  ],
  answer: 'Správná odpověď',
  solution: 'Stručné vysvětlení, proč je odpověď správná.',
  hint: 'Krátká nápověda.',
  tags: ['Základy', 'Definice']
}
```

## Povinná pole

| Pole | Význam |
|---|---|
| `subject` | Předmět, např. `Počítačové sítě` |
| `topic` | Hlavní téma |
| `subtopic` | Užší podtéma |
| `id` | Trvale unikátní identifikátor |
| `type` | Typ úlohy: `choice`, `text`, `code`, `fill`, `number` |
| `title` | Krátký název úlohy |
| `question` | Zadání pro žáka |

## Zobrazení otázky

Pole `title` zůstává součástí datového formátu, ale **nezobrazuje se jako nadpis nad otázkou**. V samotném procvičování se nad otázkou zobrazuje pouze číslo úlohy, případně kategorie/téma a štítky. Text uložený v `question` je hlavní zadání, které má žák číst a řešit.

Při přidávání nových otázek proto není potřeba vytvářet `title` s ohledem na jeho zobrazení v kartě. Pole `title` se stále ponechává kvůli kompatibilitě dat a případnému budoucímu použití.

## Volitelná pole

- `choices` – možnosti u `choice`
- `answer` – správná odpověď
- `solution` – vysvětlení/ukázkové řešení
- `hint` – nápověda
- `tags` – pole krátkých štítků
- `language` – u `code`, typicky `python` nebo `javascript`
- `starterCode` – počáteční kód u `code`
- `expectedOutput` – očekávaný výstup u `code`
- `testInput` – vstup programu u `code`

---

# Typy úloh

## `choice` – výběr z možností

Použij pro otázky, kde má žák vybrat jednu správnou možnost.

```js
{
  type: 'choice',
  choices: ['A', 'B', 'C', 'D'],
  answer: 'B'
}
```

Pořadí `choices` se při každém vykreslení úlohy náhodně promíchává u všech modulů, které používají typ `choice`. Správná odpověď se záměrně neponechává na první pozici. Kontrola se řídí hodnotou `answer`, takže promíchání nemění správnost žádné možnosti. Při datové kontrole musí `answer` stále přesně odpovídat jedné z možností (po oříznutí mezer).

Doporučení:

- obvykle 4 možnosti,
- právě 1 správná odpověď,
- špatné možnosti musí být uvěřitelné,
- nepoužívej jako špatnou možnost něco úplně absurdního, pokud to snižuje obtížnost bez studijního důvodu.

## `text` – otevřená otázka

Použij pro vysvětlení pojmu, porovnání nebo slovní odpověď.

```js
{
  type: 'text',
  question: 'Vysvětli rozdíl mezi LAN a WAN.',
  answer: 'LAN je lokální síť..., zatímco WAN pokrývá velké vzdálenosti...',
  solution: 'Podrobnější vysvětlení...'
}
```

Aplikace odpověď žáka automaticky nevyhodnocuje. Zobrazí jeho text a následně řešení.

## `fill` – doplnění

Použij pro krátkou přesnou odpověď.

```js
{
  type: 'fill',
  question: 'Jaká zkratka označuje lokální síť?',
  answer: 'LAN'
}
```

Porovnává se text bez ohledu na velikost písmen.

## `number` – číselná odpověď

Použij pro rok, počet, velikost, rychlost atd.

```js
{
  type: 'number',
  question: 'Kolik bitů má IPv4 adresa?',
  answer: '32'
}
```

Aplikace převádí odpověď na číslo a porovnává číselnou hodnotu. Desetinné čárky jsou podporované.

## `code` – spustitelný kód

Použij pro programovací úlohy, ne pro běžnou teorii sítí.

```js
{
  type: 'code',
  language: 'python',
  starterCode: '# Doplň řešení\n',
  solution: 'print("Ahoj")',
  expectedOutput: 'Ahoj',
  testInput: ''
}
```

Python se spouští přes Pyodide načítané z CDN. Proto je pro tuto funkci potřeba internetové připojení.

---

# Jak přidávat nové otázky z materiálu

Doporučený postup pro AI:

### 1. Nejprve najdi správný zdroj

Například pro počítačové sítě:

```text
materialy/pocitacove-site/zdroj/Počítačové sítě - 1. ročník.canvas
```

Neber jako hlavní zdroj starý `nodes_summary.txt` nebo `canvas_dump.txt`; ty jsou pouze pomocné extrakce. Při rozporu je autoritativní původní materiál.

### 2. Rozděl obsah podle témat

Používej existující témata, pokud obsah do některého z nich přirozeně patří. Nové téma vytvářej jen tehdy, když materiál obsahuje samostatný významný okruh, který se nedá rozumně zařadit.

### 3. Vytvářej různorodé otázky

Z jednoho bloku materiálu není vhodné vyrobit deset skoro totožných definic. Kombinuj například:

- definici pojmu,
- rozpoznání příkladu,
- porovnání dvou pojmů,
- praktickou situaci,
- výběr správné možnosti,
- krátký výpočet,
- otázku na význam zkratky,
- otázku „proč“ nebo „k čemu slouží“.

### 4. U každé otázky zkontroluj faktickou oporu

Každá správná odpověď musí být dohledatelná v materiálu nebo musí být zcela jednoznačným logickým důsledkem materiálu.

### 5. Vytvoř unikátní ID

Pro počítačové sítě se používá styl:

```text
ps-zaklady-001
ps-zaklady-002
ps-topologie-001
ps-kabelaz-001
ps-modely-001
ps-adresace-001
ps-sluzby-001
```

ID se po vydání otázky nemá měnit jen kvůli přeformátování textu.

### 6. Přidej odpověď a vysvětlení

Samotná odpověď nestačí tam, kde je užitečné vysvětlit důvod. Pro učební účely je vhodné mít `solution` stručné, ale věcné.

### 7. Spusť validaci

```bash
node scripts/validate_questions.js
```

### 8. Prohlédni výsledek ve webu

Otevři `index.html` nebo projekt spusť přes jednoduchý lokální HTTP server. Ověř, že:

- předmět se zobrazí na úvodní stránce,
- filtr funguje,
- téma a podtéma se zobrazí správně,
- odpověď jde zkontrolovat,
- není rozbitá jiná část aplikace.

---

# Jak pracovat se zdrojovými materiály

## Počítačové sítě

Zdrojový `.canvas` je uložen zde:

```text
materialy/pocitacove-site/zdroj/Počítačové sítě - 1. ročník.canvas
```

Pomocné soubory v `zdroj/zpracovani/` vznikly při rozboru canvasu:

- `canvas_dump.txt` – surovější textový dump,
- `canvas_clean_nodes.txt` – očištěný výpis uzlů,
- `nodes_json.json` – uzly v JSON podobě,
- `nodes_summary.txt` – zkrácený přehled.

Tyto soubory jsou vhodné pro rychlé vyhledávání, ale nesmí se automaticky považovat za samostatný nový zdroj učiva.

## Programování

Zdrojový materiál pro osobnosti je v:

```text
materialy/programovani/zdroj/seznam_osobnosti.txt
```

---

# Generátory a dílčí JSON

V počítačových sítích jsou otázky rozdělené i podle částí generování:

```text
materialy/pocitacove-site/generatory/build_part1.js
materialy/pocitacove-site/generatory/build_part2.js
materialy/pocitacove-site/generatory/build_part3.js
materialy/pocitacove-site/generatory/build_part4.js
materialy/pocitacove-site/generatory/build_part5.js
```

Výsledky jsou v:

```text
materialy/pocitacove-site/vystupy/exercises_part1.json
...
materialy/pocitacove-site/vystupy/exercises_part5.json
```

Aktuálně je všech pět částí dohromady **110 síťových úloh**.

Generátory používají `__dirname`, takže je možné je spouštět i z jiného pracovního adresáře. Výstupy se vždy uloží do `materialy/pocitacove-site/vystupy/`.

Příklad:

```bash
node materialy/pocitacove-site/generatory/build_part1.js
```

Pozor: samotné vygenerování JSON ještě neznamená, že se nové otázky automaticky objeví v aplikaci. Aktivní runtime soubor je `network_exercises.js`.

---

# Aktivní runtime data

## `exercises.js`

Obsahuje existující úlohy pro další předměty a exportuje:

```js
window.EXERCISES = [...];
```

## `network_exercises.js`

Obsahuje síťové úlohy a exportuje:

```js
window.NETWORK_EXERCISES = [...];
```

`index.html` je načítá v tomto pořadí:

```html
<script src="exercises.js?v=11"></script>
<script src="network_exercises.js?v=1"></script>
<script src="app.js?v=11"></script>
```

**Pořadí zachovej.** `app.js` musí běžet až po načtení datových skriptů.

---

# Jak přidat nový předmět

Pokud nový předmět používá stejný datový model, není obvykle potřeba upravovat UI.

Stačí přidat úlohy například do nového souboru:

```js
window.NETWORK_EXERCISES = [...]
```

nebo vytvořit nové pole a přidat ho do `state.exercises` v `app.js`.

Doporučený postup při větším novém předmětu je vytvořit samostatný runtime soubor:

```text
chemie_exercises.js
```

vložit jeho `<script>` do `index.html` před `app.js` a přidat příslušné pole do `state.exercises`.

Nedělej kvůli tomu nový způsob vykreslování. Filtry, náhodné sady a kontrola odpovědí jsou založené právě na společném datovém formátu.

---

# Chování kontroly odpovědí

Tohle je důležité při tvorbě otázek:

### Výběr (`choice`)

Porovnává se:

```js
String(selected).trim() === String(e.answer).trim()
```

### Doplňování (`fill`)

Porovnává se text bez ohledu na velikost písmen:

```js
answer.toLowerCase() === expected.toLowerCase()
```

### Číslo (`number`)

Používá se numerické porovnání:

```js
Number(answer.replace(',', '.')) === Number(expected.replace(',', '.'))
```

### Text (`text`)

Aplikace neposuzuje správnost automaticky. Ukáže uživateli jeho odpověď a vzorové řešení.

### Kód (`code`)

Program se skutečně spouští a výstup se porovnává s `expectedOutput` po normalizaci bílých znaků na konci řádků.

---

# Kontrola před odevzdáním

Před dokončením práce proveď minimálně:

```bash
node scripts/validate_questions.js
```

Pak zkontroluj syntax všech JS datových souborů:

```bash
node --check exercises.js
node --check network_exercises.js
node --check app.js
```

A generátory:

```bash
node --check materialy/pocitacove-site/generatory/build_part1.js
node --check materialy/pocitacove-site/generatory/build_part2.js
node --check materialy/pocitacove-site/generatory/build_part3.js
node --check materialy/pocitacove-site/generatory/build_part4.js
node --check materialy/pocitacove-site/generatory/build_part5.js
```

Nakonec ověř, že:

- nejsou duplicitní ID,
- `choice` má odpověď mezi možnostmi,
- nejsou prázdné otázky,
- `number` obsahuje číslo,
- `code` obsahuje řešení a očekávaný výstup,
- nové úlohy mají správný `subject/topic/subtopic`,
- web se normálně načte.

---

# Doporučený styl otázek

Piš otázky tak, aby:

- byly srozumitelné žákovi daného ročníku,
- měly jednu jednoznačnou interpretaci,
- neobsahovaly zbytečné slovní výplně,
- používaly české názvy stejně jako studijní materiál,
- při prvním použití vysvětlily nebo zachovaly důležitou zkratku,
- byly krátké, ale ne na úkor přesnosti.

U výběru z možností nemá být správná odpověď poznat podle délky, gramatiky nebo nápadně odborného stylu.

---

# Co AI nemá dělat

- Nevymýšlet fakta mimo dodaný materiál a vydávat je za obsah materiálu.
- Neměnit existující ID bez důvodu.
- Nepřesouvat `index.html`, `app.js`, `exercises.js` nebo `network_exercises.js` bez aktualizace všech referencí.
- Nevkládat otázky přímo do HTML.
- Nevytvářet pro každou novou dávku vlastní formát dat.
- Nepoužívat `answer` s textem, který není stejný jako jedna z `choices` u `choice`.
- Nenechávat testovací nebo rozpracované otázky v aktivních runtime datech.
- Nechat v otázkách interní poznámky typu „podle AI“, „TODO“, „ověřit později“ apod.

---

# Rychlý checklist pro AI agenta

```text
[ ] Přečetl jsem README.md
[ ] Našel jsem správný zdrojový materiál
[ ] Vybral jsem správné subject/topic/subtopic
[ ] Každá otázka má unikátní ID
[ ] Každá otázka má question + title
[ ] choice má 1 správnou možnost a answer mezi choices
[ ] number má číselný answer
[ ] code má solution + expectedOutput
[ ] solution/hint odpovídá materiálu
[ ] Spustil jsem scripts/validate_questions.js
[ ] Spustil jsem node --check nad upravenými JS
[ ] Ověřil jsem načtení ve webu
```

---

## Stav projektu při vytvoření tohoto README

Počítačové sítě obsahují **110 úloh**. Celý projekt má **161 úloh** ve **3 předmětech**.

Hlavní cílem tohoto README je, aby další AI mohla pokračovat v práci bez nutnosti znovu zjišťovat strukturu projektu, datový formát a způsob zapojení otázek.
