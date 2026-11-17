// Vývoj webových aplikací 2. ročník – Notion VWA. Podklad: materialy/vyvoj-webovych-aplikaci/zdroj/notion-vwa-2-rocnik.md
window.WEBDEV_2_EXERCISES = (() => {
  const list = [];
  let topic = '';
  let seq = 0;
  const SUB = { choice: 'Pojmy a principy', scenario: 'Praktické situace', multi: 'Pojmy a principy', match: 'Souvislosti', classification: 'Třídění', compare: 'Porovnání', cloze: 'Doplňování', spot: 'Najdi chybu', order: 'Postupy', number: 'Hodnoty', text: 'Vlastní vyjádření' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `vwa2-${String(++seq).padStart(3, '0')}`, subject: 'Vývoj webových aplikací', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['VWA', 'zápisy z Notionu'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const s = (title, scenario, question, choices, correct, solution, d = 3) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, d);
  const p = (title, question, pairs, solution, d = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, d);
  const k = (title, question, categories, items, solution, d = 3) => add('classification', title, question, { categories, items: items.map(([text, category], i) => ({ id: `i${i + 1}`, text, category })) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const z = (title, question, cloze, gaps, solution, d = 2) => add('cloze', title, question, { cloze, gaps }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3) => add('spot', title, question, { segments, wrong, corrections, layout: 'lines' }, solution, d);
  const o = (title, question, order, solution, d = 2) => add('order', title, question, { order }, solution, d);
  const n = (title, question, answer, solution, d = 2) => add('number', title, question, { answer: String(answer) }, solution, d);

  topic = 'HTTP stavové kódy';
  p('Základní kódy', 'Přiřaď stavový kód HTTP k jeho významu.', [
    ['200', 'OK – požadavek proběhl úspěšně'],
    ['404', 'Stránka nenalezena'],
    ['401', 'Nepřihlášeno – chybí ověření'],
    ['500', 'Chyba na straně serveru'],
  ], 'Kódy 2xx = úspěch, 4xx = chyba požadavku klienta, 5xx = chyba serveru.');
  k('Třídy kódů', 'Zařaď stavové kódy do tříd.', ['2xx – úspěch', '4xx – chyba klienta', '5xx – chyba serveru'], [
    ['200 OK', '2xx – úspěch'],
    ['404 Not Found', '4xx – chyba klienta'],
    ['401 Unauthorized', '4xx – chyba klienta'],
    ['500 Internal Server Error', '5xx – chyba serveru'],
    ['403 Forbidden', '4xx – chyba klienta'],
    ['503 Service Unavailable', '5xx – chyba serveru'],
  ], 'První číslice kódu určuje třídu odpovědi.');
  s('Překlep v adrese', 'Uživatel napíše do prohlížeče adresu stránky s překlepem, která na serveru neexistuje.', 'Jaký stavový kód server nejspíš vrátí?', ['200', '401', '404', '500'], 2, '404 = požadovaný prostředek nebyl nalezen.');
  s('Chyba ve skriptu', 'Serverový skript při zpracování požadavku spadne na neošetřené výjimce.', 'Jaký stavový kód uživatel dostane?', ['500', '404', '200', '401'], 0, '500 = vnitřní chyba serveru; problém není v požadavku uživatele.');
  s('Bez přihlášení', 'Nepřihlášený uživatel se pokusí otevřít administraci webu, která vyžaduje ověření.', 'Jaký stavový kód odpovídá situaci?', ['200', '401', '500', '404'], 1, '401 = chybí platné ověření (nepřihlášeno).');
  c('Vše v pořádku', 'Který stavový kód znamená, že požadavek proběhl úspěšně?', ['404', '500', '200', '401'], 2, '200 OK.');
  c('Třída 5xx', 'Kde je příčina chyby u kódů třídy 5xx?', ['V prohlížeči uživatele', 'Na straně serveru', 'V překlepu v adrese', 'V chybějícím přihlášení'], 1, '5xx = chyba serveru, 4xx = chyba požadavku klienta.');

  topic = 'Jednostránkový web a formuláře';
  c('Margin a padding', 'Jaký je rozdíl mezi margin a padding v CSS?', ['margin je vnější, padding vnitřní odsazení', 'margin je vnitřní, padding vnější odsazení', 'Oba nastavují barvu okraje', 'padding funguje jen u obrázků'], 0, 'margin odsazuje prvek od okolí, padding obsah od okraje prvku.');
  v('Velikost pozadí', 'Rozhodni, které tvrzení platí pro background-size: cover a které pro background-size: 100% 100%.', 'cover', '100% 100%', [
    ['Zachová poměr stran obrázku', 'left'],
    ['Může obrázek zdeformovat', 'right'],
    ['Část obrázku se může oříznout', 'left'],
    ['Vyplní přesně obě rozměrové osy', 'right'],
  ], 'cover pokryje oblast se zachováním poměru stran; 100% 100% roztáhne obrázek na obě osy.');
  c('Okraj stránky', 'Jak odstraníš výchozí okraj kolem celé stránky?', ['body { padding: 100%; }', 'body { margin: 0; }', 'html { border: none; }', 'body { z-index: 0; }'], 1, 'Prohlížeč dává body výchozí margin; nastavením margin: 0 ho odstraníš.');
  c('Velikost pozadí', 'Co určuje vlastnost background-size?', ['Velikost souboru obrázku v kB', 'Velikost vykresleného pozadí', 'Rozlišení monitoru', 'Kvalitu komprese JPEG'], 1, 'background-size řídí vykreslení pozadí, nikoli velikost souboru.');
  c('Kotva', 'Kam přejde odkaz <a href="#odber">?', ['Na novou stránku odber.html', 'Na prvek s id="odber" na stránce', 'Na prvek s class="odber" na stránce', 'Na samostatný web s doménou odber'], 1, 'Fragment #odber odkazuje na jedinečné id ve stejném dokumentu.');
  z('Kotva v HTML', 'Doplň kód odkazu na sekci formuláře na stejné stránce.', '<a href="{{a}}odber">Odběr novinek</a> … <section {{b}}="odber">', [
    { id: 'a', options: ['#', '.', '/'], answer: '#' },
    { id: 'b', options: ['id', 'class', 'name'], answer: 'id' },
  ], 'href="#odber" míří na prvek s id="odber".');
  c('text-align a justify-content', 'Co platí o text-align: center a justify-content?', ['Jsou to úplná synonyma', 'Text v bloku × položky flexboxu', 'justify-content funguje jen pro text', 'text-align řídí hlavní osu flexboxu'], 1, 'text-align centruje řádkový obsah v bloku; justify-content rozkládá flex položky po hlavní ose.');
  c('z-index', 'Co zaručí nastavení position: relative; z-index: 1 u textu?', ['Že bude nad všemi prvky celé stránky', 'Pořadí v rámci jeho kontextu vrstvení', 'Že se text zvětší', 'Že text zmizí pod pozadím'], 1, 'z-index určuje pořadí v příslušném kontextu vrstvení, ne absolutně na celé stránce.');
  c('Názvy souborů', 'Jak je vhodné pojmenovávat obrázky ve složce images?', ['S mezerami a s diakritikou', 'Malými písmeny, se spojovníky', 'Pouze čísly, úplně bez přípony', 'Velkými písmeny a s mezerami'], 1, 'Např. hero-pozadi.jpg – mezery komplikují URL a cesty.');
  c('Go Live', 'K čemu slouží při vývoji funkce Go Live?', ['K nahrání webu na hosting', 'Ke spuštění místního serveru', 'K odeslání commitu na GitHub', 'K převodu CSS souborů na HTML'], 1, 'Go Live spustí místní server; web pak otevíráš na lokální adrese v prohlížeči.');
  c('Procentní výška', 'Proč samotné height: 100% nemusí roztáhnout sekci na výšku obrazovky?', ['Protože procenta v CSS nefungují', 'Protože závisí na výšce nadřazeného bloku', 'Protože height jde jen v pixelech', 'Protože to blokuje margin'], 1, 'Procentní výška se počítá z výšky rodiče.');
  p('Typy input', 'Přiřaď typ pole input k jeho účelu.', [
    ['email', 'e-mailová adresa'],
    ['password', 'zakryté zobrazení znaků'],
    ['radio', 'jedna možnost ze skupiny se stejným name'],
    ['checkbox', 'zaškrtávací pole'],
    ['submit', 'tlačítko pro odeslání formuláře'],
    ['color', 'výběr barvy'],
  ], 'Vzhled specializovaných polí se liší podle prohlížeče.', 3);
  c('Label', 'Jak se propojí label s polem formuláře?', ['Atribut for u label odpovídá id pole', 'Atribut name u label odpovídá class pole', 'Label musí být za polem', 'Pomocí placeholder'], 0, '<label for="email"> patří k <input id="email">.');
  c('Placeholder', 'Co je placeholder u pole formuláře?', ['Výchozí odeslaná hodnota', 'Krátká nápověda v prázdném poli', 'Náhrada za element label', 'Povinné ověření pole'], 1, 'Placeholder není skutečná hodnota a nenahrazuje trvalý popisek.');
  v('name a id', 'Rozhodni, zda tvrzení patří k atributu name, nebo id.', 'name', 'id', [
    ['Pojmenovává odesílaný údaj', 'left'],
    ['Identifikuje konkrétní prvek v dokumentu', 'right'],
    ['Musí být v dokumentu jedinečné', 'right'],
    ['U skupiny radio tlačítek je stejné', 'left'],
  ], 'name určuje klíč odesílaných dat, id slouží k identifikaci prvku (label for, kotvy, JavaScript).');
  c('Funkční odběr', 'Zajistí samotný HTML formulář přihlášení k odběru novinek?', ['Ano, element form ukládá e-maily sám', 'Ne, potřebuje navazující zpracování', 'Ano, pokud má pole type="email"', 'Ano, pokud leží ve složce images'], 1, 'HTML vytvoří rozhraní; ukládání adres a odesílání zpráv řeší serverová část nebo služba.');
  x('Formulář s chybou', 'Najdi chybný řádek formuláře pro odběr novinek (popisek E-mail má fungovat a prohlížeč má kontrolovat formát e-mailu).', ['<form class="newsletter-form">', '<label for="email">E-mail</label>', '<input type="text" id="mail" name="email">', '<input type="submit" value="Odeslat">', '</form>'], [2], { 2: '<input type="email" id="email" name="email">' }, 'Pole má mít type="email" a id shodné s for u label.');

  topic = 'Programovací jazyky';
  p('Tvůrci jazyků', 'Přiřaď programovací jazyk k jeho tvůrci.', [
    ['Python', 'Guido van Rossum'],
    ['C', 'Dennis Ritchie'],
    ['C++', 'Bjarne Stroustrup'],
    ['Java', 'James Gosling'],
    ['JavaScript', 'Brendan Eich'],
    ['PHP', 'Rasmus Lerdorf'],
    ['Rust', 'Graydon Hoare'],
  ], 'C# a TypeScript navrhl Anders Hejlsberg (Microsoft); Go Griesemer, Pike a Thompson (Google).', 3);
  p('Hello, World!', 'Přiřaď řádek programu Hello, World! k jazyku.', [
    ['print("Hello, World!")', 'Python'],
    ['console.log("Hello, World!");', 'JavaScript'],
    ['System.out.println("Hello, World!");', 'Java'],
    ['Console.WriteLine("Hello, World!");', 'C#'],
    ['fmt.Println("Hello, World!")', 'Go'],
    ['println!("Hello, World!");', 'Rust'],
    ['std::cout << "Hello, World!";', 'C++'],
    ['echo "Hello, World!";', 'PHP'],
  ], 'Typické znaky: print, console.log, System.out.println, Console.WriteLine, fmt.Println, makro println! s vykřičníkem, std::cout <<, echo.', 3);
  c('Anders Hejlsberg', 'Které dva jazyky navrhl Anders Hejlsberg v Microsoftu?', ['Java a Kotlin', 'C# a TypeScript', 'Go a Rust', 'PHP a Python'], 1, 'C# (platforma .NET) a TypeScript (JavaScript s typy).');
  c('TypeScript', 'Co je TypeScript?', ['Úplně nový jazyk nezávislý na JS', 'JavaScript se statickými typy', 'Nová verze jazyka Java', 'Šablonovací jazyk pro PHP'], 1, 'Při překladu se typové anotace odstraní a výsledkem je JavaScript.');
  c('Java a JavaScript', 'Jaký je vztah mezi Javou a JavaScriptem?', ['Jde o tentýž jazyk', 'Jsou to odlišné jazyky různých autorů', 'JavaScript je zkrácená Java', 'Java běží jen v prohlížeči'], 1, 'Java – James Gosling (Sun), JavaScript – Brendan Eich (Netscape).');
  c('JVM', 'Do čeho se běžně překládá program v Javě?', ['Přímo do strojového kódu procesoru', 'Do bajtkódu pro JVM', 'Do zdrojového kódu JavaScriptu', 'Do statického HTML dokumentu'], 1, 'Bajtkód spouští JVM, proto běží na různých systémech.');
  c('Go', 'Která firma stojí za jazykem Go a jaké nástroje v něm vznikly?', ['Microsoft – Visual Studio Code', 'Google – Docker a Kubernetes', 'Apple – Xcode a SwiftUI', 'Meta – React a React Native'], 1, 'Go navrhli Griesemer, Pike a Thompson v Googlu; používá se na cloudové a síťové služby.');
  c('Rust a paměť', 'Jak Rust zajišťuje bezpečnost paměti?', ['Garbage collectorem', 'Vlastnictvím a výpůjčkami', 'Ručním free() jako v C', 'Nijak, paměť neřeší'], 1, 'Bezpečný Rust omezuje celé skupiny paměťových chyb bez běžného garbage collectoru.');
  c('PHP v prohlížeči', 'Kde se při běžném webovém použití zpracuje kód PHP?', ['V prohlížeči návštěvníka', 'Na serveru, prohlížeč vidí výstup', 'Přímo v databázi MySQL', 'V operačním systému klienta'], 1, 'Prohlížeč nevidí zdrojový kód PHP, jen vygenerovaný výstup (HTML).');
  c('Značka PHP', 'Proč je spolehlivější otevírací značka <?php než <? ?', ['<? je novější a lepší verze', '<? závisí na short_open_tag', '<?php je kratší na psaní', '<? funguje jen pro výpis'], 1, '<? funguje jen při zapnutém short_open_tag; <?= je zkratka pro výpis.');
  k('Frameworky', 'Zařaď frameworky a prostředí k jazyku.', ['Python', 'PHP', 'JavaScript'], [
    ['Flask', 'Python'],
    ['Django', 'Python'],
    ['Laravel', 'PHP'],
    ['Nette', 'PHP'],
    ['Symfony', 'PHP'],
    ['Node.js (serverové prostředí)', 'JavaScript'],
  ], 'Flask je lehký základ, Django nabízí víc hotových součástí. Laravel, Nette a Symfony jsou PHP frameworky.');
  p('Typické použití', 'Přiřaď jazyk k typické oblasti použití.', [
    ['Jádra OS, ovladače, mikrokontroléry', 'C'],
    ['Interaktivní web v prohlížeči', 'JavaScript'],
    ['AI, strojové učení, analýza dat', 'Python'],
    ['Aplikace .NET a hry v Unity', 'C#'],
    ['Cloudové služby a mikroservisy', 'Go'],
    ['Herní a grafické enginy', 'C++'],
    ['Podnikové a bankovní systémy', 'Java'],
  ], 'Oblasti se překrývají – jazyk se volí podle účelu, týmu a nástrojů.', 3);
  c('Flask a Django', 'Jaký je rozdíl mezi Flaskem a Djangem?', ['Flask je pro PHP, Django pro Python', 'Flask je lehčí, Django má víc hotového', 'Django je jen pro mobilní aplikace', 'Flask je databáze, Django šablona'], 1, 'Oba jsou webové frameworky pro Python.');
  c('TIOBE', 'Co měří index TIOBE?', ['Množství napsaného kódu na GitHubu', 'Popularitu podle výsledků vyhledávačů', 'Rychlost jazyků v testech', 'Počet pracovních nabídek'], 1, 'TIOBE, Stack Overflow Survey a GitHub Octoverse měří různé věci a nelze je zaměňovat.');
  s('Volba jazyka', 'Tým výborně ovládá Python a má vytvořit webovou aplikaci pro školu. Kamarád radí přejít na jiný jazyk, protože je teď populárnější.', 'Co je rozumné rozhodnutí?', ['Přejít na nejpopulárnější jazyk', 'Využít Python a zvážit Flask nebo Django', 'Napsat web v jazyce C', 'Počkat, až se žebříčky změní'], 1, 'Pořadí v žebříčku neurčuje vhodnost pro konkrétní projekt; silná stránka týmu ano.');
  c('Octoverse 2025', 'Který jazyk se podle GitHub Octoverse v srpnu 2025 dostal podle počtu přispěvatelů na první místo?', ['Python', 'JavaScript', 'TypeScript', 'Java'], 2, 'V roce 2024 vedl Python, v srpnu 2025 ho podle přispěvatelů předběhl TypeScript. Rok i metrika jsou součástí významu statistiky.');
  x('Java Hello World', 'Najdi chybný řádek programu Hello, World! v Javě.', ['public class Program {', '    public static void main(String[] args) {', '        console.log("Hello, World!");', '    }', '}'], [2], { 2: '        System.out.println("Hello, World!");' }, 'console.log patří do JavaScriptu; v Javě se vypisuje přes System.out.println.');

  topic = 'SWOT a TOWS';
  p('Písmena SWOT', 'Přiřaď písmeno SWOT k jeho významu.', [
    ['S – Strengths', 'silné stránky'],
    ['W – Weaknesses', 'slabé stránky'],
    ['O – Opportunities', 'příležitosti'],
    ['T – Threats', 'hrozby'],
  ], 'S a W jsou vnitřní vlivy týmu, O a T vnější vlivy okolí.');
  k('Body SWOT', 'Zařaď body do SWOT analýzy studentského projektu.', ['S – silné stránky', 'W – slabé stránky', 'O – příležitosti', 'T – hrozby'], [
    ['Tým zvládá Python', 'S – silné stránky'],
    ['Nikdo neumí nastavit Linux', 'W – slabé stránky'],
    ['Škola nabízí školní server', 'O – příležitosti'],
    ['Poskytovatel zdraží hosting', 'T – hrozby'],
    ['Projekt závisí na jediném členovi', 'W – slabé stránky'],
    ['Existuje konkurenční aplikace zdarma', 'T – hrozby'],
    ['Uživatelé mají neřešenou potřebu', 'O – příležitosti'],
    ['Znalost prostředí školy', 'S – silné stránky'],
  ], 'Vnitřní příznivé = S, vnitřní nepříznivé = W, vnější příznivé = O, vnější nepříznivé = T.', 4);
  v('Vnitřní a vnější', 'Rozhodni, zda jde o vnitřní, nebo vnější vliv.', 'Vnitřní vliv', 'Vnější vliv', [
    ['Silné stránky (S)', 'left'],
    ['Příležitosti (O)', 'right'],
    ['Slabé stránky (W)', 'left'],
    ['Hrozby (T)', 'right'],
  ], 'Vnitřní podmínky tým ovlivní přímo, na vnější hlavně reaguje.');
  c('Slabina nebo hrozba', 'Podle čeho rozhodneš, zda je faktor slabá stránka, nebo hrozba?', ['Podle toho, jak moc projektu vadí', 'Podle původu: tým, nebo okolí', 'Podle délky popisu v tabulce', 'Podle abecedního pořadí bodů'], 1, 'Neumíme Linux = slabina (vnitřní); výpadky školní sítě = hrozba (vnější).');
  s('Školní připojení', 'Studentský tým plánuje aplikaci. Školní připojení k internetu občas vypadává.', 'Kam ve SWOT tento bod patří?', ['S – silné stránky', 'W – slabé stránky', 'O – příležitosti', 'T – hrozby'], 3, 'Výpadky sítě školy tým přímo neovlivní – je to vnější hrozba, na kterou se připraví návrhem.');
  s('Málo peněz', 'Tým má na pronájem serveru jen malý vlastní rozpočet.', 'Do které části SWOT zapíšeš malý vlastní rozpočet?', ['T – hrozby', 'O – příležitosti', 'W – slabé stránky', 'S – silné stránky'], 2, 'Málo vlastních prostředků je vnitřní slabina; zdražení serveru poskytovatelem by byla hrozba.');
  c('Omezení SWOT', 'Co platí o omezeních SWOT analýzy?', ['Přesně vypočítá cenu projektu', 'Je subjektivní, neurčuje váhy', 'Zaručí úspěch celého projektu', 'Plně nahrazuje harmonogram'], 1, 'SWOT je podklad pro plánování, ne výpočet ceny ani záruka úspěchu.');
  p('Strategie TOWS', 'Přiřaď kombinaci TOWS ke směru strategie.', [
    ['SO', 'využít přednosti k využití příležitosti'],
    ['ST', 'využít přednosti k omezení hrozby'],
    ['WO', 'omezit slabinu, aby šla využít příležitost'],
    ['WT', 'omezit slabiny i vystavení hrozbám'],
  ], 'TOWS převádí body SWOT na konkrétní rozhodnutí.', 3);
  s('Bufet a platby', 'Tým dělá objednávkový systém pro školní bufet. Neumí integrovat platební bránu a má malý rozpočet.', 'Které rozhodnutí z analýzy rozumně vyplývá?', ['Napsat vlastní platební bránu', 'Interní kredit dobíjený v bufetu', 'Projekt kvůli tomu úplně zrušit', 'Placení úplně ignorovat'], 1, 'Omezí se složitost i závislost na neznámé technologii (WT/WO). Ochranu osobních údajů je ale nutné posoudit zvlášť.');
  s('Mobilní přístup', 'Uživatelé chtějí aplikaci používat z telefonu, ale tým neumí vyvíjet samostatné mobilní aplikace.', 'Která strategie WO je vhodná?', ['Vzdát se přístupu z telefonu', 'Udělat responzivní web ve známé technologii', 'Najmout drahou externí firmu', 'Naučit se Swift i Kotlin za týden'], 1, 'Slabinu obejde známá technologie, příležitost (přístup z mobilu) se přesto využije.');
  c('Akční plán', 'Co se u opatření v akčním plánu po SWOT určuje?', ['Jen název celého projektu', 'Co, kdo, prostředky a termín', 'Pouze barvy prezentace', 'Jen seznam všech hrozeb'], 1, 'Po změně zadání nebo podmínek se k analýze vrať.');
  o('Postup SWOT', 'Seřaď kroky práce se SWOT analýzou podle logické návaznosti.', ['Zvolit projekt nebo rozhodnutí a cíl', 'Doplnit do částí konkrétní body', 'Zkontrolovat rozlišení vnitřních a vnějších vlivů', 'Převést nejdůležitější souvislosti na kroky'], 'Obecné body typu „jsme dobří“ málo pomáhají – body mají být konkrétní.');

  topic = 'GitHub Desktop a Render';
  v('Commit a push', 'Rozhodni, zda tvrzení patří ke commitu, nebo k pushi.', 'Commit', 'Push', [
    ['Zaznamená změny do místní historie', 'left'],
    ['Odešle změny do vzdáleného repozitáře', 'right'],
    ['Probíhá i bez připojení k internetu', 'left'],
    ['Může spustit automatické nasazení na Renderu', 'right'],
  ], 'Commit = místní záznam, push = odeslání na GitHub.');
  o('Od kódu k webu', 'Seřaď kroky od úpravy kódu po aktualizovaný web na Renderu.', ['Upravit soubor v editoru', 'Vytvořit commit v GitHub Desktop', 'Pushnout do sledované větve', 'Render sestaví a nasadí novou verzi', 'Ověřit změnu na publikovaném webu'], 'Změna jen v editoru publikovaný web nezmění.');
  c('GitHub Desktop', 'Co je GitHub Desktop?', ['Webový hosting pro statické weby', 'Grafický klient pro Git', 'Editor kódu s doplňováním', 'Databáze pro webové aplikace'], 1, 'Umožňuje prohlížet změny, commitovat a pushovat bez psaní příkazů.');
  c('Deploy', 'Co znamená deploy?', ['Smazání vzdáleného repozitáře', 'Nasazení verze na hosting', 'Vytvoření nové větve v Gitu', 'Stažení kódu z GitHubu'], 1, 'Nasazení zpřístupní konkrétní verzi aplikace uživatelům.');
  s('Web se nezměnil', 'Upravil jsi index.html v editoru a uložil ho, ale web na Renderu ukazuje starou verzi.', 'Co nejspíš chybí?', ['Restart celého počítače', 'Commit a push do sledované větve', 'Vymazání DNS cache v prohlížeči', 'Založení nového účtu na Renderu'], 1, 'Render nasazuje z repozitáře – změna musí být commitnutá, pushnutá a nasazení dokončené.');
  n('Uspání služby', 'Po kolika minutách bez příchozího provozu se uspí bezplatná webová služba na Renderu?', 15, 'Další požadavek ji probudí; první návštěvník může čekat přibližně minutu.');
  c('Probuzení', 'Jak dlouho může podle dokumentace čekat první návštěvník na uspanou bezplatnou službu Renderu?', ['Nečeká vůbec, služba neusíná', 'Přibližně jednu minutu', 'Klidně i celý den', 'Přesně dvě sekundy'], 1, 'Na pevně daných pár sekund nelze spoléhat.');
  c('Statický web', 'Týká se uspávání po nečinnosti každého statického webu na Renderu?', ['Ano, všech projektů na Renderu', 'Ne, jen bezplatných web services', 'Ano, ale pouze o víkendech', 'Ne, uspávání vůbec neexistuje'], 1, 'Pravidlo se vztahuje na bezplatné web services, ne obecně na statické weby.');
  c('Automatické nasazení', 'Co platí o automatickém nasazování na Renderu?', ['Nelze ho nijak vypnout', 'Lze ho vypnout či podmínit kontrolami', 'Spouští se jen ručně v noci', 'Funguje jen bez napojení na GitHub'], 1, 'Při zapnutí ho spustí push nebo sloučení do sledované větve.');

  return list;
})();
