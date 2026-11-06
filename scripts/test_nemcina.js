// Úplnost slovníčku ověřujeme proti uloženému podkladu, nikoli počtu v generátoru.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
let response = '';
const context = {
  window: {}, console, CSS: { escape: value => value },
  document: { addEventListener() {}, querySelector() { return { value: response }; } },
};
vm.createContext(context);
vm.runInContext(read('data/nemcina_exercises.js'), context);
const exercises = context.window.GERMAN_EXERCISES;
const lexical = exercises.filter(e => e.title === 'Význam slova nebo výrazu');
const sourceEntries = [];
let examples = false;
for (const line of read('materialy/nemcina/zdroj/slovicka-lekce-6.md').split('\n')) {
  if (/^## /.test(line)) examples = false;
  if (/^### Příklady/.test(line)) examples = true;
  const match = line.match(/^- \*\*(.+?)\*\* — (.+)$/);
  if (match && !examples) sourceEntries.push({
    de: match[1].replaceAll('\\|', ''),
    cs: match[2].replaceAll('*', ''),
  });
}
assert.ok(sourceEntries.length >= 130, 'Podklad nesmí být prázdný ani neúplný.');
assert.equal(lexical.length, sourceEntries.length);
for (const { de, cs } of sourceEntries) {
  const questions = lexical.filter(e => e.question === `Vyber český význam výrazu **${de}**.`);
  assert.equal(questions.length, 1, `Chybí vlastní otázka nebo je duplicitní: ${de}`);
  assert.equal(questions[0].answer, cs, `Překlad neodpovídá podkladu: ${de}`);
}
for (const e of lexical) {
  assert.equal(e.choices.length, 4, e.id);
  assert.equal(new Set(e.choices).size, 4, e.id);
  if (e.answer.startsWith('zapnout')) {
    assert.equal(e.choices.filter(value => value.startsWith('zapnout')).length, 1, 'Dvě synonyma nesmějí soutěžit.');
  }
}
const app = read('app.js');
assert.ok(read('index.html').indexOf('data/nemcina_exercises.js') < read('index.html').indexOf('src="app.js'));
vm.runInContext(app.slice(0, app.indexOf("$('themeToggle').addEventListener")), context);
const run = code => vm.runInContext(code, context);
assert.equal(run('state.exercises.length'), exercises.length, 'Nový modul se musí načíst do runtime.');
assert.equal(new Set(exercises.map(e => e.topic)).size, 7);
for (const exercise of exercises) {
  context.item = exercise;
  for (const mode of ['learn', 'test']) {
    context.mode = mode;
    const html = run('state.mode = mode; renderExercise(item, 0)');
    assert.ok(html.includes(exercise.id), exercise.id);
    if (mode === 'test') assert.ok(html.includes('Zaznamenat odpověď'), exercise.id);
  }
  if (exercise.type === 'text') assert.equal(exercise.autoGrade, false);
  if (exercise.type !== 'fill') continue;
  response = exercise.answer;
  assert.equal(run('readExerciseResponse(item).correct'), true, exercise.id);
  response = 'nesprávná odpověď';
  assert.equal(run('readExerciseResponse(item).correct'), false, exercise.id);
}
const umlaut = exercises.find(e => e.type === 'fill' && e.answer === 'fängst');
assert.ok(umlaut);
context.item = umlaut;
response = 'fangst';
assert.equal(run('readExerciseResponse(item).correct'), false, 'Přehláska mění německý tvar.');
response = 'fängst';
assert.equal(run('readExerciseResponse(item).correct'), true);
console.log(`OK: všech ${sourceEntries.length} slovníkových položek má vlastní otázku a správný překlad; ${exercises.length} úloh se vykreslí v Učení i Testu, doplňování rozlišuje přehlásky.`);
