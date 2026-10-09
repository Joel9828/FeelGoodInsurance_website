import { SITE, ROUTES, t } from '../site.mjs';
import { icon } from '../../lib/icons.mjs';
import { img, ogImage } from '../../lib/images.mjs';
import { pageHero, sectionHead, team, reviews, steps, carriers, ctaBand, btnQuote, btnCall, cards, galleryGrid } from '../../lib/components.mjs';
import { GALLERY } from '../site.mjs';

export default function about(lang) {
  const es = lang === 'es';
  const x = (en, sp) => (es ? sp : en);
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('aboutUs', lang), url: ROUTES.about[lang] }];
  const main = `
${pageHero({
    lang, crumbs, eyebrow: x('About Feel Good Insurance, LLC', 'Sobre Feel Good Insurance, LLC'),
    title: x('A Nevada agency that <em>actually lives here</em>', 'Una agencia de Nevada que <em>vive aquí</em>'),
    lead: x('Feel Good Insurance was founded on a simple idea: insurance can be simple, affordable and genuinely protective. We’re not a huge out-of-state company — we live and work in your community.', 'Feel Good Insurance nació de una idea sencilla: el seguro puede ser simple, accesible y realmente protector. No somos una gran compañía de otro estado — vivimos y trabajamos en su comunidad.'),
    image: '3.webp', imageAlt: x('Inside the Feel Good Insurance office in Sparks', 'Interior de la oficina de Feel Good Insurance en Sparks'),
    actions: `${btnQuote(lang)}${btnCall(lang)}`,
  })}

<section class="section paper">
  <div class="container split">
    <div>
      <p class="eyebrow">${x('Our story', 'Nuestra historia')}</p>
      <h2 class="h2 split-words">${x('A passion for our clients and <em>a job well done</em>', 'Pasión por nuestros clientes y <em>el trabajo bien hecho</em>')}</h2>
      <div class="stack mt-2 reveal">
        <p class="lead">${x('Our team brings decades of combined insurance experience. We’ve helped families protect their homes, business owners solve coverage problems specific to their industry, and seniors understand their Medicare options.', 'Nuestro equipo reúne décadas de experiencia en seguros. Hemos ayudado a familias a proteger sus hogares, a dueños de negocios a resolver problemas de cobertura de su industria y a adultos mayores a entender sus opciones de Medicare.')}</p>
        <p class="muted">${x('We’ve also been there for drivers who had a hard time getting insured — including those required by a court order to file an SR-22. We know the value of an agent who is easy to reach, knows Nevada and really fights for your interests.', 'También hemos apoyado a conductores a quienes les costaba conseguir seguro — incluidos quienes necesitan un SR-22 por orden judicial. Sabemos lo valioso que es un agente fácil de contactar, que conoce Nevada y que defiende sus intereses.')}</p>
      </div>
      <ul class="checks two mt-3" data-stagger>
        ${(es ? ['Soluciones personalizadas', 'Especialistas en Medicare y salud', 'Atención rápida y amable', 'Asesores con experiencia', 'Revisión continua de pólizas', 'Equipo bilingüe'] : ['Personalized insurance solutions', 'Medicare & health insurance help', 'Fast, friendly support', 'Experienced advisors', 'Ongoing policy reviews', 'Bilingual team']).map((c) => `<li>${icon('checkCircle')}${c}</li>`).join('')}
      </ul>
    </div>
    <div class="frame-stack reveal">
      <div class="frame tall">${img('10.webp', { alt: x('Feel Good Insurance storefront on S Rock Blvd, Sparks', 'Fachada de Feel Good Insurance en S Rock Blvd, Sparks'), sizes: '(max-width: 860px) 90vw, 45vw', widths: [480, 800, 1080] })}</div>
      <div class="frame small">${img('9.webp', { alt: x('The FGI team at a community event', 'El equipo de FGI en un evento comunitario'), sizes: '240px', widths: [480] })}</div>
      <div class="frame-badge"><b>300+</b><span>${x('lives protected', 'vidas protegidas')}</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: x('Because your protection matters', 'Porque su protección importa'), title: x('More than a policy — <em>confidence</em>', 'Más que una póliza — <em>tranquilidad</em>'), lead: x('Insurance is the confidence of knowing your loved ones, health and future are protected. We work closely with individuals, families, seniors and businesses to find options that fit both needs and budget.', 'El seguro es la tranquilidad de saber que sus seres queridos, su salud y su futuro están protegidos. Trabajamos de cerca con personas, familias, adultos mayores y negocios para encontrar opciones a su medida.') })}
    ${cards(es ? [
      { icon: 'scale', t: 'Independientes de verdad', d: 'No trabajamos para una sola aseguradora. Comparamos varias para que usted elija con información.' },
      { icon: 'pin', t: 'Locales de Sparks', d: 'Visítenos en South Rock Blvd. Conocemos los riesgos de Nevada porque vivimos aquí.' },
      { icon: 'translate', t: 'Inglés y español', d: 'Le explicamos todo en el idioma que prefiera, en persona, por teléfono o por mensaje.' },
      { icon: 'file', t: 'Todo en un lugar', d: 'Seguros, trámites del DMV, SR-22 y notaría bajo el mismo techo.' },
      { icon: 'heart', t: 'Para cada etapa', d: 'Desde su primer auto hasta su retiro y Medicare — le acompañamos en cada cambio.' },
      { icon: 'handshake', t: 'Apoyo en reclamos', d: 'Cuando algo pasa, le ayudamos a entender el proceso y a dar seguimiento con la aseguradora.' },
    ] : [
      { icon: 'scale', t: 'Truly independent', d: 'We don’t work for one insurer. We compare several so you can choose with full information.' },
      { icon: 'pin', t: 'Sparks locals', d: 'Visit us on South Rock Blvd. We know Nevada’s risks because we live here too.' },
      { icon: 'translate', t: 'English & Spanish', d: 'We explain everything in your preferred language — in person, by phone or by text.' },
      { icon: 'file', t: 'Everything in one place', d: 'Insurance, DMV paperwork, SR-22 filings and notary services under one roof.' },
      { icon: 'heart', t: 'For every stage of life', d: 'From your first car to retirement and Medicare — we’re with you through every change.' },
      { icon: 'handshake', t: 'Claims support', d: 'When something happens, we help you understand the process and follow up with the carrier.' },
    ])}
  </div>
</section>

<section class="section dark">
  <div class="container">
    ${sectionHead({ eyebrow: x('Insurance made simple', 'Seguros sin complicaciones'), title: x('Easy, transparent and <em>stress-free</em>', 'Fácil, transparente y <em>sin estrés</em>'), lead: x('Finding the right coverage doesn’t have to be overwhelming.', 'Encontrar la cobertura correcta no tiene por qué ser abrumador.') })}
    ${steps(es ? [
      { t: 'Cotización personalizada', d: 'Evaluamos su situación y le damos opciones que se ajustan a sus necesidades y presupuesto.' },
      { t: 'Compare y personalice', d: 'Explore varios planes y ajuste su cobertura para obtener el máximo valor.' },
      { t: 'Apoyo continuo', d: 'Nuestro compromiso no termina con la contratación. Seguimos aquí cuando nos necesite.' },
    ] : [
      { t: 'Get a personalized quote', d: 'We evaluate your unique situation and provide options that fit your needs and budget.' },
      { t: 'Compare & customize', d: 'Explore multiple plans and customize your coverage for maximum value and protection.' },
      { t: 'Ongoing support', d: 'Our commitment doesn’t end after enrollment — we’re here whenever you need us.' },
    ])}
    <div class="stats mt-4">
      <div class="stat"><b>${SITE.rating.value}</b><span>${x('Google rating', 'Calificación en Google')}</span></div>
      <div class="stat"><b>300<sup>+</sup></b><span>${x('Nevada lives protected', 'Vidas protegidas')}</span></div>
      <div class="stat"><b>10<sup>+</sup></b><span>${x('Carrier partners', 'Aseguradoras aliadas')}</span></div>
      <div class="stat"><b>2</b><span>${x('Languages spoken', 'Idiomas')}</span></div>
    </div>
  </div>
</section>

${team(lang)}

${carriers(lang)}

${reviews(lang)}

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: t('gallery', lang), title: x('Inside <em>our agency</em>', 'Dentro de <em>nuestra agencia</em>'), row: true, side: `<a class="link-arrow" href="${ROUTES.gallery[lang]}">${x('View the full gallery', 'Ver la galería')} ${icon('arrow')}</a>` })}
    ${galleryGrid(lang, GALLERY.slice(0, 5))}
  </div>
</section>

${ctaBand(lang, { title: x('Secure your <em>future today</em>', 'Asegure su <em>futuro hoy</em>'), lead: x('Protect your health, family and financial well-being with trusted insurance solutions from Feel Good Insurance.', 'Proteja su salud, su familia y su bienestar financiero con soluciones de seguros de confianza.') })}`;

  return {
    title: x('About Feel Good Insurance | Independent Agency in Sparks, NV', 'Nosotros | Agencia Independiente en Sparks, NV'),
    description: x('Meet Feel Good Insurance, a bilingual independent insurance agency in Sparks, NV. Decades of combined experience in auto, home, life, business, Medicare and SR-22 coverage.', 'Conozca Feel Good Insurance, agencia de seguros independiente y bilingüe en Sparks, NV. Décadas de experiencia en seguros de auto, casa, vida, negocio, Medicare y SR-22.'),
    header: 'dark', ogImage: ogImage('3.webp'), breadcrumbs: crumbs,
    schema: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: x('About Feel Good Insurance', 'Sobre Feel Good Insurance'), about: { '@id': SITE.url + '/#agency' } }],
    main,
  };
}
