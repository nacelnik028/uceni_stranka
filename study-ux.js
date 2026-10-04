// Mobilní navigace a osobní rozpracovaná sada. Vše zůstává v prohlížeči.
(() => {
  const draftKey = 'procvicovna-draft:v1';
  const layoutKey = 'procvicovna-layout:v1';
  const outcomesKey = 'procvicovna-outcomes:v1';
  let position = 0;
  let restoring = false;
  let saveTimer;
  const filterIds = ['filterSubject', 'filterTopic', 'filterSubtopic', 'filterType', 'filterDifficulty', 'exerciseSearch', 'sessionSize'];
  const revisedIds = new Set(['db-030', 'lit-gotika-002', 'lit-renesance-007', 'lit-baroko-004', 'lit-rom-francie-012', 'lit-renesance-var-003', 'pg-check-001', 'lit-rom-francie-014', 'lit-rom-francie-015', 'lit-rom-francie-var-004']);
  function signature(exercise) {
    return JSON.stringify(['type', 'question', 'scenario', 'choices', 'answer', 'answers', 'answerIds', 'pairs', 'order', 'items', 'criteria', 'categories', 'value', 'fromBase', 'toBase', 'starterCode', 'expectedOutput'].map(key => exercise?.[key] ?? null));
  }
  const cards = () => [...document.querySelectorAll('#exercises .exercise')];
  function read(key, fallback) {
    try { return JSON.parse(getStorage().getItem(key) || 'null') ?? fallback; } catch { return fallback; }
  }
  function write(key, value) {
    try { getStorage().setItem(key, JSON.stringify(value)); } catch { /* Používání webu funguje i bez úložiště. */ }
  }
  function savedDraft() {
    const draft = read(draftKey, null);
    return draft && Array.isArray(draft.ids) && draft.ids.length && draft.filters && draft.responses ? draft : null;
  }
  function failedIds() {
    const available = new Set(state.exercises.map(e => e.id));
    const stats = read('procvicovna-set-stats:v1', []);
    const previous = Array.isArray(stats) ? stats.flatMap(stat => stat.failedIds || []) : [];
    const outcomes = read(outcomesKey, {});
    const ids = new Set(previous);
    for (const [id, correct] of Object.entries(outcomes)) correct ? ids.delete(id) : ids.add(id);
    return [...ids].filter(id => available.has(id));
  }
  function updateHome() {
    const draft = savedDraft();
    $('continueBtn').disabled = !draft;
    $('continueBtn').classList.toggle('hidden', !draft);
    $('continueBtn').classList.toggle('primary', Boolean(draft));
    $('quickPractice').classList.toggle('primary', !draft);
    $('startPanelLabel').textContent = draft ? 'Navázat tam, kde jsi skončil/a' : 'Začni malou sadou';
    $('continueBtn').textContent = draft ? `Pokračovat v sadě · ${draft.ids.length} otázek` : 'Pokračovat v sadě';
    const failed = failedIds();
    $('quickErrors').disabled = !failed.length;
    $('quickErrors').classList.toggle('hidden', !failed.length);
    $('quickErrors').textContent = failed.length ? `Procvičit chyby · ${failed.length}` : 'Procvičit chyby';
    $('resumeHint').textContent = draft
      ? `Rozpracovaná sada: ${draft.filters.filterSubject === 'all' ? 'všechny předměty' : draft.filters.filterSubject}. Uloženo v tomto prohlížeči.`
      : 'Pět náhodných otázek napříč předměty. Sada se uloží v tomto prohlížeči.';
  }
  function applyLayout(focus = false) {
    const exercises = cards();
    position = Math.max(0, Math.min(position, exercises.length - 1));
    const single = $('questionLayout').value === 'single';
    exercises.forEach((exercise, index) => exercise.classList.toggle('question-hidden', single && index !== position));
    $('questionPager').classList.toggle('hidden', !single || !exercises.length);
    $('questionPosition').textContent = `Otázka ${exercises.length ? position + 1 : 0} z ${exercises.length}`;
    $('previousQuestion').disabled = position === 0;
    $('nextQuestion').disabled = position >= exercises.length - 1;
    if (single) activeExerciseElement = exercises[position] || null;
    else if (activeExerciseElement?.classList.contains('question-hidden')) activeExerciseElement = exercises[0] || null;
    updateMobileCheckBar();
    if (focus && exercises[position]) {
      const question = exercises[position].querySelector('.question');
      question.setAttribute('tabindex', '-1');
      question.focus({ preventScroll: true });
      $('questionPager').scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }
  function captureResponses() {
    return Object.fromEntries(cards().map(exercise => [exercise.dataset.exerciseId, {
      signature: signature(findExercise(exercise.dataset.exerciseId)),
      fields: [...exercise.querySelectorAll('input,textarea,select')].map(field => ({
        name: field.name, type: field.type, match: field.dataset.matchLeft,
        answer: field.dataset.answer, code: field.dataset.code,
        value: field.value, checked: field.checked
      })),
      order: [...exercise.querySelectorAll('.order-chip')].map(chip => chip.dataset.orderValue),
      categories: [...exercise.querySelectorAll('.classification-item')].map(item => ({ id: item.dataset.classificationItem, category: item.dataset.selectedCategory })),
      output: exercise.querySelector('[data-out]')?.textContent,
      outputClass: exercise.querySelector('[data-out]')?.className,
      solutionOpen: Boolean(exercise.querySelector('.solution-box')?.open)
    }]));
  }
  function save() {
    if (restoring || state.view !== 'study' || !state.sessionIds.length) return;
    const outcomes = read(outcomesKey, {});
    for (const [id, result] of Object.entries({ ...state.results, ...state.codeResults })) {
      if (result.answered && result.graded) outcomes[id] = result.correct === true;
    }
    write(outcomesKey, outcomes);
    if (state.currentStats && (state.mode === 'test' || state.currentStats.answered === state.currentStats.total)) {
      try { getStorage().removeItem(draftKey); } catch { /* best effort */ }
    } else {
      write(draftKey, { ids: state.sessionIds, filters: Object.fromEntries(filterIds.map(id => [id, $(id).value])),
        mode: state.mode, position, responses: captureResponses(), results: state.results,
        codeResults: state.codeResults, generated: state.generatedExercises, statsVisible: Boolean(state.currentStats) });
    }
    updateHome();
  }
  function restoreResponses(responses) {
    const restoredIds = new Set();
    for (const exercise of cards()) {
      const response = responses[exercise.dataset.exerciseId];
      if (!response) continue;
      // Nové zadání nesmí zdědit starou odpověď ani staré hodnocení.
      if (response.signature ? response.signature !== signature(findExercise(exercise.dataset.exerciseId)) : revisedIds.has(exercise.dataset.exerciseId)) continue;
      restoredIds.add(exercise.dataset.exerciseId);
      for (const field of exercise.querySelectorAll('input,textarea,select')) {
        const saved = (response.fields || []).find(item =>
          field.name ? item.name === field.name && item.value === field.value :
          field.dataset.matchLeft !== undefined ? item.match === field.dataset.matchLeft :
          field.dataset.code !== undefined ? item.code === field.dataset.code : item.answer === field.dataset.answer);
        if (!saved) continue;
        if (field.type === 'radio' || field.type === 'checkbox') field.checked = Boolean(saved.checked);
        else field.value = saved.value;
      }
      for (const value of response.order || []) {
        [...exercise.querySelectorAll('[data-order-pick]')].find(button => button.dataset.orderValue === value)?.click();
      }
      for (const item of response.categories || []) {
        [...exercise.querySelectorAll('[data-classification-category]')].find(button => button.dataset.classificationItem === item.id && button.dataset.classificationCategory === item.category)?.click();
      }
      const output = exercise.querySelector('[data-out]');
      if (output && typeof response.output === 'string') {
        output.textContent = response.output;
        output.className = ['output', 'output ok', 'output bad'].includes(response.outputClass) ? response.outputClass : 'output';
      }
      const solution = exercise.querySelector('.solution-box');
      if (solution) solution.open = state.mode === 'learn' && Boolean(response.solutionOpen);
    }
    syncCodeEditors();
    return restoredIds;
  }
  function resume() {
    const draft = savedDraft();
    if (!draft) return;
    restoring = true;
    try {
      state.generatedExercises = Array.isArray(draft.generated) ? draft.generated.filter(e => e.generated === true) : [];
      for (const id of filterIds) $(id).value = draft.filters[id] || (id === 'exerciseSearch' ? '' : 'all');
      renderHeader();
      $('filterTopic').value = draft.filters.filterTopic;
      renderHeader();
      $('filterSubtopic').value = draft.filters.filterSubtopic;
      const available = new Set(baseFilteredExercises().map(e => e.id));
      state.sessionIds = draft.ids.filter(id => available.has(id));
      if (!state.sessionIds.length) { toast('Otázky z uložené sady už nejsou dostupné. Vyber novou sadu.'); return; }
      state.sessionKey = currentFilterKey();
      state.results = {};
      state.codeResults = {};
      state.currentStats = null;
      state.mode = draft.mode === 'test' ? 'test' : 'learn';
      state.answerVisible = false;
      position = Number.isInteger(draft.position) ? draft.position : 0;
      openStudy($('filterSubject').value, $('filterTopic').value, true);
      $('filterSubtopic').value = draft.filters.filterSubtopic;
      state.sessionKey = currentFilterKey();
      const restoredIds = restoreResponses(draft.responses);
      state.results = Object.fromEntries(Object.entries(draft.results || {}).filter(([id]) => restoredIds.has(id)));
      state.codeResults = Object.fromEntries(Object.entries(draft.codeResults || {}).filter(([id]) => restoredIds.has(id)));
      if (draft.statsVisible) { state.currentStats = buildSetStats(); renderStatsPanel(state.currentStats); }
      applyLayout();
      updateSessionProgress();
      updateModeUI();
      toast(restoredIds.size < state.sessionIds.length ? 'Sada byla obnovena. Změněné otázky je potřeba zodpovědět znovu.' : 'Rozpracovaná sada byla obnovena.');
    } finally { restoring = false; }
    save();
  }
  function start(subject = 'all', topic = 'all', size = 'all', ids = null) {
    save();
    state.generatedExercises = [];
    state.results = {};
    state.codeResults = {};
    state.currentStats = null;
    state.answerVisible = false;
    state.mode = 'learn';
    position = 0;
    for (const id of filterIds) $(id).value = id === 'filterSubject' ? subject : id === 'sessionSize' ? size : id === 'exerciseSearch' ? '' : 'all';
    renderHeader();
    $('filterTopic').value = topic;
    state.sessionIds = ids || [];
    state.sessionKey = ids ? currentFilterKey() : '';
    openStudy(subject, topic);
    updateModeUI();
  }
  function openTopics(subject) {
    save();
    state.view = 'topics';
    for (const id of ['homeView', 'studyView', 'guidesView']) $(id).classList.add('hidden');
    $('topicsView').classList.remove('hidden');
    $('homeBtn').classList.remove('hidden');
    $('resetProgress').classList.add('hidden');
    $('topicsHeading').textContent = subject;
    $('topicsDescription').textContent = subjectDescription(subject);
    const items = state.exercises.filter(e => e.subject === subject);
    const topics = ['all', ...unique(items.map(e => e.topic))];
    $('topicCards').innerHTML = topics.map(topic => {
      const pool = topic === 'all' ? items : items.filter(e => e.topic === topic);
      const details = unique(pool.map(e => e.subtopic)).slice(0, 3).join(' · ');
      return `<button type="button" class="card" data-subject="${esc(subject)}" data-topic="${esc(topic)}"><h3>${esc(topic === 'all' ? 'Všechna témata' : topic)}</h3><p>${esc(details)}</p><div class="card-meta">${pool.length} úloh · začít procvičovat →</div></button>`;
    }).join('');
    $('topicCards').querySelectorAll('[data-topic]').forEach(button => button.addEventListener('click', () => start(subject, button.dataset.topic)));
    updateMobileCheckBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('topicsHeading').focus({ preventScroll: true });
  }
  window.studyUX = { openTopics, resume, save, updateHome, resetPosition: () => { position = 0; }, onRender: () => { applyLayout(); save(); } };
  const storedLayout = read(layoutKey, null);
  $('questionLayout').value = storedLayout === 'list' || storedLayout === 'single' ? storedLayout : window.matchMedia('(max-width:760px)').matches ? 'single' : 'list';
  $('questionLayout').addEventListener('change', () => { write(layoutKey, $('questionLayout').value); applyLayout(); save(); });
  $('previousQuestion').addEventListener('click', () => { position--; applyLayout(true); save(); });
  $('nextQuestion').addEventListener('click', () => { position++; applyLayout(true); save(); });
  $('quickPractice').addEventListener('click', () => start('all', 'all', '5'));
  $('quickErrors').addEventListener('click', () => { const ids = failedIds(); if (ids.length) start('all', 'all', 'all', ids); });
  function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(save, 150); }
  for (const event of ['input', 'change']) document.addEventListener(event, e => {
    const exercise = e.target.closest?.('#exercises .exercise');
    if (exercise && !restoring) {
      delete state.results[exercise.dataset.exerciseId];
      delete state.codeResults[exercise.dataset.exerciseId];
      clearCurrentStats();
      updateSessionProgress();
    }
    scheduleSave();
  });
  document.addEventListener('click', e => {
    if (restoring) return;
    const mutation = e.target.closest?.('[data-order-pick],[data-order-remove],[data-classification-category],[data-action^="reset-"],[data-action="clear-code"]');
    const exercise = mutation?.closest('.exercise');
    if (exercise) {
      delete state.results[exercise.dataset.exerciseId];
      delete state.codeResults[exercise.dataset.exerciseId];
      clearCurrentStats();
      queueMicrotask(updateSessionProgress);
    }
    scheduleSave();
  }, true);
  window.addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(); });
  applyLayout();
  updateHome();
})();
