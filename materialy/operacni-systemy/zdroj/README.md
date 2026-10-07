# OSY – 2. ročník – 26/27

Zdroj: [OrgPad OSY – 2. ročník – 26/27](https://orgpad.info/s/hXrxCHhCtTA?embed=true), načtený 7. 10. 2026. `orgpad-osy-2-rocnik.txt` obsahuje text 94 obsahových podstránek seskupený podle nadřazených buněk. Obrázky a externí přílohy nejsou přepisovány. Export zachovává původní formulace, nikoli opravenou učebnici.

`data/operacni_systemy_exercises.js` obsahuje 100 redakčně vytvořených otázek v 10 tématech: organizace souborových systémů, FAT/exFAT, NTFS metadata, EFS/kvóty/VSS, modely přístupu, NTFS ACL, POSIX ACL, shell/objekty, pipeline a CSV/nápověda/moduly. Všechna zadání jsou samostatně řešitelná a mají řešení i obtížnost. Otevřená vysvětlení mají vlastní kontrolu; výpočty obsahují explicitní předpoklady.

## Zpřesnění podkladu

- Zápis a čtení jsou oddělená oprávnění. U NTFS záleží na pořadí a explicitních/zděděných položkách. Prázdná DACL zamítá běžný přístup, null DACL přístup tímto seznamem neomezuje. [Microsoft – DACLs and ACEs](https://learn.microsoft.com/en-us/windows/win32/secauthz/dacls-and-aces), [pořadí ACE](https://learn.microsoft.com/en-us/windows/win32/secauthz/order-of-aces-in-a-dacl).
- POSIX maska omezuje pojmenované uživatele a skupinovou třídu, nikoli vlastníka a other. Default ACL je šablona pro nové objekty, při vytvoření ji omezuje také požadovaný režim. [Linux man-pages – acl(5)](https://www.man7.org/linux/man-pages/man5/acl.5.html).
- Import-Csv převádí řádky na objekty, ale hodnoty jejich vlastností běžně zůstávají textem. Format-* vytváří formátovací instrukce; není správné předpokládat zachování původních datových objektů za formátováním. [Microsoft – Import-Csv](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/import-csv), [Format-Table](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/format-table).
- CPU u procesu je akumulovaný procesorový čas, nikoli okamžité procento využití. $_ je aktuální objekt v příslušném bloku, ne obecně celá kolekce. Windows Terminal je hostitelské rozhraní a není totožný s PowerShellem.
- MFTMirr není kopie celé MFT a Update Sequence Array nezaručuje opravu libovolného poškození. Žurnálování a lokální VSS snapshot nenahrazují nezávislou zálohu.
- FAT32 limit souboru je 4 GiB minus 1 B. Teoretické maximální velikosti svazků, možnosti edic a přítomnost ovladačů se nezkoušejí jako univerzální aktuální konstanty.
- EFS je souborové šifrování, nikoli BitLocker. Soukromý klíč je potřeba chránit a zajistit jeho obnovu; neopíráme úlohy o zjednodušené univerzální cesty v registru nebo o domnělou obnovu bez příslušného klíče.

Sada respektuje konkrétní obsah OrgPadu; nejde o obecný kurz všech oblastí OS. Nezahrnuje nepodložené otázky o plánování procesů nebo virtuální paměti, které v tomto podkladu nejsou rozvedeny. Historické a verze závislé formulace podkladu jsou vynechány.
