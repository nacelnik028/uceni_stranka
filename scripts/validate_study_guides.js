// Kontrola propojení studijních přehledů s aktivním katalogem a zdroji.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.createContext(context);
for (const file of ['exercises.js', 'network_exercises.js', 'literature_exercises.js', 'cislicova_technika_exercises.js', 'pocitacova_grafika_exercises.js', 'elektrotechnika_exercises.js', 'study_guides.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'data', file), 'utf8'), context);
}
const guides = context.window.STUDY_GUIDES;
const exercises = Object.entries(context.window).filter(([key]) => key !== 'STUDY_GUIDES').flatMap(([, value]) => value);
const errors = [];
const ids = new Set();
for (const guide of guides) {
  for (const field of ['id', 'subject', 'topic', 'title', 'intro', 'mistake', 'source', 'sourceLabel']) {
    if (typeof guide[field] !== 'string' || !guide[field].trim()) errors.push(`${guide.id}: chybí ${field}`);
  }
  if (ids.has(guide.id)) errors.push(`${guide.id}: duplicitní ID`);
  ids.add(guide.id);
  if (!Number.isInteger(guide.minutes) || guide.minutes < 1) errors.push(`${guide.id}: neplatná doba čtení`);
  if (!Array.isArray(guide.sections) || !guide.sections.length || guide.sections.some(section => !section.title || !(section.text || section.code || section.points?.length))) errors.push(`${guide.id}: neúplný obsah`);
  if (!exercises.some(exercise => exercise.subject === guide.subject && exercise.topic === guide.topic)) errors.push(`${guide.id}: téma nemá aktivní otázky`);
  if (!guide.source || !fs.existsSync(path.join(root, guide.source))) errors.push(`${guide.id}: zdroj neexistuje`);
}
for (const subject of new Set(exercises.map(exercise => exercise.subject))) {
  if (!guides.some(guide => guide.subject === subject)) errors.push(`${subject}: nemá žádný přehled`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`OK: ${guides.length} přehledů, ${new Set(guides.map(guide => guide.subject)).size} předmětů; všechna témata a zdroje existují.`);
}
