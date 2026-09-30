# Číslicová technika – číselné soustavy

Tento soubor je čistý přepis a strukturování obsahu z dodaných ručně psaných poznámek. Slouží jako zdroj pro otázky v modulu **Číslicová technika**.

## Základní soustavy

- Nejpopulárnější soustava je **desítková neboli dekadická**. Pracuje s číslicemi `0–9` a má základ `10`.
- **Osmičková** soustava má základ `8` a číslice `0–7`.
- **Čtyřková** soustava má základ `4` a číslice `0–3`.
- **Dvojková neboli binární** soustava má základ `2` a číslice `0–1`.
- **Šestnáctková neboli hexadecimální** soustava má základ `16`.
  - `A = 10`
  - `B = 11`
  - `C = 12`
  - `D = 13`
  - `E = 14`
  - `F = 15`

## Konverze

**Konverze** znamená převod informace z jedné soustavy do druhé.

Poznámky zmiňují převody mezi soustavami a vazbu binární soustavy na počítače a výpočetní techniku. Dále je uvedena souvislost se základy programování a Booleovou algebrou.

## Převod čísla do dekadické soustavy

Poznámky uvádějí **Hornerovo schéma** a poziční zápis pomocí mocnin základu.

Obecně pro číslice `a_m` a základ `z` platí poziční součet tvaru:

`F_z = Σ a_m · z^m`

Počet členů v sumačním vzorci odpovídá počtu číslic čísla.

Pro číslo s pěti číslicemi jsou použité mocniny `z⁴, z³, z², z¹, z⁰`.

### Příklad: 2101₃

`F₃ = 2·3³ + 1·3² + 0·3¹ + 1·3⁰`

`F₃ = 2·27 + 1·9 + 0·3 + 1·1`

`F₁₀ = 64`

### Příklad: 11011₂

`F₂ = 1·2⁴ + 1·2³ + 0·2² + 1·2¹ + 1·2⁰`

`F₁₀ = 16 + 8 + 0 + 2 + 1 = 27`

## Převod z dekadické soustavy

V poznámkách je popsán převod pomocí **postupného dělení základem cílové soustavy** a práce se zbytky.

Při převodu z `F₁₀` do soustavy se základem `z`:

1. číslo dělíme základem `z`,
2. zapíšeme zbytek po dělení,
3. pokračujeme s podílem,
4. opakujeme do chvíle, kdy je další podíl `0`,
5. zbytky přečteme od posledního k prvnímu.

### Příklad: 190₁₀ → ₂

Postupná dělení dávají zbytky `0, 1, 1, 1, 1, 0, 1, 1` od prvního dělení k poslednímu. Po přečtení opačně dostaneme:

`190₁₀ = 10111110₂`

### Příklad: 100₁₀ → ₂

Po postupném dělení dvěma získáme výsledný zápis:

`100₁₀ = 1100100₂`

Zpětnou kontrolou:

`1100100₂ = 64 + 32 + 4 = 100₁₀`
