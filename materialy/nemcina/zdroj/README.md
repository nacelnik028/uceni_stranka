# Němčina – lekce 6: Mein Tagesablauf

Podklady načtené 6. 11. 2026 přes připojený Notion:

- [Test z NEJ](https://app.notion.com/p/410bceb1e413809c8f09f18fc91b5cdb) → `test-lekce-6.md`.
- [Slovíčka – Lekce 6 (NEJ)](https://app.notion.com/p/410bceb1e413813d8598e119fd0847fb) → `slovicka-lekce-6.md`.

Runtime: `data/nemcina_exercises.js`, pole `GERMAN_EXERCISES`. Nový předmět je **Němčina**.

## Pokrytí

Celkem 265 úloh v sedmi tématech:

- Slovní zásoba – lekce 6: 152 úloh. Všech 133 slovníkových položek má vlastní otázku na význam; doplněno přiřazováním, členy a množným číslem.
- Čas a časové výrazy: 31 úloh.
- Odlučitelná slovesa a časování: 31 úloh.
- Denní režim a slovosled: 11 úloh.
- Osobní zájmena a 4. pád: 16 úloh.
- Přivlastňovací zájmena: 14 úloh.
- Domlouvání schůzky a volný čas: 10 úloh.

Slovníček pokrývá všechny uvedené položky stran 74–83, doplňkové výrazy i všech šest zkratek do zpráv. Alternativy uvedené v jednom řádku (např. gern / gerne) zůstávají jednou položkou. Čísla stran slouží jen k doložení zdroje; žádná otázka nezkouší pořadí ani umístění slova na stránce.

U podkladů zachováváme zápis původních stránek. V zadáních znak `|` uvnitř slovesa odstraňujeme, protože označuje předponu a nepatří do běžného německého zápisu. Synonyma Bad / Badezimmer a anmachen / einschalten nejsou navzájem chybné možnosti. U otevřených překladů a vlastních vět je vlastní porovnání se vzorem, aby jiný správný slovosled nebyl odmítnut. Jednoslovné doplňování je jednoznačně vymezené a zachovává význam přehlásek.

Čtyři stručné studijní přehledy doplňují otázky v knihovně učiva.

## Ověření

```text
node scripts/validate_questions.js
node scripts/validate_study_guides.js
node scripts/test_nemcina.js
```

Poslední kontrola nezávisle čte uložený slovníček a ověřuje vlastní otázku a přesný překlad každé položky. Kontroluje také vykreslení všech úloh v Učení i Testu, samostatné hodnocení otevřených odpovědí a zachování přehlásek při doplňování.
