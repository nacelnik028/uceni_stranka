# Kontrolní zpráva po reorganizaci projektu

Datum kontroly: 30. 9. 2026

## Co bylo zkontrolováno

- ZIP se otevírá bez chyby a neobsahuje `.git` metadata.
- `index.html` odkazuje na všechny aktivní runtime soubory v `data/`.
- V projektu nezůstaly mimo `archiv/` staré odkazy na původní kořenové názvy datových skriptů.
- V reorganizovaném projektu nejsou problematické názvy souborů s mojibake/uniklými znaky.
- Všechny JS soubory mají platnou syntaxi (`node --check`).
- Generátory počítačových sítí se po přesunutí stále spouštějí a zapisují výstupy do `materialy/pocitacove-site/vystupy/`.
- Aktivní validator prošel všech 307 úloh a našel 307 unikátních ID.
- Odpovědi všech 9 úloh typu `conversion` byly nezávisle přepočítány a všechny sedí.

## Stav dat

| Předmět | Úloh |
|---|---:|
| Programování | 30 |
| Vývoj webových aplikací | 21 |
| Počítačové sítě | 110 |
| Literatura | 106 |
| Číslicová technika | 40 |
| **Celkem** | **307** |

## Runtime UI test

Aplikace byla otevřena v Chromium headless prostředí přes skutečný DOM (lokální runtime skripty byly pro test vloženy inline, protože sandbox blokuje navigaci přímo na `localhost`/`file://`). To znamená, že se vykonával stejný `index.html` + `app.js` + datové skripty; test pouze obešel omezení sandboxu při načítání lokální URL.

Testované šířky viewportu:

- 320 px
- 375 px
- 390 px
- 768 px
- 1280 px

Na všech těchto šířkách byl ověřen předmět **Číslicová technika** a současně bylo zkontrolováno, že dokument horizontálně nepřetéká.

## Funkční testy

- Úvodní stránka obsahuje všech 5 předmětů.
- Karta **Číslicová technika** se otevře a nastaví správný titul.
- Filtry předmětu, tématu, podtématu a typu úlohy se vykreslí bez JS chyb.
- Všechny podporované typy mají odpovídající ovládání:
  - `choice`: 185 kontrolních tlačítek pro 185 úloh
  - `multi`: 10/10
  - `match`: 8/8
  - `order`: 8/8
  - `text`: 27 úloh; správné self-check tlačítko podle tématu
  - `fill`: 24/24
  - `number`: 20/20
  - `code`: 16/16
  - `conversion`: 9/9
- U číslicové techniky byla reálně provedena kontrola správné odpovědi pro `choice`, `multi`, `match`, `order` a všech 9 `conversion` úloh.
- U `order` byla reálně otestována funkce `×`: vybraná položka se odstraní z řazení a znovu se zpřístupní v paletě.
- U `order` funguje také reset „Začít znovu“.
- U `conversion` funguje kontrola přes tlačítko i přes Enter.
- U `fill`, `number` a `text` byla ověřena příslušná kontrolní logika/ovládání.
- U `code` byla ověřena přítomnost spouštěcího tlačítka u všech 16 úloh a validace povinných polí; samotný Pyodide runtime závisí na dostupnosti CDN v reálném zařízení.
- Návrat tlačítkem Domů funguje.
- Nebyly zachyceny žádné `pageerror` ani konzolové chyby v testovaném UI runtime.

## Poznámka k reorganizaci

Aktivní webový runtime je nyní oddělený od zdrojových materiálů a od starých pracovních souborů:

```text
index.html
app.js
data/             # aktivní otázky
scripts/           # validace
materialy/         # zdroje, generátory, výstupy
archiv/            # staré pomocné kopie
```

GitHub Pages používá pouze kořenový `index.html` a jeho aktivní soubory. `.git` z balíčku není součástí exportu a nemá se kopírovat přes existující Git repozitář.
