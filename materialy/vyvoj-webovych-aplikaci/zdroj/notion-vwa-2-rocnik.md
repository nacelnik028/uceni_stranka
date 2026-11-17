# Vývoj webových aplikací – 2. ročník (Notion VWA)

Podklad: Notion, Zápisy 2.D (2026/2027) → [VWA](https://app.notion.com/p/3d4bceb1e41380f0bc07c10356bb58a2). Načteno 17. 11. 2026.

Runtime: `data/vwa_2_rocnik_exercises.js`, pole `WEBDEV_2_EXERCISES`, předmět **Vývoj webových aplikací**.

| Stránka v Notionu | Téma v procvičovně |
|---|---|
| HTTP – stavové kódy | HTTP stavové kódy |
| Jednostránkový web – vzhled a formuláře (Rozvržení, pozadí a kotvy; HTML formulář) | Jednostránkový web a formuláře |
| Programovací jazyky – Hello World a typické použití | Programovací jazyky |
| SWOT analýza; TOWS – strategie a příklad školního bufetu | SWOT a TOWS |
| GitHub Desktop a Render | GitHub Desktop a Render |
| Osobnosti informatiky a webu | už pokryto tématem *Osobnosti* v `data/exercises.js` |

## Klíčové body

- HTTP: 200 OK, 401 nepřihlášeno, 404 nenalezeno, 500 chyba serveru; třídy 2xx/4xx/5xx.
- CSS: margin × padding, `body { margin: 0 }`, `background-size: cover` × `100% 100%`, procentní výška závisí na rodiči, text-align × justify-content, z-index v kontextu vrstvení; názvy souborů malými písmeny se spojovníky; Go Live.
- Kotva: `<a href="#odber">` → `<section id="odber">`.
- Formulář: typy input (text, email, password, number, search, color, month, week, time, checkbox, radio, submit), label for = id, placeholder není hodnota, name × id, samotné HTML odběr nezajistí.
- Jazyky: Python (van Rossum), C (Ritchie), C++ (Stroustrup), Java (Gosling, JVM), C# a TypeScript (Hejlsberg), JavaScript (Eich), PHP (Lerdorf, `<?php`), Go (Google; Docker, Kubernetes), Rust (Hoare; vlastnictví a výpůjčky). Flask × Django. TIOBE / Stack Overflow / Octoverse měří různé věci.
- SWOT: S, W vnitřní; O, T vnější. TOWS: SO, ST, WO, WT. Akční plán: co, kdo, prostředky, termín. Omezení: subjektivní, bez vah.
- GitHub Desktop: commit (místní) × push (vzdálený). Render: deploy ze sledované větve, bezplatná web service usíná po 15 min nečinnosti, probuzení ~1 min.
