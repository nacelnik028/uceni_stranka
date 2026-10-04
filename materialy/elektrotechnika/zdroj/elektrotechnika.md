# Elektrotechnika – přepis dodaných poznámek

Podklad: čtyři fotografie školních poznámek dodané uživatelem 4. 10. 2026. Přepis zachovává témata a zpřesňuje zápis jednotek. Poslední fotografie končí slovy „Pro měď“ a neobsahuje hodnotu teplotního součinitele.

## Elektrický proud

Elektrický proud je uspořádaný pohyb elektricky nabitých částic. V kovech jsou pohyblivými nositeli náboje volné elektrony.

Pro stálý proud platí I = Q / t, kde I je proud v ampérech (A), Q náboj v coulombech (C) a t čas v sekundách (s). Platí 1 A = 1 C / s.

Příklad: za 3 s projde náboj 6 C. I = 6 / 3 = 2 A.

## Odpor, rezistor a Ohmův zákon

Odpor je vlastnost prostředí nebo součástky. Elektrický odpor R vyjadřuje, jak součástka omezuje průchod proudu. Jednotkou je ohm (Ω). Rezistor je součástka s určitou hodnotou odporu. Napětí U měříme ve voltech (V).

Pro ohmický rezistor platí I = U / R, R = U / I, U = R · I.

Voltampérová charakteristika je graf závislosti proudu I na napětí U. Pro rezistor se stálým odporem je to přímka procházející počátkem.

## Rezistivita a odpor vodiče

Při stejné teplotě závisí odpor homogenního vodiče na jeho materiálu, délce a průřezu:

R = ρ · l / S

- R: elektrický odpor v Ω.
- ρ: rezistivita materiálu; pro zde používaný zápis v Ω·mm²/m.
- l: délka vodiče v m.
- S: průřez vodiče v mm².

Delší vodič má větší odpor; větší průřez znamená menší odpor, pokud jsou ostatní podmínky stejné. Různé materiály mají při stejných rozměrech různý odpor. Rezistivita je materiálová veličina, odpor patří konkrétnímu vodiči.

Příklad z poznámek: l = 2 m, S = 1 mm², ρ = 0,056 Ω·mm²/m. Správné dosazení je R = 0,056 · 2 / 1 = 0,112 Ω = 112 mΩ. Ručně zapsaný mezikrok s délkou 2000 není konzistentní se zadanou jednotkou rezistivity; konečný výsledek 0,112 Ω odpovídá dosazení 2 m.

## Odpor a teplota

U běžných kovových vodičů odpor s teplotou roste. Příčinou je větší rozptyl vodivostních elektronů při intenzivnějších kmitech krystalové mřížky.

Teplotní součinitel odporu α (K⁻¹) vyjadřuje, jak výrazně se odpor mění s teplotou. Pro menší teplotní rozsah přibližně platí:

R = R₀ · (1 + α · ΔT)

- R₀: odpor při výchozí teplotě v Ω.
- R: odpor při nové teplotě v Ω.
- ΔT: nová minus výchozí teplota v K; rozdíl má stejnou číselnou hodnotu i v °C.
- α: teplotní součinitel odporu v K⁻¹.

Ne všechny materiály se chovají stejně. U PTC při růstu teploty odpor roste, u NTC klesá. Závislost se využívá při měření teploty, kompenzaci a ochraně zařízení.

Částečné zadání na posledním obrázku: měděné vinutí má při 20 °C odpor R₀ = 10 Ω a při provozu se zahřeje na 70 °C. Hodnota α na dodaném výřezu chybí. V odvozené otázce je výslovně zadáno zaokrouhlení α = 0,004 K⁻¹ pro tento výpočet: ΔT = 50 K, R = 10 · (1 + 0,004 · 50) = 12 Ω. Toto doplnění není přepis chybějící části fotografie.
