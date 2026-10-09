import { SITE, ROUTES, t } from '../site.mjs';
import { icon } from '../../lib/icons.mjs';
import { ogImage } from '../../lib/images.mjs';
import { pageHero, contactForm, cards, faqSection } from '../../lib/components.mjs';
import { faqSchema } from '../../lib/layout.mjs';

export default function contact(lang) {
  const es = lang === 'es';
  const x = (en, sp) => (es ? sp : en);
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('contact', lang), url: ROUTES.contact[lang] }];
  const sms = es ? 'Hola, tengo una pregunta sobre mi seguro.' : 'Hi! I have a question about insurance.';
  const faqs = es ? [
    { q: '¿Necesito cita?', a: 'No es obligatorio — atendemos sin cita. Para trámites largos del DMV o varias pólizas, le recomendamos llamar antes.' },
    { q: '¿Qué tan rápido responden?', a: 'Normalmente respondemos el mismo día hábil por teléfono, mensaje o correo.' },
    { q: '¿Pueden ayudarme con un reclamo?', a: 'Sí. Le explicamos el proceso, le ayudamos a presentar el reclamo y damos seguimiento con la aseguradora.' },
  ] : [
    { q: 'Do I need an appointment?', a: 'No — walk-ins are welcome. For longer DMV cases or multiple policies, we recommend calling ahead.' },
    { q: 'How quickly do you respond?', a: 'Usually the same business day by phone, text or email.' },
    { q: 'Can you help me with a claim?', a: 'Yes. We explain the process, help you file the claim and follow up with the carrier on your behalf.' },
  ];
  const main = `
${pageHero({ lang, crumbs, compact: true, eyebrow: x('Get in touch', 'Contáctenos'), title: x('Let’s talk about <em>your coverage</em>', 'Hablemos de <em>su cobertura</em>'), lead: x('Want a free quote, have questions about potential coverage or need help with a claim? Visit our Sparks office, call, text or send a message — our agents will find the best coverage for your needs.', '¿Quiere una cotización gratis, tiene dudas sobre una cobertura o necesita ayuda con un reclamo? Visite nuestra oficina en Sparks, llame, escriba o envíe un mensaje — encontraremos la mejor cobertura para usted.'), image: 'Untitled-design-2026-08-21T140243.265-scaled.webp' })}

<section class="section">
  <div class="container contact-grid">
    <div>
      <p class="eyebrow">${x('Contact information', 'Información de contacto')}</p>
      <h2 class="h2 split-words">${x('Protecting Nevada <em>families & businesses</em>', 'Protegiendo a familias y <em>negocios de Nevada</em>')}</h2>
      <p class="lead mt-2">${x('We serve all of Nevada, including Reno, Sparks, Incline Village, Carson City, Fernley, Fallon and surrounding areas.', 'Atendemos todo Nevada, incluidos Reno, Sparks, Incline Village, Carson City, Fernley, Fallon y alrededores.')}</p>
      <div class="contact-cards">
        <a class="contact-card" href="tel:${SITE.phoneIntl}"><span class="ico-wrap">${icon('phone')}</span><span><small>${t('callUs', lang)}</small><b>${SITE.phone}</b></span></a>
        <a class="contact-card" href="sms:${SITE.phoneIntl}?&body=${encodeURIComponent(sms)}"><span class="ico-wrap">${icon('sms')}</span><span><small>${x('Text us', 'Envíe un mensaje')}</small><b>${SITE.phone}</b></span></a>
        <a class="contact-card" href="mailto:${SITE.email}"><span class="ico-wrap">${icon('mail')}</span><span><small>${t('email', lang)}</small><b>${SITE.email}</b></span></a>
        <a class="contact-card" href="${SITE.mapsUrl}" target="_blank" rel="noopener"><span class="ico-wrap">${icon('pin')}</span><span><small>${x('Visit our office', 'Visite nuestra oficina')}</small><b>${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.zip}</b></span></a>
        <div class="contact-card"><span class="ico-wrap">${icon('clock')}</span><span><small>${t('officeHours', lang)}</small><b>${SITE.hours ? `<span class="open-badge" data-hours='${JSON.stringify(SITE.hours)}'></span>` : t('callForHours', lang)}</b></span></div>
      </div>
    </div>
    <div class="form-card reveal">
      <h2 class="h3">${x('Send us a message', 'Envíenos un mensaje')}</h2>
      <p class="muted small mt-1" style="margin-bottom:22px">${x('We usually reply the same business day.', 'Normalmente respondemos el mismo día hábil.')}</p>
      ${contactForm(lang, { id: 'contact-form' })}
    </div>
  </div>
</section>

<section class="section paper">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${x('Why call us', 'Por qué llamarnos')}</p><h2 class="h2 split-words">${x('When you reach out, <em>you get</em>', 'Cuando nos contacta, <em>usted recibe</em>')}</h2></div>
    ${cards(es ? [
      { icon: 'users', t: 'Atención personal', d: 'Nada de contestadoras automáticas. Nuestros agentes le atienden y responden todas sus preguntas.' },
      { icon: 'checkCircle', t: 'Cotizaciones gratis', d: 'Sin presión. Le damos los precios más justos y honestos.' },
      { icon: 'compass', t: 'Orientación experta', d: 'Le explicamos lo que significa cada cobertura para que tome la mejor decisión.' },
      { icon: 'pin', t: 'Conocimiento local', d: 'Conocemos las mejores pólizas para Nevada y para su comunidad.' },
    ] : [
      { icon: 'users', t: 'Personalized service', d: 'No automation runaround. Our agents work with you and answer every question.' },
      { icon: 'checkCircle', t: 'Free quotes', d: 'Absolutely no pressure — the fairest, most honest prices we can find.' },
      { icon: 'compass', t: 'Expert guidance', d: 'We break down what each coverage means so you can make the best decision for yourself.' },
      { icon: 'pin', t: 'Local knowledge', d: 'We know the best policies for Nevada — and for your community.' },
    ], 4)}
  </div>
</section>

<section class="section tight">
  <div class="container">
    <div class="map-card" style="aspect-ratio:auto;min-height:420px" data-map-src="${SITE.mapsEmbed}">
      <div class="map-consent"><div><p class="eyebrow" style="justify-content:center">${SITE.address.street}, ${SITE.address.city}</p><h2 class="h3" style="color:#fff">${x('Find us in South Rock Plaza', 'Encuéntrenos en South Rock Plaza')}</h2><div class="btn-row mt-2" style="justify-content:center"><button class="btn gold" type="button">${icon('pin')} ${x('Load interactive map', 'Cargar mapa interactivo')}</button><a class="btn ghost" href="${SITE.mapsUrl}" target="_blank" rel="noopener">${t('directions', lang)} ${icon('external')}</a></div><p class="small mt-2" style="color:#bdb5a7">${x('Loads Google Maps (third-party cookies).', 'Carga Google Maps (cookies de terceros).')}</p></div></div>
    </div>
  </div>
</section>

${faqSection(lang, faqs)}`;
  return {
    title: x('Contact Feel Good Insurance | Sparks, NV | 775-862-3335', 'Contacto | Feel Good Insurance en Sparks, NV | 775-862-3335'),
    description: x('Contact Feel Good Insurance at 414 S Rock Blvd, Sparks, NV 89431. Call or text 775-862-3335 or email us for a free insurance quote, claims help or DMV and notary services.', 'Contacte a Feel Good Insurance en 414 S Rock Blvd, Sparks, NV 89431. Llame o escriba al 775-862-3335 o envíenos un correo para una cotización gratis, ayuda con reclamos o trámites.'),
    header: 'dark', ogImage: ogImage('10.webp'), breadcrumbs: crumbs,
    schema: [faqSchema(faqs), { '@context': 'https://schema.org', '@type': 'ContactPage', name: x('Contact Feel Good Insurance', 'Contacto'), about: { '@id': SITE.url + '/#agency' } }],
    main,
  };
}
