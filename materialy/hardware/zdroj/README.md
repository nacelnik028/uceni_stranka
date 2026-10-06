# Hardware 2. ročník – podklad pro otázky

Zdroj: [OrgPad Hardware 2. ročník](https://orgpad.info/s/H7mSOVmlt1P?embed=true), načtený 6. 10. 2026. Soubor `orgpad-hardware-2-rocnik.txt` obsahuje text 963 obsahových podstránek seskupený podle nadřazených buněk. Obrázky, videa a externí přílohy nejsou přepisovány. Export zachovává původní formulace; není opravenou učebnicí.

Aktivní sada v `data/hardware_exercises.js` obsahuje 150 samostatně řešitelných otázek v 15 tématech. Pokrývá firmware, HDD, SSD, připojení disků, karty a pásky, síťová úložiště, USB, zobrazování, grafiku, vstupní zařízení, síťové adaptéry, bezdrátové technologie a tisk. Opakovaný obsah je sloučen do vzdělávacích cílů. Sada není otázkou ke každému jednotlivému obrázku nebo historické buňce.

Každá úloha má vysvětlení a obtížnost. Otevřená vysvětlení používají vlastní kontrolu. Výpočty mají explicitní jednotky a předpoklady; kapacita LBA se počítá podle velikosti **logického** bloku a nejvyšší adresa je počet bloků minus jedna. Řazení se opírá o skutečnou návaznost, nikoli o pořadí informací v OrgPadu.

## Zpřesnění podkladu

- USB-C označuje konektor; samo nezaručuje rychlost, obrazový výstup ani konkrétní výkon. [USB-IF – názvosloví a schopnosti USB-C](https://www.usb.org/sites/default/files/usb_type-c_language_product_and_packaging_guidelines_20230320.pdf), [USB Power Delivery](https://www.usb.org/usb-charger-pd).
- V30 vyjadřuje minimální sekvenční zápis 30 MB/s podle podmínek standardu. [SD Association – rychlostní třídy](https://www.sdcard.org/press/thoughtleadership/anatomy-of-an-sd-memory-card-what-matters-most-for-photography-and-videography/).
- M.2 je formát a konektor, nikoli synonymum NVMe. U disků a karet se nemíchají protokoly, rozměry a generace rozhraní; chybná tabulka podkladu přiřazující PCIe kartě CFast 2.0 nebyla převzata. [CompactFlash Association – typy karet](https://compactflash.org/card-types/).
- TRIM předává informaci o nepotřebných logických blocích; nezaručuje okamžité fyzické vymazání ani bezpečnou sanitizaci. Wear leveling a žurnálování nejsou záloha. Úloha kapacity používá logický sektor, nikoli fyzický.
- MAC adresa může být změněná nebo randomizovaná. Skrytí SSID a MAC filtr nenahrazují autentizaci a šifrování.
- LCD s LED podsvícením není samoemisní OLED. Displej a dotyková vrstva jsou různé funkční části.
- Přenosová sublimace na polyester či potažený předmět se odlišuje od dalších sublimačních technologií. Ofset, plotry a 3D tisk se zkoušejí podle principu a použití, nikoli podle historických letopočtů.

Nejsou přebírány tvrzení o aktuálně nejrychlejších výrobcích, garantované desetileté retenci HDD, univerzálních životnostech NAND, tržním podílu nebo neověřených časových osách. Témata se místy překrývají se sítěmi a grafikou, otázky ale zůstávají pod modulem Hardware.
