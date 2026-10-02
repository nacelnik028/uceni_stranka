# Kontrolní zpráva projektu Procvičovna

## Finální audit – 2. 10. 2026

Po rozšíření o univerzální typy `scenario`, `diagnostic`, `classification`, `compare` a `image-choice` proběhla závěrečná kontrola dat, formulací, JavaScriptu, vykreslení, interakcí, obrázků a mobilního rozhraní.

> **Poznámka k „100 %“:** žádný test v jednom prostředí nemůže matematicky zaručit bezchybný chod ve všech existujících prohlížečích, operačních systémech a zařízeních. Níže je ale uveden rozsah skutečně provedených kontrol v tomto prostředí.

## Výsledek

**Audit neodhalil žádnou kritickou chybu.**

Aktivní katalog obsahuje:

- **436 úloh**
- **436 unikátních ID**
- **436 unikátních normalizovaných zadání**
- **7 předmětů**
- **14 typů úloh**

## 1. Datová a strukturální kontrola všech 436 úloh

Bylo ověřeno:

- přítomnost ID a zadání,
- odpovědi proti možnostem u `choice`, `scenario` a `image-choice`,
- množiny správných odpovědí u `multi`,
- vazby položek u `match`,
- přítomnost a konzistence pořadí u `order`,
- vazby `answerIds` u `diagnostic`,
- platnost kategorií u `classification`,
- platnost `left` / `right` u `compare`,
- existence obrázku u `image-choice`,
- duplicitní zadání,
- prázdná nebo poškozená data (`undefined`, `NaN`, `[object Object]`),
- základní interpunkce zadání,
- formulace odkazující na neviděný „materiál“ nebo „podklad“.

Výsledek: **0 problémů v těchto kontrolách.**

## 2. JavaScript a syntaxe

Ověřeny byly všechny aktivní datové JS soubory, validační skripty a `app.js` pomocí Node.js syntax check.

Výsledek: **všechny JS soubory prošly bez syntaxické chyby.**

Současně:

- `scripts/validate_questions.js` → **OK**
- katalog → **436 / 436 validních ID**
- žádná kritická datová chyba

## 3. Nové univerzální typy

Aktuálně je v datech:

| Typ | Počet |
|---|---:|
| `scenario` | 4 |
| `diagnostic` | 3 |
| `classification` | 3 |
| `compare` | 3 |
| `image-choice` | 1 |
| **Celkem** | **14** |

Každý z těchto typů byl skutečně vykreslen v Chromium DOM runtime.

U všech 14 konkrétních úloh bylo otestováno:

- správné řešení → zobrazí správnou zpětnou vazbu,
- záměrně špatné řešení → zobrazí chybovou zpětnou vazbu,
- otevření řešení → zobrazí neprázdné vysvětlení,
- režim Test → odpověď se pouze zaznamená a nevyhodnocuje jako správná/chybná,
- u `classification` i resetování výběru,
- u `compare` i neúplné zadání,
- vyhodnocení podle ID položek, nikoli pouze podle jejich pořadí.

Výsledek: **0 selhání interakcí.**

## 4. Obrázky a obrazové otázky

V celém katalogu je **20 obrazových referencí** a všechny odkazují na existující soubory.

Pro obrazovou úlohu `pg-img-001` byl ověřen skutečný PNG asset:

`materialy/pocitacova-grafika/zdroj/media/rastrová-vektorová-grafika.png`

Soubor se načetl jako PNG o rozměru **2048 × 1143 px** a má vyplněný smysluplný `alt` text.

## 5. Vykreslení všech 436 úloh

Browser test prošel katalog všech **436 aktivních úloh**.

Výsledek:

- `render_fail`: **0**
- `controls_fail`: **0**
- prázdná zadání: **0**
- poškozený text v DOM: **0**

To znamená, že každá aktivní úloha byla alespoň jednou skutečně předána rendereru a odpovídající typ ovládání byl přítomen.

## 6. Mobilní test

Testované šířky:

**320, 360, 375, 390, 414, 768 px**

Navíc byla kontrolována desktopová šířka **1280 px**.

Na mobilu bylo ověřeno:

- žádné horizontální přetečení,
- nové typy se vejdou do viewportu,
- ovládací prvky jsou dostupné,
- mobilní sticky tlačítko `Zkontrolovat` je viditelné,
- sticky lišta má na mobilu `position: fixed`,
- lišta nepřesahuje šířku viewportu,
- kliknutí na sticky kontrolu ověří skutečně aktivní úlohu.

Výsledek: **0 mobilních layout chyb.**

## 7. Kontrola formulací otázek

Byl proveden obsahový audit všech **436 zadání** se zaměřením na:

- duplicity,
- nesmyslné nebo poškozené formulace,
- neúplná zadání,
- odpovědi, které nejsou mezi možnostmi,
- možnosti se stejným textem,
- zbytečně absolutní nebo časově rychle zastarávající formulace,
- odkazy na „podklad“ nebo „materiál“, které by byly problémem bez zobrazení zdroje.

Na základě tohoto průchodu byly upraveny zejména tyto formulace:

- `db-002` – odstraněno spojení „open data (big data)“, protože jde o dva odlišné pojmy,
- `lit-rom-francie-004` – opravena formulace „nevzhledný“,
- `pg-export-001` – opraveno „z této šestice“ na „z uvedených formátů“, protože otázka měla pět možností,
- `osobnosti-001` – odstraněno subjektivní slovo „zásadní“,
- `osobnosti-009` – zjednodušena a zpřesněna formulace,
- `osobnosti-020` – odstraněn subjektivní superlativ,
- `vwa-favicon-001` – odstraněno zbytečné „dnes“,
- `vwa-header-023` – nahrazeno absolutní „musí“ formulací „je důležité“,
- `ps-topologie-007` – odstraněno „dnes“ a „nejčastěji“,
- `ps-zaklady-021` – odstraněno časově proměnlivé „dnes nejčastěji“.

Po opravách zůstává katalog beze změny na **436 úlohách** a obsahový audit aktuálně vrací **0 nalezených problémů** ve výše uvedených kontrolách.

## 8. Číslicové konverze

U numerických úloh v modulu **Číslicová technika** byly znovu ověřeny známé hodnoty konverzí, například:

- `2101₃ → 64`
- `11011₂ → 27`
- `101101₂ → 45`
- `190₁₀ → 10111110₂`
- `100₁₀ → 1100100₂`
- `127₁₀ → 1111111₂`
- `1111111₂ → 127`
- `1100100₂ → 100`
- `10111110₂ → 190`

Výsledek: **0 nesrovnalostí v kontrolovaných výsledcích.**

## 9. Konzole a runtime chyby

Po interakcích v browser testu:

- `pageerror`: **0**
- konzolové chyby typu `error`: **0**

## Závěr

Aktuální verze projektu je po provedených kontrolách v konzistentním stavu. Nové univerzální typy fungují, všech 436 úloh lze vykreslit, nové interakce byly otestovány správnými i chybnými vstupy, obrazové reference jsou platné a mobilní testy prošly na všech zvolených šířkách.

Kompletní technický popis nových typů je v:

`docs/TYPY_OTAZEK.md`
