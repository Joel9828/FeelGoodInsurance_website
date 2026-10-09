import { SITE, ROUTES, SERVICES, AREAS, TEAM, REVIEWS, CARRIERS, GALLERY, t, L, servicePath, areaPath, areaLabel } from '../content/site.mjs';
import { icon } from './icons.mjs';
import { img, imgUrl } from './images.mjs';
import { esc, ridge } from './layout.mjs';

export const stars = (n = 5) => `<span class="stars" role="img" aria-label="${n} / 5">${icon('star').repeat(n)}</span>`;

export function crumbsHtml(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">${items.map((it, i) => (i < items.length - 1 ? `<a href="${it.url}">${esc(it.name)}</a><span class="sep" aria-hidden="true"></span>` : `<span aria-current="page">${esc(it.name)}</span>`)).join('')}</nav>`;
}

/* Inner-page hero with background photo */
export function pageHero({ lang, crumbs, eyebrow, title, lead, image, imageAlt, actions = '', chips = [], compact }) {
  return `
<section class="page-hero on-dark${compact ? ' compact' : ''}">
  ${image ? `<div class="bg">${img(image, { alt: imageAlt || '', priority: true, sizes: '100vw', widths: [640, 1024, 1600, 2000] })}</div>` : ''}
  <div class="container">
    ${crumbs ? crumbsHtml(crumbs) : ''}
    ${eyebrow ? `<p class="eyebrow fade-up" style="--d:.05s">${eyebrow}</p>` : ''}
    <h1 class="h1 hero-title">${title}</h1>
    ${lead ? `<p class="lead fade-up" style="--d:.35s">${lead}</p>` : ''}
    ${actions ? `<div class="btn-row fade-up" style="--d:.5s">${actions}</div>` : ''}
    ${chips.length ? `<div class="hero-chips fade-up" style="--d:.65s">${chips.map((c) => `<span class="chip">${icon(c[0])}${c[1]}</span>`).join('')}</div>` : ''}
  </div>
</section>`;
}

export const btnQuote = (lang, extra = '', label) => `<a class="btn gold lg" href="${ROUTES.quote[lang]}${extra}">${label || t('getQuote', lang)} ${icon('arrow', 'arrow-ico')}</a>`;
export const btnCall = (lang, cls = 'ghost lg') => `<a class="btn ${cls}" href="tel:${SITE.phoneIntl}">${icon('phone')} ${SITE.phone}</a>`;

export function sectionHead({ eyebrow, title, lead, center, row, side = '' }) {
  if (row) return `<div class="section-head row"><div>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h2 class="h2 split-words">${title}</h2>${lead ? `<p class="lead">${lead}</p>` : ''}</div>${side}</div>`;
  return `<div class="section-head${center ? ' center' : ''}">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h2 class="h2 split-words">${title}</h2>${lead ? `<p class="lead reveal">${lead}</p>` : ''}</div>`;
}

/* Carrier marquee */
export function carriers(lang) {
  const items = CARRIERS.map((c) => img(c.img, { alt: c.name, widths: [340], sizes: '170px' })).join('');
  return `
<section class="trust-strip" aria-label="${lang === 'es' ? 'Aseguradoras con las que trabajamos' : 'Carriers we work with'}">
  <p class="label">${lang === 'es' ? 'Comparamos opciones de aseguradoras de confianza' : 'We compare options from trusted carriers'}</p>
  <div class="marquee"><div class="marquee-track">${items}${items.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"')}</div></div>
</section>`;
}

/* Service image tiles */
export function serviceTiles(lang, ids) {
  const list = ids ? ids.map((id) => SERVICES.find((s) => s.id === id)) : SERVICES;
  const wide = new Set(ids ? [] : ['auto', 'home', 'travel', 'commercial', 'dmv', 'notary']);
  return `<div class="svc-grid" data-stagger>${list.map((s) => `
    <a class="svc-tile${wide.has(s.id) ? ' wide' : ''}" href="${servicePath(s, lang)}">
      ${img(s.card, { alt: '', sizes: '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw', widths: [400, 640, 960] })}
      <span class="tag">${icon(s.icon)}${t(s.group === 'documents' ? 'documents' : s.group, lang)}</span>
      <span class="go">${icon('arrowUpRight')}</span>
      <div class="body"><h3>${L(s.name, lang)}</h3><p>${L(s.blurb, lang)}</p></div>
    </a>`).join('')}</div>`;
}

export function serviceLinks(lang, exclude) {
  return `<div class="svc-list" data-stagger>${SERVICES.filter((s) => s.id !== exclude).map((s) => `<a class="svc-link" href="${servicePath(s, lang)}"><span class="ico-wrap">${icon(s.icon)}</span>${L(s.name, lang)}${icon('arrow', 'arrow')}</a>`).join('')}</div>`;
}

/* Reviews */
export function reviews(lang, { title, lead } = {}) {
  const initials = (n) => n.split(/\s+/).slice(0, 2).map((x) => x[0]).join('');
  return `
<section class="section paper" id="reviews">
  <div class="container">
    ${sectionHead({ eyebrow: lang === 'es' ? 'Reseñas reales de Google' : 'Real Google reviews', title: title || (lang === 'es' ? 'Gente real, <em>resultados reales</em>' : 'Real people, <em>real results</em>'), lead })}
    <div class="reviews-wrap">
      <aside class="rating-card reveal">
        <div class="g">${icon('google')} Google</div>
        <div class="big">${SITE.rating.value}</div>
        ${stars()}
        <p>${lang === 'es' ? `Basado en ${SITE.rating.count} reseñas de clientes en Google.` : `Based on ${SITE.rating.count} client reviews on Google.`}</p>
        <a class="btn gold block" href="${SITE.reviewsUrl}" target="_blank" rel="noopener">${lang === 'es' ? 'Ver todas las reseñas' : 'Read all reviews'} ${icon('external')}</a>
      </aside>
      <div class="review-cols">
        ${REVIEWS.map((r, i) => `<figure class="review reveal" style="--d:${(i % 2) * 0.1}s">${stars()}<blockquote lang="${r.lang}">“${esc(r.text)}”</blockquote><footer><span class="avatar" aria-hidden="true">${initials(r.name)}</span><span><b>${esc(r.name)}</b><span>${icon('google')} Google</span></span>${r.lang !== lang ? `<span class="lang-tag">${r.lang.toUpperCase()}</span>` : ''}</footer></figure>`).join('')}
      </div>
    </div>
  </div>
</section>`;
}

/* FAQ */
export function faqSection(lang, faqs, { title, lead, dark, id = 'faq' } = {}) {
  if (!faqs?.length) return '';
  return `
<section class="section${dark ? ' dark' : ''}" id="${id}">
  <div class="container faq-wrap">
    <div class="faq-aside">
      <p class="eyebrow">${t('faq', lang)}</p>
      <h2 class="h2 split-words">${title || (lang === 'es' ? 'Sus preguntas, <em>respondidas</em>' : 'Your questions, <em>answered</em>')}</h2>
      <p class="lead mt-2">${lead || (lang === 'es' ? '¿No ve su pregunta? Llámenos y se la contestamos en minutos.' : 'Don’t see your question? Call us — we’ll answer it in minutes.')}</p>
      <div class="btn-row mt-3">${btnCall(lang, dark ? 'ghost' : 'ghost')}</div>
    </div>
    <div class="faq-list">
      ${faqs.map((f, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${f.q}<span class="pm">${icon('plus')}</span></summary><div class="faq-body"><div><p>${f.a}</p></div></div></details>`).join('')}
    </div>
  </div>
</section>`;
}

/* Team */
export function team(lang, { title, lead, eyebrow } = {}) {
  return `
<section class="section" id="team">
  <div class="container">
    ${sectionHead({ eyebrow: eyebrow || (lang === 'es' ? 'Nuestro equipo' : 'Our team'), title: title || (lang === 'es' ? 'Expertos locales que <em>conocen Nevada</em>' : 'Local experts who <em>know Nevada</em>'), lead })}
    <div class="team-grid" data-stagger>
      ${TEAM.map((m) => `<article class="member"><div class="photo">${img(m.img, { alt: `${m.name}, ${L(m.role, lang)} — ${SITE.name}`, sizes: '(max-width: 480px) 100vw, (max-width: 760px) 50vw, 33vw', widths: [480, 800] })}</div><div class="info"><h3>${m.name}</h3><span class="role">${L(m.role, lang)}</span></div></article>`).join('')}
    </div>
  </div>
</section>`;
}

/* Gallery mosaic */
export function galleryGrid(lang, items = GALLERY, full = false) {
  return `<div class="gallery${full ? ' full' : ''}" data-stagger>${items.map((g) => `<a href="${imgUrl(g.img, 1600)}" data-lightbox data-caption="${esc(L(g.alt, lang))}">${img(g.img, { alt: L(g.alt, lang), sizes: '(max-width: 860px) 50vw, 25vw', widths: [480, 800] })}</a>`).join('')}</div>`;
}

/* Areas section with stylised map */
const MAP_POS = {
  washoe: [190, 55, 'r'], 'reno-stead': [120, 100, 'r'], 'golden-valley': [176, 132, 'r'], 'north-valleys': [112, 150, 'l'],
  'sun-valley': [226, 160, 'r'], 'spanish-springs': [272, 126, 'r'], 'northeast-reno': [200, 186, 'r'], reno: [150, 222, 'l'],
  sparks: [238, 222, 'r'], fernley: [345, 190, 'r'], fallon: [396, 240, 'l'], incline: [124, 262, 'l'], carson: [176, 332, 'r'], yerington: [300, 356, 'r'],
};
// approximate road miles from our office at 414 S Rock Blvd, Sparks (shown in the map tooltip)
const MILES = { sparks: 0, reno: 4, 'northeast-reno': 4, 'sun-valley': 7, 'spanish-springs': 8, 'golden-valley': 11, 'north-valleys': 13, 'reno-stead': 15, washoe: null, incline: 38, carson: 33, fernley: 30, fallon: 60, yerington: 68 };
export function areaMap(lang, hl) {
  const es = lang === 'es';
  const [hx, hy] = MAP_POS.sparks;
  const list = AREAS.filter((a) => MAP_POS[a.id]);
  const dist = (a) => { const [x, y] = MAP_POS[a.id]; return Math.hypot(x - hx, y - hy); };
  const routes = list.filter((a) => a.id !== 'sparks').map((a) => {
    const [x, y] = MAP_POS[a.id];
    const mx = (x + hx) / 2, my = (y + hy) / 2 - Math.min(60, dist(a) * 0.25); // gentle arc
    const len = Math.round(dist(a) * 1.25 + 20);
    return `<path class="route" data-area="${a.id}" d="M${hx} ${hy} Q${mx.toFixed(0)} ${my.toFixed(0)} ${x} ${y}" style="--len:${len};--d:${(0.25 + dist(a) / 420).toFixed(2)}s"/>`;
  }).join('');
  const dots = list.map((a) => {
    const [x, y, side] = MAP_POS[a.id];
    const hq = a.id === 'sparks';
    const labelLeft = side === 'l';
    const mi = MILES[a.id];
    const info = hq ? (es ? 'Nuestra oficina' : 'Our office') : mi == null ? (es ? 'Todo el condado' : 'Countywide') : `≈ ${mi} ${es ? 'millas de la oficina' : 'mi from our office'}`;
    return `<a class="pin${hl === a.id ? ' hl' : ''}" href="${areaPath(a, lang)}" data-area="${a.id}" data-name="${areaLabel(a)}" data-county="${a.county}" data-info="${info}" data-x="${x}" data-y="${y}" style="--d:${(0.35 + dist(a) / 380).toFixed(2)}s">
      ${hq ? `<circle class="pulse" cx="${x}" cy="${y}" r="7"/><circle class="pulse p2" cx="${x}" cy="${y}" r="7"/>` : ''}
      <circle class="halo" cx="${x}" cy="${y}" r="${hq ? 16 : 11}"/>
      <circle class="dot" cx="${x}" cy="${y}" r="${hq ? 7 : 4.5}"/>
      <text x="${labelLeft ? x - 10 : x + 10}" y="${y + 4}" text-anchor="${labelLeft ? 'end' : 'start'}"${hq ? ' class="hq"' : ''}>${a.name}${hq ? ' · HQ' : ''}</text></a>`;
  }).join('');
  return `<div class="map-card reveal-img" data-map>
  <svg class="map-svg" viewBox="0 0 440 450" role="img" aria-label="${es ? 'Mapa interactivo de las áreas que atendemos en el norte de Nevada' : 'Interactive map of the Northern Nevada areas we serve'}">
    <defs><pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0V22" fill="none" stroke="rgba(255,255,255,.05)"/></pattern>
    <radialGradient id="glow" cx="52%" cy="44%" r="55%"><stop offset="0" stop-color="#c7a25a" stop-opacity=".22"/><stop offset="1" stop-color="#c7a25a" stop-opacity="0"/></radialGradient>
    <linearGradient id="sweepG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e2c88f" stop-opacity="0"/><stop offset="1" stop-color="#e2c88f" stop-opacity=".13"/></linearGradient></defs>
    <rect width="440" height="450" fill="url(#grid)"/><rect width="440" height="450" fill="url(#glow)"/>
    <g class="rings">${[60, 120, 180].map((r, i) => `<circle cx="${hx}" cy="${hy}" r="${r}" style="--i:${i}"/>`).join('')}</g>
    <g class="sweep"><path d="M${hx} ${hy} L${hx + 190} ${hy} A190 190 0 0 0 ${(hx + 190 * Math.cos(-0.4)).toFixed(1)} ${(hy + 190 * Math.sin(-0.4)).toFixed(1)} Z" fill="url(#sweepG)"/></g>
    <path class="border" d="M60 30 L420 30 L420 330 L300 450 L60 450 Z" fill="none" stroke="rgba(226,200,143,.25)" stroke-dasharray="4 6"/>
    <path d="M100 276 C88 296 92 324 112 332 C130 338 138 312 134 292 C132 276 116 268 100 276 Z" fill="rgba(120,160,190,.25)" stroke="rgba(150,190,220,.35)" class="lake"/>
    <text x="64" y="356" style="fill:rgba(180,210,230,.55);font-size:10px;font-style:italic">Lake Tahoe</text>
    <path class="hwy" d="M40 220 C100 222 200 224 250 222 C300 220 330 196 345 192 C365 205 385 228 396 240" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
    <path class="hwy-flow" d="M40 220 C100 222 200 224 250 222 C300 220 330 196 345 192 C365 205 385 228 396 240" fill="none"/>
    <text x="290" y="232" style="fill:rgba(255,255,255,.3);font-size:9px">I-80</text>
    <path class="ridge-line" d="M30 420 L90 340 L130 380 L190 300 L240 360 L300 290 L360 370 L420 330" fill="none" stroke="rgba(226,200,143,.18)" stroke-width="1.2"/>
    <g class="routes">${routes}</g>
    ${dots}
  </svg>
  <div class="map-tip" aria-hidden="true"><b></b><span class="tip-county"></span><span class="tip-info"></span><span class="tip-go">${es ? 'Ver página' : 'View page'} →</span></div>
  <div class="map-legend" aria-hidden="true"><span><i class="lg-hq"></i>${es ? 'Oficina' : 'Office'}</span><span><i class="lg-dot"></i>${es ? 'Área atendida' : 'Area served'}</span><span class="lg-hint">${es ? 'Pase el cursor o toque un punto' : 'Hover or tap a pin'}</span></div>
</div>`;
}

/* ---------- 3D interactive service-area experience ---------- */
const W3 = (x, y) => [+((x - 238) * 0.52).toFixed(2), +((y - 222) * 0.52).toFixed(2)];
export function areas3d(lang, { mode = 'full', hl } = {}) {
  const es = lang === 'es';
  const areas = AREAS.map((a) => {
    const p = MAP_POS[a.id];
    const mi = MILES[a.id];
    const info = a.id === 'sparks' ? (es ? 'Nuestra oficina · 414 S Rock Blvd' : 'Our office · 414 S Rock Blvd') : a.statewide ? (es ? 'Atendemos todo el estado' : 'We serve the whole state') : mi == null ? (es ? 'Todo el condado' : 'Countywide service') : `≈ ${mi} ${es ? 'millas de nuestra oficina' : 'miles from our office'}`;
    const [x, z] = p ? W3(p[0], p[1]) : [null, null];
    return { id: a.id, name: areaLabel(a), short: a.name, county: a.county, info, url: areaPath(a, lang), cta: es ? `Ver ${a.name}` : `Explore ${a.name}`, x, z, hq: a.id === 'sparks' || undefined };
  });
  const data = {
    areas, hl: hl || null,
    lake: (() => { const [x, z] = W3(116, 304); return { x, z }; })(),
    road: [[-125, -1], ...[[40, 220], [150, 222], [250, 222], [345, 192], [396, 240]].map(([x, y]) => W3(x, y)), [112, 20]],
  };
  const groups = {};
  AREAS.forEach((a) => { (groups[a.county] = groups[a.county] || []).push(a); });
  const item = (a) => { const d = areas.find((x) => x.id === a.id); return `<a class="a3d-item${hl === a.id ? ' active' : ''}" href="${d.url}" data-area="${a.id}"><span class="a3d-dot${a.id === 'sparks' ? ' hq' : ''}"></span><span class="a3d-item-text"><b>${d.name}</b><small>${d.info}</small></span>${icon('arrowUpRight', 'a3d-go')}</a>`; };
  const panel = mode === 'full' ? `<aside class="a3d-panel">
      <label class="a3d-search">${icon('search')}<input type="search" placeholder="${es ? 'Busque su ciudad…' : 'Find your town…'}" aria-label="${es ? 'Buscar ciudad' : 'Search towns'}"></label>
      <div class="a3d-list">${Object.entries(groups).map(([county, list]) => `<div class="a3d-group"><p class="a3d-county">${county}</p>${list.map(item).join('')}</div>`).join('')}</div>
    </aside>` : '';
  return `<div class="a3d a3d-${mode}" data-area3d data-mode="${mode}">
  <script type="application/json" class="a3d-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
  ${panel}
  <div class="a3d-stage">
    <canvas class="a3d-canvas" aria-hidden="true"></canvas>
    <div class="a3d-labels"></div>
    <div class="a3d-fallback">${areaMap(lang, hl)}</div>
    <div class="a3d-loader" aria-hidden="true"><i></i><span>${es ? 'Cargando mapa 3D' : 'Loading 3D map'}</span></div>
    <div class="a3d-hint" aria-hidden="true">${icon('compass')}<span>${es ? 'Arrastre para girar · toque un faro' : 'Drag to rotate · click a beacon'}</span></div>
    <div class="a3d-controls" role="group" aria-label="${es ? 'Controles del mapa' : 'Map controls'}">
      <button type="button" data-a3d="in" aria-label="${es ? 'Acercar' : 'Zoom in'}">${icon('plus')}</button>
      <button type="button" data-a3d="out" aria-label="${es ? 'Alejar' : 'Zoom out'}"><svg class="ico" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg></button>
      <button type="button" data-a3d="spin" aria-label="${es ? 'Rotación automática' : 'Auto-rotate'}">${icon('globe')}</button>
      <button type="button" data-a3d="reset" aria-label="${es ? 'Restablecer vista' : 'Reset view'}">${icon('compass')}</button>
    </div>
    <div class="a3d-card" aria-live="polite">
      <span class="a3d-card-county">Washoe County</span>
      <b class="a3d-card-name">Sparks, NV</b>
      <span class="a3d-card-info"></span>
      <div class="a3d-card-actions"><a class="btn gold sm a3d-card-link" href="${areaPath(AREAS[0], lang)}"><span>${es ? 'Ver Sparks' : 'Explore Sparks'}</span> ${icon('arrow', 'arrow-ico')}</a><a class="btn ghost sm" href="${ROUTES.quote[lang]}">${t('quoteShort', lang)}</a></div>
    </div>
  </div>
</div>`;
}

export function areasSection(lang, { title, lead, eyebrow } = {}) {
  return `
<section class="section dark a3d-section" id="areas">
  <div class="container">
    <div class="section-head row"><div><p class="eyebrow">${eyebrow || t('areas', lang)}</p><h2 class="h2 split-words">${title || (lang === 'es' ? 'Con base en Sparks. <em>Al servicio de todo Nevada.</em>' : 'Based in Sparks. <em>Serving all of Nevada.</em>')}</h2><p class="lead">${lead || (lang === 'es' ? 'Explore el norte de Nevada en 3D: gire el mapa, pase el cursor por una ciudad y vea cómo llegamos a usted desde nuestra oficina en Sparks.' : 'Explore Northern Nevada in 3D — spin the map, hover a town and see how we reach you from our Sparks office.')}</p></div><a class="link-arrow" href="${ROUTES.areas[lang]}">${t('allAreas', lang)} ${icon('arrow')}</a></div>
    ${areas3d(lang)}
  </div>
</section>`;
}

/* Steps */
export function steps(items, cols) {
  return `<div class="steps" style="--cols:${cols || items.length}">${items.map((s, i) => `<div class="step" style="transition-delay:${i * 0.12}s"><div class="step-num"><b>${i + 1}</b></div><h3>${s.t}</h3><p>${s.d}</p></div>`).join('')}</div>`;
}

/* Feature list (icon + title + text) */
export function features(items) {
  return `<div class="feature-list" data-stagger>${items.map((f) => `<div class="feature"><span class="ico-wrap">${icon(f.icon || 'shield')}</span><div><h3>${f.t}</h3><p>${f.d}</p></div></div>`).join('')}</div>`;
}

/* Icon cards grid */
export function cards(items, cols = 3) {
  return `<div class="grid grid-${cols}" data-stagger>${items.map((c) => `<article class="card"><span class="ico-badge">${icon(c.icon || 'shield')}</span><h3>${c.t}</h3><p>${c.d}</p></article>`).join('')}</div>`;
}

/* Numbered coverage grid */
export function coverageGrid(items) {
  return `<div class="coverage-grid" data-stagger>${items.map((c, i) => `<article class="coverage"><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>${c.t}</h3><p>${c.d}</p></article>`).join('')}</div>`;
}

/* CTA band */
export function ctaBand(lang, { title, lead, quoteParam = '' } = {}) {
  return `
<section class="section tight">
  <div class="container">
    <div class="cta-band reveal">
      ${ridge('ridge')}
      <div class="cta-grid">
        <div class="on-dark">
          <p class="eyebrow">${lang === 'es' ? 'Cotización gratis · Sin compromiso' : 'Free quote · No pressure'}</p>
          <h2 class="h2">${title || (lang === 'es' ? '¿Listo para encontrar la <em>cobertura correcta?</em>' : 'Ready to find the <em>right coverage?</em>')}</h2>
          <p class="lead">${lead || (lang === 'es' ? 'Cuéntenos lo que necesita proteger. Comparamos varias aseguradoras y le explicamos sus opciones con claridad — en inglés o español.' : 'Tell us what you need to protect. We’ll compare multiple carriers and explain your options clearly — in English or Spanish.')}</p>
          <div class="btn-row mt-3">${btnQuote(lang, quoteParam)}</div>
        </div>
        <div class="cta-contacts">
          <a class="cta-contact" href="tel:${SITE.phoneIntl}">${icon('phone')}<span><small>${t('callUs', lang)}</small><b>${SITE.phone}</b></span></a>
          <a class="cta-contact" href="mailto:${SITE.email}">${icon('mail')}<span><small>${t('email', lang)}</small><b>${SITE.email}</b></span></a>
          <a class="cta-contact" href="${SITE.mapsUrl}" target="_blank" rel="noopener">${icon('pin')}<span><small>${lang === 'es' ? 'Visítenos' : 'Visit us'}</small><b>${SITE.address.street}, ${SITE.address.city}</b></span></a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* Contact form (fields mirror the original site's form + interest select) */
export function contactForm(lang, { id = 'contact-form', compact } = {}) {
  const es = lang === 'es';
  const opts = SERVICES.map((s) => `<option value="${L(s.name, 'en')}">${L(s.name, lang)}</option>`).join('');
  return `
<form class="form" id="${id}" action="${SITE.formEndpoint}" method="post" data-form="contact" novalidate>
  <div class="form-row">
    <div class="field"><label for="${id}-fn">${es ? 'Nombre' : 'First name'}</label><input class="input" id="${id}-fn" name="first_name" autocomplete="given-name" required><span class="field-error" aria-live="polite"></span></div>
    <div class="field"><label for="${id}-ln">${es ? 'Apellido' : 'Last name'}</label><input class="input" id="${id}-ln" name="last_name" autocomplete="family-name" required><span class="field-error" aria-live="polite"></span></div>
  </div>
  <div class="form-row">
    <div class="field"><label for="${id}-ph">${es ? 'Teléfono' : 'Phone number'}</label><input class="input" id="${id}-ph" name="phone" type="tel" autocomplete="tel" inputmode="tel" required><span class="field-error" aria-live="polite"></span></div>
    <div class="field"><label for="${id}-em">${es ? 'Correo electrónico' : 'Email'}</label><input class="input" id="${id}-em" name="email" type="email" autocomplete="email" required><span class="field-error" aria-live="polite"></span></div>
  </div>
  ${compact ? '' : `<div class="field"><label for="${id}-int">${es ? '¿En qué le podemos ayudar?' : 'What can we help with?'} <span class="opt">(${es ? 'opcional' : 'optional'})</span></label><select class="select" id="${id}-int" name="interest"><option value="">${es ? 'Elija una opción' : 'Choose one'}</option>${opts}<option value="Other">${es ? 'Otro / no estoy seguro' : 'Other / not sure'}</option></select></div>`}
  <div class="field"><label for="${id}-msg">${es ? 'Mensaje' : 'Message'} <span class="opt">(${es ? 'opcional' : 'optional'})</span></label><textarea class="textarea" id="${id}-msg" name="message" rows="4"></textarea></div>
  <input class="hp" type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
  ${consents(lang, id)}
  <div class="form-status" role="status" aria-live="polite"></div>
  <button class="btn lg block" type="submit"><span class="spinner"></span>${es ? 'Enviar mensaje' : 'Send message'} ${icon('arrow', 'arrow-ico')}</button>
</form>`;
}

export function consents(lang, id) {
  const es = lang === 'es';
  return `
  <label class="consent"><input type="checkbox" name="sms_consent" value="yes"><span>${es
    ? `Acepto recibir mensajes de texto de marketing, como recordatorios de citas y ofertas, de Feel Good Insurance LLC al número que proporcioné, incluso mediante marcador automático. Entiendo que mi consentimiento no es condición de compra. Pueden aplicarse tarifas de mensajes y datos. La frecuencia varía. Responda HELP para ayuda o STOP para cancelar. <a href="${ROUTES.privacy.es}">Política de Privacidad</a> y <a href="${ROUTES.terms.es}">Términos</a>.`
    : `I consent to receive marketing text messages, such as appointment requests and sales reminders, from Feel Good Insurance LLC at the phone number I provided, including messages sent via auto dialer. I understand that my consent is not a condition of purchase. Msg &amp; data rates may apply. Msg frequency varies. Reply HELP for assistance or STOP to opt out of receiving messages. <a href="${ROUTES.privacy.en}">Privacy Policy</a> &amp; <a href="${ROUTES.terms.en}">Terms</a> (where applicable).`}</span></label>
  <label class="consent"><input type="checkbox" name="email_consent" value="yes"><span>${es ? 'Acepto recibir correos electrónicos y llamadas de marketing.' : 'I consent to receive marketing emails and phone communications.'}</span></label>`;
}

/* Online quote partner buttons */
export function partnerQuote(lang, key) {
  const url = SITE.partners[key];
  if (!url) return '';
  return `<a class="btn ghost lg" href="${url}" target="_blank" rel="noopener">${t('onlineQuote', lang)} ${icon('external')}</a>`;
}

/* Blog cards */
import { POSTS, CATS, postPath } from '../content/posts/index.mjs';
export function fmtDate(iso, lang) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString(lang === 'es' ? 'es-US' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
export function postCard(p, lang, { featured } = {}) {
  return `<article class="post-card${featured ? ' featured' : ''}" data-cat="${p.cat}">
    <a class="thumb" href="${postPath(p, lang)}" tabindex="-1" aria-hidden="true">${img(p.img, { alt: '', sizes: featured ? '(max-width: 960px) 100vw, 60vw' : '(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw', widths: [480, 800, 1200] })}</a>
    <div class="body">
      <div class="post-meta"><span class="cat">${L(CATS[p.cat], lang)}</span><time datetime="${p.date}">${fmtDate(p.date, lang)}</time><span>· ${p.mins} ${t('minutesRead', lang)}</span></div>
      <h3><a href="${postPath(p, lang)}">${L(p.title, lang)}</a></h3>
      <p>${L(p.desc, lang)}</p>
      <a class="link-arrow" href="${postPath(p, lang)}" aria-label="${t('readMore', lang)}: ${esc(L(p.title, lang))}">${t('readMore', lang)} ${icon('arrow')}</a>
    </div>
  </article>`;
}
export function latestPosts(lang, n = 3, filter) {
  const list = POSTS.filter((p) => !filter || filter(p)).slice(0, n);
  return `<div class="post-grid" data-stagger>${list.map((p) => postCard(p, lang)).join('')}</div>`;
}
