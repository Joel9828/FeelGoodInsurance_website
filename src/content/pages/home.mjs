import { SITE, ROUTES, SERVICES, GALLERY, t, L, servicePath } from '../site.mjs';
import { icon, iconInline } from '../../lib/icons.mjs';
import { img, preload, imgUrl } from '../../lib/images.mjs';
import { carriers, serviceTiles, sectionHead, reviews, team, areasSection, steps, galleryGrid, faqSection, contactForm, latestPosts, btnQuote, btnCall, stars, cards } from '../../lib/components.mjs';
import { faqSchema } from '../../lib/layout.mjs';

const HERO = 'Professional-Insurance-Services-in-Sparks-NV-1.webp';

export default function home(lang) {
  const es = lang === 'es';
  const x = (en, sp) => (es ? sp : en);

  const faqs = es ? [
    { q: '¿Cuánto cuesta una cotización?', a: 'Nada. Las cotizaciones son gratis y sin presión. Comparamos opciones de varias aseguradoras y le explicamos las diferencias para que decida con confianza.' },
    { q: '¿Qué significa que sean una agencia independiente?', a: 'No trabajamos para una sola aseguradora. Comparamos varias compañías para encontrar la cobertura y el precio que mejor se ajusten a usted, su familia o su negocio.' },
    { q: '¿Atienden en español?', a: 'Sí. Nuestro equipo le atiende en inglés y en español, en persona, por teléfono o por mensaje de texto.' },
    { q: '¿Pueden presentar mi SR-22 y ayudarme a reinstalar mi licencia?', a: 'Sí. Presentamos el SR-22 electrónicamente ante el DMV de Nevada, le ayudamos con la reinstalación y encontramos cobertura incluso para conductores de alto riesgo.' },
    { q: '¿Qué áreas atienden?', a: 'Nuestra oficina está en Sparks y atendemos Reno, Carson City, Incline Village, Fernley, Fallon, Yerington, el condado de Washoe y todo Nevada.' },
    { q: '¿Están afiliados al DMV de Nevada?', a: 'No. Ofrecemos servicios del DMV como un proveedor externo para ahorrarle filas y trámites. No estamos afiliados al DMV de Nevada.' },
  ] : [
    { q: 'How much does a quote cost?', a: 'Nothing. Quotes are free and no-pressure. We compare options from multiple carriers and explain the differences so you can decide with confidence.' },
    { q: 'What does it mean that you are an independent agency?', a: 'We don’t work for a single insurance company. We compare multiple carriers to find the coverage and price that fit you, your family or your business best.' },
    { q: 'Do you speak Spanish?', a: 'Yes. Our team helps clients in English and Spanish — in person, by phone or by text.' },
    { q: 'Can you file my SR-22 and help reinstate my license?', a: 'Yes. We file SR-22s electronically with the Nevada DMV, guide you through reinstatement and find coverage even for high-risk drivers.' },
    { q: 'Which areas do you serve?', a: 'Our office is in Sparks, and we serve Reno, Carson City, Incline Village, Fernley, Fallon, Yerington, Washoe County and all of Nevada.' },
    { q: 'Are you affiliated with the Nevada DMV?', a: 'No. We provide DMV services as a third party to save you lines and paperwork. We are not affiliated with the Nevada DMV.' },
  ];

  // Coverage finder recommendations
  const rec = (id, why) => { const s = SERVICES.find((v) => v.id === id); return { name: L(s.name, lang), url: servicePath(s, lang), icon: iconInline(s.icon), why }; };
  const finderData = {
    auto: rec('auto', x('Liability is required in Nevada — add collision & comprehensive for your car.', 'La responsabilidad es obligatoria en Nevada — agregue choque y cobertura amplia.')),
    motorcycle: rec('motorcycle', x('Riders need their own policy, plus custom-parts coverage.', 'Los motociclistas necesitan su propia póliza y cobertura de piezas.')),
    home: rec('home', x('Dwelling, belongings, liability — and a look at earthquake & wildfire gaps.', 'Vivienda, pertenencias, responsabilidad — y revisión de terremoto e incendio.')),
    renters: rec('renters', x('Your landlord’s policy doesn’t cover your belongings.', 'La póliza del propietario no cubre sus pertenencias.')),
    life: rec('life', x('Replace your income and protect the people who depend on you.', 'Reemplace su ingreso y proteja a quienes dependen de usted.')),
    commercial: rec('commercial', x('General liability, property and workers’ comp if you have staff.', 'Responsabilidad general, propiedad y compensación laboral si tiene empleados.')),
    travel: rec('travel', x('Trip cancellation, medical emergencies abroad and lost bags.', 'Cancelación, emergencias médicas en el extranjero y equipaje.')),
    dmv: rec('dmv', x('Registrations, titles, SR-22 and reinstatements without the line.', 'Registros, títulos, SR-22 y reinstalaciones sin filas.')),
    notary: rec('notary', x('Bring your unsigned document and a photo ID — we’ll handle the rest.', 'Traiga su documento sin firmar y una identificación con foto.')),
  };
  const q = (rec, ico, label) => `<label class="choice"><input type="checkbox" data-rec="${rec}"><span>${icon(ico)}${label}</span></label>`;

  const main = `
<section class="hero-cover" data-cover>
  <div class="cover-bg" data-cover-bg>${img(HERO, { alt: x('Feel Good Insurance agent reviewing a policy with a young couple in the Sparks office', 'Agente de Feel Good Insurance revisando una póliza con una pareja en la oficina de Sparks'), priority: true, sizes: '100vw', widths: [640, 1024, 1600, 2000] })}</div>
  <div class="cover-shade" aria-hidden="true"></div>
  <div class="container cover-inner on-dark" data-cover-copy>
    <p class="pill-note glass fade-up" style="--d:.15s"><span class="dot-ico">${icon('diamond')}</span>${x('Independent insurance agency · Sparks, Nevada', 'Agencia de seguros independiente · Sparks, Nevada')}</p>
    <h1 class="display hero-title">${x('Insurance in Sparks, NV that lets you <em>feel good.</em>', 'Seguros en Sparks, NV que le hacen <em>sentir bien.</em>')}</h1>
    <p class="lead fade-up" style="--d:.5s">${x('Auto, home, life and business coverage from local agents who compare multiple carriers, explain every option in plain language — and handle your DMV and notary paperwork under the same roof.', 'Seguros de auto, casa, vida y negocio con agentes locales que comparan varias aseguradoras, le explican cada opción con claridad — y atienden sus trámites del DMV y notaría en el mismo lugar.')}</p>
    <p class="rotator fade-up" style="--d:.58s"><span>${x('Protecting your', 'Protegiendo su')}</span> <span class="rot" data-words="${es ? 'hogar|familia|negocio|moto|viaje' : 'home|family|business|ride|trip'}"><i class="on">${es ? 'auto' : 'car'}</i></span></p>
    <div class="btn-row fade-up" style="--d:.65s">${btnQuote(lang)}${btnCall(lang)}</div>
  </div>
  <figure class="cover-review fade-up" style="--d:1.1s">
    <div class="cr-top">${stars()}<span>${icon('google')} Google</span></div>
    <blockquote>${es ? '“Excelente servicio y amabilidad de todas y cada una de las personas que laboran allí.”' : '“Christian was great! I was able to get my title expedited fast — very knowledgeable office.”'}</blockquote>
    <figcaption>${es ? 'Astrid G. C.' : 'Erika L.'} · ${x('Verified Google review', 'Reseña verificada en Google')}</figcaption>
  </figure>
  <span class="cover-frame" aria-hidden="true"></span>
  <div class="cover-bar fade-up" style="--d:.85s">
    <div class="container cover-bar-inner">
      <div class="hero-meta-item">${icon('google')}<span><b>${SITE.rating.value} ${stars()}</b>${SITE.rating.count} ${x('Google reviews', 'reseñas en Google')}</span></div>
      <div class="hero-meta-item">${icon('translate')}<span><b>${x('English & Español', 'Español & English')}</b>${x('Bilingual team', 'Equipo bilingüe')}</span></div>
      <div class="hero-meta-item">${icon('scale')}<span><b>${x('10+ carriers', '10+ aseguradoras')}</b>${x('compared for you', 'comparadas para usted')}</span></div>
      <div class="hero-meta-item">${icon('shield')}<span><b>${x('SR-22, DMV & notary', 'SR-22, DMV y notaría')}</b>${x('same-day help', 'ayuda el mismo día')}</span></div>
      <a class="scroll-cue" href="#services" aria-label="${x('Scroll to services', 'Ir a servicios')}"><span></span></a>
    </div>
  </div>
</section>

${carriers(lang)}

<section class="section" id="services">
  <div class="container">
    ${sectionHead({ eyebrow: x('Complete protection, simple solutions', 'Protección completa, soluciones simples'), title: x('Insurance for <em>every part</em> of your life', 'Seguros para <em>cada parte</em> de su vida'), lead: x('You shouldn’t need several agents to protect your home, car, family and business. Explore it all in one place — with clear guidance on what each policy actually covers.', 'No debería necesitar varios agentes para proteger su casa, auto, familia y negocio. Encuentre todo en un solo lugar — con orientación clara sobre lo que cubre cada póliza.'), row: true, side: `<a class="link-arrow" href="${ROUTES.services[lang]}">${t('allServices', lang)} ${icon('arrow')}</a>` })}
    ${serviceTiles(lang)}
  </div>
</section>

<div class="kinetic" aria-hidden="true"><div class="kinetic-track">${[0, 1].map(() => (es ? ['Seguro de Auto', 'Seguro de Casa', 'Seguro de Vida', 'Seguro Comercial', 'Inquilinos', 'Motocicleta', 'Viaje', 'DMV', 'Notaría'] : ['Auto Insurance', 'Home Insurance', 'Life Insurance', 'Business Insurance', 'Renters', 'Motorcycle', 'Travel', 'DMV', 'Notary']).map((w, i) => `<span class="${i % 2 ? 'o' : ''}">${w}</span><b>◆</b>`).join('')).join('')}</div></div>

<section class="section paper" id="why">
  <div class="container split">
    <div class="frame-stack reveal">
      <div class="frame tall">${img('8.webp', { alt: x('Christian Vega helping a client compare coverage at the Feel Good Insurance office', 'Christian Vega ayudando a un cliente a comparar coberturas en la oficina'), sizes: '(max-width: 860px) 90vw, 45vw', widths: [480, 800, 1080] })}</div>
      <div class="frame small">${img('3.webp', { alt: x('The Feel Good Insurance office in Sparks', 'La oficina de Feel Good Insurance en Sparks'), sizes: '240px', widths: [480] })}</div>
      <div class="frame-badge"><b>${SITE.rating.value}</b><span>${x('Google rating', 'en Google')}</span></div>
    </div>
    <div>
      <p class="eyebrow">${x('Why choose us', 'Por qué elegirnos')}</p>
      <h2 class="h2 split-words">${x('Insurance should be <em>clear and simple</em>', 'El seguro debe ser <em>claro y sencillo</em>')}</h2>
      <div class="stack mt-2 reveal">
        <p class="lead">${x('We take the time to understand your situation, explain your options clearly and help you choose coverage that fits your needs and budget — instead of rushing you into a policy.', 'Nos tomamos el tiempo de entender su situación, explicarle sus opciones con claridad y ayudarle a elegir la cobertura que se ajuste a sus necesidades y presupuesto — sin apresurarle.')}</p>
        <p class="muted">${x('As an independent agency, we compare coverage options side by side, walk you through the important details and stay with you after the sale — at renewal time, when life changes and when you need to file a claim.', 'Como agencia independiente, comparamos opciones lado a lado, le explicamos los detalles importantes y seguimos con usted después de la venta — en la renovación, cuando su vida cambia y cuando necesita hacer un reclamo.')}</p>
      </div>
      <ul class="checks two mt-3" data-stagger>
        ${(es ? ['Comparaciones honestas', 'Pólizas explicadas con claridad', 'Evaluación personalizada', 'Atención local en Sparks', 'Revisión anual de su cobertura', 'Atención en inglés y español'] : ['Honest coverage comparisons', 'Clear policy explanations', 'Personalized needs assessment', 'Local insurance support', 'Annual coverage reviews', 'Help in English & Spanish']).map((c) => `<li>${icon('checkCircle')}${c}</li>`).join('')}
      </ul>
      <div class="btn-row mt-3"><a class="btn" href="${ROUTES.about[lang]}">${x('Meet the agency', 'Conozca la agencia')} ${icon('arrow', 'arrow-ico')}</a></div>
    </div>
  </div>
</section>

<section class="section dark" id="finder">
  <div class="container">
    <div class="stats" style="margin-bottom:clamp(64px,9vw,120px)">
      <div class="stat"><b><span data-count="5.0">5.0</span></b><span>${x('Google rating from 55 reviews', 'Calificación en Google (55 reseñas)')}</span></div>
      <div class="stat"><b><span data-count="300">300</span><sup>+</sup></b><span>${x('Nevada lives protected', 'Vidas protegidas en Nevada')}</span></div>
      <div class="stat"><b><span data-count="10">10</span><sup>+</sup></b><span>${x('Carriers compared for every quote', 'Aseguradoras comparadas en cada cotización')}</span></div>
      <div class="stat"><b><span data-count="15">15</span></b><span>${x('Nevada communities served', 'Comunidades de Nevada atendidas')}</span></div>
    </div>
    <div class="finder">
      <div>
        <p class="eyebrow">${x('Coverage finder', 'Buscador de coberturas')}</p>
        <h2 class="h2 split-words">${x('What do you need to <em>protect?</em>', '¿Qué necesita <em>proteger?</em>')}</h2>
        <p class="lead mt-2">${x('Tap everything that applies. We’ll show the coverage most people in your situation consider — then build a quote around it.', 'Marque todo lo que aplique. Le mostraremos la cobertura que la mayoría considera en su situación — y armamos una cotización a su medida.')}</p>
        <div class="finder-q mt-3">
          <fieldset><legend>${x('My life', 'Mi vida')}</legend><div class="choices">
            ${q('auto', 'car', x('I drive a car or truck', 'Manejo auto o camioneta'))}
            ${q('motorcycle', 'bike', x('I ride a motorcycle', 'Manejo motocicleta'))}
            ${q('home', 'home', x('I own my home', 'Soy dueño de casa'))}
            ${q('renters', 'key', x('I rent my place', 'Rento mi vivienda'))}
            ${q('life', 'heart', x('Family depends on my income', 'Mi familia depende de mi ingreso'))}
            ${q('travel', 'plane', x('I’m planning a trip', 'Voy a viajar'))}
          </div></fieldset>
          <fieldset><legend>${x('Business & paperwork', 'Negocio y trámites')}</legend><div class="choices">
            ${q('commercial', 'briefcase', x('I own a business', 'Tengo un negocio'))}
            ${q('dmv auto', 'file', x('I need an SR-22 or DMV help', 'Necesito SR-22 o trámite del DMV'))}
            ${q('notary', 'stamp', x('I need something notarized', 'Necesito notarizar un documento'))}
          </div></fieldset>
        </div>
      </div>
      <aside class="finder-result" aria-live="polite">
        <h3>${x('Your coverage plan', 'Su plan de cobertura')}</h3>
        <p class="finder-empty">${x('Select what applies to you and your recommendations will appear here.', 'Seleccione lo que aplica y aquí aparecerán sus recomendaciones.')}</p>
        <div class="rec-list"></div>
        <a class="btn gold block finder-cta" hidden data-base="${ROUTES.quote[lang]}" href="${ROUTES.quote[lang]}">${x('Get a quote for these', 'Cotizar estas coberturas')} ${icon('arrow', 'arrow-ico')}</a>
        <p class="small muted mt-1">${x('Free, no obligation. A licensed agent reviews every request.', 'Gratis y sin compromiso. Un agente revisa cada solicitud.')}</p>
      </aside>
    </div>
  </div>
</section>

<section class="section" id="process">
  <div class="container">
    ${sectionHead({ eyebrow: x('Insurance made simple', 'Seguros sin complicaciones'), title: x('Insurance shouldn’t be <em>this complicated</em>', 'El seguro no debería ser <em>tan complicado</em>'), lead: x('Choosing insurance should not leave you confused about your coverage or what you’re paying for. Here’s how we work.', 'Elegir un seguro no debería dejarle con dudas sobre su cobertura o lo que paga. Así trabajamos.') })}
    ${steps(es ? [
      { t: 'Cotización personalizada', d: 'Evaluamos su situación y le presentamos opciones que se ajustan a sus necesidades y presupuesto.' },
      { t: 'Compare y personalice', d: 'Comparamos varias aseguradoras lado a lado para que elija la cobertura con el mejor valor.' },
      { t: 'Explicación clara', d: 'Sabrá qué incluye su póliza, qué protege y qué esperar — antes de decidir.' },
      { t: 'Apoyo continuo', d: 'Seguimos con usted: cambios, reclamos y una revisión anual para mantener su cobertura al día.' },
    ] : [
      { t: 'Get a personalized quote', d: 'We evaluate your unique situation and present coverage options that fit your needs and budget.' },
      { t: 'Compare & customize', d: 'We compare multiple carriers side by side so you can choose the coverage with the best value.' },
      { t: 'Clear explanations', d: 'Understand what your policy includes, what it protects and what to expect — before you decide.' },
      { t: 'Ongoing support', d: 'We stay with you for changes, claims and an annual review that keeps your coverage current.' },
    ])}
  </div>
</section>

${reviews(lang, { lead: x('See what individuals, families and business owners across Nevada say about working with Feel Good Insurance.', 'Vea lo que dicen personas, familias y dueños de negocios de Nevada sobre su experiencia con Feel Good Insurance.') })}

${team(lang, { lead: x('You’ll work with real people who live in the communities we serve — and who take the time to listen, explain policies clearly and recommend what you actually need.', 'Trabajará con personas reales que viven en las comunidades que atendemos — que escuchan, explican con claridad y recomiendan lo que realmente necesita.') })}

${areasSection(lang)}

<section class="section" id="gallery">
  <div class="container">
    ${sectionHead({ eyebrow: t('gallery', lang), title: x('Come say hi on <em>South Rock Blvd</em>', 'Visítenos en <em>South Rock Blvd</em>'), row: true, side: `<a class="link-arrow" href="${ROUTES.gallery[lang]}">${x('View the full gallery', 'Ver la galería completa')} ${icon('arrow')}</a>` })}
    ${galleryGrid(lang, GALLERY.slice(0, 7))}
  </div>
</section>

<section class="section paper" id="blog">
  <div class="container">
    ${sectionHead({ eyebrow: x('Insurance insights', 'Consejos de seguros'), title: x('Smarter coverage <em>decisions</em>', 'Decisiones de cobertura <em>más inteligentes</em>'), row: true, side: `<a class="link-arrow" href="${ROUTES.blog[lang]}">${x('All articles', 'Todos los artículos')} ${icon('arrow')}</a>` })}
    ${latestPosts(lang, 3)}
  </div>
</section>

${faqSection(lang, faqs)}

<section class="section sand" id="contact">
  <div class="container contact-grid">
    <div>
      <p class="eyebrow">${x('Send us a message', 'Envíenos un mensaje')}</p>
      <h2 class="h2 split-words">${x('Protecting families, <em>supporting businesses</em>', 'Protegiendo familias, <em>apoyando negocios</em>')}</h2>
      <p class="lead mt-2">${x('Every family and business has different needs. Tell us what matters to you and we’ll come back with clear, practical options — usually the same business day.', 'Cada familia y negocio tiene necesidades distintas. Cuéntenos qué le importa y le responderemos con opciones claras y prácticas — normalmente el mismo día hábil.')}</p>
      <div class="contact-cards">
        <a class="contact-card" href="tel:${SITE.phoneIntl}"><span class="ico-wrap">${icon('phone')}</span><span><small>${t('callUs', lang)}</small><b>${SITE.phone}</b></span></a>
        <a class="contact-card" href="mailto:${SITE.email}"><span class="ico-wrap">${icon('mail')}</span><span><small>${t('email', lang)}</small><b>${SITE.email}</b></span></a>
        <a class="contact-card" href="${SITE.mapsUrl}" target="_blank" rel="noopener"><span class="ico-wrap">${icon('pin')}</span><span><small>${x('Visit our office', 'Visite nuestra oficina')}</small><b>${SITE.address.street}, ${SITE.address.city}, NV ${SITE.address.zip}</b></span></a>
      </div>
    </div>
    <div class="form-card reveal">${contactForm(lang, { id: 'home-form' })}</div>
  </div>
</section>`;

  return {
    id: 'home',
    title: x('Insurance Agency in Sparks, NV | Feel Good Insurance', 'Agencia de Seguros en Sparks, NV | Feel Good Insurance'),
    description: x('Independent insurance agency in Sparks, NV. Compare auto, home, life, renters and business insurance from 10+ carriers, plus DMV & notary services. Se habla español. Free quote: 775-862-3335.', 'Agencia de seguros independiente en Sparks, NV. Compare seguros de auto, casa, vida, inquilinos y negocio con más de 10 aseguradoras, además de servicios del DMV y notaría. Cotización gratis: 775-862-3335.'),
    header: 'dark',
    preload: preload(HERO, '100vw', [640, 1024, 1600, 2000]),
    schema: [faqSchema(faqs), { '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE.url + '/#website', url: SITE.url + '/', name: SITE.name, inLanguage: ['en-US', 'es-US'], publisher: { '@id': SITE.url + '/#agency' } }],
    scripts: `<script type="application/json" id="finder-data">${JSON.stringify(finderData)}</script>`,
    main,
  };
}
