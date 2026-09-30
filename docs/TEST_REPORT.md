# Kontrolní zpráva po reorganizaci a rozšíření projektu

Datum kontroly: 30. 9. 2026

## Co bylo zkontrolováno

- ZIP se otevírá bez chyby a neobsahuje `.git` metadata.
- `index.html` odkazuje na všechny aktivní runtime soubory v `data/`.
- Aktivní validator prošel všech 307 statických úloh a našel 307 unikátních ID.
- Všechny JS soubory mají platnou syntaxi (`node --check`).
- Odpovědi všech 9 statických úloh typu `conversion` sedí při nezávislé kontrole.
- Po přidání funkcí nebyly zachyceny `pageerror` ani konzolové chyby v DOM testu.

## Stav dat

| Předmět | Úloh |
|---|---:|
| Programování | 30 |
| Vývoj webových aplikací | 21 |
| Počítačové sítě | 110 |
| Literatura | 106 |
| Číslicová technika | 40 |
| **Celkem** | **307** |

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

## Závěr kontroly

**Kontrolní stav: OK.** Regresní testy prošly, nové funkce prošly a mobilní rozvržení zůstalo bez horizontálního přetečení.

- Režim Učení: ruční zobrazení shrnutí sady přes tlačítko `Zobrazit shrnutí sady` ověřeno.
