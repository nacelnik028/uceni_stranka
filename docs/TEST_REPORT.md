# Kontrolní zpráva po reorganizaci a rozšíření projektu

Datum kontroly: 30. 9. 2026

Poslední UI revize: 30. 9. 2026

## Co bylo zkontrolováno

- ZIP se otevírá bez chyby a neobsahuje `.git` metadata.
- `index.html` odkazuje na všechny aktivní runtime soubory v `data/`.
- Aktivní validator prošel všech 377 statických úloh a našel 377 unikátních ID.
- Všechny JS soubory mají platnou syntaxi (`node --check`).
- Odpovědi všech 9 statických úloh typu `conversion` sedí při nezávislé kontrole.
- Po přidání funkcí nebyly zachyceny `pageerror` ani konzolové chyby v DOM testu.

## Stav dat

| Předmět | Úloh |
|---|---:|
| Programování | 30 |
| Vývoj webových aplikací | 56 |
| Databáze | 35 |
| Počítačové sítě | 110 |
| Literatura | 106 |
| Číslicová technika | 40 |
| **Celkem** | **377** |


### Nový materiál – Header a favicon

Do modulu **Vývoj webových aplikací** bylo přidáno 35 nových úloh z materiálu `materialy/vyvoj-webovych-aplikaci/zdroj/header-a-favicon.md`. Úlohy pokrývají význam a prvky headeru, typy headerů, responzivní mobilní header, přístupnost dotykových cílů, význam favicony, branding, SEO/CTR, velikosti a formáty ikon, online generátory a nastavení favicony ve WordPressu.

Rozdělení nových úloh: 18× `choice`, 6× `multi`, 3× `match`, 2× `order`, 3× `fill`, 3× `text`.

## Nové funkce

### Filtry

Do studijní hlavičky byl přidán pátý filtr **Obtížnost** s hodnotami 1–5. Starším úlohám bez explicitního `difficulty` aplikace při načtení odvozuje obtížnost podle typu a obsahu. Výslovně uvedené hodnoty se validují proti rozsahu 1–5.

Funkční test na obtížnosti 4 v Číslicové technice zobrazil 7 úloh a všech 7 mělo správný štítek `Těžká`.

### Učení vs. Test

Přepínač **📘 Učení / 📝 Test** je aktivní i na mobilu. V režimu Test: 

- jsou skryté nápovědy a řešení,
- průběžná kontrola neodhaluje správnost, pouze zaznamená odpověď,
- zpřístupní se tlačítko **Dokončit test**,
- po dokončení se zobrazí statistika sady.

Automatizovaný DOM test ověřil všechny čtyři body bez chyb.

### Generované úlohy

V Číslicové technice funguje **✨ Generovat nové příklady**. Generátor vytváří runtime varianty pro převody soustav a pro Hornerovo schéma.

Ověřeno zvlášť:

- filtr `conversion` zobrazil generované převody,
- filtr `number` zobrazil generované numerické úlohy pro Hornerovo schéma,
- při zvolené obtížnosti 5 měly generované úlohy štítek `Velmi těžká`,
- generované úlohy používají jedinečná runtime ID a nepřepisují zdrojová data `data/*.js`.

### Lokální statistika konkrétní sady

Po zodpovězení celé sady v režimu Učení se statistika zobrazí automaticky. V režimu Test se zobrazí po **Dokončit test**. Panel obsahuje celkové skóre, počet zodpovězených úloh, otevřené self-checky a rozpad podle témat.

Výsledek se ukládá pouze lokálně přes `localStorage`; pokud prohlížeč storage zablokuje, používá se pouze paměťová záloha pro aktuální stránku.

Automatizovaný test ověřil vytvoření panelu a lokálního záznamu statistiky.

## Runtime UI test

Aplikace byla testována přes Chromium/Playwright nad skutečným DOM runtime (`index.html` + `app.js` + všechny datové skripty). Testované šířky viewportu:

- 320 px
- 375 px
- 390 px
- 768 px
- 1280 px

Na všech šířkách byla úvodní stránka i studium Číslicové techniky bez horizontálního přetečení. Na všech šířkách byl viditelný nový přepínač režimu a bylo přítomno všech 5 filtrů.

## Funkční regresní test

Všechny původní typy úloh zůstaly zapojené:

| Typ | Úloh | Kontrolní ovládání |
|---|---:|---|
| `choice` | 185 | 185/185 |
| `multi` | 10 | 10/10 |
| `match` | 8 | 8/8 |
| `order` | 8 | 8/8 |
| `text` | 27 | 27/27 dle režimu self-check/osobnost |
| `fill` | 24 | 24/24 |
| `number` | 20 | 20/20 |
| `code` | 16 | 16/16 |
| `conversion` | 9 | 9/9 |

Navíc byly po změnách znovu ověřeny:

- správné kontroly úloh Číslicové techniky,
- `×` u řazení a jeho znovuzpřístupnění položky,
- reset řazení,
- Enter u převodu soustavy,
- načtení všech 5 předmětů,
- všechny původní typy a jejich odpovídající tlačítka,
- žádné konzolové chyby.

## Struktura a dokumentace

Aktivní web zůstává oddělený od zdrojových materiálů a archivu:

```text
index.html
app.js
data/
scripts/
materialy/
archiv/
docs/
README.md
```

Nové funkce a jejich datová pravidla jsou popsány v `README.md` a doplňující struktura je uvedena v `docs/STRUKTURA.md`.

## Kontrola po UI úpravách

Po poslední úpravě UI byla znovu zkontrolována responzivita a interaktivní prvky.

- mobilní filtry jsou standardně sbalené a po změně filtru se zavřou,
- desktopové filtry zůstávají otevřené,
- přepínač Učení/Test má obě volby jako dotykově použitelné ovládání,
- progress bar odpovídá počtu zodpovězených úloh,
- shrnutí sady je dostupné v režimu Učení i Test a obsahuje akce pro opakování nebo novou sadu,
- generované úlohy Číslicové techniky se po UI změnách stále zobrazují a lze je kontrolovat,
- `findExercise()` dohledává i runtime generované úlohy,
- na šířkách 320, 375, 390, 768 a 1280 px nebylo horizontální přetečení ani zachycená `pageerror`/konzolová chyba.

## Závěr kontroly

**Kontrolní stav: OK.** Regresní testy prošly, nové funkce prošly a mobilní rozvržení zůstalo bez horizontálního přetečení.

- Režim Učení: ruční zobrazení shrnutí sady přes tlačítko `Zobrazit shrnutí sady` ověřeno.


## Aktuální UI revize – 30. 9. 2026

### Implementované změny

- výchozí světlý motiv s přepínačem na tmavý motiv a lokálním uložením preference,
- vyhledávání napříč názvem, otázkou, kategoriemi, tagy a textem kódových úloh,
- kódový editor s čísly řádků, zvýrazněním základních syntaktických tokenů a podporou `Tab` / `Shift+Tab`,
- červené zobrazení chyb při spuštění kódu, včetně čísla řádku Python chyby, pokud je dostupné,
- mobilní sticky tlačítko `Zkontrolovat` pro právě aktivní úlohu,
- tlačítko `Procvičit jen chyby` v shrnutí sady, které sestaví novou sadu z objektivně chybných hodnocených úloh.

### Aktuální validační stav

Validator v dodaném projektu potvrzuje **377 aktivních úloh** a 377 unikátních ID. Původní tvrzení o 342 úlohách se týkalo neaktuální kopie projektu; aktivní kořenová data obsahují také 35 úloh z materiálu `header-a-favicon.md`. UI proto používá dynamický počet načtených úloh.

### Mobil / responzivita

Ověřovány jsou viewporty 320, 375, 390, 768 a 1280 px. U mobilu byla zvlášť kontrolována fixní spodní lišta, bezpečná spodní mez přes `env(safe-area-inset-bottom)`, zásobník tlačítek, kódový editor a horizontální přetečení dokumentu.

Výsledek aktuálního Chromium DOM testu:

| Šířka | Horizontální overflow | Sticky `Zkontrolovat` | Sticky kontrola aktivní úlohy |
|---:|---|---|---|
| 320 px | ne | ano | ano |
| 375 px | ne | ano | ano |
| 390 px | ne | ano | ano |
| 768 px | ne | ne | — |
| 1280 px | ne | ne | — |

### Funkční test nových prvků

- motiv: přepnutí `light → dark → light` ověřeno,
- vyhledávání: dotaz `append` zúžil aktuální pool na 5 úloh,
- kódový editor: čísla řádků a syntax highlighting byly přítomné, `Tab` vložil 4 mezery,
- chyba kódu: výstup dostal třídu `output bad` a obsahoval údaj `řádek 3`,
- procvičení chyb: při 1 záměrně špatné odpovědi z pětice vznikla akce `Procvičit jen chyby` a po kliknutí nová sada obsahovala právě 1 chybnou úlohu,
- žádné `pageerror` ani chybové konzolové zprávy v testovaném DOM runtime.

### Oprava podpory klávesy Tab – 30. 9. 2026

Po regresní kontrole byla podpora `Tab` v kódových úlohách upravena. Handler je nyní delegovaný na `document` v capture fázi, takže přežije nové vykreslení úloh a nezávisí na opakovaném připojování listeneru ke konkrétní instanci editoru. V editoru `Tab` vloží 4 mezery, `Shift+Tab` odebere odsazení aktuálního řádku/bloku a mimo kódový editor zůstává nativní navigace Tabem. Na mobilu je zároveň `tab-size` sjednocený na 4, aby se vizuální šířka odsazení shodovala s vloženými 4 mezerami.

### Poznámka k prostředí testu

Kontrolní dokumentace byla sjednocena s aktivním kořenem projektu. Autoritativním zdrojem počtu úloh je výstup `scripts/validate_questions.js` a UI testy se vztahují k runtime souborům v kořeni projektu.

## Finální browser regression – 30. 9. 2026

Přes Chromium/Playwright bylo provedeno 72 automatizovaných kontrol na skutečném DOMu aplikace. Všech 72 prošlo.

Ověřeno bylo:

- úvodní stránka, počty 377 úloh / 6 předmětů / 23 témat,
- přepínání světlého a tmavého motivu,
- otevření procvičování, náhodné sady 5 / 10 / 15 úloh,
- vyhledávání a filtr předmětu / typu / obtížnosti,
- všech 9 typů úloh a jejich kontrolní akce,
- `Tab` vloží 4 mezery, `Shift+Tab` odstraní odsazení aktuálního řádku, `Enter` v editoru vytvoří nový řádek,
- syntax highlighting a synchronizace čísel řádků,
- zobrazení výstupu kódu a červené chyby s číslem řádku,
- zobrazení/skrytí řešení a režim Test,
- generování nových příkladů v Číslicové technice,
- shrnutí sady a „Procvičit jen chyby“,
- sticky tlačítko „Zkontrolovat“ na 320 / 375 / 390 px,
- absence horizontálního přetečení na 320 / 375 / 390 / 768 / 1280 px,
- nulové `pageerror` a konzolové chyby v testovaném runtime.

Python startovací kód všech 16 úloh typu `code` byl navíc samostatně zkompilován CPythonem; všech 16 fragmentů prošlo syntaktickou kontrolou. Integrace tlačítka pro Python byla v browser testu ověřena s mockem Pyodide, protože sandbox neumožňuje spolehlivě načíst externí CDN runtime. Samotné načtení produkčního Pyodide z CDN proto není tímto testem potvrzeno.


## Finální vizuální/regresní oprava – 30. 9. 2026

Po zpětné vazbě byla vrácena původní vizuální hierarchie úvodní stránky: každá z 6 karet předmětů má stabilní barevný akcent a ikonu podle názvu předmětu. Výchozí motiv je opět tmavý; světlý motiv je stále dostupný přes přepínač a uložení preference. Modul **Databáze** je zachovaný v aktivních datech (`35` úloh `db-*`) i ve zdrojích `materialy/databaze/`.

Kódový editor má `Tab = 4 mezery`, `Shift+Tab` pro odebrání jednoho odsazení, čísla řádků a syntax highlighting; mobilní styl používá shodně 4mezerné tabulátory.


## UX úprava hlavičky studia – 30. 9. 2026

Do hlavičky studia byl zaveden princip **progress-first**: na první pohled zůstává pouze přepínač režimu a průběh aktuální sady. Vyhledávání, pět filtrů, velikost sady a obslužná tlačítka jsou uvnitř sbalitelného panelu **Nastavení sady**, který je po vstupu do studia standardně zavřený. Progress bar je `position: sticky`, takže zůstává viditelný i při scrollování dlouhou sadou.

Na mobilu má `.mobile-check-bar` `z-index: 50`; `.toast` je posunut nad ní pomocí `bottom: calc(82px + env(safe-area-inset-bottom))` a `z-index: 60`, takže potvrzovací/chybové hlášky nejsou překryté spodní lištou.

## Audit zadání a oprav otázek – 1. 10. 2026

Byla provedena celková kontrola všech 377 úloh v aktivním kořeni projektu.

- 377 úloh, 377 unikátních ID; validátor hlásí 0 kritických chyb.
- V textu žádné otázky nezůstaly odkázané na pořadí nebo obsah „materiálu“; celkem 0 výskytů problematických formulací ve viditelném zadání.
- Úloha `db-022` už nevyžaduje pořadí uvedené ve studijním materiálu; byla změněna na objektivní výběr správných dvojic SQL skupina → příkaz.
- Úloha `db-028` je samostatně formulovaná a tagy tématu/klíčová slova se ve vykresleném zadání nezobrazují; zůstává pouze obtížnost.
- Úloha `db-029` už není triviální opakované přiřazování stejné položky, ale otevřená otázka na uvedení více formátů.
- Byla opravena terminologie `DDL / DQL / DML / DCL / TCL` a související vysvětlení ve zdroji databází.
- Duplicitní literární otázky `lit-opakovani-001/002/003` byly obsahově rozlišeny.
- Překlep `Dario Amondei` → `Dario Amodei` byl opraven.
- Všech 10 zbývajících úloh typu `order` má logické, chronologické nebo technické pořadí; žádná nevyžaduje znalost pořadí ve studijním materiálu.
- Provedena kontrola viditelnosti tagů, zdrojově závislých formulací, duplicit otázek a konzistence odpovědí napříč datovými soubory.

### Mobilní/regresní kontrola

Chromium smoke test proběhl na šířkách `320 / 375 / 390 / 768 / 1280 px` bez horizontálního přetečení a bez `pageerror`. Na 390 px byla ověřena interakce v procvičování, sticky kontrolní lišta a odeslání správné odpovědi na `db-022`.

### Kódové úlohy

Všech 16 úloh typu `code` bylo zkompilováno CPythonem a všechny prošly syntaktickou kontrolou; očekávané výstupy byly ověřeny při samostatném spuštění.

## Audit pravidla pro tagy – 1. 10. 2026

- Validátor `scripts/validate_questions.js` nově kontroluje, zda žádný tag není správnou odpovědí úlohy.
- Kontrola zahrnuje správné hodnoty pro `choice`, `multi`, `match`, `order`, `fill`, `number`, `conversion`, `text` a `code`.
- Porovnání je odolné vůči velikosti písmen, diakritice, běžné interpunkci a Markdown delimitérům, aby nešlo pravidlo obejít jen změnou zápisu.
- Z aktivních dat byly odstraněny tagy, které toto pravidlo porušovaly.
- Výsledná kontrola: **377 úloh, 377 unikátních ID, 0 kritických chyb**.
