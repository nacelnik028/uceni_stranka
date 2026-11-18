/* Sekce „Procvičování na testy“ na úvodní stránce.
   Data jsou v data/test_prep.js, vzhled v appearance.css (sekce „Procvičování na testy“). */
(function () {
  'use strict';
  const box = document.getElementById('testCards');
  const section = document.getElementById('testsSection');
  const tests = Array.isArray(window.TEST_PREP) ? window.TEST_PREP : [];
  if (!box || !section) return;
  if (!tests.length) { section.classList.add('hidden'); return; }

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const DAYS = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'];
  const MONTHS = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];
  const toDate = iso => { const [y, m, d] = String(iso).split('-').map(Number); return new Date(y, m - 1, d); };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const dayDiff = d => Math.round((d - today) / 86400000);
  const when = n => n < 0 ? 'proběhl' : n === 0 ? 'dnes' : n === 1 ? 'zítra' : n <= 4 ? `za ${n} dny` : `za ${n} dní`;
  const plural = (n, one, few, many) => n === 1 ? one : (n >= 2 && n <= 4 ? few : many);

  const items = tests.map(t => ({ ...t, date: toDate(t.datum) })).map(t => ({ ...t, diff: dayDiff(t.date) }));
  const upcoming = items.filter(t => t.diff >= 0).sort((a, b) => a.date - b.date);
  const past = items.filter(t => t.diff < 0).sort((a, b) => b.date - a.date);

  const card = (t, i) => {
    const subjects = Array.isArray(t.predmety) ? t.predmety : [];
    const d = t.date;
    const meta = [
      t.otazek ? `${t.otazek} ${plural(t.otazek, 'otázka', 'otázky', 'otázek')}` : '',
      t.karticek ? `${t.karticek} ${plural(t.karticek, 'kartička', 'kartičky', 'kartiček')}` : '',
      `${DAYS[d.getDay()]} ${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`
    ].filter(Boolean).join(' · ');
    const state = t.diff < 0 ? 'past' : t.diff <= 1 ? 'soon' : 'later';
    return `<a class="card test-card ${state}" href="${esc(t.soubor)}" data-subject="${esc(subjects[0] || '')}" style="--i:${i}">
      <div class="card-top">
        <div class="test-date" aria-hidden="true"><strong>${d.getDate()}</strong><span>${MONTHS[d.getMonth()]}</span></div>
        <span class="test-when">${when(t.diff)}</span>
        <span class="card-arrow" aria-hidden="true">↗</span>
      </div>
      <h3>${esc(t.nazev)}</h3>
      ${t.popis ? `<p>${esc(t.popis)}</p>` : ''}
      ${subjects.length ? `<div class="test-subjects">${subjects.map(s => `<span class="subject-badge" data-subject="${esc(s)}">${esc(s)}</span>`).join('')}</div>` : ''}
      <div class="card-meta">${esc(meta)}</div>
    </a>`;
  };

  let html = upcoming.concat(past.slice(0, 3)).map(card).join('');
  if (past.length > 3) {
    html += `<details class="test-archive"><summary>Starší testy (${past.length - 3})</summary><div class="cards">${past.slice(3).map((t, i) => card(t, i)).join('')}</div></details>`;
  }
  box.innerHTML = html;
})();
