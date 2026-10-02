# Typy interaktivních otázek Procvičovny

Tento dokument popisuje nové univerzální typy úloh přidané do aplikace. Jsou navržené tak, aby se daly používat napříč předměty – například v Počítačové grafice, Databázích, Číslicové technice, Vývoji webových aplikací, Literaturě i Počítačových sítích.

Cílem není vytvářet pro každé téma nový renderer. Typ otázky má určovat **způsob interakce**, zatímco obsah se mění pouze daty.

## 1. Obecný princip

Každá úloha stále používá stejné základní atributy:

```js
{
  subject: 'Počítačová grafika',
  topic: 'Export grafiky',
  subtopic: 'Volba formátu',
  id: 'pg-scenario-001',
  type: 'scenario',
  title: '...',
  question: '...',
  solution: '...',
  hint: '...',
  tags: ['...'],
  difficulty: 2
}
```

Nové typy přidávají pouze data potřebná pro danou interakci.

Aplikace je automaticky zahrnuje do:

- filtru typu úlohy,
- náhodného výběru sady,
- průběhu a statistik,
- režimu **Učení** i **Test**,
- kontrolního mechanismu a řešení.

## 2. `scenario` – scénářová otázka

### K čemu slouží

Používá se, když je vhodné zasadit otázku do krátké praktické situace. Student nejprve přečte kontext a potom vybere řešení.

Typ je vhodný pro rozhodování typu:

- „Co bys použil v této situaci?“
- „Která varianta odpovídá zadání?“
- „Které nastavení zvolíš?“

### Datový formát

```js
{
  type: 'scenario',
  scenario: 'Klient chce logo použít na vizitce i billboardu.',
  question: 'Kterou variantu zvolíš pro hlavní pracovní soubor loga?',
  choices: [
    'Vektorovou grafiku',
    'Rastrovou grafiku s nízkým rozlišením',
    'Animovaný GIF',
    'Pouze fotografii'
  ],
  answer: 'Vektorovou grafiku'
}
```

### Jak funguje v aplikaci

1. Aplikace zobrazí scénář v samostatném zvýrazněném panelu.
2. Pod něj vykreslí běžný výběr jedné možnosti.
3. Kontrola používá stejný princip jako `choice`.
4. V režimu **Učení** se okamžitě zobrazí správnost.
5. V režimu **Test** se pouze zaznamená odpověď a správnost se ukáže až v závěrečném vyhodnocení.

### Proč je typ univerzální

Mechanika výběru je stejná jako u `choice`, ale scénář mění charakter úlohy. Proto lze jednoduchou definici převést například z:

```text
„K čemu slouží DDL?“
```

na:

```text
„Administrátor vytváří novou tabulku a definuje její strukturu. Co zde použije?“
```

## 3. `diagnostic` – najdi chybu

### K čemu slouží

Student dostane několik tvrzení, nastavení, řádků nebo položek a musí označit právě ty, které jsou chybně.

Je vhodný pro:

- hledání chyby v konfiguraci,
- odhalování nesprávných tvrzení,
- kontrolu nastavení webu nebo tisku,
- hledání vadných řádků kódu či tabulek.

### Datový formát

```js
{
  type: 'diagnostic',
  question: 'Označ všechna chybná přiřazení.',
  items: [
    {
      id: 'web-srgb',
      label: 'Web → sRGB',
      detail: 'Toto přiřazení je správně.',
      correct: false
    },
    {
      id: 'web-cmyk',
      label: 'Web → CMYK',
      detail: 'Toto přiřazení je chybně.',
      correct: true
    },
    {
      id: 'print-cmyk',
      label: 'Tisk → CMYK',
      detail: 'Toto přiřazení je správně.',
      correct: false
    }
  ],
  answerIds: ['web-cmyk']
}
```

`answerIds` obsahuje ID všech chybných položek. To je důležité: aplikace neporovnává pořadí, ale přesnou množinu označených ID.

### Jak funguje v aplikaci

- Každá položka má vlastní checkbox.
- Student může označit více položek.
- Úloha je správně pouze tehdy, když jsou vybrány **všechny a jen chybné položky**.
- V testu se správnost skryje do dokončení sady.

### Výhoda

Typ se hodí téměř na cokoliv, kde chceme testovat schopnost odhalit problém. Nezáleží na oboru.

## 4. `classification` – třídění / zařazení

### K čemu slouží

Student zařazuje více položek do připravených kategorií.

Na rozdíl od klasického `match` nemusí mít každá položka unikátní cílovou odpověď. Více položek může patřit do stejné kategorie.

### Datový formát

```js
{
  type: 'classification',
  question: 'Zařaď každý formát k typickému použití.',
  categories: [
    'Fotografie',
    'Průhlednost',
    'Tisk'
  ],
  items: [
    { id: 'jpeg', text: 'JPEG', category: 'Fotografie' },
    { id: 'png', text: 'PNG', category: 'Průhlednost' },
    { id: 'pdf', text: 'PDF', category: 'Tisk' }
  ]
}
```

### Jak funguje v aplikaci

1. Aplikace zobrazí položku.
2. U ní nabídne tlačítka všech kategorií.
3. Kliknutím student vybere kategorii pro danou položku.
4. Vybraná kategorie se vizuálně zvýrazní.
5. Úloha je kompletní až po zařazení všech položek.
6. Kontrola porovná každé `item.id` s očekávaným `item.category`.

### Proč není stejný jako `match`

`match` pracuje jako párování **jedna položka → jeden unikátní pravý protějšek**.

`classification` pracuje jako **mnoho položek → několik kategorií**.

Například:

```text
JPEG ─┐
PNG  ─┼→ Rastrové
GIF  ─┘

SVG  ─┐
AI   ─┼→ Vektorové
EPS  ─┘
```

To je typický případ, kde je třídění přirozenější než párování.

## 5. `compare` – porovnání dvou stran

### K čemu slouží

Student dostane dvě varianty nebo dva pojmy a u několika tvrzení rozhoduje, na kterou stranu tvrzení patří.

Příklady:

- Rastr × vektor
- Web × tisk
- TCP × UDP
- Entita × atribut
- Jedna technologie × druhá technologie

### Datový formát

```js
{
  type: 'compare',
  question: 'Rozhodni, ke kterému prostředí jednotlivá tvrzení patří.',
  leftLabel: 'Web',
  rightLabel: 'Profesionální tisk',
  criteria: [
    {
      id: 'px',
      text: 'Jednotky: pixely (px)',
      answer: 'left'
    },
    {
      id: 'cmyk',
      text: 'Barevný prostor: CMYK',
      answer: 'right'
    }
  ]
}
```

### Jak funguje v aplikaci

- Každé tvrzení má dvojici voleb: levá strana / pravá strana.
- Student musí zvolit stranu u všech tvrzení.
- Správnost se vyhodnocuje po jednotlivých kritériích.
- Jediná chybná volba znamená, že celá úloha není správně.

### Výhoda

Tento typ velmi dobře nahrazuje otázky typu „Vyber správné tvrzení o A a B“, protože student musí jednotlivé informace skutečně rozdělit.

## 6. `image-choice` – otázka založená na obrázku

### K čemu slouží

Používá se tam, kde je obrázek podstatnou součástí zadání a bez jeho prohlédnutí by student otázku neměl řešit pouze podle textu.

### Datový formát

```js
{
  type: 'image-choice',
  question: 'Která část ilustrace představuje raster?',
  choices: [
    'Levá část s pixely',
    'Pravá část s křivkami',
    'Ani jedna'
  ],
  answer: 'Levá část s pixely',
  image: 'materialy/pocitacova-grafika/zdroj/media/rastrová-vektorová-grafika.png',
  imageAlt: 'Porovnání rastru a vektoru',
  imageCaption: 'Porovnání rastru a vektoru'
}
```

### Jak funguje v aplikaci

- Nejdříve se vykreslí obrázek v `question-figure`.
- Pod něj se zobrazí výrazně označené odpovědi.
- Mechanika hodnocení je stejná jako u jednoho výběru.
- Rozdíl je hlavně v UX a významu obrázku: obrázek je součástí řešení, nikoli pouze dekorace.

### Kdy jej použít

Například:

- poznávání grafiky,
- síťové topologie,
- schéma databáze,
- technické diagramy,
- screenshoty uživatelského rozhraní,
- mapy a vývojové diagramy.

## 7. Jak typy kombinovat

Nové typy nejsou izolované. Jednotlivé principy lze kombinovat s běžnými poli a prostředím.

### `scenario` + obrázek

Scénář může mít zároveň `image`, takže student nejdříve dostane situaci a poté ji interpretuje podle obrázku.

### `diagnostic` + obrázek

Do `diagnostic.items` lze dát například několik nastavení nebo řádků, které jsou vidět přímo v infografice.

### `classification` + odborné kategorie

Kategorie nemusí být jen „Rastr / Vektor“. Může jít například o:

- HTML / CSS / JavaScript,
- primární klíč / cizí klíč,
- vstup / výstup,
- hardware / software.

### `compare` + praktický scénář

Otázka může nejprve popsat situaci a potom nechat studenta porovnat dvě možné varianty.

## 8. Jak přidat nový typ do projektu

Při přidávání dalšího typu je potřeba upravit vždy stejné části aplikace:

1. `normalizeExercises()` – aby se nová data zachovala po načtení.
2. `validateExercises()` v `app.js` – rychlá kontrola runtime dat.
3. `renderExercise()` – samotné vykreslení UI.
4. `attachExerciseEvents()` – reakce na interakci a kontrolu odpovědi.
5. `readExerciseResponse()` – čtení odpovědi při dokončování nebo v testu.
6. `solutionBlock()` – zobrazení správného řešení.
7. `inferDifficulty()` – případná výchozí obtížnost.
8. `checkActionForExercise()` a Enter zkratka – aby šla úloha kontrolovat stejným způsobem jako ostatní.
9. `index.html` – položka v nabídce filtru typu a potřebné CSS.
10. `scripts/validate_questions.js` – pevná datová validace při buildu.

## 9. Pravidla pro datovou kvalitu

Nové typy mají stejné základní požadavky jako starší typy:

- `id` musí být unikátní v celém projektu.
- Otázka musí být řešitelná samostatně.
- Správná odpověď nesmí být prozrazena v `tags`.
- Položky a kategorie nesmí být duplicitní tam, kde by to znejasňovalo řešení.
- Odpovědi musí být deterministické, aby šly bezpečně hodnotit.
- Obrázkové úlohy musí mít existující `image` a smysluplné `imageAlt`.

## 10. Co je vhodné kdy použít

| Potřeba | Doporučený typ |
|---|---|
| Jedna správná odpověď bez kontextu | `choice` |
| Praktická situace a rozhodnutí | `scenario` |
| Označení všech chybných položek | `diagnostic` |
| Rozdělení více položek do kategorií | `classification` |
| Porovnání dvou variant podle více tvrzení | `compare` |
| Otázka, kde je klíčový obrázek | `image-choice` |
| Více správných nezávislých možností | `multi` |
| Unikátní párování dvojic | `match` |
| Chronologické nebo procedurální pořadí | `order` |

## 11. Reálné příklady, které jsou už v projektu

Nové typy byly nasazeny na existující úlohy, aby se otestovalo, že nejde pouze o teoretické API.

### Vývoj webových aplikací

- `vwa-header-008` → `scenario`
- `vwa-favicon-004` → `compare`

### Databáze

- `db-004` → `diagnostic`
- `db-009` → `classification`
- `db-013` → `scenario`

### Počítačové sítě

- `ps-zaklady-009` → `compare`

### Literatura

- `lit-klasicismus-001` → `scenario`

### Číslicová technika

- `ct-zaklady-007` → `classification`

### Počítačová grafika

- `pg-vector-001` → `scenario`
- `pg-img-001` → `image-choice`
- `pg-affinity-002` → `classification`
- `pg-affinity-006` → `compare`
- `pg-tech-004` → `diagnostic`
- `pg-tech-005` → `diagnostic`

Celkový počet úloh se tím nemění; mění se způsob interakce a prezentace vybraných úloh.
