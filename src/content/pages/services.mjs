import { SITE, ROUTES, SERVICES, t, L, servicePath } from '../site.mjs';
import { ogImage } from '../../lib/images.mjs';
import { pageHero, sectionHead, serviceTiles, steps, reviews, carriers, ctaBand, btnQuote, btnCall, faqSection } from '../../lib/components.mjs';
import { faqSchema } from '../../lib/layout.mjs';

export default function services(lang) {
  const es = lang === 'es';
  const x = (en, sp) => (es ? sp : en);
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('services', lang), url: ROUTES.services[lang] }];
  const faqs = es ? [
    { q: '¿Puedo combinar varias pólizas para ahorrar?', a: 'Sí. Combinar auto con casa o inquilinos, o varias coberturas de negocio, suele dar descuentos. Le mostramos el ahorro real antes de decidir.' },
    { q: '¿Ofrecen seguros de salud o Medicare?', a: 'Ayudamos a adultos mayores con preguntas de Medicare y opciones de Medicare Advantage. Llámenos para revisar su caso.' },
    { q: '¿Puedo cotizar en línea?', a: 'Sí. Use nuestro formulario de cotización de 2 minutos o los enlaces de cotización en línea de nuestros socios en las páginas de auto, casa, inquilinos, viaje y negocio.' },
  ] : [
    { q: 'Can I bundle policies to save?', a: 'Yes. Bundling auto with home or renters, or combining business coverages, usually unlocks discounts. We show you the real savings before you decide.' },
    { q: 'Do you offer health or Medicare insurance?', a: 'We help seniors with Medicare questions and Medicare Advantage options. Call us to review your situation.' },
    { q: 'Can I get a quote online?', a: 'Yes. Use our 2-minute quote form, or the online quote links from our partners on the auto, home, renters, travel and business pages.' },
  ];
  const main = `
${pageHero({ lang, crumbs, eyebrow: x('Our complete services', 'Todos nuestros servicios'), title: x('Reliable insurance for <em>every stage of life</em>', 'Seguros confiables para <em>cada etapa de la vida</em>'), lead: x('Planning your family’s future, protecting your business or simply skipping the DMV line — we offer a wide range of coverage and services designed around your goals.', 'Ya sea que planee el futuro de su familia, proteja su negocio o simplemente quiera evitar la fila del DMV — ofrecemos una amplia gama de coberturas y servicios pensados para usted.'), image: 'Insurance2-scaled-e1781811732664.webp', actions: `${btnQuote(lang)}${btnCall(lang)}` })}
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: x('Choose a service', 'Elija un servicio'), title: x('Everything you need, <em>one local agency</em>', 'Todo lo que necesita, <em>una agencia local</em>') })}
    ${serviceTiles(lang)}
  </div>
</section>
${carriers(lang)}
<section class="section dark">
  <div class="container">
    ${sectionHead({ eyebrow: x('Insurance made simple', 'Seguros sin complicaciones'), title: x('Easy, transparent, <em>stress-free</em>', 'Fácil, transparente, <em>sin estrés</em>') })}
    ${steps(es ? [
      { t: 'Cotización personalizada', d: 'Evaluamos su situación y le damos opciones a su medida.' },
      { t: 'Compare y personalice', d: 'Compare varias aseguradoras y ajuste su cobertura.' },
      { t: 'Apoyo continuo', d: 'Seguimos con usted después de la contratación.' },
    ] : [
      { t: 'Get a personalized quote', d: 'We evaluate your situation and provide options that fit your needs and budget.' },
      { t: 'Compare & customize', d: 'Compare multiple carriers and customize coverage for maximum value.' },
      { t: 'Ongoing support', d: 'We’re here for you long after enrollment.' },
    ])}
  </div>
</section>
${reviews(lang)}
${faqSection(lang, faqs)}
${ctaBand(lang, { title: x('Protecting <em>what matters most</em>', 'Protegiendo <em>lo que más importa</em>'), lead: x('Life is full of unexpected moments. The right coverage keeps you and your loved ones prepared for whatever comes next.', 'La vida está llena de imprevistos. La cobertura correcta le prepara a usted y a los suyos para lo que venga.') })}`;
  return {
    title: x('Insurance Services in Sparks, NV | Feel Good Insurance', 'Servicios de Seguros en Sparks, NV | Feel Good Insurance'),
    description: x('Explore every service from Feel Good Insurance in Sparks, NV: auto, homeowners, renters, life, motorcycle, travel and commercial insurance, plus DMV and notary services.', 'Conozca todos los servicios de Feel Good Insurance en Sparks, NV: seguros de auto, casa, inquilinos, vida, moto, viaje y comercial, además de DMV y notaría.'),
    header: 'dark', ogImage: ogImage('Insurance2-scaled-e1781811732664.webp'), breadcrumbs: crumbs,
    schema: [faqSchema(faqs), { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: L(s.name, lang), url: SITE.url + servicePath(s, lang) })) }],
    main,
  };
}
