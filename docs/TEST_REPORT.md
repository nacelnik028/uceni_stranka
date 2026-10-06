# Kontrolní zpráva projektu Procvičovna

## Hardware – 6. 10. 2026

- Přidáno 150 úloh v 15 tématech: 94 výběrových, 20 scénářů, 7 s více odpověďmi, 9 přiřazovacích, 13 otevřených vysvětlení, 5 výpočtů a 2 řazení navazujících kroků.
- Celý katalog obsahuje 740 úloh a 740 unikátních ID. Knihovna má 20 přehledů pro 10 předmětů; dvě nová opakování jsou pro SSD a USB.
- Prošly oba datové validátory, `scripts/test_question_rules.js`, kontroly syntaxe upravených JavaScriptů a `git diff --check`.
- Headless Microsoft Edge: karta Hardware, 15 tematických karet a celá sada 150 úloh. Přes skutečné ovládací prvky bylo u všech 137 automaticky hodnocených úloh ověřeno přijetí správné a odmítnutí chybné odpovědi. U všech 13 otevřených otázek ověřeno zobrazení vzorového řešení.
- Ověřeny dva přehledy a otevření článku USB. Scénář v režimu Test má neutrální okamžitou odezvu a skrývá řešení. Mobilní viewport 390 × 844 px bez vodorovného přetékání a bez `pageerror`.
- Podklad: text 963 obsahových podstránek OrgPadu Hardware 2. ročník. Obrázky, videa a externí přílohy nebyly přepisovány; výběr otázek a zpřesnění podkladu dokumentuje `materialy/hardware/zdroj/README.md`.

## Kybernetická bezpečnost – 6. 10. 2026

- Nový modul: 110 úloh v 11 tématech (68 výběrových, 18 scénářů, 8 s více odpověďmi, 4 přiřazovací a 12 otevřených vysvětlení).
- Aktivní katalog nyní obsahuje 590 úloh s 590 unikátními ID; knihovna 18 přehledů pro 9 předmětů.
- Prošly `node scripts/validate_questions.js`, `node scripts/validate_study_guides.js`, `node scripts/test_question_rules.js`, kontroly syntaxe a `git diff --check`.
- Headless Microsoft Edge: otevření karty nového modulu, všech 11 témat a celé sady 110 úloh. U všech 98 automaticky hodnocených úloh ověřena správná odpověď přes skutečné ovládací prvky; u všech 12 otevřených úloh zobrazení řešení bez automatické známky.
- Režim Test u scénáře nezobrazuje okamžitou známku ani řešení. Na mobilním viewportu 390 × 844 px bez vodorovného přetékání; žádné `pageerror`.
- Podklad je textový export OrgPadu; obrázky, videa a externí přílohy nebyly přepisovány. Otázky pokrývají hlavní učivo, nikoli každou jednotlivou buňku.

## Sjednocení vzhledu – 4. 10. 2026

- Chromium: úvod, témata, knihovna a článek při šířkách 320, 375, 390, 768 a 1280 px v obou motivech, bez vodorovného přetékání.
- Na úvodu je právě jedna zvýrazněná hlavní akce. Bez uložené sady a chyb jsou příslušná tlačítka skrytá; po vytvoření sady se hlavní akcí stane pokračování.
- Viditelná tlačítka na úvodu mají alespoň 44 px na výšku. Běžná mobilní textová pole a výběr zobrazení používají písmo 16 px; přepínač režimu má čitelný popis i v aktivním stavu.
- Na viewportu 390 × 844 px začíná text běžné otázky v horních 70 % obrazovky. Dlouhá zadání a otevřená nastavení mohou vyžadovat posun.
- Kontrola screenshotů úvodu na desktopu i mobilu a mobilní otázky. Automatický test nezachytil žádný pageerror.
- Znovu ověřeno obnovení odpovědí všech 14 typů a rozložení všech 436 otázek na pěti šířkách v obou motivech.

Testováno v emulovaných velikostech Chromium; fyzický telefon a Safari nebyly součástí ověření.

## Prioritní obsahové opravy – 4. 10. 2026

- Katalog má stále 436 úloh a 436 unikátních ID. Validator otázek, validator přehledů a kontroly syntaxe upravených JavaScriptů procházejí.
- `node scripts/test_question_rules.js` ověřuje odmítnutí řazení podle seznamu/infografiky a povolení logického postupu.
- Chromium: 13 upravených nebo dotčených úloh, každá se správnou i nesprávnou odpovědí; ověřeno také neutrální zaznamenání odpovědi v režimu Test a konečné hodnocení po dokončení.
- Diagnostická zadání v režimu Test nezobrazují vysvětlení položek; rozbor je v řešení.
- Obnovení sady po změně otázky odstraní starou odpověď i známku, ale zachová odpověď a hodnocení nezměněné otázky. Ověřena i starší uložená sada bez podpisu zadání.
- Upravené otázky a otevřená řešení: šířky 320, 375, 390, 768 a 1280 px v obou motivech, žádné vodorovné přetékání ani pageerror.
- Věcné opravy trestu a stříbra v Bídnících ověřeny podle románu, počty Ctností/Neřestí podle oficiálního webu Kuksu. Odkazy jsou v `docs/OTAZKY_DOPORUCENI.md` a zdrojových poznámkách.

## UI/UX a mobilní procvičování – 4. 10. 2026

Ověřeno v Chromium přes lokální HTTP server s cestou `/procvicovna/`, tedy i s prefixem odpovídajícím projektovému webu na GitHub Pages:

- Rychlá sada obsahuje pět otázek; Pokračovat je bez uložené sady skryté a deaktivované.
- Výběr všech sedmi předmětů a všech jejich témat, včetně volby Všechna témata, vytváří odpovídající neprázdné sady.
- Jedna otázka / Celá sada, Předchozí / Další a aktivní otázka mobilní kontroly.
- Obnovení stránky a pokračování zachovávají odpovědi všech 14 typů: volby, text, kód, párování, třídění a pořadí. Ověřeno také obnovení konkrétního podtématu a ID sady.
- Chybná odpověď zpřístupní rychlou akci Procvičit chyby.
- Dokončit test je viditelné i se zavřeným Nastavením sady a vytvoří shrnutí.
- Všech 436 otázek vykresleno v celém seznamu na šířkách **320, 375, 390, 768 a 1280 px**, v obou motivech; kontrola přetékání jednotlivých karet i dokumentu bez nálezu. Na stejných šířkách ověřeno přepnutí na jednu viditelnou otázku.
- Propojení přehled → procvičování → přehled → návrat do sady.
- **0 pageerror**; zkontrolován také mobilní screenshot a zmenšená výška záhlaví.

Validator otázek nyní prochází: původních devět chyb obrázku bylo opraveno přejmenováním na `rastrova-vektorova-grafika.png` a aktualizací odkazů. Kontrola přehledů a JS syntaxe také prochází.

Tyto browser kontroly ověřují UI, ukládání a strukturu, nikoli věcnou správnost všech odpovědí. Python prostředí z externího CDN se v tomto testu nespouštělo; neproběhl test na fyzickém telefonu ani Safari. Obsahové nálezy a doporučení jsou v `docs/OTAZKY_DOPORUCENI.md`.

## Studijní přehledy – 4. 10. 2026

Pro novou statickou knihovnu bylo ověřeno:

- 12 přehledů pokrývá sedm předmětů; validátor `node scripts/validate_study_guides.js` potvrdil unikátní ID, zdroje a existující témata otázek.
- Syntaxe `app.js`, `study-guides.js`, `data/study_guides.js` a nového validátoru prošla kontrolou Node.js.
- Chromium: katalog, výběr předmětu, hledání bez diakritiky a prázdný výsledek hledání.
- Všech 12 tlačítek Procvičit téma vytvořilo neprázdnou sadu se správným předmětem a tématem v režimu Učení; staré hledání a filtry typu a obtížnosti se nepřenášejí.
- Otevření přehledu a návrat do sady zachovaly ID otázek, DOM a rozepsaný kód.
- Všech 12 článků bylo zkontrolováno na šířkách 320, 390 a 1280 px v obou motivech: 72 kontrol bez horizontálního přetékání.
- Mobilní kontrolní lišta je při čtení skrytá; tlačítko Připomenout učivo je v režimu Test skryté.
- Navigace domů funguje; nebyla zachycena žádná chyba `pageerror`.

**Stav při přidání přehledů:** kontrola otázek hlásila devět neexistujících obrazových cest u `pg-img-001` až `pg-img-009`. Následná revize UI/UX popsaná výše je opravila. Nové přehledy tyto obrázky nepoužívají.

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
