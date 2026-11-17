# Programování – Specifikace počítače

Podklad: Notion, Zápisy 2.D (2026/2027) → PRG → [Specifikace počítače](https://app.notion.com/p/3ddbceb1e41380b1a9c6fc70b34ec272). Načteno 17. 11. 2026. Jde o údaje ze Správce úloh (karta Výkon) na školním počítači.

Runtime: `data/programovani_specifikace_exercises.js`, pole `PRG_SPEC_EXERCISES`, předmět **Programování**, téma *Specifikace počítače*.

| Součást | Údaje |
|---|---|
| Procesor | 13th Gen Intel Core i7-13700, základní rychlost 2,10 GHz, 1 soket, 16 jader, 24 logických procesorů, virtualizace povolena, L1 1,4 MB, L2 24 MB, L3 30 MB |
| Paměť | 32 GB DDR5, 4400 MT/s, použité sloty 2 ze 4, DIMM, rezervováno hardwarem 295 MB |
| Disk 0 (C:) | Micron MTFDKBA1T0TFK, SSD, kapacita 954 GB, systémový disk, obsahuje stránkovací soubor |
| Ethernet | Intel Ethernet Connection (17) I219-LM, IPv4 10.11.25.111, IPv6 fe80::…%14 |
| GPU 0 | NVIDIA T1000 8GB, DirectX 12 (FL 12.1), sběrnice PCI 1 |
| GPU 1 | Intel UHD Graphics 770 (integrovaná), DirectX 12 (FL 12.1), sběrnice PCI 0 |

Doplňující výklad v otázkách (obecně platné souvislosti): i7-13700 má 8 výkonných jader s Hyper-Threadingem a 8 úsporných jader bez něj, proto 16 jader = 24 vláken; adresa 10.x.x.x je privátní; fe80:: je link-local IPv6; Windows udává kapacitu disku v binárních jednotkách.
