// Tento modul používá existující navigaci a filtry aplikace. Data jsou statická.
(() => {
  const guides = Array.isArray(window.STUDY_GUIDES) ? window.STUDY_GUIDES : [];
  let returnToSession = false;
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const guideExercises = guide => state.exercises.filter(e => e.subject === guide.subject && e.topic === guide.topic);

  function renderCatalog() {
    const subject = $('guideSubject').value;
    const query = normalize($('guideSearch').value.trim());
    const filtered = guides.filter(guide => (subject === 'all' || guide.subject === subject) &&
      normalize([guide.subject, guide.topic, guide.title, guide.intro, guide.mistake,
        ...guide.sections.flatMap(section => [section.title, section.text || '', section.code || '', ...(section.points || [])])].join(' ')).includes(query));
    $('guideCount').textContent = `Zobrazeno ${filtered.length} z ${guides.length} přehledů`;
    $('guideCards').innerHTML = filtered.length ? filtered.map(guide => `
      <button type="button" class="guide-card" data-guide="${esc(guide.id)}">
        <span class="guide-meta">${esc(guide.subject)} · ${guide.minutes} min čtení</span>
        <strong>${esc(guide.title)}</strong><p>${esc(guide.intro)}</p>
        <span class="guide-read">Přečíst přehled →</span>
      </button>`).join('') : '<div class="empty">Žádný přehled neodpovídá výběru. Zkus jiný výraz nebo všechny předměty.</div>';
  }

  function showCatalog() {
    $('guideCatalog').classList.remove('hidden');
    $('guideDetail').classList.add('hidden');
    renderCatalog();
  }

  function openGuides(subject = 'all') {
    window.studyUX?.save();
    returnToSession = state.view === 'study';
    state.view = 'guides';
    $('topicsView').classList.add('hidden');
    $('homeView').classList.add('hidden');
    $('studyView').classList.add('hidden');
    $('guidesView').classList.remove('hidden');
    $('homeBtn').classList.remove('hidden');
    $('resetProgress').classList.add('hidden');
    $('returnToStudy').classList.toggle('hidden', !returnToSession);
    $('guideSubject').value = subject;
    $('guideSearch').value = '';
    showCatalog();
    updateMobileCheckBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('guidesHeading').focus({ preventScroll: true });
  }

  function openGuide(id) {
    const guide = guides.find(item => item.id === id);
    if (!guide) return;
    const count = guideExercises(guide).length;
    $('guideArticle').innerHTML = `
      <div class="guide-meta">${esc(guide.subject)} · ${esc(guide.topic)} · ${guide.minutes} min čtení</div>
      <h2 id="guideTitle" tabindex="-1">${esc(guide.title)}</h2><p>${esc(guide.intro)}</p>
      ${guide.sections.map(section => `<section><h3>${esc(section.title)}</h3>
        ${section.points ? `<ul>${section.points.map(point => `<li>${esc(point)}</li>`).join('')}</ul>` : ''}
        ${section.code ? `<pre><code>${esc(section.code)}</code></pre>` : ''}
        ${section.text ? `<p>${esc(section.text)}</p>` : ''}</section>`).join('')}
      <aside class="guide-mistake"><h3>Na co si dát pozor</h3><p>${esc(guide.mistake)}</p></aside>
      <div class="guide-actions">${count ? `<button type="button" class="primary" data-practice="${esc(guide.id)}">Procvičit téma →</button><span>${count} úloh k tomuto tématu · otevře novou sadu v režimu Učení</span>` : '<span>K tomuto tématu zatím nejsou úlohy.</span>'}</div>
      <p class="guide-source"><a href="${esc(guide.source)}" target="_blank" rel="noopener">${esc(guide.sourceLabel)} ↗</a></p>`;
    $('guideCatalog').classList.add('hidden');
    $('guideDetail').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('guideTitle').focus({ preventScroll: true });
  }

  function practiceGuide(id) {
    const guide = guides.find(item => item.id === id);
    if (!guide || !guideExercises(guide).length) return;
    // Nová sada nesmí zdědit vyhledávání ani omezující filtry z minulé sady.
    $('exerciseSearch').value = '';
    $('filterSubject').value = guide.subject;
    $('filterTopic').value = 'all';
    $('filterSubtopic').value = 'all';
    $('filterType').value = 'all';
    $('filterDifficulty').value = 'all';
    state.generatedExercises = [];
    state.sessionIds = [];
    state.sessionKey = '';
    state.results = {};
    state.codeResults = {};
    state.currentStats = null;
    state.answerVisible = false;
    state.mode = 'learn';
    renderHeader(); // Nejdřív vytvořit nabídku témat pro vybraný předmět.
    openStudy(guide.subject, guide.topic);
    updateModeUI();
    $('exerciseTitle').setAttribute('tabindex', '-1');
    $('exerciseTitle').focus({ preventScroll: true });
  }

  $('guideSubject').innerHTML += [...new Set(guides.map(guide => guide.subject))]
    .map(subject => `<option value="${esc(subject)}">${esc(subject)}</option>`).join('');
  $('openGuides').addEventListener('click', () => openGuides());
  $('studyGuidesButton').addEventListener('click', () => openGuides($('filterSubject').value));
  $('guideSubject').addEventListener('change', renderCatalog);
  $('guideSearch').addEventListener('input', renderCatalog);
  $('backToGuides').addEventListener('click', () => {
    showCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('guidesHeading').focus({ preventScroll: true });
  });
  $('returnToStudy').addEventListener('click', () => {
    if (!returnToSession) return;
    state.view = 'study';
    $('guidesView').classList.add('hidden');
    $('studyView').classList.remove('hidden');
    $('resetProgress').classList.remove('hidden');
    updateMobileCheckBar();
    $('studyGuidesButton').focus();
  });
  $('guidesView').addEventListener('click', event => {
    const read = event.target.closest('[data-guide]');
    const practice = event.target.closest('[data-practice]');
    if (read) openGuide(read.dataset.guide);
    if (practice) practiceGuide(practice.dataset.practice);
  });
})();
