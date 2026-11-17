// Vizuální efekty, osobní pokrok, denní série a paleta příkazů (Ctrl+K).
// Modul jen naslouchá událostem aplikace a volá veřejné funkce (window.studyUX, window.studyGuides).
// Data zůstávají v tomto prohlížeči; vše funguje i bez úložiště a s omezeným pohybem.
(() => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;
  const OUTCOMES = 'procvicovna-outcomes:v1';
  const ACTIVITY = 'procvicovna-activity:v1';
  const DRAFT = 'procvicovna-draft:v1';

  const storage = () => { try { return getStorage(); } catch { return null; } };
  function read(key, fallback) {
    try { return JSON.parse(storage()?.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
  }
  function write(key, value) {
    try { storage()?.setItem(key, JSON.stringify(value)); } catch { /* bez úložiště jen nic neuložíme */ }
  }
  const label = subject => subject === 'elektrotechnika' ? 'Elektrotechnika' : subject;
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const pad = n => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const plural = (n, one, few, many) => n === 1 ? one : n >= 2 && n <= 4 ? few : many;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const isLight = () => document.documentElement.dataset.theme === 'light';

  /* ---------- Témata (dvojice předmět + téma) ---------- */
  function topicPairs() {
    const map = new Map();
    for (const e of state.exercises) {
      if (!e.subject || !e.topic) continue;
      const key = `${e.subject}\u0000${e.topic}`;
      const item = map.get(key) || { subject: e.subject, topic: e.topic, count: 0 };
      item.count += 1;
      map.set(key, item);
    }
    return [...map.values()];
  }
  function shuffled(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  const startTopic = (subject, topic) => window.studyUX?.start(subject, topic);

  /* ---------- Počítadla ---------- */
  function countUp(el, to, duration = 1400) {
    if (!el || !Number.isFinite(to)) return;
    const format = n => n.toLocaleString('cs-CZ');
    if (reduceMotion || to <= 0) { el.textContent = format(to); return; }
    const begin = performance.now();
    const step = now => {
      const t = Math.min(1, (now - begin) / duration);
      el.textContent = format(Math.round(to * (1 - Math.pow(1 - t, 4))));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Pokrok, série a týden ---------- */
  function activityLog() {
    const log = read(ACTIVITY, {});
    return log && typeof log === 'object' && !Array.isArray(log) ? log : {};
  }
  function recordActivity() {
    const log = activityLog();
    const key = dayKey();
    log[key] = (Number(log[key]) || 0) + 1;
    const cutoff = Date.now() - 120 * 864e5;
    for (const k of Object.keys(log)) {
      const time = new Date(`${k}T12:00:00`).getTime();
      if (!(time >= cutoff)) delete log[k];
    }
    write(ACTIVITY, log);
  }
  function streakDays(log) {
    const d = new Date();
    if (!log[dayKey(d)]) d.setDate(d.getDate() - 1); // série trvá, dokud dnešek ještě neskončil
    let n = 0;
    while (log[dayKey(d)]) { n += 1; d.setDate(d.getDate() - 1); }
    return n;
  }

  let firstProgress = true;
  function refreshProgress() {
    const outcomes = read(OUTCOMES, {});
    const solvedIds = new Set(Object.entries(outcomes || {}).filter(([, ok]) => ok === true).map(([id]) => id));
    const bySubject = {};
    let solved = 0;
    for (const e of state.exercises) {
      const s = (bySubject[e.subject] ||= { total: 0, solved: 0 });
      s.total += 1;
      if (solvedIds.has(e.id)) { s.solved += 1; solved += 1; }
    }
    const total = state.exercises.length;
    const exact = total ? (solved / total) * 100 : 0;
    const percentText = solved && exact < 1 ? '<1 %' : `${Math.round(exact)} %`;

    const ring = document.getElementById('masteryRingFg');
    if (ring) {
      ring.style.strokeOpacity = solved ? '1' : '0';
      const apply = () => { ring.style.strokeDashoffset = String(100 - Math.max(solved ? 1.5 : 0, exact)); };
      firstProgress && !reduceMotion ? requestAnimationFrame(() => requestAnimationFrame(apply)) : apply();
    }
    const percentEl = document.getElementById('masteryPercent');
    if (percentEl) percentEl.textContent = percentText;
    const countEl = document.getElementById('masteredCount');
    if (countEl) firstProgress ? countUp(countEl, solved, 1600) : (countEl.textContent = solved.toLocaleString('cs-CZ'));
    const totalEl = document.getElementById('masteredTotal');
    if (totalEl) totalEl.textContent = total.toLocaleString('cs-CZ');

    document.querySelectorAll('[data-mastery-subject]').forEach(el => {
      const s = bySubject[el.dataset.masterySubject] || { total: 0, solved: 0 };
      const pct = s.total ? Math.round((s.solved / s.total) * 100) : 0;
      const fill = el.querySelector('.mastery-fill');
      const text = el.querySelector('.mastery-label');
      const apply = () => { if (fill) fill.style.width = `${s.solved ? Math.max(pct, 2) : 0}%`; };
      firstProgress && !reduceMotion ? setTimeout(apply, 450) : apply();
      if (text) text.textContent = `${s.solved}/${s.total} · ${pct} %`;
      el.classList.toggle('done', s.total > 0 && s.solved === s.total);
      el.title = `Správně vyřešeno ${s.solved} z ${s.total} úloh`;
    });

    const log = activityLog();
    const streak = streakDays(log);
    const streakEl = document.getElementById('streakDays');
    if (streakEl) streakEl.textContent = String(streak);
    const streakLabel = document.getElementById('streakLabel');
    if (streakLabel) streakLabel.textContent = `${plural(streak, 'den', 'dny', 'dní')} v řadě`;
    document.getElementById('streakStat')?.classList.toggle('cold', streak === 0);

    const week = document.getElementById('weekActivity');
    if (week) {
      const names = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push({ key: dayKey(d), name: names[d.getDay()], today: i === 0, count: Number(log[dayKey(d)]) || 0 });
      }
      const max = Math.max(6, ...days.map(d => d.count));
      const sum = days.reduce((acc, d) => acc + d.count, 0);
      week.setAttribute('aria-label', `Aktivita za posledních 7 dní: ${sum} ${plural(sum, 'odpověď', 'odpovědi', 'odpovědí')}`);
      week.innerHTML = days.map(d => `<div class="week-day${d.today ? ' today' : ''}" title="${d.name}: ${d.count} ${plural(d.count, 'odpověď', 'odpovědi', 'odpovědí')}"><span class="week-bar"><i data-h="${d.count ? Math.max(24, Math.round((d.count / max) * 100)) : 0}"></i></span><span>${d.name}</span></div>`).join('');
      const bars = [...week.querySelectorAll('i[data-h]')];
      const apply = () => bars.forEach(bar => bar.style.setProperty('--h', `${bar.dataset.h}%`));
      firstProgress && !reduceMotion ? setTimeout(apply, 600) : apply();
    }
    firstProgress = false;
  }

  /* ---------- Konfety ---------- */
  let canvas = null, ctx = null, particles = [], frame = 0;
  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function ensureCanvas() {
    if (canvas) return true;
    canvas = document.createElement('canvas');
    canvas.className = 'fx-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    ctx = canvas.getContext('2d');
    if (!ctx) { canvas = null; return false; }
    document.body.appendChild(canvas);
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return true;
  }
  function burst(x, y, count = 40, { angle = null, spread = Math.PI * 2, speed = 7, lift = 3 } = {}) {
    if (reduceMotion || !ensureCanvas()) return;
    const colors = isLight()
      ? ['#07806a', '#0a7fbf', '#4a8f12', '#d97706', '#e05d44', '#0f1f1e']
      : ['#2ee6b6', '#4cc9ff', '#b8f35a', '#ffb547', '#ff7a59', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const a = angle == null ? Math.random() * Math.PI * 2 : angle + (Math.random() - 0.5) * spread;
      const v = speed * (0.45 + Math.random() * 0.8);
      particles.push({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - lift,
        w: 5 + Math.random() * 6, h: 3 + Math.random() * 5,
        rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.35,
        color: colors[(Math.random() * colors.length) | 0],
        life: 0, max: 70 + Math.random() * 60, round: Math.random() < 0.3,
      });
    }
    if (!frame) { lastTick = performance.now(); frame = requestAnimationFrame(tick); }
  }
  let lastTick = 0;
  function tick(now) {
    // Fyzika je řízená časem (1 = jeden snímek při 60 Hz), takže běží stejně na 60 i 120 Hz.
    const dt = Math.min(3, Math.max(0.25, (now - lastTick) / 16.667));
    lastTick = now;
    const drag = Math.pow(0.985, dt);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particles = particles.filter(p => p.life < p.max && p.y < innerHeight + 40);
    for (const p of particles) {
      p.life += dt;
      p.vy += 0.22 * dt;
      p.vx *= drag;
      p.vy *= drag;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2.4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.scale(1, Math.cos(p.life * 0.16 + p.rot));
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    }
    frame = particles.length ? requestAnimationFrame(tick) : 0;
    if (!frame) ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
  function bigCelebration() {
    const w = innerWidth, h = innerHeight;
    burst(w * 0.5, h * 0.32, 90, { speed: 12, lift: 4 });
    setTimeout(() => {
      burst(0, h * 0.85, 70, { angle: -Math.PI / 3, spread: 0.7, speed: 19, lift: 0 });
      burst(w, h * 0.85, 70, { angle: -Math.PI * 2 / 3, spread: 0.7, speed: 19, lift: 0 });
    }, 220);
  }
  function popLabel(x, y, text, combo = false) {
    if (reduceMotion) return;
    const el = document.createElement('div');
    el.className = `fx-pop${combo ? ' combo' : ''}`;
    el.textContent = text;
    el.setAttribute('aria-hidden', 'true');
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
  function restartClass(el, cls, ms) {
    if (!el || reduceMotion) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), ms);
  }

  const praise = ['Správně!', 'Paráda!', 'Přesně tak!', 'Super!', 'Výborně!', 'Trefa!'];
  let combo = 0;
  document.addEventListener('procvicovna:result', event => {
    const { id, result, mode } = event.detail || {};
    if (!result?.answered) return;
    recordActivity();
    // V režimu Test se správnost nesmí prozradit – žádné efekty.
    if (mode !== 'learn' || !result.graded) return;
    const card = id ? document.querySelector(`.exercise[data-exercise-id="${CSS.escape(String(id))}"]`) : null;
    if (!result.correct) {
      combo = 0;
      restartClass(card, 'fx-wrong', 550);
      return;
    }
    combo += 1;
    restartClass(card, 'fx-correct', 1200);
    const anchor = card?.querySelector('[data-action^="check-"],[data-action="run-code"]') || card;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const x = Math.min(Math.max(rect.left + rect.width / 2, 60), innerWidth - 60);
    const y = Math.min(Math.max(rect.top + rect.height / 2, 90), innerHeight - 110);
    burst(x, y, combo >= 3 ? 70 : 40, { angle: -Math.PI / 2, spread: Math.PI * 1.1, speed: 9, lift: 2 });
    popLabel(x, y - 18, combo >= 2 ? `🔥 ${combo}× v řadě!` : `${praise[(Math.random() * praise.length) | 0]} ✓`, combo >= 2);
  });
  document.addEventListener('procvicovna:set-complete', event => {
    const percent = event.detail?.percent;
    combo = 0;
    if (percent == null) return;
    if (percent >= 80) bigCelebration();
    else if (percent >= 50) burst(innerWidth / 2, innerHeight * 0.4, 60, { speed: 9 });
  });

  /* ---------- Karty: světlo a náklon pod kurzorem ---------- */
  if (finePointer && !reduceMotion) {
    let activeCard = null;
    const resetCard = card => { card.style.removeProperty('--rx'); card.style.removeProperty('--ry'); };
    document.addEventListener('pointermove', event => {
      const card = event.target instanceof Element ? event.target.closest('.card') : null;
      if (card !== activeCard) { if (activeCard) resetCard(activeCard); activeCard = card; }
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (event.clientX - r.left) / r.width;
      const py = (event.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      card.style.setProperty('--rx', `${((0.5 - py) * 6).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${((px - 0.5) * 8).toFixed(2)}deg`);
    }, { passive: true });

    const glow = document.querySelector('.cursor-glow');
    if (glow) {
      let tx = innerWidth / 2, ty = innerHeight / 3, cx = tx, cy = ty, running = false;
      const loop = () => {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
        glow.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
        if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.4) requestAnimationFrame(loop);
        else running = false;
      };
      window.addEventListener('pointermove', event => {
        tx = event.clientX;
        ty = event.clientY;
        glow.classList.add('on');
        if (!running) { running = true; requestAnimationFrame(loop); }
      }, { passive: true });
      document.documentElement.addEventListener('mouseleave', () => glow.classList.remove('on'));
    }
  }

  /* ---------- Hero: střídání navržených témat ---------- */
  function setupRotator(pairs) {
    const button = document.getElementById('heroRotator');
    const text = document.getElementById('heroRotatorText');
    if (!button || !text || !pairs.length) return;
    const order = shuffled(pairs);
    let index = 0;
    let current = order[0];
    const show = pair => {
      current = pair;
      button.dataset.subject = pair.subject;
      button.setAttribute('aria-label', `Procvičit téma ${pair.topic} (${label(pair.subject)})`);
      button.title = `${label(pair.subject)} · ${pair.count} úloh`;
    };
    show(current);
    text.textContent = current.topic;
    button.addEventListener('click', () => startTopic(current.subject, current.topic));
    if (order.length < 2) return;
    (async () => {
      for (;;) {
        await sleep(reduceMotion ? 4500 : 2800);
        if (document.hidden || state.view !== 'home' || button.matches(':hover,:focus-visible')) continue;
        const next = order[index = (index + 1) % order.length];
        if (reduceMotion) { show(next); text.textContent = next.topic; continue; }
        for (let t = text.textContent; t.length; t = t.slice(0, -1)) { text.textContent = t.slice(0, -1); await sleep(18); }
        show(next);
        for (let i = 1; i <= next.topic.length; i++) { text.textContent = next.topic.slice(0, i); await sleep(34); }
      }
    })();
  }

  /* ---------- Rychlý start: běžící pás témat ---------- */
  function setupMarquee(pairs) {
    const host = document.getElementById('topicMarquee');
    if (!host || !pairs.length) return;
    const order = shuffled(pairs);
    const half = Math.ceil(order.length / 2);
    const rows = order.length > 10 ? [order.slice(0, half), order.slice(half)] : [order];
    const chip = (p, dup) => `<button type="button" class="topic-chip" data-subject="${esc(p.subject)}" data-topic="${esc(p.topic)}" title="${esc(label(p.subject))}"${dup ? ' data-dup tabindex="-1" aria-hidden="true"' : ''}><span>${esc(p.topic)}</span><small>${p.count}</small></button>`;
    host.innerHTML = rows.map((row, i) => `<div class="marquee-row${i % 2 ? ' reverse' : ''}" style="--dur:${Math.max(40, row.length * 4.2)}s">${row.map(p => chip(p, false)).join('')}${row.map(p => chip(p, true)).join('')}</div>`).join('');
    host.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target.closest('.topic-chip') : null;
      if (target) startTopic(target.dataset.subject, target.dataset.topic);
    });
  }

  /* ---------- Paleta příkazů ---------- */
  const palette = { root: null, input: null, list: null, items: [], index: 0, lastFocus: null };
  const searchIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';

  function highlight(text, tokens) {
    const source = String(text ?? '');
    if (!tokens.length) return esc(source);
    let norm = '';
    const map = [];
    for (let i = 0; i < source.length; i++) {
      for (const c of normalize(source[i])) { norm += c; map.push(i); }
    }
    const ranges = [];
    for (const token of tokens) {
      const at = norm.indexOf(token);
      if (at >= 0) ranges.push([map[at], map[at + token.length - 1] + 1]);
    }
    if (!ranges.length) return esc(source);
    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [ranges[0]];
    for (const r of ranges.slice(1)) {
      const last = merged[merged.length - 1];
      if (r[0] <= last[1]) last[1] = Math.max(last[1], r[1]); else merged.push(r);
    }
    let out = '', pos = 0;
    for (const [a, b] of merged) { out += esc(source.slice(pos, a)) + `<mark>${esc(source.slice(a, b))}</mark>`; pos = b; }
    return out + esc(source.slice(pos));
  }

  function actionItems() {
    const list = [];
    const draft = read(DRAFT, null);
    if (draft && Array.isArray(draft.ids) && draft.ids.length) {
      list.push({ group: 'Akce', icon: '▶', title: 'Pokračovat v rozpracované sadě', sub: `${draft.ids.length} otázek · uloženo v prohlížeči`, run: () => window.studyUX?.resume() });
    }
    list.push({ group: 'Akce', icon: '⚡', title: 'Procvičit 5 náhodných otázek', sub: 'Napříč všemi předměty', run: () => window.studyUX?.start('all', 'all', '5') });
    const failed = window.studyUX?.failedIds?.() || [];
    if (failed.length) list.push({ group: 'Akce', icon: '↻', title: 'Procvičit chyby', sub: `${failed.length} úloh k zopakování`, run: () => window.studyUX?.start('all', 'all', 'all', failed) });
    list.push({ group: 'Akce', icon: '📚', title: 'Studijní přehledy', sub: 'Nejdřív si připomeň učivo', run: () => window.studyGuides?.openGuides() });
    list.push({ group: 'Akce', icon: '◐', title: isLight() ? 'Přepnout na tmavý motiv' : 'Přepnout na světlý motiv', sub: 'Vzhled stránky', keywords: 'motiv tema theme dark light svetly tmavy', run: () => document.getElementById('themeToggle')?.click() });
    if (state.view !== 'home') list.push({ group: 'Akce', icon: '⌂', title: 'Úvodní stránka', sub: 'Zpět na přehled předmětů', run: () => openHome() });
    return list;
  }

  function searchItems(query) {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    const subjects = unique(state.exercises.map(e => e.subject));
    const pairs = topicPairs();
    const guides = Array.isArray(window.STUDY_GUIDES) ? window.STUDY_GUIDES : [];
    const all = [
      ...actionItems(),
      ...subjects.map(subject => {
        const items = state.exercises.filter(e => e.subject === subject);
        const topics = unique(items.map(e => e.topic)).length;
        return { group: 'Předměty', subject, svg: subjectIcon(subject), title: label(subject), sub: `${items.length} úloh · ${topics} ${plural(topics, 'téma', 'témata', 'témat')}`, run: () => window.studyUX?.openTopics(subject) };
      }),
      ...pairs.map(p => ({ group: 'Témata', subject: p.subject, svg: subjectIcon(p.subject), title: p.topic, sub: `${label(p.subject)} · ${p.count} úloh · začít hned`, run: () => startTopic(p.subject, p.topic) })),
      ...guides.map(g => ({ group: 'Přehledy', subject: g.subject, icon: '📖', title: g.title, sub: `${label(g.subject)} · ${g.minutes} min čtení`, keywords: `${g.topic} ${g.intro || ''}`, run: () => { window.studyGuides?.openGuides(g.subject); window.studyGuides?.openGuide(g.id); } })),
    ];
    if (!tokens.length) return all.filter(item => item.group === 'Akce' || item.group === 'Předměty');
    const limits = { Akce: 6, 'Předměty': 12, 'Témata': 14, 'Přehledy': 8 };
    const groups = {};
    for (const item of all) {
      const title = normalize(item.title);
      const hay = `${title} ${normalize(item.sub)} ${normalize(item.keywords || '')}`;
      if (!tokens.every(t => hay.includes(t))) continue;
      const joined = tokens.join(' ');
      item.score = (title.startsWith(joined) ? 4 : 0) + (title.includes(joined) ? 2 : 0) + tokens.filter(t => title.includes(t)).length;
      (groups[item.group] ||= []).push(item);
    }
    return Object.keys(limits).flatMap(group => (groups[group] || []).sort((a, b) => b.score - a.score).slice(0, limits[group]));
  }

  function renderPalette() {
    const query = palette.input.value;
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    palette.items = searchItems(query);
    palette.index = Math.min(palette.index, Math.max(0, palette.items.length - 1));
    if (!palette.items.length) {
      palette.list.innerHTML = `<div class="palette-empty">Nic jsme nenašli pro „${esc(query)}“.<br><small>Zkus jiný výraz – hledá se i bez diakritiky.</small></div>`;
      palette.input.removeAttribute('aria-activedescendant');
      return;
    }
    let html = '', group = '';
    palette.items.forEach((item, i) => {
      if (item.group !== group) {
        group = item.group;
        html += `<div class="palette-group" role="presentation">${esc(group)}</div>`;
      }
      html += `<button type="button" class="palette-item" role="option" id="palette-opt-${i}" data-index="${i}"${item.subject ? ` data-subject="${esc(item.subject)}"` : ''} aria-selected="${i === palette.index}" tabindex="-1">
        <span class="palette-ico" aria-hidden="true">${item.svg || esc(item.icon || '•')}</span>
        <span class="palette-text"><strong>${highlight(item.title, tokens)}</strong>${item.sub ? `<small>${esc(item.sub)}</small>` : ''}</span>
        <span class="palette-enter" aria-hidden="true">↵</span>
      </button>`;
    });
    palette.list.innerHTML = html;
    syncSelection(false);
  }

  function syncSelection(scroll = true) {
    palette.list.querySelectorAll('.palette-item').forEach(el => el.setAttribute('aria-selected', String(Number(el.dataset.index) === palette.index)));
    const active = palette.list.querySelector(`#palette-opt-${palette.index}`);
    if (active) {
      palette.input.setAttribute('aria-activedescendant', active.id);
      if (scroll) active.scrollIntoView({ block: 'nearest' });
    }
  }

  function buildPalette() {
    const root = document.createElement('div');
    root.className = 'palette-backdrop';
    root.hidden = true;
    root.innerHTML = `
      <div class="palette" role="dialog" aria-modal="true" aria-label="Hledat v Procvičovně">
        <div class="palette-input-row">${searchIcon}<input class="palette-input" type="text" role="combobox" aria-expanded="true" aria-controls="paletteList" aria-autocomplete="list" autocomplete="off" spellcheck="false" placeholder="Hledej předmět, téma nebo přehled…"><span class="kbd">Esc</span></div>
        <div class="palette-list" id="paletteList" role="listbox" aria-label="Výsledky"></div>
        <div class="palette-foot"><span><span class="kbd">↑</span><span class="kbd">↓</span> výběr</span><span><span class="kbd">Enter</span> otevřít</span><span><span class="kbd">Esc</span> zavřít</span><span style="margin-left:auto">Hledá se i bez diakritiky</span></div>
      </div>`;
    document.body.appendChild(root);
    palette.root = root;
    palette.input = root.querySelector('.palette-input');
    palette.list = root.querySelector('.palette-list');
    palette.input.addEventListener('input', () => { palette.index = 0; renderPalette(); palette.list.scrollTop = 0; });
    palette.input.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!palette.items.length) return;
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        palette.index = (palette.index + delta + palette.items.length) % palette.items.length;
        syncSelection();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        runItem(palette.index);
      } else if (event.key === 'Tab') {
        event.preventDefault();
      }
    });
    palette.list.addEventListener('pointermove', event => {
      const item = event.target instanceof Element ? event.target.closest('.palette-item') : null;
      if (item && Number(item.dataset.index) !== palette.index) { palette.index = Number(item.dataset.index); syncSelection(false); }
    });
    palette.list.addEventListener('click', event => {
      const item = event.target instanceof Element ? event.target.closest('.palette-item') : null;
      if (item) runItem(Number(item.dataset.index));
    });
    root.addEventListener('mousedown', event => { if (event.target === root) closePalette(); });
  }

  function openPalette(prefill = '') {
    if (!palette.root) buildPalette();
    if (!palette.root.hidden) { palette.input.focus(); return; }
    palette.lastFocus = document.activeElement;
    palette.root.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    palette.input.value = prefill;
    palette.index = 0;
    renderPalette();
    palette.input.focus();
    document.getElementById('paletteOpen')?.setAttribute('aria-expanded', 'true');
  }
  function closePalette(restoreFocus = true) {
    if (!palette.root || palette.root.hidden) return;
    palette.root.hidden = true;
    document.documentElement.style.overflow = '';
    document.getElementById('paletteOpen')?.setAttribute('aria-expanded', 'false');
    if (restoreFocus && palette.lastFocus?.isConnected) palette.lastFocus.focus?.({ preventScroll: true });
  }
  function runItem(index) {
    const item = palette.items[index];
    if (!item) return;
    closePalette(false);
    try { item.run(); } catch (error) { console.warn('Akci z palety se nepodařilo spustit.', error); }
  }

  document.getElementById('paletteOpen')?.addEventListener('click', () => openPalette());
  document.addEventListener('keydown', event => {
    const typing = event.target instanceof Element && event.target.matches('input, textarea, select, [contenteditable="true"]');
    if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      palette.root && !palette.root.hidden ? closePalette() : openPalette();
    } else if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      openPalette();
    } else if (event.key === 'Escape' && palette.root && !palette.root.hidden) {
      event.preventDefault();
      closePalette();
    }
  });

  /* ---------- Start ---------- */
  function init() {
    for (const id of ['homeExercises', 'homeSubjects', 'homeTopics']) {
      const el = document.getElementById(id);
      if (el) countUp(el, Number(String(el.textContent).replace(/\D/g, '')) || 0, id === 'homeExercises' ? 1800 : 1200);
    }
    const pairs = topicPairs();
    setupRotator(pairs);
    setupMarquee(pairs);
    refreshProgress();
    const ux = window.studyUX;
    if (ux?.updateHome) {
      const original = ux.updateHome;
      ux.updateHome = (...args) => { const result = original.apply(ux, args); refreshProgress(); return result; };
    }
    document.documentElement.classList.add('fx-ready');
  }
  try { init(); } catch (error) { console.warn('Vizuální efekty se nepodařilo spustit.', error); }
})();
