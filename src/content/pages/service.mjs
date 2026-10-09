import { SITE, ROUTES, SERVICES, AREAS, t, L, servicePath, areaPath } from '../site.mjs';
import { icon } from '../../lib/icons.mjs';
import { img, ogImage } from '../../lib/images.mjs';
import { pageHero, sectionHead, cards, coverageGrid, steps, reviews, faqSection, ctaBand, serviceLinks, btnQuote, btnCall, partnerQuote, carriers, latestPosts } from '../../lib/components.mjs';
import { faqSchema } from '../../lib/layout.mjs';
import { POSTS } from '../posts/index.mjs';

const data = {};
for (const s of SERVICES) data[s.id] = (await import(`../services/${s.id}.mjs`)).default;

export default function service(lang, s) {
  const d = data[s.id][lang];
  const es = lang === 'es';
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('services', lang), url: ROUTES.services[lang] }, { name: L(s.name, lang), url: servicePath(s, lang) }];
  const quoteParam = `?type=${s.id}`;
  const related = POSTS.filter((p) => p.service === s.id);

  const main = `
${pageHero({
    lang, crumbs, eyebrow: d.eyebrow, title: d.h1, lead: d.lead, image: s.img, imageAlt: d.heroAlt,
    actions: `${btnQuote(lang, quoteParam)}${d.partner ? partnerQuote(lang, d.partner) : btnCall(lang)}`,
    chips: d.chips || [['checkCircle', es ? 'Cotización gratis' : 'Free quotes'], ['scale', es ? 'Varias aseguradoras' : 'Multiple carriers'], ['translate', es ? 'English & Español' : 'Se habla español']],
  })}

<section class="section paper">
  <div class="container split">
    <div>
      <p class="eyebrow">${d.intro.eyebrow}</p>
      <h2 class="h2 split-words">${d.intro.title}</h2>
      <div class="stack mt-2 reveal">${d.intro.paras.map((p, i) => `<p class="${i === 0 ? 'lead' : 'muted'}">${p}</p>`).join('')}</div>
      ${d.intro.checks ? `<ul class="checks two mt-3" data-stagger>${d.intro.checks.map((c) => `<li>${icon('checkCircle')}${c}</li>`).join('')}</ul>` : ''}
      ${d.partner ? `<div class="btn-row mt-3">${btnCall(lang, '')}</div>` : ''}
    </div>
    <div class="frame-stack reveal">
      <div class="frame tall">${img(d.intro.img, { alt: d.intro.alt, sizes: '(max-width: 860px) 90vw, 45vw', widths: [480, 800, 1200] })}</div>
      ${d.intro.img2 ? `<div class="frame small">${img(d.intro.img2, { alt: d.intro.alt2 || '', sizes: '240px', widths: [480] })}</div>` : ''}
      <div class="frame-badge"><b>${SITE.rating.value}</b><span>${es ? 'en Google' : 'Google rating'}</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: d.why.eyebrow || (es ? 'Por qué importa' : 'Why it matters'), title: d.why.title, lead: d.why.lead })}
    ${cards(d.why.items, 3)}
  </div>
</section>

${carriers(lang)}

<section class="section paper">
  <div class="container">
    ${sectionHead({ eyebrow: d.coverage.eyebrow || (es ? 'Coberturas' : 'Coverage explained'), title: d.coverage.title, lead: d.coverage.lead })}
    ${coverageGrid(d.coverage.items)}
  </div>
</section>

${d.extra ? extraSection(d.extra, lang) : ''}

<section class="section dark">
  <div class="container">
    ${sectionHead({ eyebrow: es ? 'Cómo trabajamos' : 'How to work with us', title: d.steps.title, lead: d.steps.lead })}
    ${steps(d.steps.items)}
    ${d.mission ? `<div class="grid grid-2 mt-4" data-stagger><div class="card"><span class="ico-badge">${icon('compass')}</span><h3>${es ? 'Nuestra visión' : 'Our vision'}</h3><p>${d.mission[0]}</p></div><div class="card"><span class="ico-badge">${icon('diamond')}</span><h3>${es ? 'Nuestra misión' : 'Our mission'}</h3><p>${d.mission[1]}</p></div></div>` : ''}
  </div>
</section>

${d.tool || ''}

${reviews(lang, { title: es ? 'Asegurando futuros, <em>ganando confianza</em>' : 'Securing futures, <em>earning trust</em>', lead: es ? 'Nuestra mayor satisfacción son los clientes que nos confían sus decisiones de seguro más importantes.' : 'Our greatest satisfaction comes from clients who trust us with their most important insurance decisions.' })}

${faqSection(lang, d.faqs, { title: d.faqTitle })}

<section class="section sand">
  <div class="container">
    <div class="grid grid-2" style="align-items:start">
      <div>
        <p class="eyebrow">${t('areas', lang)}</p>
        <h2 class="h3">${es ? `${L(s.name, lang)} en todo el norte de Nevada` : `${L(s.name, lang)} across Northern Nevada`}</h2>
        <p class="muted mt-1">${es ? `Atendemos desde nuestra oficina en ${SITE.address.street}, Sparks — y en todo el estado por teléfono.` : `Served from our office at ${SITE.address.street}, Sparks — and statewide by phone.`}</p>
        <div class="area-cloud mt-2">${AREAS.map((a) => `<a class="area-pill" href="${areaPath(a, lang)}">${icon('pin')}${a.name}</a>`).join('')}</div>
      </div>
      <div>
        <p class="eyebrow">${es ? 'Otros servicios' : 'Related services'}</p>
        <h2 class="h3">${es ? 'Todo en una sola agencia' : 'Everything under one roof'}</h2>
        <div class="mt-2">${serviceLinks(lang, s.id).replace('class="svc-list"', 'class="svc-list two"')}</div>
      </div>
    </div>
  </div>
</section>

${related.length ? `<section class="section paper"><div class="container">${sectionHead({ eyebrow: es ? 'Guías relacionadas' : 'Related guides', title: es ? 'Aprenda antes <em>de decidir</em>' : 'Learn before <em>you decide</em>' })}${latestPosts(lang, 3, (p) => p.service === s.id)}</div></section>` : ''}

${ctaBand(lang, { title: d.cta.title, lead: d.cta.lead, quoteParam })}`;

  return {
    title: d.title,
    description: d.description,
    header: 'dark',
    ogImage: ogImage(s.img),
    breadcrumbs: crumbs,
    lastmod: d.lastmod,
    schema: [
      faqSchema(d.faqs),
      { '@context': 'https://schema.org', '@type': 'Service', name: L(s.name, lang), serviceType: L(s.name, 'en'), description: d.description, provider: { '@id': SITE.url + '/#agency' }, areaServed: { '@type': 'State', name: 'Nevada' }, url: SITE.url + servicePath(s, lang), inLanguage: es ? 'es-US' : 'en-US' },
    ],
    main,
  };
}

function extraSection(x, lang) {
  if (x.type === 'split') {
    return `<section class="section">
  <div class="container split${x.reverse ? ' reverse' : ''}">
    <div class="frame wide reveal-img">${img(x.img, { alt: x.alt || '', sizes: '(max-width: 860px) 100vw, 50vw', widths: [480, 800, 1200] })}</div>
    <div>
      <p class="eyebrow">${x.eyebrow}</p>
      <h2 class="h2 split-words">${x.title}</h2>
      <div class="stack mt-2 reveal">${(x.paras || []).map((p) => `<p class="muted">${p}</p>`).join('')}</div>
      ${x.list ? `<ul class="checks mt-2" data-stagger>${x.list.map((c) => `<li>${icon('checkCircle')}<span>${c}</span></li>`).join('')}</ul>` : ''}
      ${x.button || ''}
    </div>
  </div>
</section>`;
  }
  // cards variant
  return `<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: x.eyebrow, title: x.title, lead: x.lead })}
    ${cards(x.items, x.cols || 3)}
    ${x.note ? `<p class="muted mt-3 max-60">${x.note}</p>` : ''}
  </div>
</section>`;
}
