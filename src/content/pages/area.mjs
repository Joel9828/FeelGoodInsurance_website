import { SITE, ROUTES, AREAS, t, L, areaPath, areaLabel } from '../site.mjs';
import { icon } from '../../lib/icons.mjs';
import { img, ogImage } from '../../lib/images.mjs';
import { pageHero, sectionHead, serviceTiles, reviews, faqSection, ctaBand, btnQuote, btnCall, areas3d, cards } from '../../lib/components.mjs';
import { faqSchema } from '../../lib/layout.mjs';
import A1 from '../areas/a1.mjs';
import A2 from '../areas/a2.mjs';
import A3 from '../areas/a3.mjs';

const DATA = { ...A1, ...A2, ...A3 };

export default function area(lang, a) {
  const D = DATA[a.id];
  if (!D) return null;
  const d = D[lang];
  const es = lang === 'es';
  const place = areaLabel(a);
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('areas', lang), url: ROUTES.areas[lang] }, { name: place, url: areaPath(a, lang) }];
  const nearby = AREAS.filter((x) => x.id !== a.id);

  const main = `
${pageHero({
    lang, crumbs, eyebrow: d.eyebrow, title: d.h1, lead: d.lead, image: D.hero, imageAlt: d.heroAlt || '',
    actions: `${btnQuote(lang)}${btnCall(lang)}`,
    chips: [['pin', es ? 'Oficina local en Sparks' : 'Local office in Sparks'], ['shield', es ? 'SR-22 electrónico' : 'Electronic SR-22 filing'], ['scale', es ? 'Varias aseguradoras' : 'Multiple carriers'], ['translate', es ? 'English & Español' : 'Se habla español']],
  })}

<section class="section paper">
  <div class="container split">
    <div>
      <p class="eyebrow">${es ? 'Seguro de auto' : 'Auto insurance'} · ${a.name}</p>
      <h2 class="h2 split-words">${d.auto.title}</h2>
      <p class="lead mt-2 reveal">${d.auto.para}</p>
      <ul class="checks two mt-3" data-stagger>${d.auto.bullets.map((b) => `<li>${icon('checkCircle')}${b}</li>`).join('')}</ul>
      <div class="btn-row mt-3"><a class="btn" href="${es ? '/es/servicios/seguro-de-auto/' : '/services/auto-insurance/'}">${es ? 'Seguro de auto' : 'Explore auto insurance'} ${icon('arrow', 'arrow-ico')}</a></div>
    </div>
    <div class="frame tall reveal-img">${img(D.autoImg, { alt: d.autoAlt || '', sizes: '(max-width: 860px) 100vw, 45vw', widths: [480, 800, 1200] })}</div>
  </div>
</section>

<section class="section">
  <div class="container split reverse">
    <div>
      <p class="eyebrow">${es ? 'Seguro de casa' : 'Home insurance'} · ${a.name}</p>
      <h2 class="h2 split-words">${d.home.title}</h2>
      <p class="lead mt-2 reveal">${d.home.para}</p>
      <ul class="checks mt-3" data-stagger>
        <li>${icon('shield')}${es ? 'Nuestras pólizas protegen su hogar contra riesgos graves.' : 'Policies that guard your home against severe threats.'}</li>
        <li>${icon('handshake')}${es ? 'Apoyo dedicado con sus reclamos cuando lo necesite.' : 'Dedicated claims support whenever you need it.'}</li>
      </ul>
      <div class="btn-row mt-3"><a class="btn ghost" href="${es ? '/es/servicios/seguro-de-casa/' : '/services/homeowners-insurance/'}">${es ? 'Seguro de casa' : 'Explore home insurance'} ${icon('arrow', 'arrow-ico')}</a></div>
    </div>
    <div class="frame tall reveal-img">${img(D.homeImg, { alt: d.homeAlt || '', sizes: '(max-width: 860px) 100vw, 45vw', widths: [480, 800, 1200] })}</div>
  </div>
</section>

<section class="section sand">
  <div class="container">
    ${sectionHead({ eyebrow: es ? `Seguros para ${a.name}` : `Coverage for ${a.name}`, title: es ? 'Soluciones para <em>cada etapa de la vida</em>' : 'Reliable solutions for <em>every stage of life</em>', lead: es ? 'Ya sea que planee el futuro de su familia, se prepare para el retiro o proteja su negocio, tenemos opciones a su medida.' : 'Whether you’re planning your family’s future, preparing for retirement or protecting your business, we have options built around your goals.' })}
    ${serviceTiles(lang, ['auto', 'home', 'commercial', 'life', 'renters', 'motorcycle'])}
  </div>
</section>

<section class="section dark">
  <div class="container">
    ${sectionHead({ eyebrow: es ? 'DMV y notaría' : 'DMV & notary', title: d.docs.title, lead: d.docs.para })}
    ${cards(es ? [
      { icon: 'file', t: 'Registro rápido', d: 'Renovamos placas y registros locales y hacemos traspasos de título por usted.' },
      { icon: 'stamp', t: 'Notario público certificado', d: 'Notarizamos poderes, contratos, declaraciones y documentos oficiales.' },
      { icon: 'zap', t: 'Trámites electrónicos', d: 'Reporte electrónico inmediato a los sistemas del estado — SR-22 y verificación de seguro.' },
    ] : [
      { icon: 'file', t: 'Fast registration services', d: 'We handle local plate renewals, registrations and fast title transfers on your behalf.' },
      { icon: 'stamp', t: 'Certified notary public', d: 'Notarization for powers of attorney, contracts, affidavits and official documents.' },
      { icon: 'zap', t: 'Direct electronic systems', d: 'Immediate electronic reporting to state systems — SR-22 filings and insurance verification.' },
    ])}
    <p class="small mt-3" style="color:#8f887b">${es ? 'Servicio de terceros — no afiliado al DMV de Nevada.' : 'Third-party service — not affiliated with the Nevada DMV.'}</p>
  </div>
</section>

${reviews(lang, { title: es ? 'Asegurando futuros, <em>ganando confianza</em>' : 'Securing futures, <em>earning trust</em>' })}

${faqSection(lang, d.faqs, { title: es ? `Preguntas sobre seguros en <em>${a.name}</em>` : `Insurance questions in <em>${a.name}</em>` })}

<section class="section dark a3d-section">
  <div class="container">
    <div class="section-head row"><div><p class="eyebrow">${t('areas', lang)}</p><h2 class="h2 split-words">${es ? `${a.statewide ? 'Todo Nevada' : a.name}, <em>a un paso de nuestra oficina</em>` : `${a.statewide ? 'All of Nevada' : a.name}, <em>close to our office</em>`}</h2><p class="lead">${es ? `Nuestra oficina está en ${SITE.address.street}, Sparks, NV ${SITE.address.zip}. Gire el mapa y explore las comunidades vecinas.` : `Our office is at ${SITE.address.street}, Sparks, NV ${SITE.address.zip}. Spin the map and explore nearby communities.`}</p></div><a class="btn gold" href="${SITE.mapsUrl}" target="_blank" rel="noopener">${icon('pin')} ${t('directions', lang)}</a></div>
    ${areas3d(lang, { mode: 'compact', hl: a.id })}
    <div class="area-cloud mt-3">${nearby.map((x) => `<a class="area-pill dark-pill" href="${areaPath(x, lang)}" data-area="${x.id}">${icon('pin')}${x.name}</a>`).join('')}</div>
  </div>
</section>

${ctaBand(lang, { title: d.cta.title, lead: d.cta.lead })}`;

  return {
    title: es ? `Agencia de Seguros en ${a.statewide ? 'Todo Nevada' : place} | FGI` : `${a.statewide ? 'Nevada' : place} Insurance Agency | Feel Good Insurance`.replace(/ \| Feel Good Insurance$/, (m) => (`${a.statewide ? 'Nevada' : place} Insurance Agency`.length > 34 ? ' | FGI' : m)),
    description: d.description,
    header: 'dark',
    ogImage: ogImage(D.hero),
    breadcrumbs: crumbs,
    schema: [faqSchema(d.faqs), {
      '@context': 'https://schema.org', '@type': 'Service', name: es ? `Seguros en ${place}` : `Insurance in ${place}`, serviceType: 'Insurance agency',
      provider: { '@id': SITE.url + '/#agency' }, areaServed: { '@type': a.statewide ? 'State' : 'City', name: a.statewide ? 'Nevada' : place }, url: SITE.url + areaPath(a, lang),
    }],
    main,
  };
}
