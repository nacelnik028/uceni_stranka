# Doporučení k otázkám – 4. 10. 2026

## Provedené prioritní opravy

Nálezy níže zachycují stav původního auditu. Následně byly vyřešeny:

- U diagnostiky se `items[].detail` zobrazuje pouze v řešení. To platí i pro režim Test, který řešení při odpovídání skrývá.
- `lit-gotika-002` a `lit-renesance-007` už neopakují správnou odpověď v zadání.
- `db-030` je praktický scénář výběru formátu pro aplikaci očekávající tabulková data oddělená čárkami.
- `pg-check-001` je diagnostika vynechaných kontrol před exportem; nevyžaduje pořadí seznamu.
- `lit-renesance-var-003` je krátká úloha na doplnění počtu veršů poslední strofy.
- `lit-baroko-004` jednoznačně rozlišuje Ctnosti od Neřestí.
- `lit-rom-francie-012`, `014`, `015` a `lit-rom-francie-var-004` i zdrojové poznámky opravují trest a epizodu se stříbrem. Valjean ukradl příbory; svícny mu biskup daroval. Podklad: [Hugův román](https://www.gutenberg.org/cache/epub/135/pg135-images.html).
- Doplněno explicitní vysvětlení ke všem 14 úlohám Pythonu, které ho neměly.
- Datový validator nově odmítá i řazení podle pořadí přiloženého seznamu nebo infografiky. Regresi ověřuje `scripts/test_question_rules.js`.
- Obnova sady u změněného zadání nepřenáší staré odpovědi a hodnocení. Nezměněné otázky zůstávají rozepsané.

Počet zůstává **436 úloh a 14 typů**. Nové rozdělení změněných typů: scenario 5, diagnostic 4, order 11, number 21. Další obsahová doporučení níže, například kontrola ostatních literárních formulací a více vstupních případů u kódu, zůstávají k další práci.

Posouzení vychází z aktivního katalogu 436 úloh, jejich zadání a odpovědí, detailní kontroly vybraných možností a z chování rendereru a hodnocení. Strukturální validace není záruka věcné správnosti: validator může projít i u otázky, která je zavádějící nebo příliš snadno prozradí řešení. Nejde o ověření všech faktů proti externím zdrojům; níže jsou konkrétní redakční nálezy a dva ověřené příklady z literatury.

## Co řešit jako první

| Úloha | Problém | Doporučená úprava |
|---|---|---|
| `db-004`, `pg-tech-004`, `pg-tech-005` | Viditelné `items[].detail` přímo vysvětlují, které řádky jsou chybné. Renderer je zobrazuje i během testu. | Vysvětlení zobrazovat až po vyhodnocení nebo v řešení. Před kontrolou ponechat jen neutrální tvrzení. |
| `lit-gotika-002` | Zadání „Jaké dílo Karla IV. představuje Vita Caroli?“ obsahuje očekávanou odpověď Vita Caroli. | Přepsat na otázku po autorovi nebo charakteru díla. |
| `lit-renesance-007` | Zadání se ptá na úvod monologu a současně cituje „Být či nebýt“. | Ptát se na dílo, postavu nebo význam monologu. |
| `db-030` | Počet formátů pro import/export není obecně pevně pět. Seznam, ke kterému se očekávaná odpověď vztahuje, v zadání chybí. Nápověda navíc prozrazuje číslo. | Vyřadit nebo nahradit scénářem: vyber formát pro přenos tabulkových dat. |
| `pg-check-001` | Pořadí kontrol před exportem je vynucené podle pořadí položek v infografice, nikoli podle nutné návaznosti. To odporuje pravidlům README. | Převést na diagnostiku chybných nastavení nebo na výběr potřebných kontrol. |
| `lit-renesance-var-003` | Položky „První čtyřverší“, „Druhé čtyřverší“ apod. už svou pozici říkají. | Použít skutečné úryvky nebo otázku na strukturu sonetu; tuto variantu řazení vyřadit. |
| `ps-topologie-003`, `ps-sluzby-005`, `ps-sluzby-007` | Doplňování zkratky s anglickým rozvinutím v zadání lze často řešit jen opsáním počátečních písmen. | Raději se ptát na funkci v konkrétní situaci. Zkratky nechat jako lehké vstupní opakování. |
| `vwa-favicon-002`, `pg-favicon-013` | Zapamatování čtyř webových generátorů má malý přínos; obsah se navíc překrývá mezi předměty. | Nahradit výběrem správného výstupu a posouzením čitelnosti ikony. |
| `seznamy-029` | Jedna otevřená otázka vyžaduje vysvětlit 12 operací. Na mobilu je odpověď i vlastní kontrola zbytečně rozsáhlá. | Rozdělit do několika krátkých úloh podle témat. |
| `lit-klasicismus-001` | Scénář pouze přidává větu o studentovi s časovou osou k běžné otázce na datum. | Ponechat jako prostý výběr nebo dát skutečný úryvek/charakteristiku období. Označení scenario samo o sobě nezvyšuje přínos. |

## Věcná správnost literatury

- `lit-rom-francie-012`: zadání předpokládá Valjeanův doživotní trest. V románu má celkem 19 let, z toho pět původních a čtrnáct za pokusy o útěk. Opravit otázku i výklad ve zdrojových poznámkách. [Victor Hugo, Les Misérables, kniha I, část II](https://www.gutenberg.org/cache/epub/135/pg135-images.html).
- `lit-baroko-004`: „Kolik lidských ctností a neřestí je spojeno s Kuksem?“ je nejasné při odpovědi 12. Historický soubor tvoří 12 Ctností a 12 Neřestí. Otázka musí výslovně určit jednu skupinu nebo obě dohromady. [Oficiální web obce Kuks – historický areál](https://www.kuks.cz/turistika/informace-pro-turisty/historicky-lazensky-areal/historicky-lazensky-areal-fotogalerie/historicky-lazensky-areal-34cs.html).
- Následně ověřit formulace `lit-roman-002` (všechny nabídnuté rotundy a jednoznačnost odpovědi), `lit-klasicismus-001` (časové vymezení a kontext), `lit-renesance-006` (žánrové označení Dekameronu), `lit-rom-stendhal-004` až `007` a `lit-rom-francie-var-006` (Juliánova životní cesta). Dodaný přepis může být zjednodušený; nekopírovat ho bez obsahové kontroly do dalších úloh.

## Které typy ponechat, omezit nebo slučovat

| Typ | Počet | Doporučení |
|---|---:|---|
| `choice` | 240 | Ponechat pro základní pojmy, ale část převést na aplikaci znalostí. Tvoří přibližně 55 % katalogu. |
| `multi` | 34 | Ponechat. Vyhnout se jediné očividně nesmyslné možnosti proti mnoha správným; nabídnout vysvětlení jednotlivých voleb. |
| `match` | 19 | Ponechat. Vhodné pro autora/dílo, SQL/účel nebo protokol/funkci. Na mobilu zachovat výběr možností; nevyžadovat přetahování. |
| `order` | 13 | Ponechat jen při skutečné časové nebo procedurální návaznosti. Vyřadit varianty založené na pořadí seznamu nebo popiscích První/Druhé. |
| `text` | 38 | Ponechat krátká vysvětlení se self-checkem. 21 současných úloh automaticky hodnotí jména osobností; ty lze později zobrazovat jako krátkou odpověď místo velkého textového pole. |
| `fill` | 32 | Ponechat pro jednoznačné hodnoty a zkratky. Otevřené definice hodnotit vlastním porovnáním; `db-023` už to správně dělá. |
| `number` | 21 | Ponechat skutečné výpočty. Omezit počítání položek z poznámek a izolované letopočty bez souvislostí. |
| `code` | 16 | Rozšířit, ale zlepšit kontrolu: současné porovnání jediného výstupu umožňuje napsat jen pevný print očekávaného výsledku. |
| `conversion` | 9 | Ponechat a rozvíjet přes existující generátor; doplnit rozbor chyby nebo kontrolu mezikroků. |
| `scenario` | 4 | Rozšířit skutečné rozhodování v situaci. Scénář nesmí být jen ozdobná věta před definicí. |
| `diagnostic` | 3 | Rozšířit po odstranění prozrazených vysvětlení. Velmi vhodné pro chyby v kódu, SQL a konfiguraci sítě. |
| `classification` | 3 | Rozšířit. Vhodné pro formáty/použití, příkazy/skupiny a vlastnosti/prostředí. |
| `compare` | 3 | Ponechat, pokud porovnání opravdu pomáhá. Do budoucna může sdílet datové schéma s classification o dvou kategoriích. Není nutné dělat migraci jen kvůli menšímu počtu typů. |
| `image-choice` | 1 | Rozšířit o otázky vyžadující pozorování obrázku. Nezahlcovat telefon velkou infografikou s drobným textem. |

Nedoporučuji plošně mazat celé typy. Mazat nebo nahrazovat konkrétní slabé úlohy. `choice`, `scenario` a `image-choice` mohou interně sdílet kontrolu výběru, přesto má smysl zachovat odlišnou prezentaci.

## Další zjištění

- U 142 z 240 jednoduchých výběrových otázek je správná odpověď delší než každá nesprávná možnost. To není samo o sobě chyba, ale může vznikat odhadnutelný vzorec. Možnosti sjednotit délkou, jazykem a věrohodností.
- 377 úloh nemá explicitní difficulty a aplikace ji odvozuje podle typu a dalších znaků. Náročnost je vhodnější určit podle potřebných znalostí a počtu kroků, později upravovat podle lokální úspěšnosti.
- 14 úloh Pythonu nemá explicitní solution. Některé umí zobrazit odpověď, ale chybí vysvětlení, proč je správná.
- Některé otázky se překrývají mezi předměty, zejména favicon. Označit společný vzdělávací cíl, aby náhodná sada z více předmětů neopakovala stejnou znalost několikrát.
- Diagnostické otázky mají vedle nového schématu někdy stará pole choices/answers. Při další úpravě je odstranit, aby nebylo nejasné, která data jsou závazná.
- Kontrolu „pořadí v materiálu“ rozšířit i na formulace typu „jak jsou uvedeny v přiloženém seznamu“. Současný validator `pg-check-001` propustí.

## Co přidat nejdřív

1. **Najdi a oprav chybu v Pythonu.** Krátký program s jednou konkrétní chybou indexování nebo práci se seznamem. Nejdřív diagnostika, pak vlastní oprava kódu.
2. **Předpověz výstup.** Přesný výstup krátkého programu před spuštěním; lze použít fill/text s jednoznačnou kontrolou, bez nového rendereru.
3. **SQL nad malou tabulkou.** Ukázat několik řádků dat a nechat určit výsledek SELECT nebo vybrat správný filtr. Později kontrolovat dotazy pomocí SQLite ve WebAssembly přímo v prohlížeči.
4. **Diagnostika sítě.** Adresa, maska, brána a výsledek diagnostiky; vybrat chybný údaj a vysvětlit důvod. Použít scenario nebo diagnostic.
5. **Interpretace literárního úryvku.** Krátký úryvek z poskytnutého/licenčně vhodného textu, určit znak období a doložit ho konkrétní formulací. Použít choice a krátký self-check.
6. **Výběr grafického výstupu podle zakázky.** Logo pro billboard, fotografie pro web nebo grafika pro tisk; rozhodovat z požadavků, nikoli opsat řádek infografiky.
7. **Doplň mezikrok převodu.** Vyplnit podíl/zbytek nebo chybějící krok Hornerova schématu. Následně lze přidat obecný typ s více krátkými vstupy.

Nový typ má smysl hlavně pro **více propojených vstupů** (tabulka výsledků, mezikroky, parametry konfigurace). Většinu ostatních nápadů lze postavit na existujících typech. Na mobilu používat tlačítka a výběry, přetahování případně jako volitelný způsob ovládání.

## Doporučené pořadí práce

Nejprve odstranit prozrazená řešení a věcné/nejednoznačné otázky. Potom přidat jednu praktickou úlohu ke každému důležitému tématu. Nakonec rozšiřovat generování a hodnocení více vstupních případů u kódu. Všechno lze provozovat staticky na GitHub Pages; případné WebAssembly knihovny přinášejí větší objem načítání, proto je načítat až pro příslušný předmět.

Aktuální stav provedených oprav je uveden na začátku dokumentu. Tabulky s původními počty typů a nálezy zůstávají jako záznam auditu.
