/*
 * Jednoduchá kontrola datových souborů Procvičovny.
 * Spuštění z kořene projektu:
 *   node scripts/validate_questions.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');

function loadGlobalArray(fileName, variableName) {
  const file = path.join(DATA, fileName);
  const source = fs.readFileSync(file, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: file });
  const value = context.window[variableName];
  if (!Array.isArray(value)) {
    throw new Error(`${fileName}: ${variableName} není pole.`);
  }
  return value;
}

const groups = [
  { file: 'exercises.js', variable: 'EXERCISES' },
  { file: 'network_exercises.js', variable: 'NETWORK_EXERCISES' },
  { file: 'literature_exercises.js', variable: 'LITERATURE_EXERCISES' },
  { file: 'cislicova_technika_exercises.js', variable: 'DIGITAL_TECHNICS_EXERCISES' },
];

const allowedTypes = new Set(['choice', 'multi', 'match', 'order', 'text', 'code', 'fill', 'number', 'conversion']);
const all = [];
const errors = [];
const warnings = [];
const warningCounts = { noHint: 0, noTags: 0 };

for (const group of groups) {
  try {
    const list = loadGlobalArray(group.file, group.variable);
    console.log(`${group.file}: ${list.length} úloh`);
    for (const exercise of list) {
      all.push({ ...exercise, __file: group.file });
    }
  } catch (error) {
    errors.push(`${group.file}: ${error.message}`);
  }
}

const ids = new Map();
for (const e of all) {
  const prefix = `${e.__file} / ${e.id || '(bez ID)'}`;

  if (!e.id) errors.push(`${prefix}: chybí id`);
  else if (ids.has(e.id)) errors.push(`${prefix}: duplicitní id; první výskyt je v ${ids.get(e.id)}`);
  else ids.set(e.id, prefix);

  for (const field of ['subject', 'topic', 'subtopic', 'title', 'question']) {
    if (!String(e[field] ?? '').trim()) errors.push(`${prefix}: chybí ${field}`);
  }

  if (!allowedTypes.has(e.type)) {
    errors.push(`${prefix}: neznámý type "${e.type}"`);
    continue;
  }

  if (e.type === 'choice') {
    if (!Array.isArray(e.choices) || e.choices.length < 2) {
      errors.push(`${prefix}: choice potřebuje alespoň 2 možnosti v choices`);
    }
    if (!String(e.answer ?? '').trim()) {
      errors.push(`${prefix}: choice nemá answer`);
    } else if (!Array.isArray(e.choices) || !e.choices.some(c => String(c).trim() === String(e.answer).trim())) {
      errors.push(`${prefix}: answer není mezi choices`);
    }
  }

  if (e.type === 'multi') {
    if (!Array.isArray(e.choices) || e.choices.length < 2) errors.push(`${prefix}: multi potřebuje alespoň 2 možnosti v choices`);
    if (!Array.isArray(e.answers) || e.answers.length < 1) errors.push(`${prefix}: multi nemá answers`);
    else {
      const choices = new Set((e.choices || []).map(c => String(c).trim()));
      for (const answer of e.answers) {
        if (!choices.has(String(answer).trim())) errors.push(`${prefix}: multi answers obsahuje možnost mimo choices`);
      }
    }
  }

  if (e.type === 'match') {
    if (!Array.isArray(e.pairs) || e.pairs.length < 2) errors.push(`${prefix}: match potřebuje alespoň 2 páry`);
    else {
      const lefts = new Set();
      const rights = new Set();
      for (const pair of e.pairs) {
        if (!pair || typeof pair.left !== 'string' || typeof pair.right !== 'string') {
          errors.push(`${prefix}: match pár musí mít left a right`);
          continue;
        }
        const left = pair.left.trim();
        const right = pair.right.trim();
        if (lefts.has(left)) errors.push(`${prefix}: match má duplicitní left`);
        if (rights.has(right)) errors.push(`${prefix}: match má duplicitní right`);
        lefts.add(left);
        rights.add(right);
      }
    }
  }

  if (e.type === 'order') {
    if (!Array.isArray(e.order) || e.order.length < 2) errors.push(`${prefix}: order potřebuje alespoň 2 položky`);
    else {
      const values = e.order.map(v => String(v).trim());
      if (values.some(v => !v)) errors.push(`${prefix}: order nesmí obsahovat prázdnou položku`);
      if (new Set(values).size !== values.length) errors.push(`${prefix}: order obsahuje duplicitní položku`);
    }
  }

  if (e.type === 'conversion') {
    const value = String(e.value ?? '').trim();
    const fromBase = Number(e.fromBase);
    const toBase = Number(e.toBase);
    const answer = String(e.answer ?? '').trim();
    if (!value) errors.push(`${prefix}: conversion nemá value`);
    if (!Number.isInteger(fromBase) || fromBase < 2 || fromBase > 36) errors.push(`${prefix}: conversion má neplatný fromBase`);
    if (!Number.isInteger(toBase) || toBase < 2 || toBase > 36) errors.push(`${prefix}: conversion má neplatný toBase`);
    if (!answer) errors.push(`${prefix}: conversion nemá answer`);
  }

  if (e.type === 'number') {
    const raw = String(e.answer ?? '').trim().replace(',', '.');
    if (!raw) errors.push(`${prefix}: number nemá answer`);
    else if (!Number.isFinite(Number(raw))) errors.push(`${prefix}: number answer není číselná hodnota: ${e.answer}`);
  }

  if (e.type === 'fill' && !String(e.answer ?? '').trim()) {
    errors.push(`${prefix}: fill nemá answer`);
  }

  if (e.type === 'text' && !String(e.answer ?? '').trim() && !String(e.solution ?? '').trim()) {
    errors.push(`${prefix}: text nemá answer ani solution`);
  }

  if (e.type === 'code') {
    if (!String(e.solution ?? '').trim()) errors.push(`${prefix}: code nemá solution`);
    if (e.expectedOutput == null) errors.push(`${prefix}: code nemá expectedOutput`);
  }

  if (typeof e.tags !== 'undefined' && !Array.isArray(e.tags)) {
    errors.push(`${prefix}: tags musí být pole`);
  }

  if (!String(e.hint ?? '').trim()) warningCounts.noHint += 1;
  if (!Array.isArray(e.tags) || e.tags.length === 0) warningCounts.noTags += 1;
}

const subjectCounts = {};
const typeCounts = {};
for (const e of all) {
  subjectCounts[e.subject] = (subjectCounts[e.subject] || 0) + 1;
  typeCounts[e.type] = (typeCounts[e.type] || 0) + 1;
}

console.log(`\nCelkem: ${all.length} úloh`);
console.log(`Unikátní ID: ${ids.size}`);
console.log('Podle předmětu:', subjectCounts);
console.log('Podle typu:', typeCounts);

if (warningCounts.noHint || warningCounts.noTags) {
  console.log('\nNepovinná metadata:');
  if (warningCounts.noHint) console.log(`  - bez hintu: ${warningCounts.noHint}`);
  if (warningCounts.noTags) console.log(`  - bez tags: ${warningCounts.noTags}`);
}

if (errors.length) {
  console.error(`\nCHYBY (${errors.length}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exitCode = 1;
} else {
  console.log('\nKontrola OK – žádné kritické chyby dat.');
}
