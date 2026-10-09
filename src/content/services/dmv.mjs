import { icon } from '../../lib/icons.mjs';
import { SITE } from '../site.mjs';

const estimator = (es) => `<div class="btn-row mt-3"><a class="btn" href="${SITE.partners.dmvEstimator}" target="_blank" rel="noopener">${es ? 'Calcular tarifas de registro (DMV de Nevada)' : 'Estimate registration fees (Nevada DMV)'} ${icon('external')}</a></div>`;

export default {
  en: {
    title: 'DMV Services in Sparks, NV | Registration & SR-22 | FGI',
    description: 'Skip the DMV line in Sparks, NV. Vehicle registration, title transfers, SR-22 filing, license and registration reinstatement help. Third-party service — not affiliated with the Nevada DMV.',
    eyebrow: 'Third-party DMV services · Sparks, NV',
    h1: 'DMV services <em>without the line</em>',
    lead: 'Long lines, confusing requirements and rejected paperwork — we handle registrations, title transfers, SR-22 filings and reinstatements so you can get back to what matters.',
    heroAlt: 'Mechanic working on a vehicle, representing vehicle registration services',
    chips: [['file', 'Registrations & renewals'], ['key', 'Title transfers'], ['shield', 'SR-22 filing'], ['translate', 'Se habla español']],
    intro: {
      eyebrow: 'Expert navigation',
      title: 'Complex DMV situations need <em>expert help</em>',
      paras: [
        'Standard DMV procedures work for simple renewals. But multiple suspensions, ownership disputes, out-of-state vehicles or SR-22 coordination quickly become difficult — and lead to repeated, costly rejections.',
        'We’ve worked with Nevada DMV processes for years. We know the current requirements, the documents each case needs and how to resolve common issues for individuals and businesses alike.',
        '<b>Please note:</b> Feel Good Insurance is a third-party service provider and is not affiliated with the Nevada Department of Motor Vehicles.',
      ],
      checks: ['Registration & renewals', 'Title transfers & duplicates', 'SR-22 filing', 'Out-of-state transfers'],
      img: 'DMV-1.jpg', alt: 'Technician servicing a car, representing DMV vehicle services',
      img2: 'DMV1.jpg', alt2: 'Technician working on an electric vehicle',
    },
    why: {
      title: 'Why use a <em>third-party DMV service</em>',
      lead: 'Expert guidance saves time, prevents delays and gets it right the first time.',
      items: [
        { icon: 'shield', t: 'SR-22 documentation', d: 'We gather your documents, complete the forms and make sure everything meets DMV requirements so you get your driving privileges back.' },
        { icon: 'key', t: 'License reinstatement', d: 'Suspended or revoked? We guide you through the specific reinstatement steps and help prepare your documentation.' },
        { icon: 'file', t: 'Registration problems', d: 'Expired tags, title problems and ownership questions — we help resolve them and get your vehicle legally registered.' },
        { icon: 'book', t: 'Document organization', d: 'Birth certificates, residency proof, ID and titles can be confusing. We organize them to prevent rejections.' },
        { icon: 'clock', t: 'Save time & stress', d: 'Skip hours of waiting. We handle the process so you don’t have to deal with long lines and repeat visits.' },
        { icon: 'compass', t: 'Complex situations', d: 'Suspensions, title issues, out-of-state transfers and ownership disputes — we resolve the cases that confuse everyday visitors.' },
      ],
    },
    coverage: {
      eyebrow: 'Services we handle',
      title: 'Types of DMV services <em>we handle</em>',
      lead: 'From everyday renewals to complicated reinstatements — and we can set up the insurance you need at the same visit.',
      items: [
        { t: 'Vehicle registration', d: 'New registrations, annual renewals and out-of-state transfers after you move to Nevada.' },
        { t: 'Title services', d: 'Ownership transfers, duplicate titles for lost paperwork and lien releases once a loan is paid off.' },
        { t: 'Registration reinstatement', d: 'Resolving lapses that require fees, fines and a notarized Declaration of Responsibility before you drive again.' },
        { t: 'SR-22 filing', d: 'Electronic SR-22 certificates filed with the state, coordinated with the right auto insurance policy.' },
        { t: 'License reinstatement guidance', d: 'Clear steps, documentation and follow-up to restore your driving privileges.' },
        { t: 'Notary on site', d: 'Need a document notarized for your DMV transaction? Our notary can handle it during the same visit.' },
      ],
    },
    extra: {
      type: 'split', img: 'DMV3.webp', alt: 'Vehicle registration paperwork being completed', eyebrow: 'How it works',
      title: 'From confusion <em>to resolution</em>',
      paras: [
        'It starts with a simple conversation about your situation — reinstating a license, filing an SR-22, registering a vehicle or transferring an out-of-state title. We tell you exactly which documents to gather and review everything before submission to catch errors that cause rejections.',
        'Then we complete the required forms accurately and coordinate with the Nevada DMV on your behalf, keeping you updated on progress and timelines. Once everything is approved, we confirm your records are in order.',
      ],
      button: estimator(false),
    },
    steps: {
      title: 'Four steps to a <em>resolved DMV case</em>',
      lead: 'We pinpoint the issue, then manage the paperwork from start to finish.',
      items: [
        { t: 'Tell us your situation', d: 'Urgent SR-22, a registration problem or a suspension notice — we identify exactly what’s needed.' },
        { t: 'Identify documents', d: 'We map out the paperwork your case requires and cut out the guesswork.' },
        { t: 'Gather & verify', d: 'We help you collect every item and verify signatures and details to prevent rejections.' },
        { t: 'We handle the process', d: 'We manage the submission and follow up until your case is resolved.' },
      ],
    },
    mission: [
      'Nevada residents complete DMV processes without frustration or confusion.',
      'Provide DMV guidance and service that reduce time, stress and documentation errors.',
    ],
    faqs: [
      { q: 'What DMV services do you offer?', a: 'SR-22 filing, license reinstatement guidance, vehicle registration and renewal, title transfers, documentation organization and help with complex DMV situations.' },
      { q: 'How much do your DMV services cost?', a: 'Service fees typically range around $50–100 for registrations and SR-22 filings and $75–150 for license reinstatement help, plus any state fees. Complex situations may cost more — we always give you a transparent quote before starting.' },
      { q: 'How long does license reinstatement take?', a: 'Typically 2–4 weeks from a complete submission. We speed things up by making sure the documentation is correct the first time. Complex cases may take longer.' },
      { q: 'Do you handle out-of-state vehicle transfers?', a: 'Yes. We handle the documentation, forms and coordination for transferring an out-of-state vehicle to Nevada, which typically takes 2–4 weeks.' },
      { q: 'What if my license is suspended?', a: 'You cannot legally drive until it’s reinstated. We help you understand the reason for the suspension, gather documents and navigate reinstatement — some situations allow a restricted license. Contact us right away.' },
      { q: 'Can you help with vehicle title problems?', a: 'Yes — missing titles, lien issues, ownership disputes and salvage titles. Depending on complexity these take about 3–6 weeks, and we guide you throughout.' },
      { q: 'Are you part of the Nevada DMV?', a: 'No. We are a third-party service provider and are not affiliated with the Nevada DMV. We help you prepare and submit paperwork so you avoid lines and rejections.' },
    ],
    cta: { title: 'Get help with your <em>DMV paperwork</em>', lead: 'Call or visit our Sparks office. We’ll explain what’s needed and handle the details so you can focus on what matters.' },
  },
  es: {
    title: 'Servicios del DMV en Sparks, NV | Registro, Títulos y SR-22 | Feel Good Insurance',
    description: 'Evite las filas del DMV en Sparks, NV. Registro de vehículos, traspaso de títulos, SR-22 y reinstalación de licencia y registro. Servicio de terceros — no afiliado al DMV de Nevada.',
    eyebrow: 'Servicios del DMV · Sparks, NV',
    h1: 'Trámites del DMV <em>sin hacer fila</em>',
    lead: 'Filas largas, requisitos confusos y documentos rechazados — nosotros atendemos registros, traspasos de título, SR-22 y reinstalaciones para que usted se ocupe de lo importante.',
    heroAlt: 'Mecánico trabajando en un vehículo, representando servicios de registro',
    chips: [['file', 'Registros y renovaciones'], ['key', 'Traspaso de títulos'], ['shield', 'Trámite SR-22'], ['translate', 'Hablamos español']],
    intro: {
      eyebrow: 'Ayuda experta',
      title: 'Los casos complicados del DMV <em>necesitan expertos</em>',
      paras: [
        'Los trámites sencillos del DMV funcionan bien para renovaciones. Pero varias suspensiones, disputas de propiedad, vehículos de otro estado o la coordinación de un SR-22 se complican rápido — y llevan a rechazos costosos.',
        'Conocemos los procesos del DMV de Nevada desde hace años: los requisitos actuales, los documentos que necesita cada caso y cómo resolver los problemas comunes de personas y empresas.',
        '<b>Importante:</b> Feel Good Insurance es un proveedor de servicios externo y no está afiliado al Departamento de Vehículos Motorizados de Nevada.',
      ],
      checks: ['Registro y renovaciones', 'Traspasos y duplicados de título', 'Trámite SR-22', 'Vehículos de otro estado'],
      img: 'DMV-1.jpg', alt: 'Técnico dando servicio a un auto',
      img2: 'DMV1.jpg', alt2: 'Técnico trabajando en un vehículo eléctrico',
    },
    why: {
      title: 'Por qué usar un <em>servicio externo del DMV</em>',
      lead: 'La orientación experta ahorra tiempo, evita retrasos y lo hace bien a la primera.',
      items: [
        { icon: 'shield', t: 'Documentos del SR-22', d: 'Reunimos sus documentos, llenamos los formularios y verificamos que todo cumpla con el DMV para que recupere su privilegio de manejo.' },
        { icon: 'key', t: 'Reinstalación de licencia', d: '¿Suspendida o revocada? Le guiamos en los pasos específicos y le ayudamos a preparar la documentación.' },
        { icon: 'file', t: 'Problemas de registro', d: 'Placas vencidas, problemas de título y dudas de propiedad — los resolvemos y registramos su vehículo legalmente.' },
        { icon: 'book', t: 'Documentos en orden', d: 'Actas de nacimiento, comprobantes de domicilio, identificación y títulos pueden confundir. Los organizamos para evitar rechazos.' },
        { icon: 'clock', t: 'Menos tiempo y estrés', d: 'Olvídese de horas de espera. Nosotros hacemos el trámite para que no tenga que volver una y otra vez.' },
        { icon: 'compass', t: 'Casos complicados', d: 'Suspensiones, títulos, traslados de otro estado y disputas — resolvemos los casos que confunden a la mayoría.' },
      ],
    },
    coverage: {
      eyebrow: 'Servicios que ofrecemos',
      title: 'Trámites del DMV <em>que atendemos</em>',
      lead: 'Desde renovaciones sencillas hasta reinstalaciones complicadas — y podemos contratar el seguro que necesita en la misma visita.',
      items: [
        { t: 'Registro de vehículos', d: 'Registros nuevos, renovaciones anuales y traslados de otro estado al mudarse a Nevada.' },
        { t: 'Servicios de título', d: 'Traspasos de propiedad, duplicados por pérdida y liberación de gravamen al terminar de pagar un préstamo.' },
        { t: 'Reinstalación de registro', d: 'Resolvemos interrupciones que requieren tarifas, multas y una Declaración de Responsabilidad notarizada.' },
        { t: 'Trámite SR-22', d: 'Certificados SR-22 electrónicos ante el estado, coordinados con la póliza de auto correcta.' },
        { t: 'Reinstalación de licencia', d: 'Pasos claros, documentación y seguimiento para recuperar su privilegio de manejo.' },
        { t: 'Notario en la oficina', d: '¿Necesita notarizar un documento para su trámite? Lo hacemos en la misma visita.' },
      ],
    },
    extra: {
      type: 'split', img: 'DMV3.webp', alt: 'Documentos de registro vehicular', eyebrow: 'Cómo funciona',
      title: 'De la confusión <em>a la solución</em>',
      paras: [
        'Empieza con una conversación sencilla sobre su situación — reinstalar una licencia, presentar un SR-22, registrar un vehículo o traspasar un título de otro estado. Le decimos exactamente qué documentos reunir y revisamos todo antes de enviarlo para evitar rechazos.',
        'Luego llenamos los formularios correctamente y coordinamos con el DMV de Nevada por usted, manteniéndole informado. Cuando todo se aprueba, confirmamos que sus registros estén en orden.',
      ],
      button: estimator(true),
    },
    steps: {
      title: 'Cuatro pasos para <em>resolver su trámite</em>',
      lead: 'Identificamos el problema y gestionamos los documentos de principio a fin.',
      items: [
        { t: 'Cuéntenos su situación', d: 'SR-22 urgente, problema de registro o aviso de suspensión — identificamos lo que se necesita.' },
        { t: 'Definimos documentos', d: 'Le indicamos exactamente qué papeles requiere su caso, sin adivinar.' },
        { t: 'Reunimos y verificamos', d: 'Le ayudamos a reunir cada documento y verificamos firmas y datos para evitar rechazos.' },
        { t: 'Nosotros tramitamos', d: 'Gestionamos el envío y damos seguimiento hasta resolver su caso.' },
      ],
    },
    mission: [
      'Que los residentes de Nevada completen sus trámites del DMV sin frustración ni confusión.',
      'Ofrecer orientación y servicio que reduzcan el tiempo, el estrés y los errores en la documentación.',
    ],
    faqs: [
      { q: '¿Qué servicios del DMV ofrecen?', a: 'Trámite SR-22, orientación para reinstalar licencias, registro y renovación de vehículos, traspasos de título, organización de documentos y ayuda con casos complicados.' },
      { q: '¿Cuánto cuestan sus servicios del DMV?', a: 'Nuestras tarifas suelen ser de unos $50–100 para registros y SR-22, y $75–150 para la reinstalación de licencia, más las tarifas del estado. Los casos complejos pueden costar más — siempre le damos una cotización transparente antes de empezar.' },
      { q: '¿Cuánto tarda la reinstalación de licencia?', a: 'Normalmente de 2 a 4 semanas desde una solicitud completa. Lo agilizamos asegurando que la documentación esté correcta desde el inicio. Los casos complejos pueden tardar más.' },
      { q: '¿Tramitan vehículos de otro estado?', a: 'Sí. Nos encargamos de la documentación, los formularios y la coordinación para transferir su vehículo a Nevada, lo cual suele tardar de 2 a 4 semanas.' },
      { q: '¿Qué hago si mi licencia está suspendida?', a: 'No puede manejar legalmente hasta que se reinstale. Le ayudamos a entender el motivo, reunir documentos y completar la reinstalación — en algunos casos se permite una licencia restringida. Contáctenos de inmediato.' },
      { q: '¿Pueden ayudar con problemas de título?', a: 'Sí — títulos perdidos, gravámenes, disputas de propiedad y títulos de salvamento. Según la complejidad toma de 3 a 6 semanas, y le acompañamos en todo el proceso.' },
      { q: '¿Son parte del DMV de Nevada?', a: 'No. Somos un proveedor de servicios externo y no estamos afiliados al DMV de Nevada. Le ayudamos a preparar y presentar sus documentos para evitar filas y rechazos.' },
    ],
    cta: { title: 'Le ayudamos con sus <em>trámites del DMV</em>', lead: 'Llame o visite nuestra oficina en Sparks. Le explicamos lo que necesita y nos encargamos de los detalles.' },
  },
};
