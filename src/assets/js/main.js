/* Feel Good Insurance — site interactions (no dependencies) */
(() => {
  const d = document, root = d.documentElement;
  root.classList.remove('no-js');
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const lang = root.lang.startsWith('es') ? 'es' : 'en';
  const I = JSON.parse(($('#i18n') || {}).textContent || '{}');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));

  /* ---------- Header ---------- */
  const header = $('.site-header');
  let lastY = 0;
  const mobileBar = $('.mobile-bar');
  const onScroll = () => {
    const y = scrollY;
    header?.classList.toggle('is-scrolled', y > 24);
    if (header && !header.querySelector('.has-mega.open')) header.classList.toggle('is-hidden', y > 400 && y > lastY + 4 && !d.body.classList.contains('menu-open'));
    if (y < lastY - 4) header?.classList.remove('is-hidden');
    mobileBar?.classList.toggle('show', y > 280);
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(onScroll);

  /* Mega menus: hover on desktop, click/keyboard everywhere */
  $$('.has-mega').forEach((li) => {
    const btn = $('.nav-link', li);
    let t;
    const open = (v) => { li.classList.toggle('open', v); btn.setAttribute('aria-expanded', v); };
    li.addEventListener('mouseenter', () => { clearTimeout(t); $$('.has-mega.open').forEach((o) => o !== li && o.classList.remove('open')); open(true); });
    li.addEventListener('mouseleave', () => { t = setTimeout(() => open(false), 160); });
    // first tap/click opens the menu; a click while it is open (e.g. after hover) follows the link
    btn.addEventListener('click', (e) => { if (!li.classList.contains('open')) { e.preventDefault(); open(true); } });
    li.addEventListener('keydown', (e) => { if (e.key === 'Escape') { open(false); btn.focus(); } });
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) open(false); });
  });
  d.addEventListener('click', (e) => { if (!e.target.closest('.has-mega')) $$('.has-mega.open').forEach((li) => { li.classList.remove('open'); $('.nav-link', li).setAttribute('aria-expanded', 'false'); }); });

  /* Mobile drawer */
  const drawer = $('#drawer');
  const toggles = $$('[data-drawer]');
  const setDrawer = (v) => {
    drawer?.classList.toggle('open', v);
    d.body.classList.toggle('menu-open', v);
    d.body.style.overflow = v ? 'hidden' : '';
    toggles.forEach((b) => b.setAttribute('aria-expanded', v));
    drawer?.setAttribute('aria-hidden', !v);
    if (v) setTimeout(() => $('.drawer-top button', drawer)?.focus(), 50);
  };
  toggles.forEach((b) => b.addEventListener('click', () => setDrawer(!drawer.classList.contains('open'))));
  d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer?.classList.contains('open')) setDrawer(false); });
  $$('#drawer a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));

  /* ---------- Language preference ---------- */
  $$('[data-lang-link]').forEach((a) => a.addEventListener('click', () => store.set('fgi-lang', a.dataset.langLink)));
  const toast = $('.lang-toast');
  if (toast) {
    const pref = store.get('fgi-lang');
    const browserEs = (navigator.languages || [navigator.language]).some((l) => /^es\b/i.test(l));
    const wantsOther = pref ? pref !== lang : (lang === 'en' && browserEs);
    if (wantsOther && !sessionStorage.getItem('fgi-toast')) setTimeout(() => toast.classList.add('show'), 1200);
    $('.x', toast)?.addEventListener('click', () => { toast.classList.remove('show'); try { sessionStorage.setItem('fgi-toast', '1'); } catch {} store.set('fgi-lang', lang); });
  }

  /* Everything below is non-critical: run it when the browser is idle so the first paint isn't delayed */
  const later = () => {
  /* ---------- Reveal on scroll ---------- */
  const splitWords = (el) => {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = d.createElement('span'); w.className = 'w';
            const s = d.createElement('span'); s.textContent = part; s.style.setProperty('--i', i++);
            w.append(s); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  };
  const io = 'IntersectionObserver' in window && !reduce ? new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 }) : null;
  $$('.reveal, .reveal-img, .step').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));
  // Split headings into words only shortly before they scroll into view (keeps start-up work small)
  const heads = $$('.split-words:not(.hero-title)');
  if (io) {
    const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { sio.unobserve(e.target); splitWords(e.target); io.observe(e.target); } }), { rootMargin: '0px 0px 300px 0px' });
    heads.forEach((h) => sio.observe(h));
  }
  // stagger groups
  $$('[data-stagger]').forEach((g) => [...g.children].forEach((c, i) => { c.classList.add('reveal'); c.style.setProperty('--d', `${i * 0.08}s`); io ? io.observe(c) : c.classList.add('in'); }));

  /* Counters */
  const countIO = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; countIO.unobserve(el);
      const to = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
      if (reduce) return;
      const t0 = performance.now(), dur = 1600;
      const tick = (t) => { const p = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - p, 4)); el.textContent = v.toFixed(dec); if (p < 1) requestAnimationFrame(tick); };
      el.textContent = (0).toFixed(dec); requestAnimationFrame(tick);
    });
  }, { threshold: .4 }) : null;
  $$('[data-count]').forEach((el) => countIO?.observe(el));

  /* Subtle parallax for marked images */
  const px = $$('[data-parallax]');
  if (px.length && !reduce) {
    const run = () => { px.forEach((el) => { const r = el.getBoundingClientRect(); const c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; el.style.transform = `translate3d(0, ${(c * -parseFloat(el.dataset.parallax || 30)).toFixed(1)}px, 0) scale(1.08)`; }); };
    addEventListener('scroll', () => requestAnimationFrame(run), { passive: true }); run();
  }

  /* ---------- Accordions (animated <details>) ---------- */
  $$('.faq-item').forEach((det) => {
    const sum = $('summary', det);
    if (det.open) det.classList.add('is-open');
    sum.addEventListener('click', (e) => {
      e.preventDefault();
      if (det.open) { det.classList.remove('is-open'); setTimeout(() => { det.open = false; }, reduce ? 0 : 480); }
      else { det.open = true; requestAnimationFrame(() => det.classList.add('is-open')); }
    });
  });

  /* ---------- Lightbox ---------- */
  const lbLinks = $$('[data-lightbox]');
  if (lbLinks.length) {
    const lb = d.createElement('div');
    lb.className = 'lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', I.gallery || 'Gallery');
    lb.innerHTML = `<figure><img alt=""><figcaption></figcaption></figure>
      <button class="lb-btn lb-close" aria-label="${I.close || 'Close'}"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      <button class="lb-btn lb-prev" aria-label="Previous"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m15 6-6 6 6 6"/></svg></button>
      <button class="lb-btn lb-next" aria-label="Next"><svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 6 6 6-6 6"/></svg></button>`;
    d.body.append(lb);
    const img = $('img', lb), cap = $('figcaption', lb);
    let idx = 0, lastFocus;
    const show = (i) => { idx = (i + lbLinks.length) % lbLinks.length; const a = lbLinks[idx]; img.src = a.href; img.alt = a.dataset.caption || ''; cap.textContent = a.dataset.caption || ''; };
    const close = () => { lb.classList.remove('open'); d.body.style.overflow = ''; lastFocus?.focus(); };
    lbLinks.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); lastFocus = a; show(i); lb.classList.add('open'); d.body.style.overflow = 'hidden'; $('.lb-close', lb).focus(); }));
    $('.lb-close', lb).onclick = close; $('.lb-prev', lb).onclick = () => show(idx - 1); $('.lb-next', lb).onclick = () => show(idx + 1);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    d.addEventListener('keydown', (e) => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') show(idx + 1); if (e.key === 'ArrowLeft') show(idx - 1); });
  }

  /* ---------- Help widget ---------- */
  const fab = $('.help-fab');
  if (fab) {
    const btn = $('.help-btn', fab);
    const set = (v) => { fab.classList.toggle('open', v); btn.setAttribute('aria-expanded', v); };
    btn.addEventListener('click', () => set(!fab.classList.contains('open')));
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
    d.addEventListener('click', (e) => { if (!e.target.closest('.help-fab')) set(false); });
  }

  /* ---------- Open-now badge ---------- */
  $$('[data-hours]').forEach((el) => {
    try {
      const hours = JSON.parse(el.dataset.hours);
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
      const day = hours[now.getDay()];
      const mins = now.getHours() * 60 + now.getMinutes();
      const toM = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
      const open = day && mins >= toM(day[0]) && mins < toM(day[1]);
      el.classList.toggle('open', !!open);
      el.textContent = open ? I.openNow : I.closedNow;
    } catch {}
  });

  /* ---------- Map (load Google embed on request — no third-party cookies until asked) ---------- */
  $$('[data-map-src]').forEach((wrap) => {
    const b = $('button', wrap);
    b?.addEventListener('click', () => {
      const f = d.createElement('iframe');
      f.src = wrap.dataset.mapSrc; f.className = 'map-embed'; f.loading = 'lazy'; f.title = I.mapTitle || 'Map'; f.referrerPolicy = 'no-referrer-when-downgrade';
      wrap.innerHTML = ''; wrap.append(f);
    });
  });

  /* ---------- 3D service-area map: load Three.js only when the section approaches ---------- */
  const a3ds = $$('[data-area3d]');
  if (a3ds.length) {
    // The 2D map shows instantly; the 3D scene starts once the visitor engages with the page
    // (scroll / pointer / key) while the section is near the screen — or after 8s idle.
    let engaged = false;
    const pending = new Set();
    const load = (el) => {
      if (el.dataset.a3dLoading) return; el.dataset.a3dLoading = '1';
      import(`/assets/js/area3d.js?v=${root.dataset.v || ''}`).then((m) => m.mount(el)).catch(() => el.classList.add('a3d-nogl'));
    };
    const go = () => { engaged = true; pending.forEach(load); pending.clear(); };
    ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel'].forEach((ev) => addEventListener(ev, go, { once: true, passive: true }));
    addEventListener('load', () => setTimeout(go, 8000));
    if (!('IntersectionObserver' in window)) a3ds.forEach((el) => el.classList.add('a3d-nogl'));
    else {
      const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { o.unobserve(e.target); engaged ? load(e.target) : pending.add(e.target); } }), { rootMargin: '300px 0px' });
      a3ds.forEach((el) => o.observe(el));
    }
  }

  /* ---------- Interactive area map (pins, routes, tooltip) synced with area lists ---------- */
  const maps = $$('[data-map]');
  const touch = matchMedia('(hover: none)').matches;
  const highlight = (id) => {
    $$('[data-area]').forEach((el) => el.classList.toggle('hl', !!id && el.dataset.area === id));
    maps.forEach((map) => {
      const pin = id && $(`.pin[data-area="${id}"]`, map), tip = $('.map-tip', map);
      map.classList.toggle('has-hl', !!pin);
      if (!pin) { tip.classList.remove('show'); return; }
      $('b', tip).textContent = pin.dataset.name;
      $('.tip-county', tip).textContent = pin.dataset.county;
      $('.tip-info', tip).textContent = pin.dataset.info;
      tip.dataset.href = pin.getAttribute('href');
      const x = (+pin.dataset.x / 440) * 100, y = (+pin.dataset.y / 450) * 100;
      tip.style.left = `${Math.min(80, Math.max(20, x))}%`; tip.style.top = `${y}%`;
      tip.classList.toggle('below', y < 30);
      tip.classList.add('show');
    });
  };
  let clearT;
  const enter = (id) => { clearTimeout(clearT); highlight(id); };
  const leave = () => { clearT = setTimeout(() => highlight(null), 220); };
  $$('[data-area]').forEach((el) => {
    if (el.classList.contains('route')) return;
    el.addEventListener('mouseenter', () => enter(el.dataset.area));
    el.addEventListener('mouseleave', leave);
    el.addEventListener('focus', () => enter(el.dataset.area));
    el.addEventListener('blur', leave);
    // touch: first tap on a map pin shows its card, second tap opens the page
    if (touch && el.classList.contains('pin')) el.addEventListener('click', (e) => { if (!el.classList.contains('hl')) { e.preventDefault(); enter(el.dataset.area); } });
  });
  maps.forEach((map) => {
    const tip = $('.map-tip', map);
    tip.addEventListener('mouseenter', () => clearTimeout(clearT));
    tip.addEventListener('mouseleave', leave);
    tip.addEventListener('click', () => { if (tip.dataset.href) location.href = tip.dataset.href; });
    map.addEventListener('pointermove', (e) => { const r = map.getBoundingClientRect(); map.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`); map.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`); });
    // area pages: introduce the current area once the map has drawn itself
    const cur = $('.pin.hl', map);
    if (cur && 'IntersectionObserver' in window) {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { o.disconnect(); setTimeout(() => highlight(cur.dataset.area), 1800); } }, { threshold: .4 });
      o.observe(map);
    }
  });

  /* ---------- Forms ---------- */
  const validate = (form) => {
    let ok = true, first;
    $$('[required]', form).forEach((f) => {
      const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) || (f.type === 'tel' && f.value.replace(/\D/g, '').length < 10) || (f.pattern && !new RegExp(`^(?:${f.pattern})$`).test(f.value.trim()));
      f.setAttribute('aria-invalid', bad);
      const err = f.closest('.field')?.querySelector('.field-error');
      if (err) err.textContent = bad ? (f.type === 'email' ? I.errEmail : f.type === 'tel' ? I.errPhone : f.value.trim() && f.pattern ? I.errFormat : I.errRequired) : '';
      if (bad && !first) first = f;
      ok = ok && !bad;
    });
    first?.focus();
    return ok;
  };
  $$('.input, .select, .textarea').forEach((f) => f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') { f.setAttribute('aria-invalid', 'false'); const e = f.closest('.field')?.querySelector('.field-error'); if (e) e.textContent = ''; } }));
  $$('input[type="tel"]').forEach((f) => f.addEventListener('input', () => {
    const v = f.value.replace(/\D/g, '').replace(/^1/, '').slice(0, 10);
    f.value = v.length > 6 ? `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}` : v.length > 3 ? `(${v.slice(0, 3)}) ${v.slice(3)}` : v;
  }));

  async function submitForm(form, extra = {}) {
    const status = $('.form-status', form) || $('.form-status', form.closest('.wizard') || form);
    const btn = $('[type="submit"]', form);
    const data = Object.fromEntries(new FormData(form).entries());
    // multi-select checkboxes
    $$('input[type="checkbox"]', form).forEach((c) => { if (c.name.endsWith('[]')) data[c.name] = $$(`input[name="${c.name}"]:checked`, form).map((x) => x.value).join(', '); });
    Object.assign(data, extra, { page: location.href, lang, ts: form.dataset.ts });
    btn?.classList.add('loading'); btn && (btn.disabled = true);
    try {
      const res = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || 'fail');
      window.gtag?.('event', 'generate_lead', { form: form.dataset.form || 'contact' });
      return true;
    } catch (err) {
      if (status) { status.className = 'form-status err'; status.innerHTML = `${I.errSend} <a class="text-link" href="tel:${I.phoneIntl}">${I.phone}</a>`; }
      return false;
    } finally { btn?.classList.remove('loading'); btn && (btn.disabled = false); }
  }

  $$('form[data-form="contact"]').forEach((form) => {
    form.dataset.ts = Date.now();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      if (await submitForm(form)) {
        const st = $('.form-status', form);
        st.className = 'form-status ok'; st.innerHTML = `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9.5"/><path d="m8 12.5 2.5 2.5L16 9.5"/></svg><span>${I.sent}</span>`;
        form.reset(); form.dataset.ts = Date.now();
      }
    });
  });

  /* ---------- Quote wizard ---------- */
  const wiz = $('.wizard');
  if (wiz) {
    const form = $('form', wiz);
    form.dataset.ts = Date.now();
    const steps = $$('.wizard-step', wiz), bars = $$('.wizard-progress span', wiz);
    let cur = 0;
    const params = new URLSearchParams(location.search);
    const pre = params.get('type');
    if (pre) pre.split(',').forEach((v) => { const c = $(`input[name="coverage[]"][value="${v}"]`, form); if (c) c.checked = true; });
    const syncDetails = () => { const sel = $$('input[name="coverage[]"]:checked', form).map((c) => c.value); $$('.detail-group', form).forEach((g) => g.classList.toggle('show', g.dataset.for.split(' ').some((x) => sel.includes(x)))); $('.no-details', form)?.classList.toggle('show', !$$('.detail-group.show', form).length); };
    form.addEventListener('change', syncDetails); syncDetails();
    const go = (n) => {
      steps[cur].classList.remove('active'); cur = n; steps[cur].classList.add('active');
      bars.forEach((b, i) => b.classList.toggle('done', i <= cur));
      $('.wizard-count', wiz) && ($('.wizard-count', wiz).textContent = `${cur + 1} / ${steps.length}`);
      wiz.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };
    $$('[data-next]', wiz).forEach((b) => b.addEventListener('click', () => {
      if (cur === 0 && !$$('input[name="coverage[]"]:checked', form).length) { const e = $('.step-error', steps[0]); e.textContent = I.errPick; return; }
      $('.step-error', steps[0]).textContent = '';
      if (!validate(steps[cur])) return;
      go(cur + 1);
    }));
    $$('[data-prev]', wiz).forEach((b) => b.addEventListener('click', () => go(cur - 1)));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(steps[cur])) return;
      if (await submitForm(form, { form: 'quote' })) { form.hidden = true; $('.wizard-progress', wiz).hidden = true; $('.success-panel', wiz).hidden = false; $('.success-panel', wiz).focus(); }
    });
  }

  /* ---------- Coverage finder ---------- */
  const finder = $('.finder');
  if (finder) {
    const recs = JSON.parse($('#finder-data').textContent);
    const out = $('.rec-list', finder), empty = $('.finder-empty', finder), cta = $('.finder-cta', finder);
    const update = () => {
      const picks = new Set();
      $$('input:checked', finder).forEach((i) => i.dataset.rec?.split(' ').forEach((r) => picks.add(r)));
      out.innerHTML = '';
      [...picks].forEach((id, i) => {
        const r = recs[id]; if (!r) return;
        const el = d.createElement('a'); el.className = 'rec'; el.href = r.url; el.style.animationDelay = `${i * 60}ms`;
        el.innerHTML = `<span class="ico-wrap">${r.icon}</span><span><b>${r.name}</b><span>${r.why}</span></span><svg class="ico arrow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
        out.append(el);
      });
      empty.hidden = picks.size > 0; cta.hidden = picks.size === 0;
      cta.href = `${cta.dataset.base}?type=${[...picks].join(',')}`;
    };
    finder.addEventListener('change', update); update();
  }

  /* ---------- Life insurance calculator ---------- */
  const calc = $('.calc');
  if (calc) {
    const fmt = new Intl.NumberFormat(lang === 'es' ? 'es-US' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    const inputs = $$('input[type="range"]', calc);
    const run = () => {
      const v = Object.fromEntries(inputs.map((i) => [i.name, +i.value]));
      inputs.forEach((i) => { i.style.setProperty('--p', `${((i.value - i.min) / (i.max - i.min)) * 100}%`); $(`output[for="${i.id}"]`, calc).textContent = i.dataset.fmt === 'money' ? fmt.format(i.value) : i.value; });
      const need = v.income * v.years + v.debts + v.kids * 100000 + 15000 - v.savings;
      $('.amount', calc).textContent = fmt.format(Math.max(0, Math.round(need / 5000) * 5000));
    };
    inputs.forEach((i) => i.addEventListener('input', run)); run();
  }

  /* ---------- Blog filter + search ---------- */
  const blog = $('[data-blog]');
  if (blog) {
    const cards = $$('.post-card', blog), btns = $$('.filter-btn', blog), q = $('.search-box input', blog), none = $('.no-results', blog);
    let cat = 'all';
    const apply = () => {
      const term = (q?.value || '').toLowerCase().trim(); let n = 0;
      cards.forEach((c) => { const show = (cat === 'all' || c.dataset.cat === cat) && (!term || c.textContent.toLowerCase().includes(term)); c.hidden = !show; n += show; });
      if (none) none.hidden = n > 0;
    };
    btns.forEach((b) => b.addEventListener('click', () => { cat = b.dataset.cat; btns.forEach((x) => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b); }); apply(); }));
    q?.addEventListener('input', apply);
  }

  /* ---------- Article: progress + TOC ---------- */
  const bar = $('.read-progress'), article = $('.prose[data-article]');
  if (bar && article) {
    const upd = () => { const r = article.getBoundingClientRect(); const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight))); bar.style.transform = `scaleX(${p})`; };
    addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true }); upd();
    const links = $$('.toc a');
    if (links.length && 'IntersectionObserver' in window) {
      const map = new Map(links.map((a) => [a.hash.slice(1), a]));
      const tio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { links.forEach((l) => l.classList.remove('active')); map.get(e.target.id)?.classList.add('active'); } }), { rootMargin: '-20% 0px -70% 0px' });
      $$('h2[id]', article).forEach((h) => tio.observe(h));
    }
  }

  /* Share button */
  $$('[data-share]').forEach((b) => b.addEventListener('click', async () => {
    try { if (navigator.share) await navigator.share({ title: d.title, url: location.href }); else { await navigator.clipboard.writeText(location.href); b.querySelector('span').textContent = I.copied; } } catch {}
  }));

  /* ---------- Full-bleed hero: gentle mouse + scroll parallax ---------- */
  const cover = $('[data-cover]');
  if (cover && !reduce) {
    const bg = $('[data-cover-bg]', cover), copy = $('[data-cover-copy]', cover);
    let mx = 0, my = 0, tx = 0, ty = 0, sp = 0, running = false;
    const frame = () => {
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      bg.style.transform = `translate3d(${(-mx * 14).toFixed(1)}px, ${(-my * 10 + sp * 140).toFixed(1)}px, 0)`;
      copy.style.transform = `translate3d(${(mx * 6).toFixed(1)}px, ${(sp * 70).toFixed(1)}px, 0)`;
      copy.style.opacity = String(Math.max(0, 1 - sp * 1.3).toFixed(3));
      if (Math.abs(tx - mx) > 0.001 || Math.abs(ty - my) > 0.001) requestAnimationFrame(frame); else running = false;
    };
    const kick = () => { if (!running) { running = true; requestAnimationFrame(frame); } };
    if (matchMedia('(pointer: fine)').matches) {
      cover.addEventListener('pointermove', (e) => { const r = cover.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / r.height * 2 - 1; kick(); });
      cover.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
    }
    addEventListener('scroll', () => { sp = Math.min(1, Math.max(0, scrollY / cover.offsetHeight)); kick(); }, { passive: true });
  }

  /* Pause looping decorations when off-screen */
  if ('IntersectionObserver' in window) {
    const aio = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('anim-off', !e.isIntersecting)));
    $$('.marquee, .kinetic, .map-card, .cover-review, .scroll-cue, .float-card, .a3d-hint, .a3d-loader').forEach((el) => { el.classList.add('anim-off'); aio.observe(el); });
  }

  /* Rotating words in the hero */
  $$('.rot').forEach((rot) => {
    const words = $$('i', rot); if (words.length < 2 || reduce) return;
    let i = 0;
    setInterval(() => {
      if (d.hidden) return;
      const cur = words[i]; i = (i + 1) % words.length; const nxt = words[i];
      cur.classList.remove('on'); cur.classList.add('out');
      nxt.classList.remove('out'); nxt.classList.add('on');
      setTimeout(() => cur.classList.remove('out'), 700);
    }, 2200);
  });

  };
  if ('requestIdleCallback' in window) requestIdleCallback(later, { timeout: 1200 }); else setTimeout(later, 200);

  /* Year */
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Analytics (GA4), loaded after first interaction or idle ---------- */
  const ga = root.dataset.ga;
  if (ga && !navigator.doNotTrack?.startsWith?.('1')) {
    let loaded = false;
    const load = () => {
      if (loaded) return; loaded = true;
      const s = d.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`; d.head.append(s);
      window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
      gtag('js', new Date()); gtag('config', ga, { anonymize_ip: true }); if (root.dataset.gads) gtag('config', root.dataset.gads);
    };
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((ev) => addEventListener(ev, load, { once: true, passive: true }));
    addEventListener('load', () => setTimeout(() => (window.requestIdleCallback || setTimeout)(load), 15000));
    d.addEventListener('click', (e) => {
      const a = e.target.closest('a'); if (!a) return;
      if (a.href.startsWith('tel:')) window.gtag?.('event', 'click_call');
      else if (a.href.startsWith('sms:')) window.gtag?.('event', 'click_text');
      else if (a.href.startsWith('mailto:')) window.gtag?.('event', 'click_email');
    });
  }
})();
