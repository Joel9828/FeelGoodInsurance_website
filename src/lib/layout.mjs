import { SITE, ROUTES, SERVICES, AREAS, TEAM, UI, t, L, servicePath, areaPath, areaLabel } from '../content/site.mjs';
import { icon, iconSprite } from './icons.mjs';
import { fixed, img } from './images.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => SITE.url + p;

const LOGO = () => fixed('image.png', 96, 96, 'webp', 'fgi-logo');

function jsonLd(objs) {
  return objs.filter(Boolean).map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n');
}

export function agencySchema(lang) {
  const o = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': SITE.url + '/#agency',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url + '/',
    logo: abs(fixed('image.png', 512, 512, 'png', 'fgi-logo')),
    image: abs(fixed('10.webp', 1200, 900, 'jpeg', 'fgi-storefront')),
    telephone: SITE.phoneIntl,
    email: SITE.email,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.city, addressRegion: SITE.address.region, postalCode: SITE.address.zip, addressCountry: SITE.address.country },
    hasMap: SITE.mapsUrl,
    areaServed: AREAS.map((a) => ({ '@type': a.statewide ? 'State' : 'City', name: a.statewide ? 'Nevada' : `${a.name}, NV` })),
    knowsLanguage: ['en', 'es'],
    sameAs: Object.values(SITE.social).concat(SITE.bbb.split('#')[0]),
    makesOffer: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: L(s.name, lang), url: abs(servicePath(s, lang)) } })),
    employee: TEAM.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: L(m.role, 'en') })),
  };
  if (SITE.hours) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    o.openingHoursSpecification = SITE.hours.map((h, i) => h && { '@type': 'OpeningHoursSpecification', dayOfWeek: days[i], opens: h[0], closes: h[1] }).filter(Boolean);
  }
  return o;
}

export function breadcrumbSchema(items) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.url) })) };
}

export function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } })) };
}

/* ---------- Header ---------- */
function header(page) {
  const { lang } = page;
  const cur = (p) => (page.path === p ? ' aria-current="page"' : '');
  const groups = [['personal', t('personal', lang)], ['business', t('business', lang)], ['documents', t('documents', lang)]];
  const mega = groups.map(([g, label]) => `<div class="mega-col"><h4>${label}</h4>${SERVICES.filter((s) => s.group === g).map((s) => `<a class="mega-item" href="${servicePath(s, lang)}"><span class="ico-wrap">${icon(s.icon)}</span><span><b>${L(s.name, lang)}</b><span>${L(s.blurb, lang)}</span></span></a>`).join('')}</div>`).join('');
  const megaFoot = `<div class="mega-foot"><p>${lang === 'es' ? '<b>¿No sabe qué necesita?</b> Le ayudamos a compararlo todo en una llamada.' : '<b>Not sure what you need?</b> We’ll compare it all in one call.'}</p><a class="btn gold sm" href="${ROUTES.quote[lang]}">${t('getQuote', lang)} ${icon('arrow', 'arrow-ico')}</a></div>`;
  const areas = AREAS.map((a) => `<a href="${areaPath(a, lang)}">${icon('pin')}${a.statewide ? a.name : a.name}</a>`).join('');
  const otherLang = lang === 'en' ? 'es' : 'en';
  return `
<a class="skip-link" href="#main">${t('skip', lang)}</a>
<header class="site-header ${page.header === 'solid' ? '' : 'is-transparent'} ${page.header === 'dark' ? 'on-dark-hero' : ''}">
  <div class="container bar">
    <a class="brand" href="${ROUTES.home[lang]}">
      <img class="brand-logo" src="${LOGO()}" width="46" height="46" alt="">
      <span class="brand-text"><b>Feel Good</b><small>Insurance · Sparks NV</small></span>
    </a>
    <nav aria-label="${lang === 'es' ? 'Principal' : 'Main'}">
      <ul class="nav">
        <li class="has-mega"><a class="nav-link" href="${ROUTES.services[lang]}" aria-expanded="false" aria-haspopup="true">${t('services', lang)} ${icon('chevron')}</a>
          <div class="mega"><div class="mega-grid">${mega}</div>${megaFoot}</div></li>
        <li class="has-mega"><a class="nav-link" href="${ROUTES.areas[lang]}" aria-expanded="false" aria-haspopup="true">${t('areas', lang)} ${icon('chevron')}</a>
          <div class="mega areas"><div class="mega-areas">${areas}</div></div></li>
        <li><a class="nav-link" href="${ROUTES.about[lang]}"${cur(ROUTES.about[lang])}>${t('about', lang)}</a></li>
        <li><a class="nav-link" href="${ROUTES.blog[lang]}"${cur(ROUTES.blog[lang])}>${t('blog', lang)}</a></li>
        <li><a class="nav-link" href="${ROUTES.contact[lang]}"${cur(ROUTES.contact[lang])}>${t('contact', lang)}</a></li>
      </ul>
    </nav>
    <div class="header-actions">
      <a class="lang-switch" href="${page.alt[otherLang]}" hreflang="${otherLang}" lang="${otherLang}" data-lang-link="${otherLang}" title="${t('switchTo', lang)}">${icon('globe')}${t('switchToShort', lang)}</a>
      <a class="header-phone" href="tel:${SITE.phoneIntl}">${icon('phone')}<span>${SITE.phone}</span></a>
      <a class="btn sm" href="${ROUTES.quote[lang]}">${t('quoteShort', lang)}</a>
      <button class="menu-toggle" type="button" data-drawer aria-controls="drawer" aria-expanded="false" aria-label="${t('menu', lang)}">${icon('menu')}</button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" aria-hidden="true" role="dialog" aria-modal="true" aria-label="${t('menu', lang)}">
  <div class="drawer-top">
    <a class="brand" href="${ROUTES.home[lang]}"><img class="brand-logo" src="${LOGO()}" width="46" height="46" alt=""><span class="brand-text"><b>Feel Good</b><small>Insurance · Sparks NV</small></span></a>
    <button class="menu-toggle" style="display:inline-flex" type="button" data-drawer aria-label="${t('close', lang)}">${icon('x')}</button>
  </div>
  <div class="drawer-body">
    <ul class="drawer-nav">
      <li><a href="${ROUTES.home[lang]}">${t('home', lang)}</a></li>
      <li><details><summary>${t('services', lang)} ${icon('plus')}</summary><div class="drawer-sub">${SERVICES.map((s) => `<a href="${servicePath(s, lang)}">${L(s.name, lang)}</a>`).join('')}<a href="${ROUTES.services[lang]}">${t('allServices', lang)} →</a></div></details></li>
      <li><details><summary>${t('areas', lang)} ${icon('plus')}</summary><div class="drawer-sub">${AREAS.map((a) => `<a href="${areaPath(a, lang)}">${a.name}</a>`).join('')}</div></details></li>
      <li><a href="${ROUTES.about[lang]}">${t('aboutUs', lang)}</a></li>
      <li><a href="${ROUTES.gallery[lang]}">${t('gallery', lang)}</a></li>
      <li><a href="${ROUTES.blog[lang]}">${t('blog', lang)}</a></li>
      <li><a href="${ROUTES.contact[lang]}">${t('contact', lang)}</a></li>
    </ul>
  </div>
  <div class="drawer-foot">
    <a class="btn gold block" href="${ROUTES.quote[lang]}">${t('getQuote', lang)} ${icon('arrow', 'arrow-ico')}</a>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <a class="btn ghost block" href="tel:${SITE.phoneIntl}">${icon('phone')} ${t('call', lang)}</a>
      <a class="btn ghost block" href="${page.alt[otherLang]}" hreflang="${otherLang}" data-lang-link="${otherLang}">${icon('globe')} ${t('switchTo', lang)}</a>
    </div>
  </div>
</div>`;
}

/* ---------- Footer ---------- */
const ridge = (cls = 'ridge') => `<svg class="${cls}" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M0 110 L120 70 L190 92 L300 34 L380 78 L470 52 L560 96 L660 20 L760 74 L840 44 L930 88 L1040 30 L1130 70 L1220 50 L1310 90 L1440 60"/><path d="M0 118 L160 92 L260 104 L360 72 L470 98 L600 64 L720 102 L860 70 L980 104 L1100 76 L1230 100 L1340 82 L1440 96" opacity=".5"/></svg>`;
export { ridge };

function footer(page) {
  const { lang } = page;
  const col = (title, links) => `<div><h2 class="f-title">${title}</h2><ul>${links.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`;
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="${ROUTES.home[lang]}"><img class="brand-logo" src="${LOGO()}" width="46" height="46" alt="" loading="lazy"><span class="brand-text"><b>Feel Good</b><small>Insurance · Sparks NV</small></span></a>
        <p>${t('footerAbout', lang)}</p>
        <div class="socials">
          <a href="${SITE.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
          <a href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
          <a href="${SITE.social.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${icon('tiktok')}</a>
        </div>
        <a class="bbb-link" href="${SITE.bbb}" target="_blank" rel="noopener" aria-label="${t('bbb', lang)}">${img('blue-seal-293-61-bbb-90049891.png', { alt: t('bbb', lang), widths: [293], sizes: '170px' })}</a>
      </div>
      ${col(t('services', lang), SERVICES.map((s) => [servicePath(s, lang), L(s.name, lang)]))}
      ${col(t('quickLinks', lang), [[ROUTES.about[lang], t('aboutUs', lang)], [ROUTES.areas[lang], t('areas', lang)], [ROUTES.gallery[lang], t('gallery', lang)], [ROUTES.blog[lang], t('blog', lang)], [ROUTES.quote[lang], t('getQuote', lang)], [ROUTES.contact[lang], t('contact', lang)]])}
      <div>
        <h2 class="f-title">${t('getInTouch', lang)}</h2>
        <ul class="footer-contact">
          <li>${icon('pin')}<a href="${SITE.mapsUrl}" target="_blank" rel="noopener">${SITE.address.street}<br>${SITE.address.city}, ${SITE.address.region} ${SITE.address.zip}</a></li>
          <li>${icon('phone')}<a href="tel:${SITE.phoneIntl}">${SITE.phone}</a></li>
          <li>${icon('mail')}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>${icon('globe')}<span>${lang === 'es' ? 'Atendemos en inglés y español' : 'English & Spanish spoken'}</span></li>
        </ul>
      </div>
    </div>
    <p class="footer-legal">${t('licensedNote', lang)}</p>
  </div>
  <div class="footer-word" aria-hidden="true">Feel Good</div>
  <div class="container footer-bottom">
    <span>© <span data-year>${new Date().getFullYear()}</span> ${SITE.legalName}. ${t('rights', lang)}</span>
    <nav aria-label="Legal"><a href="${ROUTES.privacy[lang]}">${t('privacy', lang)}</a><a href="${ROUTES.terms[lang]}">${t('terms', lang)}</a><a href="${page.alt[lang === 'en' ? 'es' : 'en']}" hreflang="${lang === 'en' ? 'es' : 'en'}" data-lang-link="${lang === 'en' ? 'es' : 'en'}">${t('switchTo', lang)}</a></nav>
  </div>
</footer>`;
}

/* ---------- Floating UI ---------- */
function floating(page) {
  const { lang } = page;
  const faqs = lang === 'es' ? [
    ['¿Cobran por una cotización?', 'No. Las cotizaciones son gratis y sin compromiso. Comparamos varias aseguradoras por usted.'],
    ['¿Pueden hacer mi SR-22?', 'Sí. Presentamos el SR-22 electrónicamente ante el DMV de Nevada y le ayudamos a reinstalar su licencia.'],
    ['¿Necesito cita para notaría o DMV?', 'Puede visitarnos sin cita, pero le recomendamos llamar antes para confirmar disponibilidad.'],
  ] : [
    ['Do you charge for quotes?', 'No. Quotes are free and no-pressure. We compare multiple carriers for you.'],
    ['Can you file my SR-22?', 'Yes. We file SR-22s electronically with the Nevada DMV and help with license reinstatement.'],
    ['Do I need an appointment for notary or DMV help?', 'Walk-ins are welcome, but we recommend calling ahead to confirm availability.'],
  ];
  const team = TEAM.map((m) => `<img src="${fixed(m.img, 80, 80, 'webp', 'avatar-' + m.name.toLowerCase().replace(/\s+/g, '-'))}" width="40" height="40" alt="" loading="lazy">`).join('');
  const sms = lang === 'es' ? 'Hola, me gustaría una cotización de seguro.' : 'Hi! I would like an insurance quote.';
  return `
<div class="mobile-bar" aria-label="${lang === 'es' ? 'Acciones rápidas' : 'Quick actions'}">
  <a href="tel:${SITE.phoneIntl}">${icon('phone')}${t('call', lang)}</a>
  <a href="sms:${SITE.phoneIntl}?&body=${encodeURIComponent(sms)}">${icon('sms')}${t('text', lang)}</a>
  <a class="primary" href="${ROUTES.quote[lang]}">${icon('sparkle')}${t('quoteShort', lang)}</a>
</div>
<div class="help-fab">
  <div class="help-panel" id="help-panel" role="dialog" aria-label="${t('helpTitle', lang)}">
    <div class="help-head"><div class="people">${team}</div><h2>${t('helpTitle', lang)}</h2><p>${t('helpSub', lang)}</p></div>
    <div class="help-body">
      <a class="help-action" href="tel:${SITE.phoneIntl}"><span class="ico-wrap">${icon('phone')}</span><span>${t('callUs', lang)}<small>${SITE.phone}</small></span></a>
      <a class="help-action" href="sms:${SITE.phoneIntl}?&body=${encodeURIComponent(sms)}"><span class="ico-wrap">${icon('sms')}</span><span>${lang === 'es' ? 'Envíenos un mensaje de texto' : 'Send us a text'}<small>${lang === 'es' ? 'Respuesta rápida en horario de oficina' : 'Quick replies during office hours'}</small></span></a>
      <a class="help-action" href="${ROUTES.quote[lang]}"><span class="ico-wrap">${icon('sparkle')}</span><span>${t('getQuote', lang)}<small>${lang === 'es' ? '2 minutos · sin compromiso' : '2 minutes · no obligation'}</small></span></a>
      <a class="help-action" href="mailto:${SITE.email}"><span class="ico-wrap">${icon('mail')}</span><span>${t('email', lang)}<small>${SITE.email}</small></span></a>
      <div class="help-faq"><h3>${lang === 'es' ? 'Respuestas rápidas' : 'Quick answers'}</h3>${faqs.map(([q, a]) => `<details><summary>${q}${icon('chevron')}</summary><p>${a}</p></details>`).join('')}</div>
    </div>
  </div>
  <button class="help-btn" type="button" aria-controls="help-panel" aria-expanded="false" aria-label="${t('helpTitle', lang)}">${icon('message')}</button>
</div>
<div class="lang-toast" role="status">
  <span>${t('langBannerText', lang)}</span>
  <a class="btn gold sm" href="${page.alt[lang === 'en' ? 'es' : 'en']}" hreflang="${lang === 'en' ? 'es' : 'en'}" data-lang-link="${lang === 'en' ? 'es' : 'en'}">${t('langBannerCta', lang)}</a>
  <button class="x" type="button" aria-label="${t('close', lang)}">${icon('x')}</button>
</div>`;
}

/* ---------- Document ---------- */
export function renderPage(page) {
  const { lang } = page;
  const canonical = abs(page.path);
  // keep meta descriptions within ~160 characters, ending on a natural break
  if (page.description.length > 160) {
    const cut = page.description.slice(0, 160);
    const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '));
    const comma = cut.lastIndexOf(', ');
    page.description = end > 90 ? cut.slice(0, end + 1) : comma > 90 ? cut.slice(0, comma) + '.' : cut.slice(0, cut.lastIndexOf(' ')) + '…';
  }
  // keep titles within ~62 chars so Google doesn't truncate them; drop the brand suffix first
  let title = page.title;
  if (title.length > 62 && title.endsWith(' | Feel Good Insurance')) title = title.slice(0, -' | Feel Good Insurance'.length);
  const og = page.ogImage ? abs(page.ogImage) : abs(fixed('Professional-Insurance-Services-in-Sparks-NV-1.webp', 1200, 630, 'jpeg', 'og-default'));
  const i18n = {
    close: t('close', lang), gallery: t('gallery', lang), phone: SITE.phone, phoneIntl: SITE.phoneIntl,
    errRequired: lang === 'es' ? 'Este campo es obligatorio.' : 'This field is required.',
    errEmail: lang === 'es' ? 'Escriba un correo válido.' : 'Please enter a valid email.',
    errPhone: lang === 'es' ? 'Escriba un teléfono de 10 dígitos.' : 'Please enter a 10-digit phone number.',
    errFormat: lang === 'es' ? 'Revise el formato (ej. 89431).' : 'Please check the format (e.g. 89431).',
    errPick: lang === 'es' ? 'Elija al menos un tipo de cobertura.' : 'Please choose at least one coverage type.',
    errSend: lang === 'es' ? 'No pudimos enviar su mensaje. Llámenos al' : 'We couldn’t send your message. Please call us at',
    sent: lang === 'es' ? '¡Gracias! Recibimos su mensaje y le responderemos pronto.' : 'Thank you! We received your message and will get back to you shortly.',
    openNow: lang === 'es' ? 'Abierto ahora' : 'Open now', closedNow: lang === 'es' ? 'Cerrado ahora' : 'Closed now',
    mapTitle: lang === 'es' ? 'Mapa de nuestra oficina' : 'Map to our office', copied: lang === 'es' ? '¡Enlace copiado!' : 'Link copied!',
  };
  const body = `${header(page)}
<main id="main" tabindex="-1">
${page.main}
</main>
${footer(page)}
${floating(page)}`;
  const sprite = iconSprite();
  const schema = [agencySchema(lang), page.breadcrumbs ? breadcrumbSchema(page.breadcrumbs) : null, ...(page.schema || [])];
  return `<!doctype html>
<html lang="${lang === 'es' ? 'es-US' : 'en-US'}" class="no-js" data-ga="${SITE.ga4}" data-v="${page.v}" data-gads="${SITE.googleAds}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en-US" href="${abs(page.alt.en)}">
<link rel="alternate" hreflang="es-US" href="${abs(page.alt.es)}">
<link rel="alternate" hreflang="x-default" href="${abs(page.alt.en)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#0e0e0c">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:locale" content="${lang === 'es' ? 'es_US' : 'en_US'}">
<meta property="og:locale:alternate" content="${lang === 'es' ? 'en_US' : 'es_US'}">
<meta property="og:title" content="${esc(page.ogTitle || title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.ogTitle || title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${og}">
${page.extraMeta || ''}
<link rel="icon" href="${fixed('image.png', 32, 32, 'png', 'favicon')}" sizes="32x32">
<link rel="icon" href="${fixed('image.png', 192, 192, 'png', 'favicon')}" sizes="192x192">
<link rel="apple-touch-icon" href="${fixed('image.png', 180, 180, 'png', 'apple-touch-icon')}">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${page.preload || ''}
<style>${page.css}</style>
<script defer src="/assets/js/main.js?v=${page.v}"></script>
${jsonLd(schema)}
</head>
<body class="${page.bodyClass || ''}">
${sprite}
${body}
<script type="application/json" id="i18n">${JSON.stringify(i18n)}</script>
${page.scripts || ''}
</body>
</html>`;
}
