# Kontrolní zpráva po reorganizaci a rozšíření projektu

Datum kontroly: 30. 9. 2026

Poslední UI revize: 30. 9. 2026

## Co bylo zkontrolováno

- ZIP se otevírá bez chyby a neobsahuje `.git` metadata.
- `index.html` odkazuje na všechny aktivní runtime soubory v `data/`.
- Aktivní validator prošel všech 342 statických úloh a našel 342 unikátních ID.
- Všechny JS soubory mají platnou syntaxi (`node --check`).
- Odpovědi všech 9 statických úloh typu `conversion` sedí při nezávislé kontrole.
- Po přidání funkcí nebyly zachyceny `pageerror` ani konzolové chyby v DOM testu.

## Stav dat

| Předmět | Úloh |
|---|---:|
| Programování | 30 |
| Vývoj webových aplikací | 56 |
| Počítačové sítě | 110 |
| Literatura | 106 |
| Číslicová technika | 40 |
| **Celkem** | **342** |


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

Validator v tomto dodaném ZIPu potvrzuje **342 aktivních úloh** a unikátní ID. To se liší od čísla 377 uvedeného v původním README; UI proto používá dynamický počet načtených úloh. Chybějících 35 úloh nebylo v aktivních `data/*.js` nalezeno a nebyly v této revizi domýšleny.

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

### Poznámka k prostředí testu

Původní kontrolní text obsahoval tvrzení o dřívějším DOM testu nad 377 úlohami, které neodpovídá aktuálním aktivním datům v ZIPu. Tato revize proto jako autoritativní zdroj počtu používá výstup `scripts/validate_questions.js` a nově přidané UI kontroly vztahuje k aktuálním runtime souborům.
