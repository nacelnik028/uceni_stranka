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
  { file: 'pocitacova_grafika_exercises.js', variable: 'PC_GRAPHICS_EXERCISES' },
];

const allowedTypes = new Set(['choice', 'multi', 'match', 'order', 'scenario', 'diagnostic', 'classification', 'compare', 'image-choice', 'text', 'code', 'fill', 'number', 'conversion']);
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
const questions = new Map();
const sourceDependentQuestion = /(materiál|poznámk|studijní materiál|dodan[ée]m)/i;
// Řazení se smí opírat o návaznost kroků, nikoli o pořadí položek na obrázku.
const sourceOrderQuestion = /(?:jak|tak jak|podle poradi).{0,50}(?:uveden|zobrazen|serazen).{0,60}(?:seznam|infografi|obraz|podklad)|(?:podle|v poradi).{0,30}(?:prilozen|uveden|kontrolniho).{0,30}seznam/;

function normalizeQuestion(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase('cs-CZ');
}


function normalizeMetadataValue(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .replace(/[`*_~]/g, '')
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .toLocaleLowerCase('cs-CZ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactMetadataValue(value) {
  return normalizeMetadataValue(value).replace(/\s+/g, '');
}

function acronymOf(value) {
  const words = normalizeMetadataValue(value).split(' ').filter(Boolean);
  return words.length >= 2 ? words.map(word => word[0]).join('') : '';
}

function answerRevealedByTag(tag, answer, exerciseType, autoGrade, question) {
  const tagRaw = String(tag ?? '').trim();
  const answerRaw = String(answer ?? '').trim();
  const tagValue = normalizeMetadataValue(tagRaw);
  const answerValue = normalizeMetadataValue(answerRaw);
  const questionValue = normalizeMetadataValue(question);
  if (!tagValue || !answerValue) return false;

  // Exact answer or formatting-only variant is always forbidden, even when the same
  // word already appears in the question. The project rule forbids answer-equal tags.
  if (tagValue === answerValue || compactMetadataValue(tagRaw) === compactMetadataValue(answerRaw)) return true;

  // When the term is already present in the question, a broader thematic tag does not
  // add a new clue. This exception is only for non-exact matches below.
  const questionWords = new Set(questionValue.split(' ').filter(Boolean));
  if (questionWords.has(tagValue) || questionValue.includes(` ${tagValue} `) || questionValue.startsWith(`${tagValue} `) || questionValue.endsWith(` ${tagValue}`)) return false;

  // An acronym such as PoE / CTR directly reveals a multi-word expected answer.
  if (acronymOf(answerRaw) === tagValue && answerValue.split(' ').length >= 2) return true;

  // Only objective-answer types should reject a tag that is a whole-word component
  // of the answer. For open-ended text, thematic words commonly occur in explanations
  // and do not by themselves expose a unique response.
  const objectiveType = new Set(['choice', 'scenario', 'image-choice', 'diagnostic', 'classification', 'compare', 'multi', 'match', 'order', 'fill', 'number', 'conversion']).has(exerciseType)
    || (exerciseType === 'text' && autoGrade === true);
  if (!objectiveType) return false;

  // Domain/URL answers such as favicon-generator.org may contain a broad topic tag
  // without the tag being a direct answer hint.
  if (/\b[a-z0-9-]+\.[a-z]{2,}(?:\/[^\s]*)?\b/i.test(answerRaw)) return false;

  const answerWords = answerValue.split(' ').filter(Boolean);
  const tagWords = tagValue.split(' ').filter(Boolean);
  if (answerWords.length >= 2 && tagWords.length >= 1 && tagWords.length <= answerWords.length) {
    for (let i = 0; i <= answerWords.length - tagWords.length; i += 1) {
      if (tagWords.every((word, j) => word === answerWords[i + j])) return true;
    }
  }

  // Very short answers embedded in a tag are still direct leaks (e.g. "základ 16").
  if (answerWords.length === 1 && answerWords[0].length <= 4 && tagWords.includes(answerWords[0])) return true;

  // Ranges such as A–F expose a set of valid match answers.
  if (/^[\p{L}\p{N}]+\s*[–-]\s*[\p{L}\p{N}]+$/u.test(tagRaw)) {
    const endpoints = tagRaw.split(/[–-]/).map(part => normalizeMetadataValue(part));
    if (endpoints.includes(answerValue)) return true;
  }

  return false;
}

function getCorrectAnswerValues(exercise) {
  switch (exercise.type) {
    case 'choice':
    case 'scenario':
    case 'image-choice':
      return [exercise.answer];
    case 'diagnostic': {
      const ids = new Set(Array.isArray(exercise.answerIds) ? exercise.answerIds.map(String) : []);
      return Array.isArray(exercise.items) ? exercise.items.filter(item => ids.has(String(item?.id))).map(item => item?.label) : [];
    }
    case 'classification':
      return Array.isArray(exercise.items) ? exercise.items.flatMap(item => [item?.text, item?.category]) : [];
    case 'compare':
      return [exercise.leftLabel, exercise.rightLabel];
    case 'multi':
      return Array.isArray(exercise.answers) ? exercise.answers : [];
    case 'match':
      return Array.isArray(exercise.pairs)
        ? exercise.pairs.flatMap(pair => pair && typeof pair === 'object' ? [pair.left, pair.right] : [])
        : [];
    case 'order':
      return Array.isArray(exercise.order) ? exercise.order : [];
    case 'conversion':
    case 'number':
    case 'fill':
      return [exercise.answer];
    case 'text':
      return [exercise.answer];
    case 'code':
      return [exercise.expectedOutput];
    default:
      return [];
  }
}

function validateUniqueStrings(values, label, prefix) {
  const seen = new Set();
  for (const value of values) {
    const key = String(value ?? '').trim();
    if (seen.has(key)) errors.push(`${prefix}: duplicitní ${label} "${key}"`);
    seen.add(key);
  }
}

function convertCanonical(value, base) {
  const raw = String(value ?? '').trim().toUpperCase();
  if (!raw) return null;
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let total = 0;
  for (const ch of raw) {
    const digit = digits.indexOf(ch);
    if (digit < 0 || digit >= base) return null;
    total = total * base + digit;
  }
  return total;
}

for (const e of all) {
  const prefix = `${e.__file} / ${e.id || '(bez ID)'}`;

  if (!e.id) errors.push(`${prefix}: chybí id`);
  else if (ids.has(e.id)) errors.push(`${prefix}: duplicitní id; první výskyt je v ${ids.get(e.id)}`);
  else ids.set(e.id, prefix);

  for (const field of ['subject', 'topic', 'subtopic', 'title', 'question']) {
    if (!String(e[field] ?? '').trim()) errors.push(`${prefix}: chybí ${field}`);
  }

  const questionKey = normalizeQuestion(e.question);
  if (questionKey) {
    if (questions.has(questionKey)) errors.push(`${prefix}: duplicitní otázka; první výskyt je v ${questions.get(questionKey)}`);
    else questions.set(questionKey, prefix);
  }
  if (sourceDependentQuestion.test(String(e.question ?? ''))) {
    errors.push(`${prefix}: otázka odkazuje na materiál/poznámky; otázka musí být řešitelná samostatně`);
  }

  if (!allowedTypes.has(e.type)) {
    errors.push(`${prefix}: neznámý type "${e.type}"`);
    continue;
  }

  if (e.type === 'text' || e.type === 'fill') {
    if (typeof e.autoGrade !== 'boolean') {
      errors.push(`${prefix}: ${e.type} musí mít explicitní boolean autoGrade (true jen pro jednoznačnou odpověď)`);
    }
    if (e.type === 'text' && e.autoGrade === true && !String(e.answer ?? '').trim()) {
      errors.push(`${prefix}: text s autoGrade=true musí mít kanonickou answer`);
    }

    // Konzervativní ochrana proti automatickému hodnocení otevřených formulací.
    // Tyto typy zadání mohou mít více věcně správných odpovědí, takže mají být self-check.
    const openEndedCue = /^(?:co znamená|co je|vysvětli|objasni|popiš|proč|jaký problém řeší|jak funguje|jak fungují|uveď|vyjmenuj|popiš rozdíl|vysvětlete|objasněte)(?=\s|$|[.!?])/i.test(String(e.question ?? '').trim());
    if (e.autoGrade === true && openEndedCue) {
      errors.push(`${prefix}: ${e.type} s autoGrade=true vypadá jako otevřená otázka s více možnými formulacemi; nastav autoGrade=false a použij self-check`);
    }
  }

  if (e.type === 'choice') {
    if (!Array.isArray(e.choices) || e.choices.length < 2) {
      errors.push(`${prefix}: choice potřebuje alespoň 2 možnosti v choices`);
    } else {
      validateUniqueStrings(e.choices, 'choice', prefix);
    }
    if (!String(e.answer ?? '').trim()) {
      errors.push(`${prefix}: choice nemá answer`);
    } else if (!Array.isArray(e.choices) || !e.choices.some(c => String(c).trim() === String(e.answer).trim())) {
      errors.push(`${prefix}: answer není mezi choices`);
    }
  }

  if (e.type === 'multi') {
    if (!Array.isArray(e.choices) || e.choices.length < 2) {
      errors.push(`${prefix}: multi potřebuje alespoň 2 možnosti v choices`);
    } else {
      validateUniqueStrings(e.choices, 'choice', prefix);
    }
    if (!Array.isArray(e.answers) || e.answers.length < 1) errors.push(`${prefix}: multi nemá answers`);
    else {
      const choices = new Set((e.choices || []).map(c => String(c).trim()));
      validateUniqueStrings(e.answers, 'správnou odpověď', prefix);
      for (const answer of e.answers) {
        if (!choices.has(String(answer).trim())) errors.push(`${prefix}: multi answers obsahuje možnost mimo choices`);
      }
    }
  }

  if (e.type === 'scenario' || e.type === 'image-choice') {
    if (!Array.isArray(e.choices) || e.choices.length < 2) errors.push(`${prefix}: ${e.type} potřebuje alespoň 2 choices`);
    else validateUniqueStrings(e.choices, 'choice', prefix);
    if (!String(e.answer ?? '').trim()) errors.push(`${prefix}: ${e.type} nemá answer`);
    else if (!Array.isArray(e.choices) || !e.choices.some(c => String(c).trim() === String(e.answer).trim())) errors.push(`${prefix}: answer není mezi choices`);
    if (e.type === 'scenario' && !String(e.scenario ?? '').trim()) errors.push(`${prefix}: scenario nemá text scénáře`);
    if (e.type === 'image-choice' && !String(e.image ?? '').trim()) errors.push(`${prefix}: image-choice nemá image`);
  }

  if (e.type === 'diagnostic') {
    if (!Array.isArray(e.items) || e.items.length < 2) errors.push(`${prefix}: diagnostic potřebuje alespoň 2 items`);
    else {
      const itemIds = new Set();
      for (const item of e.items) {
        const itemId = String(item?.id ?? '').trim();
        const label = String(item?.label ?? '').trim();
        if (!itemId || !label) errors.push(`${prefix}: diagnostic item musí mít id a label`);
        if (itemIds.has(itemId)) errors.push(`${prefix}: diagnostic má duplicitní item id "${itemId}"`);
        itemIds.add(itemId);
      }
      if (!Array.isArray(e.answerIds) || e.answerIds.length < 1) errors.push(`${prefix}: diagnostic nemá answerIds`);
      else for (const id of e.answerIds) if (!itemIds.has(String(id).trim())) errors.push(`${prefix}: diagnostic answerIds obsahuje neexistující item "${id}"`);
    }
  }

  if (e.type === 'classification') {
    if (!Array.isArray(e.categories) || e.categories.length < 2) errors.push(`${prefix}: classification potřebuje alespoň 2 categories`);
    else validateUniqueStrings(e.categories, 'category', prefix);
    if (!Array.isArray(e.items) || e.items.length < 2) errors.push(`${prefix}: classification potřebuje alespoň 2 items`);
    else {
      const itemIds = new Set();
      const categories = new Set((e.categories || []).map(String));
      for (const item of e.items) {
        const itemId = String(item?.id ?? '').trim();
        const text = String(item?.text ?? '').trim();
        const category = String(item?.category ?? '').trim();
        if (!itemId || !text || !category) errors.push(`${prefix}: classification item musí mít id, text a category`);
        if (itemIds.has(itemId)) errors.push(`${prefix}: classification má duplicitní item id "${itemId}"`);
        itemIds.add(itemId);
        if (!categories.has(category)) errors.push(`${prefix}: classification item "${itemId}" má neznámou kategorii "${category}"`);
      }
    }
  }

  if (e.type === 'compare') {
    if (!String(e.leftLabel ?? '').trim() || !String(e.rightLabel ?? '').trim()) errors.push(`${prefix}: compare potřebuje leftLabel a rightLabel`);
    if (!Array.isArray(e.criteria) || e.criteria.length < 2) errors.push(`${prefix}: compare potřebuje alespoň 2 criteria`);
    else {
      const ids = new Set();
      for (const item of e.criteria) {
        const id = String(item?.id ?? '').trim();
        const text = String(item?.text ?? '').trim();
        const answer = String(item?.answer ?? '').trim();
        if (!id || !text) errors.push(`${prefix}: compare criterion musí mít id a text`);
        if (ids.has(id)) errors.push(`${prefix}: compare má duplicitní id kritéria "${id}"`);
        ids.add(id);
        if (!['left','right'].includes(answer)) errors.push(`${prefix}: compare criterion "${id}" musí mít answer left nebo right`);
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
      const normalizedRights = [...rights].map(v => v.toLocaleLowerCase('cs-CZ').replace(/\s*[—-]\s*\d+\s*$/, ''));
      if (normalizedRights.length >= 3 && new Set(normalizedRights).size === 1) {
        warnings.push(`${prefix}: match má prakticky stejné pravé strany; úloha může být triviální`);
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
    if (sourceDependentQuestion.test(String(e.question ?? '')) || sourceOrderQuestion.test(normalizeMetadataValue(e.question))) {
      errors.push(`${prefix}: order nesmí vyžadovat pořadí podle zdrojového materiálu`);
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
    if (value && Number.isInteger(fromBase) && fromBase >= 2 && fromBase <= 36 && Number.isInteger(toBase) && toBase >= 2 && toBase <= 36 && answer) {
      const decimal = convertCanonical(value, fromBase);
      if (decimal == null) errors.push(`${prefix}: conversion value obsahuje číslici mimo fromBase`);
      else {
        const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const expected = decimal.toString(toBase).toUpperCase();
        if (answer.toUpperCase() !== expected) errors.push(`${prefix}: conversion answer nesedí; pro ${value} ze ${fromBase} do ${toBase} má být ${expected}`);
      }
    }
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

  if (e.image) {
    const imagePath = path.resolve(__dirname, '..', String(e.image));
    if (!fs.existsSync(imagePath)) errors.push(`${prefix}: image neexistuje: ${e.image}`);
  }

  if (typeof e.tags !== 'undefined' && !Array.isArray(e.tags)) {
    errors.push(`${prefix}: tags musí být pole`);
  }

  if (Array.isArray(e.tags)) {
    const correctAnswerValues = getCorrectAnswerValues(e)
      .filter(value => String(value ?? '').trim());

    for (const tag of e.tags) {
      if (typeof tag !== 'string') {
        errors.push(`${prefix}: každý tag musí být textový řetězec`);
        continue;
      }

      if (correctAnswerValues.some(answer => answerRevealedByTag(tag, answer, e.type, e.autoGrade, e.question))) {
        errors.push(`${prefix}: tag "${tag}" přímo prozrazuje správnou odpověď nebo její jednoznačnou část a nesmí být mezi tags`);
      }
    }
  }

  if (typeof e.difficulty !== 'undefined') {
    const difficulty = Number(e.difficulty);
    if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 5) {
      errors.push(`${prefix}: difficulty musí být celé číslo 1–5`);
    }
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
