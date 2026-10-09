// Global business data, navigation, shared lists and UI strings (EN + ES).

export const SITE = {
  url: 'https://fgirenonv.com',
  name: 'Feel Good Insurance',
  legalName: 'Feel Good Insurance, LLC',
  short: 'FGI',
  phone: '775-862-3335',
  phoneIntl: '+17758623335',
  email: 'cvega@fgirenonv.com',
  address: { street: '414 S Rock Blvd', city: 'Sparks', region: 'NV', zip: '89431', country: 'US' },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Feel+Good+Insurance+414+S+Rock+Blvd+Sparks+NV+89431',
  mapsEmbed: 'https://www.google.com/maps?q=414+S+Rock+Blvd,+Sparks,+NV+89431&output=embed',
  reviewsUrl: 'https://www.google.com/search?q=Feel+Good+Insurance+LLC+Sparks+NV+reviews',
  rating: { value: '5.0', count: 55 },
  ga4: 'G-RD9YZ8TGL6',
  googleAds: 'AW-16881385782', // conversion tag carried over from the old site
  bbb: 'https://www.bbb.org/us/nv/sparks/profile/insurance-companies/feel-good-insurance-llc-1166-90049891/#sealclick',
  social: {
    facebook: 'https://www.facebook.com/people/Feel-Good-Insurance-LLC/61572598103266/',
    instagram: 'https://www.instagram.com/fgillcnv',
    tiktok: 'https://www.tiktok.com/@feel.good.insuran',
  },
  // Office hours. Set real hours here to enable the "Open now" badge and schema openingHours.
  // Format: one entry per day 0=Sun..6=Sat → ['09:00','18:00'] or null (closed).
  // Left null on purpose: the old website never published hours.
  hours: null,
  // Online quoting partners already used on the old website
  partners: {
    autoHome: 'https://www.agentinsure.com/compare/auto-insurance-home-insurance/feelgo/quote.aspx',
    business: 'https://app.nextinsurance.com/quote/get-started?agent_affiliation=T140rVJjPxdbdsPz&serial=992855993&channel=affiliation',
    renters: 'https://www.epremiuminsurance.com/DirectToConsumerPartner.aspx?IRISAccountID=Yhc80kJhY28%3d&TopLevelIRISAccountID=pKgVh2ygOEw%3d',
    travel: 'https://v3.app.polmaker.com/quote/?aff_id=13138&agtdst=SCAAQY&office_code=',
    dmvEstimator: 'https://dmvapp.nv.gov/dmv/vr/vr_estimate/vrestimationinput.aspx',
  },
  formEndpoint: '/api/contact.php',
};

export const L = (v, lang) => (v && typeof v === 'object' && ('en' in v || 'es' in v) ? (v[lang] ?? v.en) : v);

// ---------- Routes for static pages (path per language) ----------
export const ROUTES = {
  home:      { en: '/', es: '/es/' },
  about:     { en: '/about-us/', es: '/es/nosotros/' },
  services:  { en: '/services/', es: '/es/servicios/' },
  areas:     { en: '/service-areas/', es: '/es/areas-de-servicio/' },
  gallery:   { en: '/our-gallery/', es: '/es/galeria/' },
  blog:      { en: '/blogs/', es: '/es/blog/' },
  contact:   { en: '/contact-us/', es: '/es/contacto/' },
  quote:     { en: '/get-a-quote/', es: '/es/cotizar/' },
  privacy:   { en: '/privacy-policy/', es: '/es/politica-de-privacidad/' },
  terms:     { en: '/terms-of-service/', es: '/es/terminos-de-servicio/' },
};

// ---------- Services ----------
export const SERVICES = [
  { id: 'auto', icon: 'car', group: 'personal', slug: { en: 'auto-insurance', es: 'seguro-de-auto' },
    name: { en: 'Auto Insurance', es: 'Seguro de Auto' },
    blurb: { en: 'Coverage for Nevada roads — snow passes, desert highways and SR-22 filings.', es: 'Cobertura para las carreteras de Nevada — nieve, desierto y trámites SR-22.' },
    img: 'hlgu7looergt16io3enlct8oa4lu7wka.webp', card: 'hero-insurance.webp' },
  { id: 'home', icon: 'home', group: 'personal', slug: { en: 'homeowners-insurance', es: 'seguro-de-casa' },
    name: { en: 'Homeowners Insurance', es: 'Seguro de Casa' },
    blurb: { en: 'Protect your home from wildfire, winter storms, theft and liability.', es: 'Proteja su hogar contra incendios, tormentas de invierno, robo y demandas.' },
    img: 'hands-protecting-model-home-representing-homeowners-insurance.webp', card: 'GettyImages-998988976.webp' },
  { id: 'renters', icon: 'key', group: 'personal', slug: { en: 'renters-insurance', es: 'seguro-para-inquilinos' },
    name: { en: 'Renters Insurance', es: 'Seguro para Inquilinos' },
    blurb: { en: 'Your belongings and liability covered — often for about $15 a month.', es: 'Sus pertenencias y responsabilidad cubiertas — desde unos $15 al mes.' },
    img: 'Renters-Insurance-Shutterstock_2311963963.webp', card: '847.jpg' },
  { id: 'life', icon: 'heart', group: 'personal', slug: { en: 'life-insurance', es: 'seguro-de-vida' },
    name: { en: 'Life Insurance', es: 'Seguro de Vida' },
    blurb: { en: 'Term, whole and universal life to protect the people who depend on you.', es: 'Vida a término, entera y universal para proteger a quienes dependen de usted.' },
    img: 'Life-insurance5-e1782221753728.jpg', card: 'INSURANCE6jpg.webp' },
  { id: 'motorcycle', icon: 'bike', group: 'personal', slug: { en: 'motorcycle-insurance', es: 'seguro-de-motocicleta' },
    name: { en: 'Motorcycle Insurance', es: 'Seguro de Motocicleta' },
    blurb: { en: 'Liability, collision, custom parts and roadside help for riders.', es: 'Responsabilidad, choque, piezas personalizadas y asistencia en carretera.' },
    img: '2bf5b853-moottoripyora_shutterstock_560497660-1920x657-1.webp', card: 'img.webp' },
  { id: 'travel', icon: 'plane', group: 'personal', slug: { en: 'travel-insurance', es: 'seguro-de-viaje' },
    name: { en: 'Travel Insurance', es: 'Seguro de Viaje' },
    blurb: { en: 'Trip cancellation, medical emergencies, lost bags and Mexico auto.', es: 'Cancelación de viaje, emergencias médicas, equipaje y seguro de auto para México.' },
    img: 'travel-insurance-1715592961199.webp', card: 'assurance-voyage-212assurances.webp' },
  { id: 'commercial', icon: 'briefcase', group: 'business', slug: { en: 'commercial-insurance', es: 'seguro-comercial' },
    name: { en: 'Commercial Insurance', es: 'Seguro Comercial' },
    blurb: { en: 'General liability, property, workers’ comp, commercial auto and cyber.', es: 'Responsabilidad general, propiedad, compensación laboral, auto comercial y ciber.' },
    img: 'Commercial-Insurance-Broker.webp', card: 'support_of_real_estate_transactions_669_11zon.webp' },
  { id: 'dmv', icon: 'file', group: 'documents', slug: { en: 'dmv-service', es: 'servicios-dmv' },
    name: { en: 'DMV Services', es: 'Servicios del DMV' },
    blurb: { en: 'Registrations, title transfers, SR-22 and reinstatements — skip the line.', es: 'Registros, títulos, SR-22 y reinstalaciones — sin hacer fila.' },
    img: 'DMV.jpg', card: 'XXL_height-1.webp' },
  { id: 'notary', icon: 'stamp', group: 'documents', slug: { en: 'notary-services', es: 'servicios-notariales' },
    name: { en: 'Notary Services', es: 'Servicios Notariales' },
    blurb: { en: 'Powers of attorney, affidavits, real estate and travel consent forms.', es: 'Poderes notariales, declaraciones juradas, bienes raíces y permisos de viaje.' },
    img: 'notary-signing-agent-training-1440x617-1.webp', card: '11.webp' },
];
export const servicePath = (s, lang) => (lang === 'es' ? `/es/servicios/${s.slug.es}/` : `/services/${s.slug.en}/`);
export const serviceById = (id) => SERVICES.find((s) => s.id === id);

// ---------- Service areas ----------
export const AREAS = [
  { id: 'sparks', slug: 'sparks-nv', name: 'Sparks', county: 'Washoe County', hub: true },
  { id: 'reno', slug: 'reno-nv', name: 'Reno', county: 'Washoe County', hub: true },
  { id: 'carson', slug: 'carson-city-nv', name: 'Carson City', county: 'Carson City' },
  { id: 'spanish-springs', slug: 'spanish-springs-nv', name: 'Spanish Springs', county: 'Washoe County' },
  { id: 'sun-valley', slug: 'sun-valley-nv', name: 'Sun Valley', county: 'Washoe County' },
  { id: 'north-valleys', slug: 'north-valleys-nv', name: 'North Valleys', county: 'Washoe County' },
  { id: 'northeast-reno', slug: 'northeast-reno-nv', name: 'Northeast Reno', county: 'Washoe County' },
  { id: 'reno-stead', slug: 'reno-stead-nv', name: 'Reno-Stead', county: 'Washoe County' },
  { id: 'golden-valley', slug: 'golden-valley-nv', name: 'Golden Valley', county: 'Washoe County' },
  { id: 'incline', slug: 'incline-village-nv', name: 'Incline Village', county: 'Washoe County' },
  { id: 'washoe', slug: 'washoe-county-nv', name: 'Washoe County', county: 'Northern Nevada' },
  { id: 'fernley', slug: 'fernley-nv', name: 'Fernley', county: 'Lyon County' },
  { id: 'yerington', slug: 'yerington-nv', name: 'Yerington', county: 'Lyon County' },
  { id: 'fallon', slug: 'fallon-nv', name: 'Fallon', county: 'Churchill County' },
  { id: 'statewide', slug: 'statewide-nevada', name: 'Statewide Nevada', county: 'Nevada', statewide: true },
];
export const areaPath = (a, lang) => (lang === 'es' ? `/es/areas-de-servicio/${a.slug}/` : `/${a.slug}/`);
export const areaLabel = (a) => (a.statewide ? a.name : `${a.name}, NV`);

// ---------- Team ----------
export const TEAM = [
  { name: 'Geisy Zaragoza', role: { en: 'Founder', es: 'Fundadora' }, img: 'Untitled-design-2026-08-21T140243.265-scaled.webp' },
  { name: 'Christian Vega', role: { en: 'Founder', es: 'Fundador' }, img: 'Untitled-design-2026-08-21T140316.204-scaled.webp' },
  { name: 'Efrain Vega', role: { en: 'CSR & Document Preparer', es: 'Servicio al Cliente y Preparador de Documentos' }, img: 'Untitled-design-2026-08-21T140158.454-scaled.webp' },
];

// ---------- Google reviews (verbatim, shown in original language) ----------
export const REVIEWS = [
  { name: 'Erika Lua', lang: 'en', text: 'Christian was great! I was able to get my title expedited fast!!!! I recieved it in 3 business days! Very happy with his services I would recommend this office they are very knowledgeable.' },
  { name: 'Ricardo Barrientos', lang: 'es', text: 'Tramite bastante rápido, hacen toda la gestión por ti, solicité registro en NV para el coche, también seguro de auto. Super recomendados!' },
  { name: 'Nicholas', lang: 'en', text: 'Great service! Really nice people! Super fast and convenient!' },
  { name: 'Astrid Ofelia Guerrero Coronado', lang: 'es', text: 'Excelente servicio y amabilidad de todas y cada una de las personas que laboran allí. Gracias por todo. Mil bendiciones' },
  { name: 'Manuel Jacobo', lang: 'en', text: 'Chris was very helpful and nice thank you great service.' },
  { name: 'Mario Israel Picazo-Cuevas', lang: 'en', text: 'nice fast and eficient !! thank you guys !!!' },
];

// ---------- Carrier partners (logos from the old website) ----------
export const CARRIERS = [
  { name: 'Progressive', img: 'Untitled-design-26.webp' },
  { name: 'GEICO', img: 'geico-gecko-dark.webp' },
  { name: 'Berkshire Hathaway Homestate', img: 'BHHC_Logo_Full_Color_RGB.webp' },
  { name: 'National Life Group', img: 'NLG-logo.webp' },
  { name: 'F&G Annuities & Life', img: 'FG_Logo.webp' },
  { name: 'Foresters Financial', img: 'ff-logo-eng.webp' },
  { name: 'American Amicable', img: 'americanamicable-logo-secondary-navy-scaled.webp' },
  { name: 'Coterie Insurance', img: 'coterie-logo.webp' },
  { name: 'Johnson & Johnson', img: 'JJ_Horizleps-3.png' },
  { name: 'Med James, Inc.', img: 'logo.webp' },
];

export const GALLERY = [
  { img: '10.webp', alt: { en: 'Feel Good Insurance storefront on South Rock Blvd in Sparks', es: 'Fachada de Feel Good Insurance en South Rock Blvd, Sparks' } },
  { img: '3.webp', alt: { en: 'Inside the Feel Good Insurance office in Sparks, NV', es: 'Interior de la oficina de Feel Good Insurance en Sparks, NV' } },
  { img: '8.webp', alt: { en: 'Christian Vega helping a client at his desk', es: 'Christian Vega atendiendo a un cliente' } },
  { img: '7.webp', alt: { en: 'Geisy Zaragoza, founder of Feel Good Insurance', es: 'Geisy Zaragoza, fundadora de Feel Good Insurance' } },
  { img: '9.webp', alt: { en: 'The FGI team at a community event with local families', es: 'El equipo de FGI en un evento comunitario con familias locales' } },
  { img: '2.webp', alt: { en: 'Client waiting area at the Sparks office', es: 'Sala de espera en la oficina de Sparks' } },
  { img: '5.webp', alt: { en: 'Christian Vega, founder', es: 'Christian Vega, fundador' } },
  { img: '6.webp', alt: { en: 'Efrain Vega, CSR and document preparer', es: 'Efrain Vega, servicio al cliente y preparador de documentos' } },
  { img: '1.webp', alt: { en: 'South Rock Plaza sign at 414 S Rock Blvd, Sparks', es: 'Letrero de South Rock Plaza en 414 S Rock Blvd, Sparks' } },
];

// ---------- UI strings ----------
export const UI = {
  skip: { en: 'Skip to content', es: 'Saltar al contenido' },
  home: { en: 'Home', es: 'Inicio' },
  about: { en: 'About', es: 'Nosotros' },
  aboutUs: { en: 'About Us', es: 'Nosotros' },
  services: { en: 'Services', es: 'Servicios' },
  allServices: { en: 'All services', es: 'Todos los servicios' },
  areas: { en: 'Service Areas', es: 'Áreas de Servicio' },
  allAreas: { en: 'All service areas', es: 'Todas las áreas' },
  gallery: { en: 'Gallery', es: 'Galería' },
  blog: { en: 'Blog', es: 'Blog' },
  contact: { en: 'Contact', es: 'Contacto' },
  getQuote: { en: 'Get a Free Quote', es: 'Cotización Gratis' },
  quoteShort: { en: 'Get a Quote', es: 'Cotizar' },
  callUs: { en: 'Call us', es: 'Llámenos' },
  call: { en: 'Call', es: 'Llamar' },
  text: { en: 'Text', es: 'Mensaje' },
  email: { en: 'Email', es: 'Correo' },
  directions: { en: 'Get directions', es: 'Cómo llegar' },
  learnMore: { en: 'Learn more', es: 'Ver más' },
  readMore: { en: 'Read article', es: 'Leer artículo' },
  personal: { en: 'Personal', es: 'Personal' },
  business: { en: 'Business', es: 'Negocios' },
  documents: { en: 'DMV & Documents', es: 'DMV y Documentos' },
  language: { en: 'Language', es: 'Idioma' },
  switchTo: { en: 'Español', es: 'English' },
  switchToShort: { en: 'ES', es: 'EN' },
  spanishSpoken: { en: 'Se habla español', es: 'Hablamos inglés y español' },
  googleRating: { en: 'Google rating', es: 'calificación en Google' },
  reviews: { en: 'reviews', es: 'reseñas' },
  faq: { en: 'Frequently asked questions', es: 'Preguntas frecuentes' },
  menu: { en: 'Menu', es: 'Menú' },
  close: { en: 'Close', es: 'Cerrar' },
  minutesRead: { en: 'min read', es: 'min de lectura' },
  updated: { en: 'Updated', es: 'Actualizado' },
  by: { en: 'By', es: 'Por' },
  onThisPage: { en: 'On this page', es: 'En esta página' },
  related: { en: 'Keep reading', es: 'Siga leyendo' },
  share: { en: 'Share', es: 'Compartir' },
  onlineQuote: { en: 'Start an online quote', es: 'Cotizar en línea' },
  officeHours: { en: 'Office hours', es: 'Horario' },
  callForHours: { en: 'Walk-ins welcome — call ahead for today’s hours', es: 'Sin cita — llame para confirmar el horario de hoy' },
  footerAbout: {
    en: 'An independent insurance agency in Sparks, Nevada. We compare multiple carriers to find honest coverage for individuals, families, seniors and businesses — and handle DMV and notary paperwork under the same roof.',
    es: 'Agencia de seguros independiente en Sparks, Nevada. Comparamos varias aseguradoras para encontrar cobertura honesta para personas, familias, adultos mayores y negocios — y atendemos trámites del DMV y notaría en el mismo lugar.',
  },
  quickLinks: { en: 'Explore', es: 'Explorar' },
  getInTouch: { en: 'Get in touch', es: 'Contáctenos' },
  rights: { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
  privacy: { en: 'Privacy Policy', es: 'Política de Privacidad' },
  terms: { en: 'Terms of Service', es: 'Términos de Servicio' },
  licensedNote: {
    en: 'Insurance products are offered through Feel Good Insurance, LLC, an independent agency. Coverage is subject to carrier underwriting and policy terms. DMV services are provided as a third-party service and are not affiliated with the Nevada DMV.',
    es: 'Los productos de seguros se ofrecen a través de Feel Good Insurance, LLC, una agencia independiente. La cobertura está sujeta a la suscripción de cada aseguradora y a los términos de la póliza. Los servicios del DMV se ofrecen como servicio de terceros y no están afiliados al DMV de Nevada.',
  },
  bbb: { en: 'BBB Accredited Business', es: 'Negocio Acreditado BBB' },
  langBannerText: { en: 'This page is also available in Spanish.', es: 'Esta página también está disponible en inglés.' },
  langBannerCta: { en: 'Ver en español', es: 'View in English' },
  backToTop: { en: 'Back to top', es: 'Volver arriba' },
  helpTitle: { en: 'How can we help?', es: '¿Cómo le podemos ayudar?' },
  helpSub: { en: 'Real people, real answers — usually within minutes during office hours.', es: 'Personas reales, respuestas reales — normalmente en minutos en horario de oficina.' },
};

export const t = (key, lang) => {
  const v = UI[key];
  if (!v) throw new Error('Missing UI string: ' + key);
  return v[lang] ?? v.en;
};
