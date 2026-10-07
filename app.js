// Runtime data are loaded by index.html from data/. Keep app.js independent from file paths.
const state = {
  exercises: [
    ...(Array.isArray(window.EXERCISES) ? window.EXERCISES : []),
    ...(Array.isArray(window.NETWORK_EXERCISES) ? window.NETWORK_EXERCISES : []),
    ...(Array.isArray(window.LITERATURE_EXERCISES) ? window.LITERATURE_EXERCISES : []),
    ...(Array.isArray(window.DIGITAL_TECHNICS_EXERCISES) ? window.DIGITAL_TECHNICS_EXERCISES : []),
    ...(Array.isArray(window.PC_GRAPHICS_EXERCISES) ? window.PC_GRAPHICS_EXERCISES : []),
    ...(Array.isArray(window.ELECTROTECHNICS_EXERCISES) ? window.ELECTROTECHNICS_EXERCISES : []),
    ...(Array.isArray(window.CYBERSECURITY_EXERCISES) ? window.CYBERSECURITY_EXERCISES : []),
    ...(Array.isArray(window.HARDWARE_EXERCISES) ? window.HARDWARE_EXERCISES : []),
    ...(Array.isArray(window.OPERATING_SYSTEMS_EXERCISES) ? window.OPERATING_SYSTEMS_EXERCISES : []),
  ],
  answerVisible: false,
  view: 'home',
  pyodide: null,
  pyodideLoading: null,
  sessionIds: [],
  sessionKey: '',
  mode: 'learn',
  generatedExercises: [],
  generatedCounter: 0,
  results: {},
  codeResults: {},
  currentStats: null,
};

const $ = (id) => document.getElementById(id);

function normalizePersonalityAnswer(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .replace(/\s+/gu, ' ')
    .trim()
    .toLocaleLowerCase('cs-CZ');
}

const DIFFICULTY_LABELS = {
  1: 'Velmi lehká',
  2: 'Lehká',
  3: 'Střední',
  4: 'Těžká',
  5: 'Velmi těžká',
};

function inferDifficulty(e) {
  if (Number.isInteger(Number(e.difficulty))) return Math.min(5, Math.max(1, Number(e.difficulty)));
  if (e.type === 'code') return 4;
  if (e.type === 'conversion' || e.type === 'number') return e.topic === 'Hornerovo schéma' ? 4 : 3;
  if (e.topic === 'Hornerovo schéma') return e.type === 'order' ? 4 : 3;
  if (e.type === 'match' && Array.isArray(e.pairs) && e.pairs.length >= 5) return 3;
  if (['diagnostic', 'classification', 'compare'].includes(e.type)) return 3;
  if (e.type === 'order') return 3;
  if (e.type === 'multi') return 3;
  if (['scenario', 'image-choice'].includes(e.type)) return 2;
  return 2;
}

function difficultyText(value) {
  return DIFFICULTY_LABELS[Number(value)] || 'Neuvedená';
}

function shouldAutoGradeTextInput(exercise) {
  if (!exercise) return false;
  if (exercise.type === 'number') return true;
  if (exercise.type === 'fill' || exercise.type === 'text') return exercise.autoGrade === true;
  return false;
}


let activeExerciseElement = null;

function setupEnterShortcut() {
  document.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Enter' || ev.shiftKey || ev.ctrlKey || ev.altKey || ev.metaKey) return;
    const target = ev.target instanceof Element ? ev.target : null;
    const exercise = target?.closest('.exercise');
    if (!exercise) return;

    // U úloh typu code (Programování) je Enter vždy nový řádek.
    if (exercise.dataset.type === 'code' || target?.matches('textarea.code')) return;
    if (target?.matches('button, a, select')) return;

    const quickCheck = exercise.querySelector('[data-action="check-choice"], [data-action="check-multi"], [data-action="check-match"], [data-action="check-order"], [data-action="check-conversion"], [data-action="check-diagnostic"], [data-action="check-classification"], [data-action="check-compare"]');
    if (quickCheck) {
      ev.preventDefault();
      quickCheck.click();
      return;
    }

    const answerField = exercise.querySelector('input[data-answer], textarea[data-answer]');
    const checkButton = exercise.querySelector('[data-action="check-personality"], [data-action="show-self-check"], [data-action="check-short"]');
    if (answerField && checkButton) {
      ev.preventDefault();
      checkButton.click();
    }
  });
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function rich(value) {
  return esc(value)
    .replace(/```([\s\S]*?)```/g, (m, c) => `<pre class="code-block">${c.trim()}</pre>`)
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
}

function applyTheme(theme) {
  const next = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try { getStorage().setItem('procvicovna-theme', next); } catch { /* preference is best effort */ }
  const button = $('themeToggle');
  if (button) {
    const light = next === 'light';
    button.textContent = light ? '☾ Tmavý motiv' : '☀ Světlý motiv';
    button.setAttribute('aria-pressed', String(!light));
    button.setAttribute('aria-label', light ? 'Přepnout na tmavý motiv' : 'Přepnout na světlý motiv');
  }
}

function initTheme() {
  // Výchozí zůstává původní tmavý motiv; světlý je volitelný přepínačem.
  let theme = 'dark';
  try {
    const stored = getStorage().getItem('procvicovna-theme');
    if (stored === 'dark' || stored === 'light') theme = stored;
  } catch { /* use dark as the default */ }
  applyTheme(theme);
}

const CODE_LEXEMES = {
  python: {
    keywords: new Set(['and','as','assert','async','await','break','case','class','continue','def','del','elif','else','except','finally','for','from','global','if','import','in','is','lambda','match','nonlocal','not','or','pass','raise','return','try','while','with','yield','True','False','None']),
    builtins: new Set(['print','len','range','input','int','float','str','list','dict','set','tuple','enumerate','sum','min','max','abs','round','sorted','zip','open','type','isinstance']),
    lineComment: '#',
  },
  javascript: {
    keywords: new Set(['break','case','catch','class','const','continue','debugger','default','delete','do','else','export','extends','finally','for','from','function','if','import','in','instanceof','let','new','of','return','static','super','switch','this','throw','try','typeof','var','void','while','with','yield','true','false','null','undefined']),
    builtins: new Set(['console','Math','JSON','Array','Object','String','Number','Boolean','Date','Map','Set','Promise','parseInt','parseFloat']),
    lineComment: '//',
  }
};

function highlightCode(code, language) {
  const lang = String(language || 'python').toLowerCase() === 'js' ? 'javascript' : String(language || 'python').toLowerCase();
  const rules = CODE_LEXEMES[lang] || CODE_LEXEMES.python;
  const text = String(code ?? '');
  let out = '';
  let i = 0;
  const span = (klass, value) => `<span class="${klass}">${esc(value)}</span>`;
  const isIdentStart = (ch) => /[A-Za-z_$]/.test(ch || '');
  const isIdent = (ch) => /[A-Za-z0-9_$]/.test(ch || '');
  const isDigit = (ch) => /[0-9]/.test(ch || '');
  while (i < text.length) {
    const ch = text[i];
    const next = text[i + 1] || '';
    if (ch === '"' || ch === "'" || (ch === '`' && lang === 'javascript')) {
      const quote = ch;
      let j = i + 1;
      while (j < text.length) {
        if (text[j] === '\\') { j += 2; continue; }
        if (text[j] === quote) { j += 1; break; }
        j += 1;
      }
      out += span('tok-str', text.slice(i, j));
      i = j;
      continue;
    }
    if (text.startsWith(rules.lineComment, i)) {
      const end = text.indexOf('\n', i);
      const stop = end === -1 ? text.length : end;
      out += span('tok-comment', text.slice(i, stop));
      i = stop;
      continue;
    }
    if (isDigit(ch) || (ch === '.' && isDigit(next))) {
      let j = i + 1;
      while (j < text.length && /[A-Za-z0-9._]/.test(text[j])) j += 1;
      out += span('tok-num', text.slice(i, j));
      i = j;
      continue;
    }
    if (isIdentStart(ch)) {
      let j = i + 1;
      while (j < text.length && isIdent(text[j])) j += 1;
      const word = text.slice(i, j);
      let k = j;
      while (k < text.length && /\s/.test(text[k])) k += 1;
      const klass = rules.keywords.has(word) ? 'tok-kw' : rules.builtins.has(word) ? 'tok-builtin' : (text[k] === '(' ? 'tok-fn' : '');
      out += klass ? span(klass, word) : esc(word);
      i = j;
      continue;
    }
    if ('+-*/%=!<>|&^~?:'.includes(ch)) {
      let j = i + 1;
      while (j < text.length && '+-*/%=!<>|&^~'.includes(text[j])) j += 1;
      out += span('tok-op', text.slice(i, j));
      i = j;
      continue;
    }
    out += ch === '\n' ? '\n' : esc(ch);
    i += 1;
  }
  return out || ' ';
}

function updateCodeEditor(textarea) {
  const editor = textarea?.closest('.code-editor');
  if (!editor) return;
  const highlight = editor.querySelector('.code-highlight');
  const gutter = editor.querySelector('.code-gutter');
  if (!highlight || !gutter) return;
  highlight.innerHTML = highlightCode(textarea.value, textarea.dataset.language || 'python');
  const lineCount = Math.max(1, textarea.value.split('\n').length);
  gutter.textContent = Array.from({ length: lineCount }, (_, i) => String(i + 1)).join('\n');
  highlight.style.transform = `translate3d(${-textarea.scrollLeft}px, ${-textarea.scrollTop}px, 0)`;
  gutter.style.transform = `translate3d(0, ${-textarea.scrollTop}px, 0)`;
}

function syncCodeEditors() {
  document.querySelectorAll('.code-editor textarea.code').forEach((textarea) => {
    updateCodeEditor(textarea);
    if (textarea.dataset.editorSynced === '1') return;
    textarea.dataset.editorSynced = '1';
    textarea.addEventListener('input', () => updateCodeEditor(textarea));
    textarea.addEventListener('scroll', () => updateCodeEditor(textarea));
  });
}

function setupCodeTabShortcut() {
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const textarea = event.target instanceof HTMLTextAreaElement && event.target.matches('textarea.code')
      ? event.target
      : null;
    if (!textarea) return;

    event.preventDefault();
    const value = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const indent = '    ';

    const firstLineStart = value.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
    const endAtNewLine = end > 0 && value[end - 1] === '\n';
    let blockEnd = end;
    if (!endAtNewLine) {
      const nl = value.indexOf('\n', end);
      blockEnd = nl === -1 ? value.length : nl;
    }

    // Shift+Tab: odebere jedno odsazení z každé vybrané řádky.
    if (event.shiftKey) {
      const block = value.slice(firstLineStart, blockEnd);
      const lines = block.split('\n');
      const removals = lines.map(line => line.startsWith(indent) ? 4 : (line.startsWith('\t') ? 1 : 0));
      const updated = lines.map((line, i) => line.slice(removals[i])).join('\n');
      const before = value.slice(0, firstLineStart);
      const after = value.slice(blockEnd);
      textarea.value = before + updated + after;

      const removedBeforeStart = Math.min(removals[0] || 0, start - firstLineStart);
      let removedBeforeEnd = 0;
      const relEnd = end - firstLineStart;
      let offset = 0;
      for (let i = 0; i < lines.length && offset <= relEnd; i++) {
        const lineEnd = offset + lines[i].length;
        if (relEnd >= offset) removedBeforeEnd += Math.min(removals[i], Math.max(0, relEnd - offset));
        offset = lineEnd + 1;
      }
      textarea.selectionStart = Math.max(firstLineStart, start - removedBeforeStart);
      textarea.selectionEnd = Math.max(textarea.selectionStart, end - removedBeforeEnd);
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }

    // Označený blok: přidej 4 mezery na začátek každé vybrané řádky.
    if (start !== end) {
      const block = value.slice(firstLineStart, blockEnd);
      const lines = block.split('\n');
      const updated = lines.map(line => indent + line).join('\n');
      textarea.value = value.slice(0, firstLineStart) + updated + value.slice(blockEnd);
      textarea.selectionStart = start + 4;
      textarea.selectionEnd = end + (4 * lines.length);
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }

    // Bez výběru: vlož přesně 4 mezery na pozici kurzoru.
    textarea.setRangeText(indent, start, end, 'end');
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }, true);
}

function checkActionForExercise(exerciseElement) {
  if (!exerciseElement) return null;
  return exerciseElement.querySelector('[data-action="check-choice"], [data-action="check-multi"], [data-action="check-match"], [data-action="check-order"], [data-action="check-conversion"], [data-action="check-diagnostic"], [data-action="check-classification"], [data-action="check-compare"], [data-action="check-short"], [data-action="check-personality"], [data-action="show-self-check"], [data-action="run-code"]');
}

function updateMobileCheckBar() {
  const bar = $('mobileCheckBar');
  const button = $('mobileCheckButton');
  const context = $('mobileCheckContext');
  const active = activeExerciseElement?.isConnected ? activeExerciseElement : document.querySelector('#exercises .exercise');
  const show = window.matchMedia?.('(max-width:760px)').matches && state.view === 'study' && !state.currentStats && Boolean(active);
  bar?.classList.toggle('hidden', !show);
  document.body.classList.toggle('mobile-study-active', show);
  if (!show || !button) return;
  const action = checkActionForExercise(active);
  button.disabled = !action;
  if (context) {
    const label = active.querySelector('.exercise-number')?.textContent?.trim() || 'Aktivní úloha';
    context.textContent = label;
  }
  button.textContent = active.dataset.type === 'code' ? 'Spustit kód' : state.mode === 'test' ? 'Zaznamenat' : 'Zkontrolovat';
  button.setAttribute('aria-label', `${button.textContent}: ${context?.textContent || 'aktivní úloha'}`);
}

function setActiveExerciseFromTarget(target) {
  const exercise = target?.closest?.('.exercise');
  if (exercise) {
    activeExerciseElement = exercise;
    updateMobileCheckBar();
  }
}

function toast(message) {
  const el = $('toast');
  el.textContent = message;
  el.style.display = 'block';
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => { el.style.display = 'none'; }, 2800);
}

function getStorage() {
  try {
    if (window.localStorage) return window.localStorage;
  } catch {
    // Soukromý režim / blokované storage: použijeme paměť jen pro tuto stránku.
  }
  if (!window.__procvicovnaMemoryStorage) {
    const store = {};
    window.__procvicovnaMemoryStorage = {
      getItem: key => Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null,
      setItem: (key, value) => { store[key] = String(value); },
      removeItem: key => { delete store[key]; },
      clear: () => { Object.keys(store).forEach(key => delete store[key]); },
    };
  }
  return window.__procvicovnaMemoryStorage;
}

function normalizeExercises(list) {
  return list.map((e, i) => ({
    id: e.id || `e${i + 1}`,
    type: e.type || 'text',
    language: e.language || 'python',
    title: e.title || `Úloha ${i + 1}`,
    question: e.question || '',
    choices: Array.isArray(e.choices) ? e.choices : [],
    answer: e.answer ?? '',
    solution: e.solution ?? '',
    expectedOutput: e.expectedOutput ?? null,
    starterCode: e.starterCode ?? '',
    testInput: e.testInput ?? '',
    hint: e.hint ?? '',
    image: e.image ?? '',
    imageAlt: e.imageAlt ?? '',
    imageCaption: e.imageCaption ?? '',
    subject: e.subject || '',
    topic: e.topic || '',
    subtopic: e.subtopic || '',
    tags: Array.isArray(e.tags) ? e.tags : [],
    autoGrade: e.autoGrade === true,
    answers: Array.isArray(e.answers) ? e.answers : [],
    pairs: Array.isArray(e.pairs) ? e.pairs : [],
    order: Array.isArray(e.order) ? e.order : [],
    scenario: e.scenario ?? '',
    items: Array.isArray(e.items) ? e.items : [],
    answerIds: Array.isArray(e.answerIds) ? e.answerIds : [],
    categories: Array.isArray(e.categories) ? e.categories : [],
    leftLabel: e.leftLabel ?? '',
    rightLabel: e.rightLabel ?? '',
    criteria: Array.isArray(e.criteria) ? e.criteria : [],
    value: e.value ?? '',
    fromBase: e.fromBase ?? null,
    toBase: e.toBase ?? null,
    difficulty: inferDifficulty(e),
    generated: e.generated === true,
  }));
}

function validateExercises(list) {
  const seen = new Set();
  const problems = [];
  const types = ['choice', 'multi', 'match', 'order', 'scenario', 'diagnostic', 'classification', 'compare', 'image-choice', 'text', 'code', 'fill', 'number', 'conversion'];
  list.forEach((e) => {
    if (seen.has(e.id)) problems.push(`${e.id}: id se opakuje`);
    seen.add(e.id);
    if (!types.includes(e.type)) problems.push(`${e.id}: neznámý typ „${e.type}“ (povolené: ${types.join(', ')})`);
    if (!e.question) problems.push(`${e.id}: chybí question`);
    if (e.type === 'choice') {
      if (e.choices.length < 2) problems.push(`${e.id}: choice potřebuje aspoň 2 možnosti v choices`);
      if (!e.choices.some((c) => String(c).trim() === String(e.answer).trim())) problems.push(`${e.id}: answer není mezi choices`);
    }
    if (e.type === 'multi') {
      if (e.choices.length < 2) problems.push(`${e.id}: multi potřebuje aspoň 2 možnosti v choices`);
      if (!Array.isArray(e.answers) || e.answers.length < 1) problems.push(`${e.id}: multi potřebuje neprázdné answers`);
      const choices = new Set(e.choices.map(c => String(c).trim()));
      for (const answer of e.answers) {
        if (!choices.has(String(answer).trim())) problems.push(`${e.id}: answers obsahuje možnost mimo choices`);
      }
    }
    if (e.type === 'scenario' || e.type === 'image-choice') {
      if (e.choices.length < 2) problems.push(`${e.id}: ${e.type} potřebuje aspoň 2 možnosti v choices`);
      if (!e.choices.some((c) => String(c).trim() === String(e.answer).trim())) problems.push(`${e.id}: answer není mezi choices`);
      if (e.type === 'scenario' && !String(e.scenario || '').trim()) problems.push(`${e.id}: scenario potřebuje text scénáře`);
      if (e.type === 'image-choice' && !String(e.image || '').trim()) problems.push(`${e.id}: image-choice potřebuje image`);
    }
    if (e.type === 'diagnostic') {
      if (!Array.isArray(e.items) || e.items.length < 2) problems.push(`${e.id}: diagnostic potřebuje aspoň 2 items`);
      const ids = new Set();
      for (const item of (e.items || [])) {
        if (!item || !String(item.id || '').trim() || !String(item.label || '').trim()) problems.push(`${e.id}: každý diagnostic item potřebuje id a label`);
        if (ids.has(String(item?.id || '').trim())) problems.push(`${e.id}: diagnostic má duplicitní id položky`);
        ids.add(String(item?.id || '').trim());
      }
      if (!Array.isArray(e.answerIds) || e.answerIds.length < 1) problems.push(`${e.id}: diagnostic potřebuje neprázdné answerIds`);
      for (const answerId of (e.answerIds || [])) if (!ids.has(String(answerId).trim())) problems.push(`${e.id}: diagnostic answerIds obsahuje neexistující položku ${answerId}`);
    }
    if (e.type === 'classification') {
      if (!Array.isArray(e.categories) || e.categories.length < 2) problems.push(`${e.id}: classification potřebuje aspoň 2 categories`);
      if (!Array.isArray(e.items) || e.items.length < 2) problems.push(`${e.id}: classification potřebuje aspoň 2 items`);
      const ids = new Set(); const cats = new Set((e.categories || []).map(c => String(c).trim()));
      for (const item of (e.items || [])) {
        const itemId = String(item?.id || '').trim();
        if (!itemId || !String(item?.text || '').trim()) problems.push(`${e.id}: každý classification item potřebuje id a text`);
        if (ids.has(itemId)) problems.push(`${e.id}: classification má duplicitní id položky`);
        ids.add(itemId);
        if (!cats.has(String(item?.category || '').trim())) problems.push(`${e.id}: classification položka ${itemId} odkazuje na neexistující kategorii`);
      }
    }
    if (e.type === 'compare') {
      if (!String(e.leftLabel || '').trim() || !String(e.rightLabel || '').trim()) problems.push(`${e.id}: compare potřebuje leftLabel a rightLabel`);
      if (!Array.isArray(e.criteria) || e.criteria.length < 2) problems.push(`${e.id}: compare potřebuje aspoň 2 criteria`);
      const ids = new Set();
      for (const item of (e.criteria || [])) {
        const itemId = String(item?.id || '').trim();
        if (!itemId || !String(item?.text || '').trim()) problems.push(`${e.id}: každý compare criterion potřebuje id a text`);
        if (ids.has(itemId)) problems.push(`${e.id}: compare má duplicitní id kritéria`);
        ids.add(itemId);
        if (!['left','right'].includes(String(item?.answer || ''))) problems.push(`${e.id}: compare ${itemId} musí mít answer left nebo right`);
      }
    }
    if (e.type === 'match') {
      if (!Array.isArray(e.pairs) || e.pairs.length < 2) problems.push(`${e.id}: match potřebuje aspoň 2 páry`);
      const lefts = new Set();
      const rights = new Set();
      for (const pair of e.pairs) {
        if (!pair || typeof pair.left !== 'string' || typeof pair.right !== 'string') {
          problems.push(`${e.id}: každý match pár musí mít left a right`);
          continue;
        }
        if (lefts.has(pair.left.trim())) problems.push(`${e.id}: match má duplicitní left`);
        if (rights.has(pair.right.trim())) problems.push(`${e.id}: match má duplicitní right`);
        lefts.add(pair.left.trim());
        rights.add(pair.right.trim());
      }
    }
    if (e.type === 'order') {
      if (!Array.isArray(e.order) || e.order.length < 2) problems.push(`${e.id}: order potřebuje alespoň 2 položky`);
      const values = e.order.map(v => String(v).trim());
      if (new Set(values).size !== values.length) problems.push(`${e.id}: order obsahuje duplicitní položku`);
    }
    if (e.type === 'conversion') {
      const value = String(e.value ?? '').trim();
      const fromBase = Number(e.fromBase);
      const toBase = Number(e.toBase);
      const answer = String(e.answer ?? '').trim();
      if (!value) problems.push(`${e.id}: conversion potřebuje value`);
      if (!Number.isInteger(fromBase) || fromBase < 2 || fromBase > 36) problems.push(`${e.id}: conversion má neplatný fromBase`);
      if (!Number.isInteger(toBase) || toBase < 2 || toBase > 36) problems.push(`${e.id}: conversion má neplatný toBase`);
      if (!answer) problems.push(`${e.id}: conversion potřebuje answer`);
    }
    if ((e.type === 'number' || e.type === 'fill') && !e.answer) problems.push(`${e.id}: chybí answer`);
    if (e.type === 'text' && !e.answer && !e.solution) problems.push(`${e.id}: chybí answer nebo solution`);
    if (e.type === 'code') {
      if (e.expectedOutput == null) problems.push(`${e.id}: chybí expectedOutput`);
      if (!e.solution) problems.push(`${e.id}: chybí solution (ukázkové řešení)`);
    }
  });
  if (problems.length) console.warn(`Kontrola exercises.js – ${problems.length} upozornění:\n` + problems.join('\n'));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function bySubject(list, subject) {
  return subject === 'all' ? list : list.filter(e => e.subject === subject);
}

function subjectIcon(subject) {
  const paths = {
    'Programování': '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-12-2 14"/>',
    'Vývoj webových aplikací': '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01m-2 6-2 2 2 2m8-4 2 2-2 2"/>',
    'Databáze': '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    'Počítačové sítě': '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="2" y="16" width="6" height="5" rx="1"/><rect x="16" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
    'Literatura': '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>',
    'Číslicová technika': '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h2v8m4-8h2v8h-2V8ZM8 16h4M8 2v2m8-2v2M8 20v2m8-2v2M2 8h2m-2 8h2m16-8h2m-2 8h2"/>',
    'elektrotechnika': '<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>',
    'Kybernetická bezpečnost': '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z"/><path d="m8 12 3 3 5-6"/>',
    'Hardware': '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3"/>',
    'Operační systémy': '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="m6 8 3 3-3 3m5 0h5M8 21h8m-4-3v3"/>',
    'Počítačová grafika': '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 5-5 4 4 4-6 5 7"/>'
  };
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[subject] || paths['Literatura']}</svg>`;
}

function renderHome() {
  const subjects = unique(state.exercises.map(e => e.subject));
  const topics = unique(state.exercises.map(e => e.topic));
  $('homeExercises').textContent = state.exercises.length;
  $('homeSubjects').textContent = subjects.length;
  $('homeTopics').textContent = topics.length;

  // Barvy a ikony jsou stabilní podle názvu předmětu, nikoliv podle pořadí dat.
  const subjectVisuals = {
    'Programování': { icon: '◈', color: '#60a5fa' },
    'Vývoj webových aplikací': { icon: '⌘', color: '#4ade80' },
    'Databáze': { icon: '✦', color: '#f6c85f' },
    'Počítačové sítě': { icon: '▦', color: '#fb8aa0' },
    'Literatura': { icon: '∑', color: '#a78bfa' },
    'Číslicová technika': { icon: '◌', color: '#4aa8ff' },
    'elektrotechnika': { icon: 'ϟ', color: '#f59e0b' },
    'Kybernetická bezpečnost': { icon: '◇', color: '#2dd4bf' },
    'Hardware': { icon: '▣', color: '#fb923c' },
    'Operační systémy': { icon: '⌨', color: '#38bdf8' },
    'Počítačová grafika': { icon: '▧', color: '#c084fc' },
  };
  const fallbackIcons = ['◈', '⌘', '✦', '▦', '∑', '◌'];
  $('subjectCards').innerHTML = subjects.length ? subjects.map((subject, i) => {
    const items = state.exercises.filter(e => e.subject === subject);
    const topicCount = unique(items.map(e => e.topic)).length;
    const label = topicCount === 1 ? 'téma' : topicCount < 5 ? 'témata' : 'témat';
    const visual = subjectVisuals[subject] || { icon: fallbackIcons[i % fallbackIcons.length], color: '#6cb6ff' };
    return `<button class="card" data-subject="${esc(subject)}" style="text-align:left;--subject-color:${visual.color}">
      <div class="card-top"><div class="card-icon">${subjectIcon(subject)}</div><span class="card-arrow" aria-hidden="true">↗</span></div>
      <h3>${esc(subject === 'elektrotechnika' ? 'Elektrotechnika' : subject)}</h3>
      <p>${esc(subjectDescription(subject))}</p>
      <div class="card-meta">${items.length} úloh · ${topicCount} ${label}</div>
    </button>`;
  }).join('') : '<div class="empty">Zatím nejsou přidané žádné úlohy.</div>';

  document.querySelectorAll('#subjectCards [data-subject]').forEach(card => {
    card.addEventListener('click', () => window.studyUX.openTopics(card.dataset.subject));
  });
}

function subjectDescription(subject) {
  return ({
    'Programování': 'Python: seznamy, indexování a vlastní programy.',
    'Vývoj webových aplikací': 'Osobnosti informatiky, záhlaví webu a favicon.',
    'Databáze': 'Tabulky, klíče, SQL příkazy a správa dat.',
    'Počítačové sítě': 'Topologie, kabeláž, síťové modely, adresace a protokoly.',
    'Literatura': 'Literární období, autoři, díla a jejich postavy.',
    'Číslicová technika': 'Číselné soustavy, převody a Hornerovo schéma.',
    'elektrotechnika': 'Elektrický proud, Ohmův zákon, odpor vodiče a vliv teploty.',
    'Kybernetická bezpečnost': 'Identity, oprávnění, Active Directory a zabezpečení Windows i Linuxu.',
    'Hardware': 'Disky, rozhraní, displeje, periferie, síťové adaptéry a tiskové technologie.',
    'Operační systémy': 'Souborové systémy, ACL, šifrování a práce s objekty v PowerShellu.',
    'Počítačová grafika': 'Rastr a vektor, formáty, export a favicon.'
  })[subject] || 'Vyber téma a vyzkoušej své znalosti.';
}

function openStudy(subject = 'all', topic = 'all', preserveSubtopic = false) {
  const subtopic = preserveSubtopic ? $('filterSubtopic').value : 'all';
  state.view = 'study';
  $('topicsView').classList.add('hidden');
  $('guidesView').classList.add('hidden');
  $('homeView').classList.add('hidden');
  $('studyView').classList.remove('hidden');
  $('homeBtn').classList.remove('hidden');
  $('resetProgress').classList.remove('hidden');
  if (subject !== 'all' && topic === 'all') {
    const subTopics = unique(state.exercises.filter(e => e.subject === subject).map(e => e.topic));
    if (subTopics.length === 1) topic = subTopics[0];
  }
  $('filterSubject').value = subject;
  $('filterTopic').value = 'all';
  renderHeader();
  $('filterTopic').value = topic;
  $('filterSubtopic').value = subtopic;
  renderExercises();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function openHome() {
  window.studyUX?.save();
  state.view = 'home';
  $('topicsView').classList.add('hidden');
  $('guidesView').classList.add('hidden');
  $('studyView').classList.add('hidden');
  $('homeView').classList.remove('hidden');
  $('homeBtn').classList.add('hidden');
  $('resetProgress').classList.add('hidden');
  updateMobileCheckBar();
  window.studyUX?.updateHome();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function maybeCloseSettingsPanel() {
  const shell = $('settingsShell');
  if (shell && window.matchMedia?.('(max-width: 760px)').matches) shell.open = false;
}

function syncSettingsPanelForViewport() {
  // Panel je záměrně sbalený na desktopu i mobilu, aby při startu studia zůstaly vidět jen režim a progress.
  const shell = $('settingsShell');
  if (!shell) return;
  if (!shell.dataset.userOpened) shell.open = false;
}

document.addEventListener('toggle', (event) => {
  if (event.target?.id === 'settingsShell') {
    event.target.dataset.userOpened = event.target.open ? '1' : '';
  }
}, true);

function filterSummaryText() {
  const subject = $('filterSubject')?.value || 'all';
  const topic = $('filterTopic')?.value || 'all';
  const subtopic = $('filterSubtopic')?.value || 'all';
  const type = $('filterType')?.value || 'all';
  const difficulty = $('filterDifficulty')?.value || 'all';
  const parts = [];
  if (subject !== 'all') parts.push(subject);
  if (topic !== 'all') parts.push(topic);
  if (subtopic !== 'all') parts.push(subtopic);
  if (type !== 'all') parts.push(({choice:'Výběr',multi:'Více správných',match:'Párování',order:'Řazení',scenario:'Scénář',diagnostic:'Diagnostika',classification:'Třídění',compare:'Porovnání','image-choice':'Obrázek + výběr',text:'Textová odpověď',code:'Kód',fill:'Doplňování',number:'Výpočet',conversion:'Převod soustavy'})[type] || type);
  if (difficulty !== 'all') parts.push(`obtížnost ${difficulty}`);
  const query = ($('exerciseSearch')?.value || '').trim();
  if (query) parts.push(`hledání „${query}“`);
  return parts.length ? parts.slice(0, 2).join(' · ') + (parts.length > 2 ? ` +${parts.length - 2}` : '') : 'Všechny úlohy';
}

function updateFilterSummary() {
  const el = $('filterSummaryText');
  if (el) el.textContent = filterSummaryText();
}

function updateSessionProgress() {
  const session = currentSessionElements();
  const total = session.length;
  let answered = 0;
  for (const e of session) {
    const result = state.results[e.id] || state.codeResults[e.id] || readExerciseResponse(e);
    if (result?.answered) answered += 1;
  }
  const percent = total ? Math.round((answered / total) * 100) : 0;
  const text = $('sessionProgressText');
  const fill = $('sessionProgressFill');
  if (text) text.textContent = `${answered} / ${total}`;
  if (fill) fill.style.width = `${percent}%`;
  const progress = document.querySelector('.session-progress');
  progress?.setAttribute('aria-label', `Průběh sady: ${answered} z ${total} zodpovězeno`);
}

function renderHeader() {
  const catalog = allCatalogExercises();
  const subjects = unique(catalog.map(e => e.subject));
  const selectedSubject = $('filterSubject').value || 'all';
  const subjectItems = bySubject(catalog, selectedSubject);
  const topics = unique(subjectItems.map(e => e.topic));
  const selectedTopic = $('filterTopic').value || 'all';
  const topicItems = selectedTopic === 'all' ? subjectItems : subjectItems.filter(e => e.topic === selectedTopic);
  const subtopics = unique(topicItems.map(e => e.subtopic));
  const selectedSubtopic = $('filterSubtopic').value || 'all';
  const active = subjectItems.filter(e =>
    (selectedTopic === 'all' || e.topic === selectedTopic) &&
    (selectedSubtopic === 'all' || e.subtopic === selectedSubtopic)
  );
  const activeTopics = unique(active.map(e => e.topic));
  const filteredCount = baseFilteredExercises().length;

  if (selectedSubject !== 'all' && selectedTopic !== 'all') {
    $('exerciseTitle').textContent = `${selectedSubject} – ${selectedTopic}`;
  } else if (selectedSubject !== 'all') {
    $('exerciseTitle').textContent = selectedSubject;
  } else {
    $('exerciseTitle').textContent = window.EXERCISE_SET_TITLE || 'Procvičování';
  }
  const metaContext = selectedSubject === 'all' ? 'napříč předměty'
    : selectedTopic === 'all' ? 'všechna témata'
    : selectedSubtopic === 'all' ? 'všechna podtémata' : selectedSubtopic;
  $('exerciseMeta').textContent = `${filteredCount} ${filteredCount === 1 ? 'úloha k výběru' : 'úloh k výběru'} · ${metaContext}`;
  $('crumbSubject').textContent = selectedSubject === 'all' ? 'Všechny předměty' : selectedSubject;
  $('crumbTopic').textContent = selectedTopic === 'all' ? 'Všechna témata' : selectedTopic;

  const setOptions = (el, title, values, current) => {
    el.innerHTML = `<option value="all">${title}</option>` + values.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
    if (values.includes(current)) el.value = current; else el.value = 'all';
  };
  setOptions($('filterSubject'), 'Všechny předměty', subjects, selectedSubject);
  setOptions($('filterTopic'), 'Všechna témata', topics, selectedTopic);
  setOptions($('filterSubtopic'), 'Všechna podtémata', subtopics, selectedSubtopic);

  const generatedVisible = canGenerateTasks();
  $('generateTasks').classList.toggle('hidden', !generatedVisible);
  updateFilterSummary();
}

function allCatalogExercises() {
  return [...state.exercises, ...state.generatedExercises];
}

function canGenerateTasks() {
  const subject = $('filterSubject')?.value || 'all';
  const type = $('filterType')?.value || 'all';
  if (subject === 'elektrotechnika') {
    const subtopic = $('filterSubtopic')?.value || 'all';
    return ['all', 'number'].includes(type) && ['all', 'Výpočty'].includes(subtopic);
  }
  return subject === 'Číslicová technika' && ['all', 'conversion', 'number'].includes(type);
}

function baseCatalogExercises() {
  return allCatalogExercises();
}

function solutionBlock(e) {
  const part = (label, html) => `<div class="sol-label">${label}</div>${html}`;
  const parts = [];
  if (e.type === 'code') {
    if (e.solution) parts.push(part('Ukázkové řešení', `<pre class="code-block">${esc(e.solution)}</pre>`));
    if (e.expectedOutput != null) parts.push(part('Očekávaný výstup', `<pre class="code-block">${esc(e.expectedOutput)}</pre>`));
  } else if (e.type === 'multi') {
    if (e.answers?.length) parts.push(part('Správné odpovědi', `<div>${e.answers.map(rich).map(v => `<div>• ${v}</div>`).join('')}</div>`));
    if (e.solution) parts.push(part('Vysvětlení', `<div>${rich(e.solution)}</div>`));
  } else if (e.type === 'match') {
    if (e.pairs?.length) parts.push(part('Správná přiřazení', `<div>${e.pairs.map(pair => `<div><strong>${rich(pair.left)}</strong> → ${rich(pair.right)}</div>`).join('')}</div>`));
    if (e.solution) parts.push(part('Vysvětlení', `<div>${rich(e.solution)}</div>`));
  } else if (e.type === 'order') {
    if (e.order?.length) parts.push(part('Správné pořadí', `<div>${e.order.map((v, i) => `${i + 1}. ${rich(v)}`).join('<br>')}</div>`));
    if (e.solution) parts.push(part('Vysvětlení', `<div>${rich(e.solution)}</div>`));
  } else if (e.type === 'conversion') {
    parts.push(part('Správný převod', `<div><strong>${rich(e.value)}<sub>${esc(e.fromBase)}</sub></strong> → <strong>${rich(e.answer)}<sub>${esc(e.toBase)}</sub></strong></div>`));
    if (e.solution) parts.push(part('Postup / vysvětlení', `<div>${rich(e.solution)}</div>`));
  } else if (e.type === 'diagnostic') {
    const ids = new Set((e.answerIds || []).map(String));
    const badItems = (e.items || []).filter(item => ids.has(String(item.id)));
    if (badItems.length) parts.push(part('Chybné položky', `<div>${badItems.map(item => `<div>• ${rich(item.label)}</div>`).join('')}</div>`));
    const explainedItems = (e.items || []).filter(item => item.detail);
    if (explainedItems.length) parts.push(part('Rozbor položek', `<div>${explainedItems.map(item => `<p><strong>${rich(item.label)}</strong><br>${rich(item.detail)}</p>`).join('')}</div>`));
    if (e.solution) parts.push(part('Vysvětlení', `<div>${rich(e.solution)}</div>`));
  } else if (e.type === 'classification') {
    if (e.items?.length) parts.push(part('Správné zařazení', `<div>${e.items.map(item => `<div><strong>${rich(item.text)}</strong> → ${rich(item.category)}</div>`).join('')}</div>`));
    if (e.solution) parts.push(part('Vysvětlení', `<div>${rich(e.solution)}</div>`));
  } else if (e.type === 'compare') {
    if (e.criteria?.length) parts.push(part('Správné porovnání', `<div>${e.criteria.map(item => `<div><strong>${rich(item.text)}</strong> → ${rich(item.answer === 'left' ? e.leftLabel : e.rightLabel)}</div>`).join('')}</div>`));
    if (e.solution) parts.push(part('Vysvětlení', `<div>${rich(e.solution)}</div>`));
  } else if (e.type === 'scenario') {
    if (e.answer) parts.push(part('Správná odpověď', `<div>${rich(e.answer)}</div>`));
    if (e.solution) parts.push(part('Vysvětlení', `<div>${rich(e.solution)}</div>`));
  } else if (e.type === 'image-choice') {
    if (e.answer) parts.push(part('Správná odpověď', `<div>${rich(e.answer)}</div>`));
    if (e.solution) parts.push(part('Vysvětlení', `<div>${rich(e.solution)}</div>`));
  } else {
    if (e.answer) {
      const label = ['choice', 'scenario', 'image-choice', 'number', 'fill'].includes(e.type) ? 'Správná odpověď' : 'Řešení';
      parts.push(part(label, `<div>${rich(e.answer)}</div>`));
    }
    if (e.solution) parts.push(part('Vysvětlení', `<div>${rich(e.solution)}</div>`));
  }
  if (!parts.length) parts.push('<div class="small">K téhle úloze zatím není řešení uvedeno.</div>');
  return `<details class="solution-box"${state.answerVisible ? ' open' : ''}><summary>Nevím – ukázat řešení</summary><div class="solution">${parts.join('')}</div></details>`;
}

function renderExercise(e, index) {
  let inner = '';
  const id = esc(e.id);

  if (e.type === 'choice') {
    inner = `
      <div class="choices">
        ${shuffledChoices(e).map((choice, j) => `
          <label class="choice">
            <input type="radio" name="choice-${id}" value="${esc(choice)}">
            <span>${esc(choice)}</span>
          </label>`).join('')}
      </div>
      <div class="row" style="margin-top:12px">
        <button data-action="check-choice" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat'}</button>
      </div>
      <div class="output" data-out="${id}">Vyber odpověď a zkontroluj.</div>`;
  } else if (e.type === 'scenario') {
    inner = `
      <div class="scenario-box">${rich(e.scenario)}</div>
      <div class="choices">
        ${shuffledChoices(e).map((choice) => `
          <label class="choice">
            <input type="radio" name="choice-${id}" value="${esc(choice)}">
            <span>${esc(choice)}</span>
          </label>`).join('')}
      </div>
      <div class="row" style="margin-top:12px">
        <button data-action="check-choice" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat scénář'}</button>
      </div>
      <div class="output" data-out="${id}">Vyber řešení scénáře.</div>`;
  } else if (e.type === 'diagnostic') {
    inner = `
      <div class="diagnostic-list">
        ${(e.items || []).map((item) => `
          <label class="diagnostic-item">
            <input type="checkbox" name="diagnostic-${id}" value="${esc(item.id)}">
            <span><strong>${esc(item.label)}</strong></span>
          </label>`).join('')}
      </div>
      <div class="row" style="margin-top:12px">
        <button data-action="check-diagnostic" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat chyby'}</button>
      </div>
      <div class="output" data-out="${id}">Označ všechny položky, které jsou chybně.</div>`;
  } else if (e.type === 'classification') {
    const items = shuffle(e.items || []);
    inner = `
      <div class="classification-list">
        ${items.map(item => `
          <div class="classification-item" data-classification-item="${esc(item.id)}" data-selected-category="">
            <div class="classification-label">${rich(item.text)}</div>
            <div class="classification-categories">
              ${(e.categories || []).map(category => `<button type="button" class="classification-pick" data-classification-item="${esc(item.id)}" data-classification-category="${esc(category)}">${esc(category)}</button>`).join('')}
            </div>
          </div>`).join('')}
      </div>
      <div class="row" style="margin-top:12px">
        <button data-action="check-classification" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat zařazení'}</button>
        <button data-action="reset-classification" data-id="${id}">Začít znovu</button>
      </div>
      <div class="output" data-out="${id}">Zařaď všechny položky.</div>`;
  } else if (e.type === 'compare') {
    inner = `
      <div class="compare-list">
        ${(e.criteria || []).map(item => `
          <div class="compare-row">
            <div class="compare-criterion">${rich(item.text)}</div>
            <div class="compare-options">
              <label class="choice"><input type="radio" name="compare-${id}-${esc(item.id)}" value="left"><span>${esc(e.leftLabel)}</span></label>
              <label class="choice"><input type="radio" name="compare-${id}-${esc(item.id)}" value="right"><span>${esc(e.rightLabel)}</span></label>
            </div>
          </div>`).join('')}
      </div>
      <div class="row" style="margin-top:12px">
        <button data-action="check-compare" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat porovnání'}</button>
      </div>
      <div class="output" data-out="${id}">Vyber stranu u všech tvrzení.</div>`;
  } else if (e.type === 'image-choice') {
    inner = `
      <div class="image-choice-note">Vyber odpověď podle toho, co skutečně vidíš na obrázku.</div>
      <div class="choices visual-choices">
        ${shuffledChoices(e).map((choice) => `
          <label class="choice">
            <input type="radio" name="choice-${id}" value="${esc(choice)}">
            <span>${esc(choice)}</span>
          </label>`).join('')}
      </div>
      <div class="row" style="margin-top:12px">
        <button data-action="check-choice" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat podle obrázku'}</button>
      </div>
      <div class="output" data-out="${id}">Vyber odpověď.</div>`;
  } else if (e.type === 'multi') {
    inner = `
      <div class="multi-list">
        ${shuffle(e.choices).map(choice => `
          <label class="choice">
            <input type="checkbox" name="multi-${id}" value="${esc(choice)}">
            <span>${esc(choice)}</span>
          </label>`).join('')}
      </div>
      <div class="row" style="margin-top:12px">
        <button data-action="check-multi" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat výběr'}</button>
      </div>
      <div class="output" data-out="${id}">Vyber všechny správné možnosti.</div>`;
  } else if (e.type === 'match') {
    const rightOptions = shuffle(e.pairs.map(pair => pair.right));
    inner = `
      <div class="match-grid">
        ${shuffle(e.pairs).map(pair => `
          <div class="match-row">
            <div class="match-left">${rich(pair.left)}</div>
            <select data-match-left="${esc(pair.left)}" data-match-exercise="${id}" aria-label="Přiřazení pro ${esc(pair.left)}">
              <option value="">Vyber…</option>
              ${rightOptions.map(right => `<option value="${esc(right)}">${esc(right)}</option>`).join('')}
            </select>
          </div>`).join('')}
      </div>
      <div class="row" style="margin-top:12px">
        <button data-action="check-match" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat přiřazení'}</button>
      </div>
      <div class="output" data-out="${id}">Přiřaď všechny dvojice.</div>`;
  } else if (e.type === 'order') {
    const orderItems = shuffle(e.order);
    inner = `
      <div class="order-wrap" data-order-wrap="${id}">
        <div class="small">Klikni na položky v logickém nebo správném pořadí.</div>
        <div class="order-selected" data-order-selected="${id}"><span class="order-empty">Zatím nic nevybráno.</span></div>
        <div class="order-palette">
          ${orderItems.map(item => `<button type="button" class="order-pick" data-order-pick="${id}" data-order-value="${esc(item)}">${esc(item)}</button>`).join('')}
        </div>
      </div>
      <div class="row" style="margin-top:12px">
        <button data-action="check-order" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat pořadí'}</button>
        <button data-action="reset-order" data-id="${id}">Začít znovu</button>
      </div>
      <div class="output" data-out="${id}">Seřaď všechny položky.</div>`;
  } else if (e.type === 'conversion') {
    const fromBase = Number(e.fromBase);
    const toBase = Number(e.toBase);
    inner = `
      <div class="conversion-panel">
        <div class="conversion-direction"><code>${esc(e.value)}</code><sub>${esc(fromBase)}</sub><span aria-hidden="true">→</span><strong>základ ${esc(toBase)}</strong></div>
        <label class="small" for="answer-${id}">Zapiš výsledek:</label>
        <input id="answer-${id}" class="answer-input conversion-input" data-answer="${id}" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Např. 101101 nebo 2A…" />
      </div>
      <div class="row" style="margin-top:10px">
        <button data-action="check-conversion" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat převod'}</button>
      </div>
      <div class="output" data-out="${id}">Zapiš výsledek převodu.</div>`;
  } else if (e.type === 'code') {
    const language = String(e.language || 'python').toLowerCase();
    inner = `
      <div class="code-editor" data-code-editor="${id}">
        <div class="code-gutter" data-gutter="${id}" aria-hidden="true">1</div>
        <div class="code-surface">
          <pre class="code-highlight" data-highlight="${id}" aria-hidden="true"></pre>
          <textarea class="answer-input code" spellcheck="false" data-code="${id}" data-language="${esc(language)}" aria-label="Zdrojový kód">${esc(e.starterCode)}</textarea>
        </div>
      </div>
      <div class="row" style="margin-top:10px">
        <button class="primary" data-action="run-code" data-id="${id}">▶ Spustit kód</button>
        <button data-action="clear-code" data-id="${id}">Vymazat</button>
      </div>
      <div class="output" data-out="${id}">Výstup programu se objeví zde.</div>`;
  } else if (e.type === 'number' || e.type === 'fill') {
    const calculationPanel = e.type === 'number' && e.subject === 'elektrotechnika';
    const autoGrade = shouldAutoGradeTextInput(e);
    const action = autoGrade ? 'check-short' : 'show-self-check';
    const buttonLabel = state.mode === 'test'
      ? 'Zaznamenat odpověď'
      : (calculationPanel ? 'Zkontrolovat výpočet' : autoGrade ? 'Zkontrolovat' : 'Porovnat s řešením');
    const answerInput = calculationPanel
      ? `<div class="conversion-panel">
          <label class="small" for="answer-${id}">Zapiš výsledek:</label>
          <input id="answer-${id}" class="answer-input conversion-input" data-answer="${id}" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="Napiš číslo…" />
        </div>`
      : `<input class="answer-input" data-answer="${id}" placeholder="${e.type === 'number' ? 'Napiš číslo…' : 'Doplň odpověď…'}" />`;
    inner = `
      ${answerInput}
      <div class="row" style="margin-top:10px">
        <button data-action="${action}" data-id="${id}">${buttonLabel}</button>
      </div>
      <div class="output" data-out="${id}">${calculationPanel ? 'Zapiš výsledek výpočtu.' : autoGrade ? 'Napiš odpověď a zkontroluj.' : 'Odpověď se automaticky nehodnotí.'}</div>`;
  } else {
    const autoGrade = shouldAutoGradeTextInput(e);
    inner = `
      <textarea class="answer-input" data-answer="${id}" placeholder="Napiš svoji odpověď…"></textarea>
      <div class="row" style="margin-top:10px">
        <button data-action="${autoGrade ? 'check-personality' : 'show-self-check'}" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : (autoGrade ? 'Zkontrolovat' : 'Porovnat s řešením')}</button>
      </div>
      <div class="output" data-out="${id}">${autoGrade ? 'Napiš odpověď a zkontroluj.' : 'Odpověď se automaticky nehodnotí.'}</div>`;
  }

  const media = e.image
    ? `<figure class="question-figure"><img src="${esc(e.image)}" alt="${esc(e.imageAlt || e.title || 'Ilustrace k úloze')}" loading="lazy">${e.imageCaption ? `<figcaption>${rich(e.imageCaption)}</figcaption>` : ''}</figure>`
    : '';

  const hint = e.hint
    ? `<details><summary class="hint">Nápověda</summary><div class="small" style="margin-top:7px">${rich(e.hint)}</div></details>`
    : '';

  const category = [e.subject, e.topic, e.subtopic].filter(Boolean);
  const difficultyTag = `<span class="tag difficulty-tag difficulty-${Number(e.difficulty)}">${esc(difficultyText(e.difficulty))}</span>`;
  const tags = `<div class="tags">${difficultyTag}</div>`;

  const typeLabels = {choice:'Výběr', multi:'Více správných', match:'Párování', order:'Řazení', scenario:'Scénář', diagnostic:'Diagnostika', classification:'Třídění', compare:'Porovnání', 'image-choice':'Obrázek + výběr', text:'Text', code:'Kód', fill:'Doplňování', number:'Výpočet', conversion:'Převod soustavy'};
  return `<article class="exercise" data-type="${esc(e.type)}" data-subject="${esc(e.subject)}" data-exercise-id="${id}">
    <div class="exercise-head">
      <div>
        <div class="exercise-number">Úloha ${index + 1}${category.length ? ' · ' + esc(category.join(' › ')) : ''}</div>
        ${tags}
      </div>
      <span class="tag type-tag">${esc(typeLabels[e.type] || e.type)}</span>
    </div>
    <div class="exercise-body">
      <div class="question">${rich(e.question)}</div>
      ${media}
      ${inner}
      ${hint}
      ${solutionBlock(e)}
    </div>
  </article>`;
}

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function currentFilterKey() {
  return [
    $('filterSubject').value || 'all',
    $('filterTopic').value || 'all',
    $('filterSubtopic').value || 'all',
    $('filterType').value || 'all',
    $('filterDifficulty').value || 'all',
    ($('exerciseSearch')?.value || '').trim().toLocaleLowerCase('cs-CZ'),
  ].join('|');
}

function baseFilteredExercises() {
  const filterSubject = $('filterSubject').value;
  const filterTopic = $('filterTopic').value;
  const filterSubtopic = $('filterSubtopic').value;
  const filter = $('filterType').value;
  const difficulty = $('filterDifficulty').value;
  const query = ($('exerciseSearch')?.value || '').trim().toLocaleLowerCase('cs-CZ');
  return baseCatalogExercises().filter(e => {
    const haystack = [e.title, e.question, e.subject, e.topic, e.subtopic, ...(e.tags || []), e.starterCode, e.solution].join(' ').toLocaleLowerCase('cs-CZ');
    return (filterSubject === 'all' || e.subject === filterSubject) &&
      (filterTopic === 'all' || e.topic === filterTopic) &&
      (filterSubtopic === 'all' || e.subtopic === filterSubtopic) &&
      (filter === 'all' || e.type === filter) &&
      (difficulty === 'all' || String(e.difficulty) === String(difficulty)) &&
      (!query || haystack.includes(query));
  });
}

function historyKey() {
  return `procvicovna-history:${currentFilterKey()}`;
}

function getHistory() {
  try {
    return JSON.parse(getStorage().getItem(historyKey()) || '[]');
  } catch {
    return [];
  }
}

function saveHistory(ids) {
  try {
    const previous = getHistory();
    const merged = [...ids, ...previous.filter(id => !ids.includes(id))].slice(0, 60);
    getStorage().setItem(historyKey(), JSON.stringify(merged));
  } catch {
    // Storage nemusí být k dispozici; randomizace bude fungovat i bez něj.
  }
}

function createSession(forceNew = false) {
  const pool = baseFilteredExercises();
  if (!pool.length) {
    state.sessionIds = [];
    state.sessionKey = currentFilterKey();
    state.results = {};
    state.currentStats = null;
    return;
  }

  const key = currentFilterKey();
  const sizeValue = $('sessionSize').value;
  const requested = sizeValue === 'all' ? pool.length : Math.min(Number(sizeValue), pool.length);

  if (!forceNew && state.sessionKey === key && state.sessionIds.length) return;

  const history = getHistory();
  const fresh = shuffle(pool.filter(e => !history.includes(e.id)));
  const usedHistory = shuffle(pool.filter(e => history.includes(e.id)));
  const selected = [...fresh, ...usedHistory].slice(0, requested);

  state.sessionIds = shuffle(selected.map(e => e.id));
  window.studyUX?.resetPosition();
  state.sessionKey = key;
  state.results = {};
  state.codeResults = {};
  state.currentStats = null;
  saveHistory(state.sessionIds);
}

function sessionExercises() {
  const pool = baseFilteredExercises();
  const byId = new Map(pool.map(e => [e.id, e]));
  return state.sessionIds.map(id => byId.get(id)).filter(Boolean);
}

function shuffledChoices(e) {
  if (!Array.isArray(e.choices)) return [];
  // Každá možnost včetně správné má stejnou šanci na každou pozici.
  return shuffle(e.choices);
}

function toBaseString(value, base) {
  return Number(value).toString(base).toUpperCase();
}

function digitValue(ch) {
  const n = parseInt(ch, 36);
  return Number.isFinite(n) ? n : 0;
}

function buildHornerSolution(value, base) {
  const digits = String(value).toUpperCase();
  let acc = 0;
  const lines = [`Hodnocení čísla ${digits} v základu ${base}:`];
  for (const ch of digits) {
    const d = digitValue(ch);
    acc = acc * base + d;
    lines.push(`(${lines.length === 1 ? '0' : 'předchozí výsledek'}) × ${base} + ${d} = ${acc}`);
  }
  return lines.join('\n');
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatedCtExercise() {
  const selectedTopic = $('filterTopic').value || 'all';
  const chosenDifficulty = $('filterDifficulty').value === 'all' ? null : Number($('filterDifficulty').value);
  const level = chosenDifficulty || randomInt(2, 4);
  const selectedType = $('filterType').value || 'all';
  let mode = randomInt(0, 5);
  if (selectedType === 'number' || selectedTopic === 'Hornerovo schéma') mode = 6;
  if (selectedTopic === 'Převod z dekadické soustavy') mode = [0, 4, 5][randomInt(0, 2)];
  if (selectedTopic === 'Konverze mezi soustavami') mode = randomInt(0, 5);
  if (selectedTopic === 'Číselné soustavy') mode = randomInt(0, 5);

  const id = `ct-gen-${Date.now().toString(36)}-${state.generatedCounter++}`;
  let exercise;
  if (mode === 6) {
    const baseChoices = level >= 4 ? [2, 8, 16] : [2, 8];
    const base = baseChoices[randomInt(0, baseChoices.length - 1)];
    const len = level <= 2 ? 3 : 4;
    const max = base ** len - 1;
    const value = randomInt(base ** (len - 1), max);
    const representation = toBaseString(value, base);
    const decimalDigits = [...representation].map(digitValue).join(', ');
    exercise = {
      subject: 'Číslicová technika', topic: 'Hornerovo schéma', subtopic: 'Výpočet hodnoty', id, type: 'number',
      title: 'Generovaný výpočet pomocí Hornerova schématu',
      question: `Vypočítej dekadickou hodnotu čísla ${representation} v základu ${base}.`,
      answer: String(value),
      solution: `${representation}₍${base}₎ = ${decimalDigits} jako číslice zleva doprava.\n${buildHornerSolution(representation, base)}\nVýsledek: ${value}₁₀.`,
      hint: 'Použij Hornerovo schéma: postupně násob předchozí výsledek základem a přičti další číslici.',
      tags: ['generováno', 'Hornerovo schéma'], difficulty: level, generated: true
    };
  } else {
    const pairs = [
      [10, 2], [2, 10], [10, 16], [16, 10], [8, 10], [10, 8]
    ];
    const [fromBase, toBase] = pairs[mode];
    let decimal;
    if (fromBase === 10) decimal = randomInt(level <= 2 ? 8 : 12, level >= 4 ? 511 : 255);
    else if (fromBase === 2) decimal = randomInt(8, level >= 4 ? 511 : 255);
    else if (fromBase === 8) decimal = randomInt(8, 255);
    else decimal = randomInt(16, level >= 4 ? 511 : 255);
    const value = toBaseString(decimal, fromBase);
    const answer = toBaseString(decimal, toBase);
    const subtopics = {
      '2': 'Do dvojkové soustavy', '8': 'Do osmičkové soustavy', '10': 'Do dekadické soustavy', '16': 'Do šestnáctkové soustavy'
    };
    exercise = {
      subject: 'Číslicová technika', topic: 'Konverze mezi soustavami', subtopic: subtopics[String(toBase)] || 'Praktické převody',
      id, type: 'conversion', title: 'Generovaný převod mezi soustavami',
      question: `Převeď číslo ${value} z ${fromBase} soustavy do ${toBase} soustavy.`,
      value, fromBase, toBase, answer,
      solution: `${value}₍${fromBase}₎ = ${answer}₍${toBase}₎. Výsledek můžeš ověřit opačným převodem nebo Hornerovým schématem.`,
      hint: fromBase === 10 && toBase === 2 ? 'Děl číslo opakovaně dvěma a zbytky čti odzadu.' : 'Nejprve si ujasni základ původní i cílové soustavy.',
      tags: ['generováno', 'převod'], difficulty: level, generated: true
    };
  }
  return normalizeExercises([exercise])[0];
}

function generatedElectrotechnicsExercise() {
  const topics = ['Elektrický proud', 'Ohmův zákon', 'Rezistivita a odpor vodiče', 'Odpor a teplota'];
  const selectedTopic = $('filterTopic').value || 'all';
  const topic = selectedTopic === 'all' ? topics[randomInt(0, topics.length - 1)] : selectedTopic;
  const level = $('filterDifficulty').value === 'all' ? 3 : Number($('filterDifficulty').value);
  const limit = level <= 2 ? 10 : level >= 4 ? 50 : 25;
  const a = randomInt(1, limit);
  const b = randomInt(2, limit + 2);
  const mode = randomInt(0, 2);
  const fmt = value => String(Number(value.toFixed(6))).replace('.', ',');
  let question, answer, solution, hint;
  if (topic === 'Elektrický proud') {
    const current = a / 10;
    const time = b;
    const charge = Number((current * time).toFixed(6));
    if (mode === 0) {
      question = `Za ${time} s projde vodičem náboj ${fmt(charge)} C. Urči stálý proud. Napiš číslo v A.`;
      answer = current;
      solution = `I = Q / t = ${fmt(charge)} / ${time} = ${fmt(answer)} A.`;
      hint = 'Náboj vyděl dobou jeho průchodu.';
    } else if (mode === 1) {
      question = `Vodičem protéká stálý proud ${fmt(current)} A po dobu ${time} s. Jaký náboj projde vodičem? Napiš číslo v C.`;
      answer = charge;
      solution = `Q = I · t = ${fmt(current)} · ${time} = ${fmt(answer)} C.`;
      hint = 'Vyjádři náboj ze vztahu I = Q / t.';
    } else {
      question = `Vodičem protéká stálý proud ${fmt(current)} A. Za jak dlouho projde náboj ${fmt(charge)} C? Napiš číslo v s.`;
      answer = time;
      solution = `t = Q / I = ${fmt(charge)} / ${fmt(current)} = ${time} s.`;
      hint = 'Vyjádři čas ze vztahu I = Q / t.';
    }
  } else if (topic === 'Ohmův zákon') {
    const current = a / 10;
    const resistance = b * 5;
    const voltage = Number((current * resistance).toFixed(6));
    if (mode === 0) {
      question = `Na rezistoru s odporem ${resistance} Ω je napětí ${fmt(voltage)} V. Urči proud. Napiš číslo v A.`;
      answer = current;
      solution = `I = U / R = ${fmt(voltage)} / ${resistance} = ${fmt(answer)} A.`;
      hint = 'Použij Ohmův zákon pro proud.';
    } else if (mode === 1) {
      question = `Na rezistoru je napětí ${fmt(voltage)} V a protéká jím proud ${fmt(current)} A. Urči odpor. Napiš číslo v Ω.`;
      answer = resistance;
      solution = `R = U / I = ${fmt(voltage)} / ${fmt(current)} = ${resistance} Ω.`;
      hint = 'Vyjádři odpor z Ohmova zákona.';
    } else {
      question = `Rezistorem s odporem ${resistance} Ω protéká proud ${fmt(current)} A. Urči napětí. Napiš číslo v V.`;
      answer = voltage;
      solution = `U = R · I = ${resistance} · ${fmt(current)} = ${fmt(answer)} V.`;
      hint = 'Vyjádři napětí z Ohmova zákona.';
    }
  } else if (topic === 'Rezistivita a odpor vodiče') {
    const rho = [0.02, 0.04, 0.056][randomInt(0, 2)];
    const section = [1, 2, 4][randomInt(0, 2)];
    const length = a * section;
    const resistance = Number((rho * a).toFixed(6));
    if (mode === 0) {
      question = `Vodič má délku ${length} m, průřez ${section} mm² a rezistivitu ${fmt(rho)} Ω·mm²/m. Urči odpor. Napiš číslo v Ω.`;
      answer = resistance;
      solution = `R = ρ · l / S = ${fmt(rho)} · ${length} / ${section} = ${fmt(answer)} Ω.`;
      hint = 'Délku dosazuj v metrech a průřez v mm².';
    } else if (mode === 1) {
      question = `Vodič má délku ${length} m, rezistivitu ${fmt(rho)} Ω·mm²/m a odpor ${fmt(resistance)} Ω. Urči průřez. Napiš číslo v mm².`;
      answer = section;
      solution = `S = ρ · l / R = ${fmt(rho)} · ${length} / ${fmt(resistance)} = ${section} mm².`;
      hint = 'Vyjádři průřez ze vztahu R = ρ · l / S.';
    } else {
      question = `Vodič má průřez ${section} mm², rezistivitu ${fmt(rho)} Ω·mm²/m a odpor ${fmt(resistance)} Ω. Urči délku. Napiš číslo v m.`;
      answer = length;
      solution = `l = R · S / ρ = ${fmt(resistance)} · ${section} / ${fmt(rho)} = ${length} m.`;
      hint = 'Vyjádři délku ze vztahu R = ρ · l / S.';
    }
  } else {
    const initial = a * 5;
    const delta = randomInt(1, 6) * 5 * (mode === 2 ? -1 : 1);
    const temperature = 20 + delta;
    const change = Number((initial * 0.004 * delta).toFixed(6));
    const resistance = Number((initial + change).toFixed(6));
    question = `Vodič má při 20 °C odpor ${initial} Ω a teplotní součinitel α = 0,004 K⁻¹. Jeho teplota se změní na ${temperature} °C. ${mode === 1 ? 'O kolik Ω se odpor zvýší? Napiš jen přírůstek v Ω.' : 'Urči nový odpor. Napiš číslo v Ω.'} Použij lineární přiblížení.`;
    answer = mode === 1 ? change : resistance;
    solution = `ΔT = ${temperature} − 20 = ${delta} K. ${mode === 1 ? `ΔR = R₀ · α · ΔT = ${initial} · 0,004 · ${delta} = ${fmt(answer)} Ω.` : `R = R₀ · (1 + α · ΔT) = ${initial} · (1 + 0,004 · (${delta})) = ${fmt(answer)} Ω.`}`;
    hint = 'Použij rozdíl nové a výchozí teploty; při ochlazení je záporný.';
  }
  return normalizeExercises([{
    subject: 'elektrotechnika', topic, subtopic: 'Výpočty',
    id: `et-gen-${Date.now().toString(36)}-${state.generatedCounter++}`,
    type: 'number', title: 'Generovaný výpočet', question,
    answer: String(Number(answer.toFixed(6))), solution, hint,
    tags: ['generováno', 'elektrické obvody'], difficulty: level, generated: true
  }])[0];
}

function generateExercises(count = 6) {
  if (!canGenerateTasks()) {
    toast('Vyber výpočty v elektrotechnice nebo převody a výpočty v Číslicové technice.');
    return;
  }
  const existing = new Set(baseFilteredExercises().map(e => `${e.type}|${e.question}`));
  state.generatedExercises = [];
  const electrotechnics = $('filterSubject').value === 'elektrotechnika';
  if (electrotechnics) $('exerciseSearch').value = '';
  for (let i = 0; i < count; i++) {
    let candidate;
    let attempts = 0;
    do { candidate = electrotechnics ? generatedElectrotechnicsExercise() : generatedCtExercise(); attempts += 1; }
    while (existing.has(`${candidate.type}|${candidate.question}`) && attempts < 20);
    existing.add(`${candidate.type}|${candidate.question}`);
    state.generatedExercises.push(candidate);
  }
  state.sessionIds = [];
  state.sessionKey = '';
  state.results = {};
  state.codeResults = {};
  state.currentStats = null;
  createSession(true);
  if (electrotechnics) {
    const size = $('sessionSize').value;
    state.sessionIds = shuffle(state.generatedExercises.map(e => e.id)).slice(0, size === 'all' ? count : Number(size));
    saveHistory(state.sessionIds);
  }
  renderExercises();
  toast(`Vygenerováno ${state.generatedExercises.length} nových příkladů.`);
}

function currentSessionMap() {
  return new Map(allCatalogExercises().map(e => [String(e.id), e]));
}

function currentSessionElements() {
  const map = currentSessionMap();
  return state.sessionIds.map(id => map.get(String(id))).filter(Boolean);
}

function readExerciseResponse(e) {
  const id = CSS.escape(e.id);
  if (['choice', 'scenario', 'image-choice'].includes(e.type)) {
    const selected = document.querySelector(`input[name="choice-${id}"]:checked`)?.value;
    return { answered: Boolean(selected), correct: Boolean(selected) && String(selected).trim() === String(e.answer).trim(), graded: true };
  }
  if (e.type === 'diagnostic') {
    const selected = [...document.querySelectorAll(`input[name="diagnostic-${id}"]:checked`)].map(i => String(i.value).trim()).sort();
    const expected = [...(e.answerIds || [])].map(String).sort();
    return { answered: selected.length > 0, correct: selected.length === expected.length && expected.every((v,i) => v === selected[i]), graded: true };
  }
  if (e.type === 'classification') {
    const wrap = document.querySelector(`.exercise[data-type="classification"] [data-out="${id}"]`)?.closest('.exercise');
    const rows = wrap ? [...wrap.querySelectorAll('.classification-item')] : [];
    const byId = new Map((e.items || []).map(item => [String(item.id), String(item.category)]));
    const answered = rows.length === (e.items || []).length && rows.every(row => Boolean(row.dataset.selectedCategory));
    const correct = answered && rows.every(row => byId.get(row.dataset.classificationItem) === row.dataset.selectedCategory);
    return { answered: rows.some(row => Boolean(row.dataset.selectedCategory)), correct, graded: true };
  }
  if (e.type === 'compare') {
    const criteria = e.criteria || [];
    const answered = criteria.length > 0 && criteria.every(item => document.querySelector(`input[name="compare-${id}-${CSS.escape(item.id)}"]:checked`));
    const correct = answered && criteria.every(item => document.querySelector(`input[name="compare-${id}-${CSS.escape(item.id)}"]:checked`)?.value === item.answer);
    return { answered, correct, graded: true };
  }
  if (e.type === 'multi') {
    const selected = [...document.querySelectorAll(`input[name="multi-${id}"]:checked`)].map(i => String(i.value).trim()).sort();
    const expected = (e.answers || []).map(v => String(v).trim()).sort();
    return { answered: selected.length > 0, correct: selected.length === expected.length && expected.every((v, i) => v === selected[i]), graded: true };
  }
  if (e.type === 'match') {
    const selects = [...document.querySelectorAll(`[data-match-exercise="${id}"]`)];
    const expectedMap = new Map((e.pairs || []).map(pair => [String(pair.left), String(pair.right)]));
    const answered = selects.length === expectedMap.size && selects.every(s => Boolean(s.value));
    const correct = answered && selects.every(s => expectedMap.get(s.dataset.matchLeft) === s.value) && new Set(selects.map(s => s.value)).size === expectedMap.size;
    return { answered, correct, graded: true };
  }
  if (e.type === 'order') {
    const wrap = document.querySelector(`[data-order-wrap="${id}"]`);
    const picked = wrap ? [...wrap.querySelectorAll('.order-chip')].map(c => c.dataset.orderValue) : [];
    const expected = (e.order || []).map(v => String(v));
    return { answered: picked.length > 0, correct: picked.length === expected.length && expected.every((v, i) => v === picked[i]), graded: true };
  }
  if (e.type === 'conversion') {
    const answer = document.querySelector(`[data-answer="${id}"]`)?.value?.trim() || '';
    const normalize = value => String(value ?? '').replace(/\s+/gu, '').toUpperCase();
    return { answered: Boolean(answer), correct: Boolean(answer) && normalize(answer) === normalize(e.answer), graded: true };
  }
  if (e.type === 'code') {
    const result = state.codeResults[e.id];
    return result || { answered: false, correct: false, graded: true };
  }
  const answer = document.querySelector(`[data-answer="${id}"]`)?.value?.trim() || '';
  if ((e.type === 'text' || e.type === 'fill') && !e.autoGrade) return { answered: Boolean(answer), correct: null, graded: false };
  const expected = String(e.answer ?? '').trim();
  const numeric = e.type === 'number' && answer !== '' && expected !== '' && Number(answer.replace(',', '.')) === Number(expected.replace(',', '.'));
  const correct = e.type === 'number' ? numeric : answer.toLowerCase() === expected.toLowerCase();
  return { answered: Boolean(answer), correct, graded: true };
}

function clearCurrentStats() {
  state.currentStats = null;
  $('statsPanel')?.remove();
}

function recordExerciseResult(e, result) {
  state.results[e.id] = { ...result, timestamp: Date.now() };
  clearCurrentStats();
  updateSessionProgress();
  if (state.mode === 'learn') maybeAutoCompleteSet();
  window.studyUX?.save();
}

function renderNeutralFeedback(out, answered = true) {
  if (!out) return;
  out.className = 'output';
  out.textContent = answered ? '✓ Odpověď zaznamenána. Výsledek uvidíš až po dokončení sady.' : 'Odpověď zatím není vyplněná.';
}

function maybeAutoCompleteSet() {
  const session = currentSessionElements();
  if (!session.length) return;
  const complete = session.every(e => {
    const result = state.results[e.id] || state.codeResults[e.id] || readExerciseResponse(e);
    return Boolean(result?.answered);
  });
  if (complete) completeCurrentSet();
}

function buildSetStats() {
  const session = currentSessionElements();
  const rows = session.map(e => ({ exercise: e, result: state.results[e.id] || readExerciseResponse(e) }));
  const graded = rows.filter(r => r.result.graded);
  const correct = graded.filter(r => r.result.correct).length;
  const answered = rows.filter(r => r.result.answered).length;
  const selfChecks = rows.filter(r => !r.result.graded && r.result.answered).length;
  const byTopic = {};
  for (const row of rows) {
    const topic = row.exercise.topic || 'Bez tématu';
    (byTopic[topic] ||= { total: 0, graded: 0, correct: 0, answered: 0, selfChecks: 0 });
    byTopic[topic].total += 1;
    if (row.result.answered) byTopic[topic].answered += 1;
    if (row.result.graded) { byTopic[topic].graded += 1; if (row.result.correct) byTopic[topic].correct += 1; }
    else if (row.result.answered) byTopic[topic].selfChecks += 1;
  }
  return {
    createdAt: new Date().toISOString(),
    mode: state.mode,
    total: rows.length, answered, graded: graded.length, correct,
    percent: graded.length ? Math.round((correct / graded.length) * 100) : null,
    selfChecks,
    failedIds: rows.filter(r => r.result.answered && r.result.graded && r.result.correct === false).map(r => r.exercise.id),
    byTopic,
    filter: {
      subject: $('filterSubject').value, topic: $('filterTopic').value, subtopic: $('filterSubtopic').value, type: $('filterType').value, difficulty: $('filterDifficulty').value
    }
  };
}

function saveLocalSetStats(stats) {
  try {
    const key = 'procvicovna-set-stats:v1';
    const storage = getStorage();
    const old = JSON.parse(storage.getItem(key) || '[]');
    storage.setItem(key, JSON.stringify([stats, ...old].slice(0, 20)));
  } catch {
    // Statistika zůstává funkční i bez storage API.
  }
}

function startFailureSession(failedIds) {
  const available = new Set(allCatalogExercises().map(e => String(e.id)));
  const ids = [...new Set((failedIds || []).filter(id => available.has(String(id))))];
  if (!ids.length) {
    toast('V této sadě nejsou žádné hodnocené chyby k procvičení.');
    return;
  }
  state.sessionIds = ids;
  state.sessionKey = currentFilterKey();
  state.results = {};
  state.codeResults = {};
  state.currentStats = null;
  renderExercises();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  toast(`Připravena sada ${ids.length} chybných úloh.`);
}

function renderStatsPanel(stats) {
  $('statsPanel')?.remove();
  const topics = Object.entries(stats.byTopic);
  const score = stats.percent == null ? '—' : `${stats.percent} %`;
  const scoreValue = stats.percent == null ? 0 : stats.percent;
  const topicRows = topics.map(([topic, s]) => {
    const pct = s.graded ? `${Math.round((s.correct / s.graded) * 100)} %` : '—';
    const self = s.selfChecks ? ` · ${s.selfChecks} self-check` : '';
    return `<div class="stats-topic-row"><span>${esc(topic)}</span><strong>${s.correct}/${s.graded} · ${pct}</strong><small>${s.answered}/${s.total} zodpovězeno${self}</small></div>`;
  }).join('');
  const panel = document.createElement('section');
  panel.id = 'statsPanel';
  panel.className = 'set-stats';
  panel.innerHTML = `
    <div class="set-stats-head">
      <div class="set-stats-score">
        <div class="set-stats-score-ring" style="--score:${scoreValue}" aria-label="Skóre ${score}"><strong>${score}</strong></div>
        <div><span class="eyebrow">Shrnutí sady</span><h3>${score}</h3><p>${stats.correct} z ${stats.graded} hodnocených úloh správně · ${stats.answered}/${stats.total} zodpovězeno${stats.selfChecks ? ` · ${stats.selfChecks} otevřený self-check` : ''}</p></div>
      </div>
      <span class="set-stats-mode">${stats.mode === 'test' ? '📝 Test' : '📘 Učení'}</span>
    </div>
    <div class="stats-topic-list">${topicRows || '<div class="small">Tato sada nemá hodnotitelné úlohy.</div>'}</div>
    <div class="stats-local-note">📱 Tato statistika zůstává jen v tomto prohlížeči.</div>
    <div class="set-stats-actions no-print">
      ${stats.failedIds.length ? `<button type="button" id="retryFailuresBtn" class="primary failure-action">↻ Procvičit jen chyby <strong>${stats.failedIds.length}</strong></button>` : ''}
      <button type="button" id="repeatSetBtn">🔁 Opakovat tuto sadu</button>
      <button type="button" id="newSetFromStats" class="primary">🎲 Nová náhodná sada</button>
    </div>`;
  $('exercises').appendChild(panel);
  panel.querySelector('#retryFailuresBtn')?.addEventListener('click', () => startFailureSession(stats.failedIds));
  panel.querySelector('#repeatSetBtn')?.addEventListener('click', () => {
    state.results = {};
    state.codeResults = {};
    state.currentStats = null;
    renderExercises();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast('Stejná sada byla připravena znovu.');
  });
  panel.querySelector('#newSetFromStats')?.addEventListener('click', () => {
    state.results = {};
    state.codeResults = {};
    state.currentStats = null;
    createSession(true);
    renderExercises();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast('Nová náhodná sada byla vylosována.');
  });
}

function completeCurrentSet() {
  const stats = buildSetStats();
  state.currentStats = stats;
  saveLocalSetStats(stats);
  renderStatsPanel(stats);
  updateMobileCheckBar();
  window.studyUX?.save();
}

function finishCurrentSet() {
  const session = currentSessionElements();
  if (!session.length) return;
  state.results = {};
  for (const e of session) {
    state.results[e.id] = { ...readExerciseResponse(e), timestamp: Date.now() };
  }
  completeCurrentSet();
  toast(state.mode === 'test' ? 'Test byl vyhodnocen.' : 'Shrnutí sady je hotové.');
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function setStudyMode(mode) {
  const next = mode === 'test' ? 'test' : 'learn';
  if (state.mode === next) return;
  state.mode = next;
  state.answerVisible = false;
  state.results = {};
  state.codeResults = {};
  state.currentStats = null;
  renderExercises();
  updateModeUI();
}

function updateModeUI() {
  const isTest = state.mode === 'test';
  $('studyView').classList.toggle('test-mode', isTest);
  $('modeLearn').classList.toggle('active', !isTest);
  $('modeTest').classList.toggle('active', isTest);
  $('modeHint').textContent = isTest
    ? 'Test: průběžná správnost se neukazuje, výsledek dostaneš až po dokončení.'
    : 'Učení: odpověď se vyhodnotí hned a řešení můžeš zobrazit.';
  const finishSet = $('finishSet');
  finishSet.classList.remove('hidden');
  finishSet.textContent = isTest ? '✓ Dokončit test' : '✓ Zobrazit shrnutí sady';
  $('showAnswers').classList.toggle('hidden', isTest);
  $('hideAnswers').classList.toggle('hidden', isTest);
  $('generateTasks').classList.toggle('hidden', !canGenerateTasks());
}

function renderExercises() {
  activeExerciseElement = null;
  renderHeader();
  const pool = baseFilteredExercises();
  if (!pool.length) {
    state.sessionIds = [];
    $('exercises').innerHTML = '<div class="empty">Pro tento filtr tu nejsou žádné úlohy.</div>';
    $('poolInfo').textContent = 'Pool je prázdný.';
    updateSessionProgress();
    updateModeUI();
    updateMobileCheckBar();
    window.studyUX?.onRender();
    return;
  }

  if (state.sessionKey !== currentFilterKey() || !state.sessionIds.length) {
    createSession(false);
  }

  const filtered = sessionExercises();

  const generatedCount = filtered.filter(e => e.generated).length;
  $('poolInfo').textContent = `Pool: ${pool.length} úloh${generatedCount ? ` · z toho ${generatedCount} generovaných v této sadě` : ''} · tato sada: ${filtered.length} · ${state.mode === 'test' ? 'výsledek až po dokončení.' : 'průběžná kontrola je zapnutá.'}`;
  updateSessionProgress();

  // Upozornění Osobnosti se generuje při každém renderu modulu, takže se neztratí po návratu.
  const isPersonalityModule = pool.length > 0 && pool.every(e => e.topic === 'Osobnosti');
  const personalityNotice = isPersonalityModule
    ? `<div class="output" style="margin-bottom:16px">⚠️ <strong>Pozor:</strong> U osobností napiš správné jméno a příjmení. <strong>Velká a malá písmena se nerozlišují</strong> — např. „Tim Berners-Lee“, „tim berners-lee“ nebo „tIm BeRnErS-lEe“ jsou stejné.</div>`
    : '';

  $('exercises').innerHTML = personalityNotice + filtered.map((e, i) => renderExercise(e, i)).join('');
  attachExerciseEvents();
  syncCodeEditors();
  activeExerciseElement = document.querySelector('#exercises .exercise');
  if (state.currentStats) renderStatsPanel(state.currentStats);
  updateSessionProgress();
  updateModeUI();
  updateMobileCheckBar();
  window.studyUX?.onRender();
}

function findExercise(id) {
  return allCatalogExercises().find(e => String(e.id) === String(id));
}

function attachExerciseEvents() {
  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      const e = findExercise(id);
      if (!e) return;
      const out = document.querySelector(`[data-out="${CSS.escape(id)}"]`);

      if (button.dataset.action === 'clear-code') {
        const textarea = document.querySelector(`[data-code="${CSS.escape(id)}"]`);
        if (textarea) textarea.value = e.starterCode || '';
        delete state.codeResults[e.id];
        delete state.results[e.id];
        clearCurrentStats();
        return;
      }

      if (button.dataset.action === 'check-conversion') {
        const answer = document.querySelector(`[data-answer="${CSS.escape(id)}"]`)?.value?.trim() || '';
        if (!out) return;
        const expected = String(e.answer ?? '').trim();
        const normalize = (value) => String(value ?? '').replace(/\s+/gu, '').toUpperCase();
        const correct = answer !== '' && normalize(answer) === normalize(expected);
        recordExerciseResult(e, { answered: answer !== '', correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, answer !== ''); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = correct
          ? '✓ Správně. Převod sedí.'
          : `✗ Převod nesedí.\n\nSprávná odpověď: ${expected} (${e.toBase})`;
        return;
      }

      if (button.dataset.action === 'check-short') {
        const answer = document.querySelector(`[data-answer="${CSS.escape(id)}"]`)?.value?.trim() || '';
        if (!out) return;
        if (!shouldAutoGradeTextInput(e)) {
          recordExerciseResult(e, { answered: answer !== '', correct: null, graded: false });
          if (state.mode === 'test') { renderNeutralFeedback(out, answer !== ''); return; }
          out.className = 'output';
          out.textContent = `Tvoje odpověď: ${answer || '(prázdná)'}\n\nŘešení: ${e.answer || 'Řešení není uvedeno.'}`;
          return;
        }
        const expected = String(e.answer ?? '').trim();
        const numeric = e.type === 'number' && answer !== '' && expected !== '' &&
          Number(answer.replace(',', '.')) === Number(expected.replace(',', '.'));
        const correct = e.type === 'number' ? numeric : answer.toLowerCase() === expected.toLowerCase();
        recordExerciseResult(e, { answered: answer !== '', correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, answer !== ''); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = correct
          ? '✓ Správně.'
          : `✗ Zatím ne.\n\nSprávná odpověď: ${expected}`;
        return;
      }

      if (button.dataset.action === 'check-personality') {
        if (!e.autoGrade) return;
        const answer = document.querySelector(`[data-answer="${CSS.escape(id)}"]`)?.value || '';
        if (!out) return;
        const expected = String(e.answer ?? '');
        const correct = normalizePersonalityAnswer(answer) === normalizePersonalityAnswer(expected);
        recordExerciseResult(e, { answered: answer.trim() !== '', correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, answer.trim() !== ''); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = correct
          ? '✓ Správně.'
          : `✗ Zatím ne.\n\nSprávná odpověď: ${expected}`;
        return;
      }

      if (button.dataset.action === 'show-self-check') {
        const answer = document.querySelector(`[data-answer="${CSS.escape(id)}"]`)?.value?.trim() || '';
        if (!out) return;
        recordExerciseResult(e, { answered: answer !== '', correct: null, graded: false });
        if (state.mode === 'test') { renderNeutralFeedback(out, answer !== ''); return; }
        out.className = 'output';
        out.textContent = `Tvoje odpověď: ${answer || '(prázdná)'}\n\nŘešení: ${e.answer || 'Řešení není uvedeno.'}`;
        return;
      }

      if (button.dataset.action === 'check-diagnostic') {
        const selected = [...document.querySelectorAll(`input[name="diagnostic-${CSS.escape(id)}"]:checked`)].map(input => String(input.value).trim()).sort();
        if (!out) return;
        const expected = [...(e.answerIds || [])].map(String).sort();
        const correct = selected.length === expected.length && expected.every((value, i) => value === selected[i]);
        recordExerciseResult(e, { answered: selected.length > 0, correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, selected.length > 0); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = correct ? '✓ Správně – všechny chybné položky jsi označil/a.' : '✗ Diagnostika nesedí. Některá chybná položka chybí nebo je označena navíc.';
        return;
      }

      if (button.dataset.action === 'check-classification') {
        const rows = [...document.querySelectorAll(`.classification-item`)].filter(row => row.closest('.exercise')?.querySelector(`[data-out="${CSS.escape(id)}"]`));
        const expected = new Map((e.items || []).map(item => [String(item.id), String(item.category)]));
        const answered = rows.length === (e.items || []).length && rows.every(row => Boolean(row.dataset.selectedCategory));
        const correct = answered && rows.every(row => expected.get(row.dataset.classificationItem) === row.dataset.selectedCategory);
        if (!out) return;
        if (!answered) { out.className = 'output bad'; out.textContent = 'Nejdřív zařaď všechny položky.'; return; }
        recordExerciseResult(e, { answered: true, correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, true); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = correct ? '✓ Všechny položky jsou zařazené správně.' : '✗ Některé položky jsou zařazené do špatné kategorie.';
        return;
      }

      if (button.dataset.action === 'reset-classification') {
        const exercise = button.closest('.exercise');
        exercise?.querySelectorAll('[data-classification-item]').forEach(row => { row.dataset.selectedCategory = ''; row.querySelectorAll('.classification-pick').forEach(btn => btn.classList.remove('active')); });
        if (out) { out.className = 'output'; out.textContent = 'Zařaď všechny položky.'; }
        delete state.results[e.id];
        clearCurrentStats();
        return;
      }

      if (button.dataset.action === 'check-compare') {
        if (!out) return;
        const criteria = e.criteria || [];
        const selected = criteria.map(item => document.querySelector(`input[name="compare-${CSS.escape(id)}-${CSS.escape(item.id)}"]:checked`)?.value || '');
        const answered = selected.length === criteria.length && selected.every(Boolean);
        const correct = answered && criteria.every((item, i) => selected[i] === item.answer);
        recordExerciseResult(e, { answered, correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, answered); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = answered ? (correct ? '✓ Porovnání je správně.' : '✗ Některé přiřazení na levou/pravou stranu nesedí.') : 'Nejdřív vyber stranu u všech tvrzení.';
        return;
      }

      if (button.dataset.action === 'check-multi') {
        const selected = [...document.querySelectorAll(`input[name="multi-${CSS.escape(id)}"]:checked`)].map(input => String(input.value).trim());
        if (!out) return;
        const expected = (e.answers || []).map(v => String(v).trim()).sort();
        const actual = [...selected].sort();
        const correct = expected.length === actual.length && expected.every((value, i) => value === actual[i]);
        recordExerciseResult(e, { answered: selected.length > 0, correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, selected.length > 0); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = correct
          ? '✓ Správně – vybral/a jsi všechny správné možnosti.'
          : '✗ Výběr nesedí. Zkontroluj, zda nechybí správná možnost a zda jsi neoznačil/a navíc špatnou.';
        return;
      }

      if (button.dataset.action === 'check-match') {
        if (!out) return;
        const expectedMap = new Map((e.pairs || []).map(pair => [String(pair.left), String(pair.right)]));
        const selects = [...document.querySelectorAll(`[data-match-left][aria-label][data-match-exercise="${CSS.escape(id)}"]`)];
        const fallbackSelects = selects.length ? selects : [...document.querySelectorAll(`select[data-match-left]`)].filter(select => select.closest('.exercise')?.dataset.type === 'match' && select.closest('.exercise')?.querySelector(`[data-out="${CSS.escape(id)}"]`));
        if (!fallbackSelects.length || fallbackSelects.some(select => !select.value)) {
          out.className = 'output bad';
          out.textContent = 'Nejdřív přiřaď všechny dvojice.';
          return;
        }
        const correct = fallbackSelects.every(select => expectedMap.get(select.dataset.matchLeft) === select.value) && new Set(fallbackSelects.map(select => select.value)).size === expectedMap.size;
        recordExerciseResult(e, { answered: fallbackSelects.length === expectedMap.size && fallbackSelects.every(select => Boolean(select.value)), correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, fallbackSelects.every(select => Boolean(select.value))); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = correct ? '✓ Všechna přiřazení jsou správně.' : '✗ Některé přiřazení nesedí. Zkus je znovu projít.';
        return;
      }

      if (button.dataset.action === 'check-order') {
        if (!out) return;
        const wrap = document.querySelector(`[data-order-wrap="${CSS.escape(id)}"]`);
        const picked = wrap ? [...wrap.querySelectorAll('.order-chip')].map(chip => chip.dataset.orderValue) : [];
        const expected = (e.order || []).map(v => String(v));
        const correct = picked.length === expected.length && expected.every((value, i) => value === picked[i]);
        recordExerciseResult(e, { answered: picked.length > 0, correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, picked.length > 0); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = correct ? '✓ Pořadí je správně.' : `✗ Pořadí nesedí. Aktuálně máš ${picked.length} z ${expected.length} položek.`;
        return;
      }

      if (button.dataset.action === 'reset-order') {
        const wrap = document.querySelector(`[data-order-wrap="${CSS.escape(id)}"]`);
        if (!wrap) return;
        wrap.querySelector('[data-order-selected]')?.replaceChildren(Object.assign(document.createElement('span'), { className: 'order-empty', textContent: 'Zatím nic nevybráno.' }));
        wrap.querySelectorAll('.order-pick').forEach(btn => btn.classList.remove('used'));
        if (out) { out.className = 'output'; out.textContent = 'Seřaď všechny položky.'; }
        delete state.results[e.id];
        clearCurrentStats();
        return;
      }

      if (button.dataset.action === 'check-choice') {
        const selected = document.querySelector(`input[name="choice-${CSS.escape(id)}"]:checked`)?.value;
        if (!out) return;
        const correct = Boolean(selected) && String(selected).trim() === String(e.answer).trim();
        recordExerciseResult(e, { answered: Boolean(selected), correct, graded: true });
        if (state.mode === 'test') { renderNeutralFeedback(out, Boolean(selected)); return; }
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = selected
          ? (correct ? '✓ Správně.' : '✗ Tohle nesedí. Vrať se k materiálu a zkus to znovu.')
          : 'Nejdřív vyber odpověď.';
        return;
      }

      if (button.dataset.action === 'run-code') {
        await runCode(e, out);
      }
    });
  });

  document.querySelectorAll('[data-classification-category]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.classification-item');
      if (!item) return;
      const category = button.dataset.classificationCategory || '';
      item.dataset.selectedCategory = category;
      item.querySelectorAll('.classification-pick').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const out = item.closest('.exercise')?.querySelector('[data-out]');
      if (out) { out.className = 'output'; out.textContent = 'Pokračuj v zařazování položek.'; }
      clearCurrentStats();
    });
  });

  const removeOrderChip = (button) => {
    const chip = button.closest('.order-chip');
    const wrap = button.closest('.exercise');
    const value = chip?.dataset.orderValue;
    chip?.remove();

    const matching = [...(wrap?.querySelectorAll('.order-pick') || [])]
      .find(btn => btn.dataset.orderValue === value);
    matching?.classList.remove('used');

    const target = wrap?.querySelector('[data-order-selected]');
    if (target && !target.querySelector('.order-chip')) {
      const empty = document.createElement('span');
      empty.className = 'order-empty';
      empty.textContent = 'Zatím nic nevybráno.';
      target.appendChild(empty);
    }
    if (target) {
      target.querySelectorAll('.order-chip').forEach((c, i) => {
        const n = c.querySelector('strong');
        if (n) n.textContent = `${i + 1}.`;
      });
    }

    const out = wrap?.querySelector('[data-out]');
    if (out) {
      out.className = 'output';
      out.textContent = 'Seřaď všechny položky.';
    }
  };

  document.querySelectorAll('[data-order-pick]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('used')) return;
      const wrap = button.closest('.exercise');
      const target = wrap?.querySelector('[data-order-selected]');
      if (!target) return;
      const empty = target.querySelector('.order-empty');
      empty?.remove();
      const value = button.dataset.orderValue || '';
      const chip = document.createElement('span');
      chip.className = 'order-chip';
      chip.dataset.orderValue = value;
      const position = target.querySelectorAll('.order-chip').length + 1;
      chip.innerHTML = `<strong>${position}.</strong> ${esc(value)} <button type="button" data-order-remove aria-label="Odebrat ${esc(value)}">×</button>`;

      const removeButton = chip.querySelector('[data-order-remove]');
      removeButton?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        removeOrderChip(removeButton);
      });

      target.appendChild(chip);
      button.classList.add('used');

      const out = wrap?.querySelector('[data-out]');
      if (out) {
        out.className = 'output';
        out.textContent = 'Seřaď všechny položky.';
      }
    });
  });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Nepodařilo se načíst ${src}`));
    document.head.appendChild(script);
  });
}

async function loadPyodideOnce() {
  if (state.pyodide) return state.pyodide;
  if (state.pyodideLoading) return state.pyodideLoading;
  const version = '0.29.5';
  state.pyodideLoading = (async () => {
    toast('Načítám Python prostředí…');
    await loadScript(`https://cdn.jsdelivr.net/pyodide/v${version}/full/pyodide.js`);
    state.pyodide = await window.loadPyodide({
      indexURL: `https://cdn.jsdelivr.net/pyodide/v${version}/full/`
    });
    return state.pyodide;
  })();
  return state.pyodideLoading;
}

function normalizeOutput(text) {
  return String(text ?? '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n')
    .trim();
}

function showRun(output, { text = '', error = '', errorLine = null, expected = null, revealCorrectness = true }) {
  if (error) {
    const parts = [];
    if (text.trim()) parts.push(`Program stihl vypsat:\n${text.replace(/\s+$/, '')}`);
    parts.push(`Chyba${errorLine ? ` (řádek ${errorLine})` : ''}:\n${error}`);
    output.className = 'output bad';
    output.textContent = parts.join('\n\n');
    return false;
  }
  const shown = text.replace(/\s+$/, '') || '(program nic nevypsal)';
  if (expected == null) {
    output.className = 'output';
    output.textContent = shown;
    return true;
  }
  const ok = normalizeOutput(text) === normalizeOutput(expected);
  if (!revealCorrectness) {
    output.className = 'output';
    output.textContent = `${shown}\n\n✓ Výstup zaznamenán.`;
    return ok;
  }
  output.className = `output ${ok ? 'ok' : 'bad'}`;
  output.textContent = ok
    ? `${shown}\n\n✓ Správně, výstup sedí.`
    : `Tvůj program vypsal:\n${shown}\n\n✗ Výstup nesedí s očekáváním.`;
  return ok;
}

const PY_WRAPPER = `
import sys, io, contextlib
__study_out__ = ''
__study_err__ = ''
__study_line__ = None
sys.stdin = io.StringIO(__study_input__)
__study_buf__ = io.StringIO()
try:
    with contextlib.redirect_stdout(__study_buf__):
        exec(compile(__study_code__, '<kod>', 'exec'), {'__name__': '__main__'})
except SyntaxError as ex:
    __study_err__ = type(ex).__name__ + ': ' + str(ex.msg)
    __study_line__ = ex.lineno
except Exception as ex:
    __study_err__ = type(ex).__name__ + ': ' + str(ex)
    __study_tb__ = ex.__traceback__
    while __study_tb__ is not None:
        if __study_tb__.tb_frame.f_code.co_filename == '<kod>':
            __study_line__ = __study_tb__.tb_lineno
        __study_tb__ = __study_tb__.tb_next
__study_out__ = __study_buf__.getvalue()
`;

async function runCode(exercise, output) {
  const textarea = document.querySelector(`[data-code="${CSS.escape(exercise.id)}"]`);
  const code = textarea?.value ?? '';
  output.className = 'output';
  output.textContent = 'Spouštím…';

  const language = String(exercise.language || 'python').toLowerCase();
  const expected = exercise.expectedOutput ?? null;

  if (language === 'javascript' || language === 'js') {
    const logs = [];
    const fakeConsole = { log: (...args) => logs.push(args.join(' ')) };
    try {
      new Function('print', 'console', code)((...args) => logs.push(args.join(' ')), fakeConsole);
      const ok = showRun(output, { text: logs.join('\n'), expected, revealCorrectness: state.mode !== 'test' });
      state.codeResults[exercise.id] = { answered: true, correct: expected == null ? true : ok === true, graded: expected != null };
      updateSessionProgress();
      if (state.mode === 'learn') maybeAutoCompleteSet();
    } catch (error) {
      showRun(output, { text: logs.join('\n'), error: `${error.name}: ${error.message}`, revealCorrectness: state.mode !== 'test' });
      state.codeResults[exercise.id] = { answered: true, correct: false, graded: true };
      updateSessionProgress();
      if (state.mode === 'learn') maybeAutoCompleteSet();
    }
    window.studyUX?.save();
    return;
  }

  try {
    const py = await loadPyodideOnce();
    py.globals.set('__study_input__', String(exercise.testInput || ''));
    py.globals.set('__study_code__', code);
    await py.runPythonAsync(PY_WRAPPER);
    const text = String(py.globals.get('__study_out__') ?? '');
    const error = String(py.globals.get('__study_err__') ?? '');
    const line = py.globals.get('__study_line__');
    const ok = showRun(output, { text, error, errorLine: line ?? null, expected, revealCorrectness: state.mode !== 'test' });
    state.codeResults[exercise.id] = { answered: true, correct: error ? false : (expected == null ? true : ok === true), graded: expected != null };
    updateSessionProgress();
    if (state.mode === 'learn') maybeAutoCompleteSet();
    window.studyUX?.save();
  } catch (error) {
    output.className = 'output bad';
    output.textContent = `Nepodařilo se spustit Python: ${error.message}\n\nZkontroluj připojení k internetu a zkus to znovu.`;
  }
}

$('themeToggle').addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'));
$('exerciseSearch').addEventListener('input', () => {
  state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.codeResults = {}; state.currentStats = null;
  renderExercises();
});
$('showAnswers').addEventListener('click', () => { state.answerVisible = true; document.querySelectorAll('details.solution-box').forEach((d) => { d.open = true; }); });
$('hideAnswers').addEventListener('click', () => { state.answerVisible = false; document.querySelectorAll('details.solution-box').forEach((d) => { d.open = false; }); });
$('modeLearn').addEventListener('click', () => setStudyMode('learn'));
$('modeTest').addEventListener('click', () => setStudyMode('test'));
$('finishSet').addEventListener('click', finishCurrentSet);
$('generateTasks').addEventListener('click', () => generateExercises(6));
$('filterSubject').addEventListener('change', () => { $('filterTopic').value = 'all'; $('filterSubtopic').value = 'all'; $('filterDifficulty').value = 'all'; state.generatedExercises = []; state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); maybeCloseSettingsPanel(); });
$('filterTopic').addEventListener('change', () => { $('filterSubtopic').value = 'all'; state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); maybeCloseSettingsPanel(); });
$('filterSubtopic').addEventListener('change', () => { state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); maybeCloseSettingsPanel(); });
$('filterType').addEventListener('change', () => { state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); maybeCloseSettingsPanel(); });
$('filterDifficulty').addEventListener('change', () => { state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); maybeCloseSettingsPanel(); });
$('sessionSize').addEventListener('change', () => { state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; createSession(true); renderExercises(); });
$('newSession').addEventListener('click', () => { state.results = {}; state.currentStats = null; createSession(true); renderExercises(); toast('Nová náhodná sada byla vylosována.'); window.scrollTo({top: 0, behavior: 'smooth'}); });
$('homeBtn').addEventListener('click', openHome);
$('brandHome').addEventListener('click', openHome);
$('brandHome').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openHome(); } });
$('continueBtn').addEventListener('click', () => window.studyUX?.resume());
$('resetProgress').addEventListener('click', () => {
  document.querySelectorAll('.answer-input').forEach((field) => {
    const codeId = field.dataset.code;
    field.value = codeId ? (findExercise(codeId)?.starterCode || '') : '';
  });
  document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((field) => { field.checked = false; });
  document.querySelectorAll('[data-order-selected]').forEach((target) => {
    target.innerHTML = '<span class="order-empty">Zatím nic nevybráno.</span>';
  });
  document.querySelectorAll('.order-pick').forEach((btn) => btn.classList.remove('used'));
  document.querySelectorAll('[data-match-left]').forEach((select) => { select.value = ''; });
  document.querySelectorAll('.classification-item').forEach((row) => {
    row.dataset.selectedCategory = '';
    row.querySelectorAll('.classification-pick').forEach((btn) => btn.classList.remove('active'));
  });
  document.querySelectorAll('.output').forEach((out) => {
    out.className = 'output';
    out.textContent = state.mode === 'test' ? 'Odpověď zatím není zaznamenána.' : 'Výstup / kontrola se objeví zde.';
  });
  document.querySelectorAll('details.solution-box').forEach((d) => { d.open = false; });
  state.answerVisible = false;
  state.results = {};
  state.codeResults = {};
  clearCurrentStats();
  updateSessionProgress();
  updateMobileCheckBar();
  toast('Odpovědi byly vymazány.');
});

document.addEventListener('focusin', (event) => setActiveExerciseFromTarget(event.target));
document.addEventListener('click', (event) => setActiveExerciseFromTarget(event.target));
$('mobileCheckButton').addEventListener('click', () => {
  const active = activeExerciseElement?.isConnected ? activeExerciseElement : document.querySelector('#exercises .exercise');
  const action = checkActionForExercise(active);
  if (action) action.click();
});

syncSettingsPanelForViewport();
window.addEventListener('resize', () => { syncSettingsPanelForViewport(); updateMobileCheckBar(); });
setupEnterShortcut();
setupCodeTabShortcut();

initTheme();
state.exercises = normalizeExercises(state.exercises);
validateExercises(state.exercises);
renderHome();
renderExercises();
updateModeUI();
openHome();
