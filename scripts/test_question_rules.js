// Regrese: i odkaz na přiložený seznam musí být odmítnut, logický postup povolen.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const validatorPath = path.join(__dirname, 'validate_questions.js');
const validator = fs.readFileSync(validatorPath, 'utf8');
function check(question) {
  const logs = [];
  const context = {
    __dirname,
    require(name) {
      if (name !== 'fs') return require(name);
      return { ...fs, readFileSync(file, encoding) {
        const source = fs.readFileSync(file, encoding);
        if (path.basename(file) !== 'exercises.js') return source;
        return source + '\nwindow.EXERCISES.push(' + JSON.stringify({
          id: 'regression-order', subject: 'Test', topic: 'Test', subtopic: 'Test',
          title: 'Řazení', type: 'order', question, order: ['A', 'B']
        }) + ');';
      } };
    },
    console: { log() {}, error(value) { logs.push(String(value)); } },
    process: { exitCode: 0 }
  };
  vm.runInNewContext(validator, context, { filename: validatorPath });
  return { exitCode: context.process.exitCode, errors: logs.join('\n') };
}
for (const question of [
  'Seřaď kontroly tak, jak jsou uvedeny v přiloženém seznamu.',
  'Seřaď kroky podle pořadí zobrazeného v infografice.'
]) {
  const result = check(question);
  assert.equal(result.exitCode, 1, question);
  assert.match(result.errors, /order nesmí vyžadovat pořadí podle zdrojového materiálu/);
}
assert.equal(check('Seřaď kroky převodu čísla podle jejich logické návaznosti.').exitCode, 0);
console.log('OK: pořadí podle seznamu/infografiky je odmítnuto, logická návaznost je povolena.');
