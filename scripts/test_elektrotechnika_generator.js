// Nezávislé přepočítání generovaných zadání a kontrola zapojení do sady.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const fields = Object.fromEntries(Object.entries({
  filterSubject: 'elektrotechnika', filterTopic: 'all', filterType: 'number',
  filterSubtopic: 'all', filterDifficulty: 'all', exerciseSearch: '', sessionSize: '5'
}).map(([key, value]) => [key, { value }]));
let seed = 12345;
let responseValue = '';
const math = Object.create(Math);
math.random = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 2 ** 32; };
const context = { window: {}, console, Math: math, CSS: { escape: value => value }, document: {
  addEventListener() {}, getElementById(id) { return fields[id]; },
  querySelector() { return { value: responseValue }; }
} };
vm.createContext(context);
for (const file of ['data/elektrotechnika_exercises.js', 'data/cislicova_technika_exercises.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
vm.runInContext(source.slice(0, source.indexOf("$('themeToggle').addEventListener")), context);
const run = code => vm.runInContext(code, context);
const topics = [...new Set(context.window.ELECTROTECHNICS_EXERCISES.map(e => e.topic))];
const ids = new Set();
let total = 0;
for (const topic of topics) for (let level = 1; level <= 5; level++) {
  fields.filterTopic.value = topic;
  fields.filterDifficulty.value = String(level);
  const variants = new Set();
  for (let i = 0; i < 200; i++) {
    const q = run('generatedElectrotechnicsExercise()');
    assert.equal(q.topic, topic);
    assert.equal(q.difficulty, level);
    assert.equal(q.type, 'number');
    assert.equal(q.subtopic, 'Výpočty');
    assert.ok(!ids.has(q.id));
    ids.add(q.id);
    variants.add(q.question);
    const n = q.question.match(/-?\d+(?:,\d+)?/g).map(s => Number(s.replace(',', '.')));
    let expected;
    if (topic === topics[0]) {
      expected = q.question.startsWith('Za ') ? n[1] / n[0]
        : q.question.includes('po dobu') ? n[0] * n[1] : n[1] / n[0];
    } else if (topic === topics[1]) {
      expected = q.question.startsWith('Rezistorem') ? n[0] * n[1]
        : q.question.includes('s odporem') ? n[1] / n[0] : n[0] / n[1];
    } else if (topic === topics[2]) {
      expected = q.question.includes('Urči odpor') ? n[2] * n[0] / n[1]
        : q.question.includes('Urči průřez') ? n[1] * n[0] / n[2] : n[2] * n[0] / n[1];
    } else {
      expected = q.question.includes('jen přírůstek') ? n[1] * n[2] * (n[3] - n[0])
        : n[1] * (1 + n[2] * (n[3] - n[0]));
    }
    assert.ok(Math.abs(Number(q.answer) - expected) < 1e-9, q.question);
    context.item = q;
    responseValue = q.answer;
    assert.equal(run('readExerciseResponse(item).correct'), true);
    responseValue = q.answer.replace('.', ',');
    assert.equal(run('readExerciseResponse(item).correct'), true);
    responseValue = String(Number(q.answer) + 1);
    assert.equal(run('readExerciseResponse(item).correct'), false);
    for (const mode of ['learn', 'test']) {
      context.item = q;
      context.mode = mode;
      assert.ok(run('state.mode = mode; renderExercise(item, 0)').includes(q.id));
    }
    total++;
  }
  assert.ok(variants.size > 20, topic);
}
fields.filterTopic.value = 'all';
fields.filterDifficulty.value = 'all';
assert.equal(run('canGenerateTasks()'), true);
fields.filterType.value = 'choice';
assert.equal(run('canGenerateTasks()'), false);
fields.filterType.value = 'number';
fields.filterSubtopic.value = 'Porozumění';
assert.equal(run('canGenerateTasks()'), false);
fields.filterSubtopic.value = 'all';
run('createSession = () => {}; renderExercises = () => {}; saveHistory = () => {}; toast = () => {};');
run('generateExercises(6)');
assert.equal(run('state.generatedExercises.length'), 6);
assert.equal(run('sessionExercises().length'), 5);
assert.equal(run('sessionExercises().every(e => e.generated)'), true);
context.previous = run('state.generatedExercises.map(e => e.question)');
run('generateExercises(6)');
assert.equal(run('state.generatedExercises.some(e => previous.includes(e.question))'), false);
fields.filterSubject.value = 'Číslicová technika';
fields.filterType.value = 'conversion';
assert.equal(run('canGenerateTasks()'), true);
assert.equal(run('generatedCtExercise().type'), 'conversion');
console.log(`OK: ${total} výpočtů, všechna témata a obtížnosti, filtry, nové sady a převody.`);
