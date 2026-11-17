// Němčina – doplnění podle stránek Notion NEJ (Předložky se 4. pádem; Časové intervaly; Slovesa s předponami).
// Navazuje na stávající témata v data/nemcina_exercises.js. Podklad: materialy/nemcina/zdroj/notion-nej-doplneni.md
window.GERMAN_2_EXERCISES = (() => {
  const list = [];
  let topic = '';
  let seq = 0;
  const SUB = { choice: 'Procvičování', scenario: 'Praktické situace', multi: 'Procvičování', match: 'Souvislosti', compare: 'Porovnání', cloze: 'Doplňování', spot: 'Najdi chybu', fill: 'Doplňování' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `nej2-${String(++seq).padStart(3, '0')}`, subject: 'Němčina', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['NEJ', 'zápisy z Notionu'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const p = (title, question, pairs, solution, d = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const z = (title, question, cloze, gaps, solution, d = 2) => add('cloze', title, question, { cloze, gaps }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3) => add('spot', title, question, { segments, wrong, corrections }, solution, d);

  topic = 'Osobní zájmena a 4. pád';
  p('Významy předložek', 'Přiřaď předložku se 4. pádem k jejímu základnímu významu.', [
    ['durch', 'skrz, přes'],
    ['für', 'pro'],
    ['gegen', 'proti'],
    ['ohne', 'bez'],
    ['um', 'kolem; v (u hodin)'],
  ], 'durch den Park, für meine Mutter, gegen mich, ohne Geld, um die Ecke / um acht Uhr.');
  c('Für ve sportu', 'Jak přeložíš větu Er spielt für Sparta?', ['Hraje proti Spartě.', 'Hraje za Spartu.', 'Hraje bez Sparty.', 'Hraje kolem Sparty.'], 1, 'Ve sportovním kontextu odpovídá für českému „za“.');
  z('Für dich', 'Doplň zájmeno ve 4. pádě do věty Co pro tebe mohu udělat?', 'Was kann ich für {{a}} tun?', [
    { id: 'a', options: ['dich', 'du', 'dir'], answer: 'dich' },
  ], 'Po für následuje 4. pád: du → dich. Sloveso tun stojí na konci za modálním kann.');
  c('Das Geld', 'Jaký rod a číslo má německé slovo Geld (peníze)?', ['Množné číslo – die Gelder', 'Střední rod, j. č. – das Geld', 'Mužský rod, j. č. – der Geld', 'Ženský rod, j. č. – die Geld'], 1, 'Na rozdíl od českých „peněz“ je das Geld v jednotném čísle. Ohne Geld = bez peněz.');
  c('Kommen a bekommen', 'Co znamená sloveso bekommen?', ['přijít', 'dostat', 'odejít', 'stát se'], 1, 'kommen = přijít, bekommen = dostat. Předpona mění význam (pozor na falešného přítele „become“).');
  c('Seit a pád', 'S jakým pádem se pojí předložka seit?', ['Se 4. pádem jako durch', 'S 3. pádem (dativem)', 'S 2. pádem', 'S 1. pádem'], 1, 'seit + dativ: seit drei Jahren. Do skupiny durch, für, gegen, ohne, um nepatří.');
  x('Předložky ve větách', 'Najdi chybné tvary ve větách.', ['Ich kaufe etwas', 'für meine Mutter.', 'Was hast du', 'gegen ich?', 'Du musst durch', 'der Park gehen.'], [3, 5], { 3: 'gegen mich?', 5: 'den Park gehen.' }, 'Po gegen a durch je 4. pád: ich → mich, der Park → den Park.');

  topic = 'Čas a časové výrazy';
  v('Von … bis a seit', 'Rozhodni, zda větu vyjádříš pomocí von … bis, nebo seit.', 'von … bis', 'seit', [
    ['Je na internetu od 20:00 do 21:30.', 'left'],
    ['Učím se německy už tři roky.', 'right'],
    ['Vyučování je od osmi do dvanácti.', 'left'],
    ['Bydlím tady od loňska a pořád.', 'right'],
  ], 'von … bis vymezuje interval se začátkem i koncem; seit děj, který začal v minulosti a trvá dodnes (přítomný čas).');
  c('Seit drei Jahren', 'Co znamená Ich lerne seit drei Jahren Deutsch?', ['Před třemi lety jsem se učil německy.', 'Učím se německy už tři roky.', 'Za tři roky se budu učit německy.', 'Učil jsem se německy tři roky a skončil.'], 1, 'seit + přítomný čas = děj stále trvá.');
  c('Halb zwei', 'Kolik je hodin, když Němec řekne halb zwei?', ['2:30', '1:30', '2:15', '12:30'], 1, 'halb + následující hodina: halb zwei = půl druhé = 1:30 (13:30).');
  z('Interval', 'Doplň předložky do věty Je na internetu od 20:00 do 21:30.', 'Er surft im Internet {{a}} zwanzig Uhr {{b}} halb zehn.', [
    { id: 'a', options: ['von', 'seit', 'um'], answer: 'von' },
    { id: 'b', options: ['bis', 'nach', 'vor'], answer: 'bis' },
  ], 'von … bis = od … do; halb zehn večer = 21:30.');

  topic = 'Odlučitelná slovesa a časování';
  v('Odlučitelná a neodlučitelná', 'Rozhodni, zda je předpona slovesa odlučitelná, nebo neodlučitelná.', 'Odlučitelná', 'Neodlučitelná', [
    ['einschlafen – ich schlafe … ein', 'left'],
    ['besuchen – er besucht die Schule', 'right'],
    ['fernsehen – er sieht … fern', 'left'],
    ['verschlafen – zaspat', 'right'],
  ], 'Odlučitelná předpona jde na konec věty; be- a ver- zůstávají spojené se slovesem.');
  p('Spát, usnout, zaspat', 'Přiřaď sloveso k jeho významu.', [
    ['schlafen', 'spát'],
    ['schlafen gehen', 'jít spát'],
    ['einschlafen', 'usnout'],
    ['verschlafen', 'zaspat'],
  ], 'ein- je odlučitelná (ich schlafe ein), ver- se neodlučuje (ich verschlafe).');
  c('Besuchen', 'Která věta se slovesem besuchen je správně?', ['Er sucht die Schule be.', 'Er besucht die Schule.', 'Er besucht die Schule be.', 'Er be sucht die Schule.'], 1, 'Předpona be- je neodlučitelná – zůstává spojená se slovesem.');
  c('Geld verdienen', 'Co znamená Geld verdienen?', ['utrácet peníze', 'vydělávat peníze', 'půjčit si peníze', 'spořit peníze'], 1, 'jobben = pracovat na brigádě; Geld verdienen = vydělávat peníze.');

  return list;
})();
