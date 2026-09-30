// Runtime data are loaded by index.html from data/. Keep app.js independent from file paths.
const state = {
  exercises: [
    ...(Array.isArray(window.EXERCISES) ? window.EXERCISES : []),
    ...(Array.isArray(window.NETWORK_EXERCISES) ? window.NETWORK_EXERCISES : []),
    ...(Array.isArray(window.LITERATURE_EXERCISES) ? window.LITERATURE_EXERCISES : []),
    ...(Array.isArray(window.DIGITAL_TECHNICS_EXERCISES) ? window.DIGITAL_TECHNICS_EXERCISES : []),
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
  if (e.type === 'order') return 3;
  if (e.type === 'multi') return 3;
  return 2;
}

function difficultyText(value) {
  return DIFFICULTY_LABELS[Number(value)] || 'Neuvedená';
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

    const quickCheck = exercise.querySelector('[data-action="check-choice"], [data-action="check-multi"], [data-action="check-match"], [data-action="check-order"], [data-action="check-conversion"]');
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
    subject: e.subject || '',
    topic: e.topic || '',
    subtopic: e.subtopic || '',
    tags: Array.isArray(e.tags) ? e.tags : [],
    answers: Array.isArray(e.answers) ? e.answers : [],
    pairs: Array.isArray(e.pairs) ? e.pairs : [],
    order: Array.isArray(e.order) ? e.order : [],
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
  const types = ['choice', 'multi', 'match', 'order', 'text', 'code', 'fill', 'number', 'conversion'];
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

function renderHome() {
  const subjects = unique(state.exercises.map(e => e.subject));
  const topics = unique(state.exercises.map(e => e.topic));
  $('homeExercises').textContent = state.exercises.length;
  $('homeSubjects').textContent = subjects.length;
  $('homeTopics').textContent = topics.length;

  const icons = ['◈', '⌘', '✦', '▦', '∑', '◌'];
  $('subjectCards').innerHTML = subjects.length ? subjects.map((subject, i) => {
    const items = state.exercises.filter(e => e.subject === subject);
    const topicCount = unique(items.map(e => e.topic)).length;
    const label = topicCount === 1 ? 'téma' : 'témata';
    return `<button class="card" data-subject="${esc(subject)}" style="text-align:left">
      <div class="card-icon">${icons[i % icons.length]}</div>
      <h3>${esc(subject)}</h3>
      <p>Procvičování podle materiálů pro tento předmět.</p>
      <div class="card-meta">${items.length} úloh · ${topicCount} ${label}</div>
    </button>`;
  }).join('') : '<div class="empty">Zatím nejsou přidané žádné úlohy.</div>';

  document.querySelectorAll('[data-subject]').forEach(card => {
    card.addEventListener('click', () => openStudy(card.dataset.subject, 'all'));
  });
}

function openStudy(subject = 'all', topic = 'all') {
  state.view = 'study';
  $('homeView').classList.add('hidden');
  $('studyView').classList.remove('hidden');
  $('homeBtn').classList.remove('hidden');
  $('resetProgress').classList.remove('hidden');
  if (subject !== 'all' && topic === 'all') {
    const subTopics = unique(state.exercises.filter(e => e.subject === subject).map(e => e.topic));
    if (subTopics.length === 1) topic = subTopics[0];
  }
  $('filterSubject').value = subject;
  $('filterTopic').value = topic;
  $('filterSubtopic').value = 'all';
  renderExercises();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function openHome() {
  state.view = 'home';
  $('studyView').classList.add('hidden');
  $('homeView').classList.remove('hidden');
  $('homeBtn').classList.add('hidden');
  $('resetProgress').classList.add('hidden');
  window.scrollTo({top: 0, behavior: 'smooth'});
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

  if (selectedSubject !== 'all' && selectedTopic !== 'all') {
    $('exerciseTitle').textContent = `${selectedSubject} – ${selectedTopic}`;
  } else if (selectedSubject !== 'all') {
    $('exerciseTitle').textContent = selectedSubject;
  } else {
    $('exerciseTitle').textContent = window.EXERCISE_SET_TITLE || 'Procvičování';
  }
  $('exerciseMeta').textContent = `${active.length} ${active.length === 1 ? 'úloha' : 'úloh'}${activeTopics.length ? ' · ' + activeTopics.join(', ') : ''}`;
  $('crumbSubject').textContent = selectedSubject === 'all' ? 'Všechny předměty' : selectedSubject;
  $('crumbTopic').textContent = selectedTopic === 'all' ? 'Všechna témata' : selectedTopic;

  const setOptions = (el, title, values, current) => {
    el.innerHTML = `<option value="all">${title}</option>` + values.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
    if (values.includes(current)) el.value = current; else el.value = 'all';
  };
  setOptions($('filterSubject'), 'Všechny předměty', subjects, selectedSubject);
  setOptions($('filterTopic'), 'Všechna témata', topics, selectedTopic);
  setOptions($('filterSubtopic'), 'Všechna podtémata', subtopics, selectedSubtopic);

  const generatedVisible = canGenerateDigitalTasks();
  $('generateTasks').classList.toggle('hidden', !generatedVisible);
}

function allCatalogExercises() {
  return [...state.exercises, ...state.generatedExercises];
}

function canGenerateDigitalTasks() {
  const subject = $('filterSubject')?.value || 'all';
  const type = $('filterType')?.value || 'all';
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
  } else {
    if (e.answer) {
      const label = ['choice', 'number', 'fill'].includes(e.type) ? 'Správná odpověď' : 'Řešení';
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
        <div class="small">Klikni na položky v pořadí, v jakém mají být.</div>
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
    inner = `
      <textarea class="answer-input code" spellcheck="false" data-code="${id}">${esc(e.starterCode)}</textarea>
      <div class="row" style="margin-top:10px">
        <button class="primary" data-action="run-code" data-id="${id}">▶ Spustit kód</button>
        <button data-action="clear-code" data-id="${id}">Vymazat</button>
      </div>
      <div class="output" data-out="${id}">Výstup programu se objeví zde.</div>`;
  } else if (e.type === 'number' || e.type === 'fill') {
    inner = `
      <input class="answer-input" data-answer="${id}" placeholder="${e.type === 'number' ? 'Napiš číslo…' : 'Doplň odpověď…'}" />
      <div class="row" style="margin-top:10px">
        <button data-action="check-short" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : 'Zkontrolovat'}</button>
      </div>
      <div class="output" data-out="${id}">Napiš odpověď a zkontroluj.</div>`;
  } else {
    const isPersonality = e.topic === 'Osobnosti';
    inner = `
      <textarea class="answer-input" data-answer="${id}" placeholder="Napiš svoji odpověď…"></textarea>
      <div class="row" style="margin-top:10px">
        <button data-action="${isPersonality ? 'check-personality' : 'show-self-check'}" data-id="${id}">${state.mode === 'test' ? 'Zaznamenat odpověď' : (isPersonality ? 'Zkontrolovat' : 'Zkontrolovat odpověď')}</button>
      </div>
      <div class="output" data-out="${id}">${isPersonality ? 'Napiš odpověď a zkontroluj.' : 'Řešení je zatím skryté.'}</div>`;
  }

  const hint = e.hint
    ? `<details><summary class="hint">Nápověda</summary><div class="small" style="margin-top:7px">${rich(e.hint)}</div></details>`
    : '';

  const category = [e.subject, e.topic, e.subtopic].filter(Boolean);
  const extraTags = e.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('');
  const difficultyTag = `<span class="tag difficulty-tag difficulty-${Number(e.difficulty)}">${esc(difficultyText(e.difficulty))}</span>`;
  const tags = `<div class="tags">${difficultyTag}${extraTags}</div>`;

  const typeLabels = {choice:'Výběr', multi:'Více správných', match:'Párování', order:'Řazení', text:'Text', code:'Kód', fill:'Doplňování', number:'Výpočet', conversion:'Převod soustavy'};
  return `<article class="exercise" data-type="${esc(e.type)}">
    <div class="exercise-head">
      <div>
        <div class="exercise-number">Úloha ${index + 1}${category.length ? ' · ' + esc(category.join(' › ')) : ''}</div>
        ${tags}
      </div>
      <span class="tag type-tag">${esc(typeLabels[e.type] || e.type)}</span>
    </div>
    <div class="exercise-body">
      <div class="question">${rich(e.question)}</div>
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
  ].join('|');
}

function baseFilteredExercises() {
  const filterSubject = $('filterSubject').value;
  const filterTopic = $('filterTopic').value;
  const filterSubtopic = $('filterSubtopic').value;
  const filter = $('filterType').value;
  const difficulty = $('filterDifficulty').value;
  return baseCatalogExercises().filter(e =>
    (filterSubject === 'all' || e.subject === filterSubject) &&
    (filterTopic === 'all' || e.topic === filterTopic) &&
    (filterSubtopic === 'all' || e.subtopic === filterSubtopic) &&
    (filter === 'all' || e.type === filter) &&
    (difficulty === 'all' || String(e.difficulty) === String(difficulty))
  );
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

  // Nikdy neupravuj zdrojové e.choices – vytvoř kopii a tu promíchej.
  // Správná odpověď navíc nesmí zůstat na první pozici, aby otázky
  // nebyly řešitelné pouhým výběrem první možnosti. Ostatní pořadí
  // je stále náhodné při každém novém vykreslení úlohy.
  const shuffled = shuffle(e.choices);
  if (shuffled.length > 1) {
    const answer = String(e.answer ?? '').trim();
    if (String(shuffled[0]).trim() === answer) {
      const swapIndex = 1 + Math.floor(Math.random() * (shuffled.length - 1));
      [shuffled[0], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[0]];
    }
  }
  return shuffled;
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

function generateDigitalExercises(count = 6) {
  if (!canGenerateDigitalTasks()) {
    toast('Generované úlohy jsou dostupné v Číslicové technice při filtru Výpočtu nebo Převodu soustavy.');
    return;
  }
  state.generatedExercises = [];
  const existing = new Set(baseFilteredExercises().map(e => `${e.type}|${e.question}`));
  for (let i = 0; i < count; i++) {
    let candidate;
    let attempts = 0;
    do { candidate = generatedCtExercise(); attempts += 1; }
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
  if (e.type === 'choice') {
    const selected = document.querySelector(`input[name="choice-${id}"]:checked`)?.value;
    return { answered: Boolean(selected), correct: Boolean(selected) && String(selected).trim() === String(e.answer).trim(), graded: true };
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
  if (e.type === 'text') return { answered: Boolean(answer), correct: null, graded: false };
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
  if (state.mode === 'learn') maybeAutoCompleteSet();
}

function renderNeutralFeedback(out, answered = true) {
  if (!out) return;
  out.className = 'output';
  out.textContent = answered ? '✓ Odpověď zaznamenána. Výsledek uvidíš až po dokončení sady.' : 'Odpověď zatím není vyplněná.';
}

function maybeAutoCompleteSet() {
  const session = currentSessionElements();
  if (!session.length) return;
  const complete = session.every(e => state.results[e.id]?.answered);
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

function renderStatsPanel(stats) {
  $('statsPanel')?.remove();
  const topics = Object.entries(stats.byTopic);
  const score = stats.percent == null ? '—' : `${stats.percent} %`;
  const topicRows = topics.map(([topic, s]) => {
    const pct = s.graded ? `${Math.round((s.correct / s.graded) * 100)} %` : '—';
    const self = s.selfChecks ? ` · ${s.selfChecks} self-check` : '';
    return `<div class="stats-topic-row"><span>${esc(topic)}</span><strong>${s.correct}/${s.graded} · ${pct}</strong><small>${s.answered}/${s.total} zodpovězeno${self}</small></div>`;
  }).join('');
  const panel = document.createElement('section');
  panel.id = 'statsPanel';
  panel.className = 'set-stats';
  panel.innerHTML = `
    <div class="set-stats-head"><div><span class="eyebrow">Výsledek sady</span><h3>${score}</h3><p>${stats.correct} z ${stats.graded} hodnocených úloh správně · ${stats.answered}/${stats.total} zodpovězeno${stats.selfChecks ? ` · ${stats.selfChecks} otevřený self-check` : ''}</p></div><span class="set-stats-mode">${stats.mode === 'test' ? 'Test' : 'Učení'}</span></div>
    <div class="stats-topic-list">${topicRows || '<div class="small">Tato sada nemá hodnotitelné úlohy.</div>'}</div>
    <div class="stats-local-note">📱 Statistika této sady se ukládá pouze lokálně v tomto prohlížeči.</div>`;
  $('exercises').appendChild(panel);
}

function completeCurrentSet() {
  const stats = buildSetStats();
  state.currentStats = stats;
  saveLocalSetStats(stats);
  renderStatsPanel(stats);
}

function finishCurrentTest() {
  const session = currentSessionElements();
  if (!session.length) return;
  state.results = {};
  for (const e of session) {
    state.results[e.id] = { ...readExerciseResponse(e), timestamp: Date.now() };
  }
  completeCurrentSet();
  toast('Sada byla vyhodnocena.');
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
  $('finishTest').classList.toggle('hidden', !isTest);
  $('showAnswers').classList.toggle('hidden', isTest);
  $('hideAnswers').classList.toggle('hidden', isTest);
  $('generateTasks').classList.toggle('hidden', !canGenerateDigitalTasks());
}

function renderExercises() {
  activeExerciseElement = null;
  renderHeader();
  const pool = baseFilteredExercises();
  if (!pool.length) {
    state.sessionIds = [];
    $('exercises').innerHTML = '<div class="empty">Pro tento filtr tu nejsou žádné úlohy.</div>';
    $('poolInfo').textContent = 'Pool je prázdný.';
    return;
  }

  if (state.sessionKey !== currentFilterKey() || !state.sessionIds.length) {
    createSession(false);
  }

  const filtered = sessionExercises();

  const generatedCount = filtered.filter(e => e.generated).length;
  $('poolInfo').textContent = `Pool: ${pool.length} úloh${generatedCount ? ` · z toho ${generatedCount} generovaných v této sadě` : ''} · tato sada: ${filtered.length} · ${state.mode === 'test' ? 'výsledek až po dokončení.' : 'průběžná kontrola je zapnutá.'}`;

  // Upozornění Osobnosti se generuje při každém renderu modulu, takže se neztratí po návratu.
  const isPersonalityModule = pool.length > 0 && pool.every(e => e.topic === 'Osobnosti');
  const personalityNotice = isPersonalityModule
    ? `<div class="output" style="margin-bottom:16px">⚠️ <strong>Pozor:</strong> U osobností napiš správné jméno a příjmení. <strong>Velká a malá písmena se nerozlišují</strong> — např. „Tim Berners-Lee“, „tim berners-lee“ nebo „tIm BeRnErS-lEe“ jsou stejné.</div>`
    : '';

  $('exercises').innerHTML = personalityNotice + filtered.map((e, i) => renderExercise(e, i)).join('');
  attachExerciseEvents();
  if (state.currentStats) renderStatsPanel(state.currentStats);
  updateModeUI();
}

function findExercise(id) {
  return state.exercises.find(e => String(e.id) === String(id));
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
        const expected = String(e.answer ?? '').trim();
        const numeric = e.type === 'number' && answer !== '' && expected !== '' &&
          Number(answer.replace(',', '.')) === Number(expected.replace(',', '.'));
        const correct = e.type === 'number' ? numeric : answer.toLowerCase() === expected.toLowerCase();
        out.className = `output ${correct ? 'ok' : 'bad'}`;
        out.textContent = correct
          ? '✓ Správně.'
          : `✗ Zatím ne.

Správná odpověď: ${expected}`;
        return;
      }

      if (button.dataset.action === 'check-personality') {
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
      if (state.mode === 'learn') maybeAutoCompleteSet();
    } catch (error) {
      showRun(output, { text: logs.join('\n'), error: `${error.name}: ${error.message}`, revealCorrectness: state.mode !== 'test' });
      state.codeResults[exercise.id] = { answered: true, correct: false, graded: true };
      if (state.mode === 'learn') maybeAutoCompleteSet();
    }
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
    if (state.mode === 'learn') maybeAutoCompleteSet();
  } catch (error) {
    output.className = 'output bad';
    output.textContent = `Nepodařilo se spustit Python: ${error.message}\n\nZkontroluj připojení k internetu a zkus to znovu.`;
  }
}

$('showAnswers').addEventListener('click', () => { state.answerVisible = true; document.querySelectorAll('details.solution-box').forEach((d) => { d.open = true; }); });
$('hideAnswers').addEventListener('click', () => { state.answerVisible = false; document.querySelectorAll('details.solution-box').forEach((d) => { d.open = false; }); });
$('modeLearn').addEventListener('click', () => setStudyMode('learn'));
$('modeTest').addEventListener('click', () => setStudyMode('test'));
$('finishTest').addEventListener('click', finishCurrentTest);
$('generateTasks').addEventListener('click', () => generateDigitalExercises(6));
$('filterSubject').addEventListener('change', () => { $('filterTopic').value = 'all'; $('filterSubtopic').value = 'all'; $('filterDifficulty').value = 'all'; state.generatedExercises = []; state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); });
$('filterTopic').addEventListener('change', () => { $('filterSubtopic').value = 'all'; state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); });
$('filterSubtopic').addEventListener('change', () => { state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); });
$('filterType').addEventListener('change', () => { state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); });
$('filterDifficulty').addEventListener('change', () => { state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; renderExercises(); });
$('sessionSize').addEventListener('change', () => { state.sessionIds = []; state.sessionKey = ''; state.results = {}; state.currentStats = null; createSession(true); renderExercises(); });
$('newSession').addEventListener('click', () => { state.results = {}; state.currentStats = null; createSession(true); renderExercises(); toast('Nová náhodná sada byla vylosována.'); window.scrollTo({top: 0, behavior: 'smooth'}); });
$('homeBtn').addEventListener('click', openHome);
$('brandHome').addEventListener('click', openHome);
$('brandHome').addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openHome(); } });
$('continueBtn').addEventListener('click', () => openStudy('all', 'all'));
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
  document.querySelectorAll('.output').forEach((out) => {
    out.className = 'output';
    out.textContent = state.mode === 'test' ? 'Odpověď zatím není zaznamenána.' : 'Výstup / kontrola se objeví zde.';
  });
  document.querySelectorAll('details.solution-box').forEach((d) => { d.open = false; });
  state.answerVisible = false;
  state.results = {};
  state.codeResults = {};
  clearCurrentStats();
  toast('Odpovědi byly vymazány.');
});

setupEnterShortcut();

state.exercises = normalizeExercises(state.exercises);
validateExercises(state.exercises);
renderHome();
renderExercises();
updateModeUI();
openHome();
