// Statické přehledy: upravují se nezávisle na otázkách, bez serveru a bez fetch.
window.STUDY_GUIDES = [
  {
    id: 'python-seznamy', subject: 'Programování', topic: 'Python',
    title: 'Python: seznamy a indexování', minutes: 3,
    intro: 'Seznam ukládá více hodnot v určitém pořadí. K jednotlivým prvkům přistupujeme pomocí indexu.',
    sections: [
      { title: 'Co si zapamatovat', points: ['První prvek má index 0. Seznam se třemi prvky má indexy 0, 1 a 2.', 'Záporné indexy počítají od konce: -1 je poslední prvek, -2 předposlední.', 'append(hodnota) přidá jeden prvek na konec seznamu. len(seznam) vrací počet prvků.'] },
      { title: 'Řešený příklad', code: 'studenti = ["Karel", "Frank"]\nstudenti.append("Jana")\nprint(studenti[0])   # Karel\nprint(studenti[-1])  # Jana\nprint(len(studenti)) # 3', text: 'Po přidání Jany obsahuje seznam tři položky. Index poslední položky je 2, nikoli 3.' }
    ],
    mistake: 'Počet prvků není index posledního prvku. Přístup studenti[3] je u tříprvkového seznamu mimo rozsah.',
    sourceLabel: 'Podklad: aktivní úlohy Pythonu', source: 'data/exercises.js'
  },
  {
    id: 'web-header', subject: 'Vývoj webových aplikací', topic: 'Header a favicon',
    title: 'Header: orientace na webu', minutes: 3,
    intro: 'Záhlaví pomáhá návštěvníkovi poznat web, najít hlavní sekce a vrátit se na úvod.',
    sections: [
      { title: 'Hlavní prvky', points: ['Logo obvykle odkazuje na úvodní stránku.', 'Navigace má mít srozumitelné názvy a přehledný počet položek.', 'Hlavní akční tlačítko vede k důležitému cíli webu. Vyhledávání přidáváme tam, kde pomůže s orientací.'] },
      { title: 'Chování při posouvání', points: ['Statický header při posouvání zmizí mimo obrazovku.', 'Sticky header zůstává nahoře, ale zabírá část prostoru.', 'Smart sticky se při posouvání dolů schová a při návratu nahoru se objeví.'] },
      { title: 'Praktický příklad', text: 'Na školním webu může záhlaví obsahovat logo, odkazy Předměty a Studijní přehledy a přepínač motivu. Na telefonu musí zůstat ovladatelné i bez najetí myší.' }
    ],
    mistake: 'Příliš vysoké záhlaví a mnoho tlačítek mohou na telefonu zakrýt obsah. Důležité je také čitelné písmo a kontrast.',
    sourceLabel: 'Zdrojový materiál: Header a favicon', source: 'materialy/vyvoj-webovych-aplikaci/zdroj/header-a-favicon.md'
  },
  {
    id: 'web-osobnosti', subject: 'Vývoj webových aplikací', topic: 'Osobnosti',
    title: 'Osobnosti a jejich přínos', minutes: 2,
    intro: 'Spojuj osobnost s konkrétním projektem nebo přínosem, nikoli pouze s názvem firmy.',
    sections: [
      { title: 'Jazyky a web', points: ['Tim Berners-Lee — základy World Wide Webu, HTML a HTTP.', 'Guido van Rossum — tvůrce Pythonu.', 'James Gosling — hlavní autor Javy.', 'Brendan Eich — tvůrce JavaScriptu.', 'Dennis Ritchie — jazyk C a spoluautorství Unixu.'] },
      { title: 'Další souvislosti', points: ['Linus Torvalds — linuxové jádro.', 'Steve Jobs a Steve Wozniak — spoluzakladatelé Applu; Wozniak navrhl první počítače Apple.', 'Ada Lovelace — algoritmus pro Babbageův analytický stroj.', 'John von Neumann — architektura s programem a daty uloženými v paměti.'] },
      { title: 'Jak opakovat', text: 'Zakryj si jména a zkus k přínosu „tvůrce Pythonu“ přiřadit Guida van Rossuma. Potom zkus opačný směr: jméno → přínos.' }
    ],
    mistake: 'Java a JavaScript jsou různé jazyky. James Gosling a Brendan Eich se proto nedají zaměnit.',
    sourceLabel: 'Zdrojový seznam osobností', source: 'materialy/programovani/zdroj/seznam_osobnosti.txt'
  },
  {
    id: 'db-zaklady', subject: 'Databáze', topic: 'Základy databází',
    title: 'Databáze: tabulky, klíče a SQL', minutes: 4,
    intro: 'Relační databáze organizuje data do tabulek. Vazby mezi tabulkami vyjadřujeme pomocí klíčů.',
    sections: [
      { title: 'Základní pojmy', points: ['Entita je objekt, o kterém ukládáme údaje. Atribut popisuje jeho vlastnost.', 'Tabulka obsahuje řádky a sloupce; sloupec představuje atribut.', 'Primární klíč jednoznačně identifikuje řádek. Cizí klíč odkazuje na klíč v související tabulce.'] },
      { title: 'Skupiny SQL příkazů v materiálu', points: ['DDL — struktura: CREATE, ALTER, DROP.', 'DQL — dotazy: SELECT.', 'DML — změny dat: INSERT, UPDATE, DELETE.', 'DCL — přístupová práva: GRANT, REVOKE.', 'TCL — transakce: COMMIT, ROLLBACK.'] },
      { title: 'Praktický příklad', text: 'Tabulka Student má primární klíč id. Tabulka Znamka může mít sloupec student_id jako cizí klíč. Díky tomu víme, kterému studentovi známka patří.' }
    ],
    mistake: 'DELETE odstraňuje data, zatímco DROP odstraňuje databázový objekt, například celou tabulku.',
    sourceLabel: 'Zdrojový materiál: Základy databází', source: 'materialy/databaze/zdroj/zdb.md'
  },
  {
    id: 'site-zaklady', subject: 'Počítačové sítě', topic: 'Základy a rozdělení sítí',
    title: 'Sítě: rozdělení a přenos', minutes: 3,
    intro: 'Síť propojuje zařízení a umožňuje přenos dat i sdílení služeb.',
    sections: [
      { title: 'Rozdělení podle rozsahu', points: ['PAN — osobní síť, například zařízení jednoho uživatele.', 'LAN — lokální síť, například ve škole nebo doma.', 'MAN — síť v městském rozsahu.', 'WAN — síť na velkém území propojující vzdálené lokality.'] },
      { title: 'Komu data směřují', points: ['Unicast — jednomu příjemci.', 'Broadcast — všem v dané broadcastové doméně.', 'Multicast — vybrané skupině příjemců.'] },
      { title: 'Příklad', text: 'Počítače v učebně připojené do školní lokální sítě jsou příkladem LAN. Rozsah sítě je jiné hledisko než to, zda používá kabel nebo bezdrátový přenos.' }
    ],
    mistake: 'LAN automaticky neznamená Wi-Fi. Rozsah sítě a přenosové médium jsou dvě různá hlediska.',
    sourceLabel: 'Podklad: aktivní síťové úlohy a dodaný síťový materiál', source: 'data/network_exercises.js'
  },
  {
    id: 'site-adresace', subject: 'Počítačové sítě', topic: 'Adresace a konfigurace',
    title: 'Adresace: IP, MAC a brána', minutes: 3,
    intro: 'Při konfiguraci sítě rozlišuj adresu rozhraní, síťové nastavení a služby pro překlad názvů.',
    sections: [
      { title: 'Pojmy', points: ['IPv4 adresa má 32 bitů a zapisuje se jako čtyři čísla oddělená tečkami.', 'Maska určuje síťovou část IPv4 adresy.', 'MAC adresa identifikuje síťové rozhraní na linkové vrstvě.', 'Výchozí brána slouží jako cesta do jiných sítí.', 'DNS překládá doménová jména na adresy. DHCP může zařízení přidělit síťové nastavení.'] },
      { title: 'Příklad konfigurace', code: 'IP adresa:     192.168.1.20\nMaska:         255.255.255.0\nVýchozí brána: 192.168.1.1', text: 'Adresa zařízení a brána zde patří do stejné podsítě. Brána může předávat provoz do dalších sítí.' }
    ],
    mistake: 'DNS není výchozí brána. Překlad názvu a směrování dat řeší odlišné úkoly.',
    sourceLabel: 'Podklad: aktivní úlohy adresace', source: 'data/network_exercises.js'
  },
  {
    id: 'literatura-obdobi', subject: 'Literatura', topic: 'Přehled období',
    title: 'Literární období v souvislostech', minutes: 4,
    intro: 'Ke každému období si spoj typické znaky, autora a dílo. Přehled je výběrem z dodaných školních poznámek.',
    sections: [
      { title: 'Antika a středověk', points: ['Antika: Homér — Ilias a Odyssea, hrdinské eposy. Sofoklés — Antigona, tragédie.', 'Románský sloh: rotundy a baziliky; Píseň o Rolandovi jako hrdinský epos.', 'Gotika: lomený oblouk; Karel IV. — Vita Caroli, životopis.'] },
      { title: 'Renesance až klasicismus', points: ['Renesance: Petrarca — Sonety Lauře; Boccaccio — Dekameron; Shakespeare — Hamlet a Romeo a Julie.', 'Baroko: Komenský — Labyrint světa a ráj srdce; sochař Matyáš Braun.', 'Klasicismus: tragédie a ódy patří k vysokým žánrům, komedie a bajky k nízkým. Molière — Lakomec, postava Harpagona.'] },
      { title: 'Jak se učit', text: 'Zkus trojici „Shakespeare → Hamlet → tragédie“. Potom si vybav jiného autora a jeho dílo. Nestačí znát jen pořadí období.' }
    ],
    mistake: 'Autor, dílo a postava nejsou totéž: Molière je autor, Lakomec dílo a Harpagon postava.',
    sourceLabel: 'Zdrojové školní poznámky: Literatura', source: 'materialy/literatura/zdroj/literatura.md'
  },
  {
    id: 'literatura-romantismus', subject: 'Literatura', topic: 'Romantismus',
    title: 'Romantismus: hrdina, autoři a díla', minutes: 3,
    intro: 'Romantismus klade důraz na prožitek jednotlivce a jeho konflikt se společností.',
    sections: [
      { title: 'Romantický hrdina', points: ['Bývá vnitřně rozervaný a nezapadá do společnosti.', 'Často prožívá nešťastnou nebo idealizovanou lásku.', 'Může mít rysy blízké samotnému autorovi.'] },
      { title: 'Autoři v materiálu', points: ['George Gordon Byron — Childe Haroldova pouť.', 'Walter Scott — historické romány, například Ivanhoe.', 'Victor Hugo — Chrám Matky boží v Paříži a Bídníci.', 'Stendhal — Červený a černý; hlavní postava Julián Sorel.'] },
      { title: 'Rozlišení postav', text: 'Quasimodo a Esmeralda patří do Chrámu Matky boží v Paříži. Jean Valjean a Javert patří do Bídníků. Obě díla napsal Victor Hugo.' }
    ],
    mistake: 'Nespojuj všechny Hugovy postavy s jedním románem. Ke každé postavě si vybav konkrétní dílo.',
    sourceLabel: 'Zdrojové školní poznámky: Literatura', source: 'materialy/literatura/zdroj/literatura.md'
  },
  {
    id: 'ct-horner', subject: 'Číslicová technika', topic: 'Hornerovo schéma',
    title: 'Číselné soustavy a Hornerovo schéma', minutes: 4,
    intro: 'Hodnota číslice závisí na její pozici a základu soustavy. Hornerovo schéma umožňuje hodnotu spočítat postupně zleva.',
    sections: [
      { title: 'Základní pravidla', points: ['V soustavě se základem z používáme číslice s hodnotami od 0 do z − 1.', 'V binární soustavě jsou jen 0 a 1; v šestnáctkové mají A až F hodnoty 10 až 15.', 'Pozice zprava odpovídají mocninám z⁰, z¹, z² a tak dále.'] },
      { title: 'Řešený příklad: 2101₃', code: 'Poziční součet:\n2 × 27 + 1 × 9 + 0 × 3 + 1 × 1 = 64\n\nHornerovo schéma zleva:\n2\n2 × 3 + 1 = 7\n7 × 3 + 0 = 21\n21 × 3 + 1 = 64', text: 'Oba postupy dávají 2101₃ = 64₁₀. V Hornerově schématu mezivýsledek vždy násobíme základem a přičteme další číslici.' }
    ],
    mistake: 'Číslice 3 není platná v trojkové soustavě. Nejvyšší povolená číslice je 2.',
    sourceLabel: 'Zdrojový materiál: Číselné soustavy', source: 'materialy/cislicova-technika/zdroj/ciselne_soustavy.md'
  },
  {
    id: 'ct-prevody', subject: 'Číslicová technika', topic: 'Převod z dekadické soustavy',
    title: 'Převod z desítkové soustavy', minutes: 3,
    intro: 'Celé nezáporné číslo převádíme opakovaným celočíselným dělením základem cílové soustavy.',
    sections: [
      { title: 'Postup', points: ['Vyděl číslo cílovým základem a zapiš zbytek.', 'Pokračuj s celočíselným podílem, dokud není nulový.', 'Výsledek tvoří zbytky přečtené od posledního k prvnímu.', 'Správnost ověř převodem výsledku zpět do desítkové soustavy.'] },
      { title: 'Řešený příklad: 13₁₀ → dvojková', code: '13 ÷ 2 = 6, zbytek 1\n 6 ÷ 2 = 3, zbytek 0\n 3 ÷ 2 = 1, zbytek 1\n 1 ÷ 2 = 0, zbytek 1\n\nZbytky odspodu: 1101₂\nKontrola: 8 + 4 + 0 + 1 = 13', text: 'Stejný princip funguje i pro osmičkovou nebo šestnáctkovou soustavu. Změní se dělitel a použité číslice.' }
    ],
    mistake: 'Zbytky čtené shora dolů dávají obrácené pořadí číslic. Výsledek sestavuj od posledního dělení.',
    sourceLabel: 'Zdrojový materiál: Číselné soustavy', source: 'materialy/cislicova-technika/zdroj/ciselne_soustavy.md'
  },
  {
    id: 'grafika-rastr-vektor', subject: 'Počítačová grafika', topic: 'Rastrová vs. vektorová grafika',
    title: 'Rastr, vektor a volba formátu', minutes: 3,
    intro: 'Volba mezi rastrem a vektorem závisí na obsahu obrázku a jeho použití.',
    sections: [
      { title: 'Hlavní rozdíl', points: ['Rastr tvoří pixely. Hodí se například pro fotografie; při velkém zvětšení se mohou objevit viditelné pixely.', 'Vektor popisuje tvary a křivky matematicky. Hodí se pro loga a ikony, které potřebujeme v různých velikostech.'] },
      { title: 'Příklady formátů', points: ['JPEG — fotografie a rastrové obrázky.', 'PNG — rastrová grafika, může mít průhlednost.', 'SVG — vektorová grafika pro web.', 'GIF — rastrový formát, který podporuje animaci.'] },
      { title: 'Praktické rozhodnutí', text: 'Logo pro vizitku i velký banner připrav jako vektor. Fotografii ze školního výletu uchovej jako rastr. Pouhé uložení fotografie do souboru SVG z ní neudělá vektorovou kresbu.' }
    ],
    mistake: 'Vyšší počet pixelů sám o sobě nezaručuje kvalitní obrázek. Záleží také na zdroji, kompresi a cílovém použití.',
    sourceLabel: 'Podklad: aktivní úlohy počítačové grafiky', source: 'data/pocitacova_grafika_exercises.js'
  },
  {
    id: 'grafika-favicon', subject: 'Počítačová grafika', topic: 'Favicon',
    title: 'Favicon: malá ikona webu', minutes: 2,
    intro: 'Favicon pomáhá poznat web mezi panely a záložkami prohlížeče. Musí být čitelná i v malé velikosti.',
    sections: [
      { title: 'Příprava ikony', points: ['Použij jednoduchý symbol nebo zjednodušené logo.', 'Vyzkoušej čitelnost ve velikostech 16 × 16 a 32 × 32 pixelů.', 'SVG je škálovatelný formát; PNG a ICO slouží pro další varianty ikony.'] },
      { title: 'Vložení do HTML', code: '<link rel="icon" href="favicon.svg" type="image/svg+xml">', text: 'Odkaz patří do části head. Relativní cesta dovoluje stejnou ikonu používat i na GitHub Pages v podadresáři projektu.' }
    ],
    mistake: 'Detailní logo s drobným textem může být jako favicon nečitelné. Zkontroluj skutečně malou velikost.',
    sourceLabel: 'Zdrojový materiál: Header a favicon', source: 'materialy/vyvoj-webovych-aplikaci/zdroj/header-a-favicon.md'
  },
{
  "id": "et-proud",
  "subject": "elektrotechnika",
  "topic": "Elektrický proud",
  "title": "Elektrický proud a náboj",
  "minutes": 3,
  "intro": "Elektrický proud je uspořádaný pohyb elektricky nabitých částic. V kovech jsou pohyblivými nositeli náboje volné elektrony.",
  "sections": [
    {
      "title": "Co si zapamatovat",
      "points": [
        "Proud I měříme v ampérech (A), náboj Q v coulombech (C), čas t v sekundách (s).",
        "Pro stálý proud platí I = Q / t. Úpravou dostaneme Q = I · t a t = Q / I.",
        "1 A = 1 C / s."
      ]
    },
    {
      "title": "Řešený příklad",
      "text": "Za 3 s projde náboj 6 C: I = 6 / 3 = 2 A."
    }
  ],
  "mistake": "Náhodný pohyb částic sám o sobě nepředstavuje elektrický proud. Při výpočtu nepřevracej podíl Q / t.",
  "sourceLabel": "Podklad: přepis dodaných poznámek k elektrotechnice",
  "source": "materialy/elektrotechnika/zdroj/elektrotechnika.md"
},
{
  "id": "et-ohm",
  "subject": "elektrotechnika",
  "topic": "Ohmův zákon",
  "title": "Ohmův zákon a rezistor",
  "minutes": 3,
  "intro": "Elektrický odpor je vlastnost omezující průchod proudu. Rezistor je součástka s určitou hodnotou odporu.",
  "sections": [
    {
      "title": "Co si zapamatovat",
      "points": [
        "Odpor R měříme v ohmech (Ω), napětí U ve voltech (V).",
        "Pro ohmický rezistor platí I = U / R, R = U / I, U = R · I.",
        "Při stálém odporu je proud přímo úměrný napětí. Při stálém napětí s větším odporem proud klesá.",
        "Voltampérová charakteristika je graf závislosti I na U. Pro stálý odpor je přímkou procházející počátkem; v grafu I(U) má menší odpor strmější přímku."
      ]
    },
    {
      "title": "Řešený příklad",
      "text": "Na rezistoru 6 Ω je napětí 12 V: I = 12 / 6 = 2 A."
    }
  ],
  "mistake": "Odpor a rezistor nejsou totéž. Při porovnání sklonů vždy zkontroluj, která veličina je na které ose.",
  "sourceLabel": "Podklad: přepis dodaných poznámek k elektrotechnice",
  "source": "materialy/elektrotechnika/zdroj/elektrotechnika.md"
},
{
  "id": "et-vodic",
  "subject": "elektrotechnika",
  "topic": "Rezistivita a odpor vodiče",
  "title": "Rezistivita, délka a průřez",
  "minutes": 3,
  "intro": "Odpor konkrétního vodiče závisí na materiálu, délce, průřezu a teplotě. Při stejné teplotě používáme vztah R = ρ · l / S.",
  "sections": [
    {
      "title": "Co si zapamatovat",
      "points": [
        "ρ je rezistivita materiálu, l délka a S průřez homogenního vodiče.",
        "Delší vodič má při stejném průřezu a materiálu větší odpor. Větší průřez při stejné délce a materiálu odpor snižuje.",
        "Při ρ v Ω·mm²/m dosazuj l v m a S v mm²; výsledkem je R v Ω.",
        "Rezistivita je vlastnost materiálu při daných podmínkách, odpor patří konkrétnímu vodiči."
      ]
    },
    {
      "title": "Řešený příklad",
      "text": "Pro l = 2 m, S = 1 mm² a ρ = 0,056 Ω·mm²/m: R = 0,056 · 2 / 1 = 0,112 Ω = 112 mΩ."
    }
  ],
  "mistake": "Nedosazuj délku 2000 mm k rezistivitě v Ω·mm²/m bez převodu. V tomto vztahu použij 2 m.",
  "sourceLabel": "Podklad: přepis dodaných poznámek k elektrotechnice",
  "source": "materialy/elektrotechnika/zdroj/elektrotechnika.md"
},
{
  "id": "et-teplota",
  "subject": "elektrotechnika",
  "topic": "Odpor a teplota",
  "title": "Závislost odporu na teplotě",
  "minutes": 3,
  "intro": "Odpor běžných kovových vodičů s rostoucí teplotou roste. Intenzivnější kmity mřížky zvyšují rozptyl vodivostních elektronů.",
  "sections": [
    {
      "title": "Co si zapamatovat",
      "points": [
        "V menším teplotním rozsahu přibližně platí R = R₀ · (1 + α · ΔT).",
        "R₀ je odpor při výchozí teplotě, R nový odpor, ΔT rozdíl nové a výchozí teploty. α je teplotní součinitel odporu v K⁻¹.",
        "Při ohřevu z 20 °C na 70 °C je ΔT = 50 K. Při ochlazení je ΔT záporné.",
        "PTC: při růstu teploty odpor roste. NTC: při růstu teploty odpor klesá.",
        "Závislost odporu na teplotě využíváme při měření teploty, kompenzaci a ochraně elektrických zařízení."
      ]
    },
    {
      "title": "Řešený příklad",
      "text": "Pro vinutí s R₀ = 10 Ω při 20 °C, zahřáté na 70 °C, použij v této úloze α = 0,004 K⁻¹: R = 10 · (1 + 0,004 · 50) = 12 Ω."
    }
  ],
  "mistake": "Dosazuj změnu teploty, nikoli konečnou teplotu. Ne všechny materiály mají kladný teplotní součinitel. Hodnota α = 0,004 K⁻¹ je zadané zaokrouhlení pro příklad, protože konec fotografie chybí.",
  "sourceLabel": "Podklad: přepis dodaných poznámek k elektrotechnice",
  "source": "materialy/elektrotechnika/zdroj/elektrotechnika.md"
}
];

window.STUDY_GUIDES.push(
  {
    id: 'kybez-pristup', subject: 'Kybernetická bezpečnost', topic: 'Identity a řízení přístupu',
    title: 'Identita, role a nejmenší potřebná práva', minutes: 3,
    intro: 'Autentizace ověřuje identitu, autorizace určuje povolené činnosti. Účet má mít jen práva potřebná pro svou úlohu.',
    sections: [
      { title: 'Tři navazující principy', points: [
        'PoLP omezuje oprávnění na nezbytné minimum, případně jen na dobu konkrétního úkolu.',
        'RBAC přiděluje práva rolím. Uživatel je získává členstvím v roli; při změně pracovní pozice se nepotřebné role odebírají.',
        'Zero Trust nepovažuje zařízení za důvěryhodné jen proto, že je ve vnitřní síti. Přístup musí být ověřen a omezen.',
      ] },
      { title: 'Příklad', text: 'Účetní smí měnit faktury, ale nemá spravovat doménu. Správce používá běžný účet pro e-mail a privilegovaný účet jen pro správu. Audit umožňuje zjistit, kdo svá práva použil.' },
    ],
    mistake: 'Oprávnění se nemají při každé změně práce pouze přidávat. Hromadění starých přístupů zvyšuje dopad napadení účtu.',
    source: 'materialy/kyberneticka-bezpecnost/zdroj/orgpad-KYBEZ-2-rocnik.txt', sourceLabel: 'Podklad: OrgPad KYBEZ 2. ročník – textový export',
  },
  {
    id: 'kybez-linux-prava', subject: 'Kybernetická bezpečnost', topic: 'Linux: soubory a oprávnění',
    title: 'Čtení unixových oprávnění', minutes: 3,
    intro: 'Základní unixový model rozlišuje vlastníka, skupinu a ostatní. Každá třída má u běžného souboru práva čtení, zápisu a spuštění.',
    sections: [
      { title: 'Symboly a čísla', points: [
        'r = čtení = 4, w = zápis = 2, x = spuštění = 1. Číslice je součtem povolených práv.',
        'rwxr-xr-- odpovídá 754: vlastník má 7, skupina 5, ostatní 4.',
        'chmod mění práva, chown vlastníka a skupinu. ls -l zobrazí aktuální stav.',
      ] },
      { title: 'Příklad', code: 'chmod 600 hesla.txt\nchmod u+x skript.sh', text: '600 umožní vlastníkovi číst a zapisovat a nepřidělí základní práva skupině ani ostatním. Druhý příkaz přidá vlastníkovi skriptu právo spuštění.' },
      { title: 'Zvýšená oprávnění', text: 'sudo zvyšuje práva pro povolené operace. Jeho pravidla upravuj nástrojem visudo s kontrolou syntaxe. Nepotřebné SUID programy mohou zvyšovat riziko eskalace práv.' },
    ],
    mistake: '777 je plošné povolení čtení, zápisu a spuštění, nikoli univerzální oprava přístupu. Práva adresářů mají jiný kontext než práva běžných souborů.',
    source: 'materialy/kyberneticka-bezpecnost/zdroj/orgpad-KYBEZ-2-rocnik.txt', sourceLabel: 'Podklad: OrgPad KYBEZ 2. ročník – textový export',
  }
);

window.STUDY_GUIDES.push(
  {
    id: 'hw-ssd', subject: 'Hardware', topic: 'SSD a NAND flash',
    title: 'SSD: flash, TRIM a opotřebení', minutes: 3,
    intro: 'SSD ukládá data do nevolatilní flash paměti. Nemá pohyblivé hlavy ani plotny; řadič spravuje umístění dat, zápisy a opravy chyb.',
    sections: [
      { title: 'Jak je paměť organizovaná', points: [
        'NAND se programuje po stránkách a maže po větších blocích. Platná data se mohou při údržbě přesouvat.',
        'SLC ukládá 1 bit do buňky, dvoubitové MLC 2, TLC 3 a QLC 4. Vlastnosti celého SSD ovlivňuje i řadič a provedení paměti.',
        'FTL mapuje logické adresy z počítače na fyzická místa ve flash. Wear leveling rozkládá zápisy a mazání, aby se neopotřebovávala jen část bloků.',
      ] },
      { title: 'TRIM a obnova dat', text: 'Systém pomocí TRIM informuje disk o logických blocích, které už nepotřebuje. Řadič je může uvolnit při údržbě. To může ztížit obnovu smazaných souborů, ale není to záruka okamžitého bezpečného vymazání.' },
      { title: 'Příklad', text: 'Aplikace přepíše malý soubor, ale řadič může při úklidu přesouvat i další platná data. Interně tedy může zapsat více bajtů než hostitel; tomu se říká write amplification.' },
    ],
    mistake: 'SSD není samo o sobě záloha. Údržba paměti, ECC a odolnost proti otřesům nechrání před každou ztrátou dat.',
    source: 'materialy/hardware/zdroj/orgpad-hardware-2-rocnik.txt', sourceLabel: 'Podklad: OrgPad Hardware 2. ročník – textový export',
  },
  {
    id: 'hw-usb', subject: 'Hardware', topic: 'USB a datová rozhraní',
    title: 'USB-C: konektor, přenos a napájení', minutes: 3,
    intro: 'USB-C popisuje konektor. Jeho tvar neříká vše o rychlosti, podporovaném obrazu ani nabíjecím výkonu.',
    sections: [
      { title: 'Co porovnávat', points: [
        'Skutečný přenos závisí na portu hostitele, kabelu, připojeném zařízení a případném hubu.',
        'Video přes USB-C vyžaduje podporovaný režim, například DisplayPort Alt Mode, a vhodný kabel.',
        'USB Power Delivery vyjednává napájení podle možností zdroje, kabelu a spotřebiče. Vyšší podporovaný výkon zdroje neznamená, že ho zařízení vždy odebírá.',
        'Zařízení na jednom hubu mohou sdílet propustnost jeho spojení s hostitelem a omezený napájecí rozpočet.',
      ] },
      { title: 'Výpočet výkonu', text: 'P = U × I. Při 20 V a 3 A je výkon 60 W.' },
      { title: 'Bity a bajty', text: 'Při 8 bitech na bajt odpovídá 480 Mb/s teoreticky 60 MB/s. Jde o převod bez režie; skutečná rychlost souborů bývá nižší.' },
    ],
    mistake: 'Stejný konektor nezaručuje stejné funkce. Kabel určený hlavně pro nabíjení nemusí podporovat požadovaný rychlý přenos nebo obraz.',
    source: 'materialy/hardware/zdroj/orgpad-hardware-2-rocnik.txt', sourceLabel: 'Podklad: OrgPad Hardware 2. ročník – textový export',
  }
);
