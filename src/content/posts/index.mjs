// Blog posts. English bodies: ./en/<slug>.html (migrated from the old site). Spanish bodies: ./es/<slug-en>.html
export const CATS = {
  auto: { en: 'Auto', es: 'Auto' },
  life: { en: 'Life', es: 'Vida' },
  business: { en: 'Business', es: 'Negocios' },
};

export const POSTS = [
  {
    slug: { en: 'what-should-a-small-business-owner-consider-when-choosing-commercial-insurance', es: 'como-elegir-seguro-comercial-para-pequenos-negocios' },
    cat: 'business', date: '2026-09-24', updated: '2026-09-25',
    img: 'What-should-a-small-business-owner-consider-when-choosing-commercial-insurance-e1790360424986.jpg',
    title: { en: 'What Should a Small Business Owner Consider When Choosing Commercial Insurance?', es: '¿Qué debe considerar un pequeño negocio al elegir un seguro comercial?' },
    seoTitle: { en: 'How to Choose Commercial Insurance for a Small Business', es: 'Cómo elegir un seguro comercial para su pequeño negocio' },
    desc: { en: 'Five practical considerations for choosing small business insurance: risks, coverage types, limits, costs and the right agent — from a Sparks, NV agency.', es: 'Cinco consideraciones prácticas para elegir el seguro de su negocio: riesgos, coberturas, límites, costos y el agente adecuado.' },
    service: 'commercial',
  },
  {
    slug: { en: 'car-dash-cam-benefits', es: 'beneficios-de-la-camara-para-auto' },
    cat: 'auto', date: '2026-09-17', updated: '2026-09-17',
    img: 'Dash-Cam-Benifits.webp',
    title: { en: 'Car Dash Cam Benefits: How Video Evidence Can Help With Insurance Claims', es: 'Beneficios de la cámara para auto: cómo el video ayuda en sus reclamos de seguro' },
    seoTitle: { en: 'Car Dash Cam Benefits for Insurance Claims', es: 'Beneficios de la cámara para auto en reclamos de seguro' },
    desc: { en: 'How a dash cam documents accidents, prevents false claims and can make your auto insurance claim smoother — plus what to look for when buying one.', es: 'Cómo una cámara para auto documenta accidentes, evita reclamos falsos y puede agilizar su reclamo de seguro.' },
    service: 'auto',
  },
  {
    slug: { en: 'what-is-supplemental-life-insurance', es: 'que-es-el-seguro-de-vida-suplementario' },
    cat: 'life', date: '2026-09-14', updated: '2026-09-14',
    img: 'Supplemental-Life-Insurance.jpg',
    title: { en: 'What Is Supplemental Life Insurance?', es: '¿Qué es el seguro de vida suplementario?' },
    seoTitle: { en: 'What Is Supplemental Life Insurance? Complete Guide', es: '¿Qué es el seguro de vida suplementario? Guía completa' },
    desc: { en: 'What supplemental life insurance is, how it fills gaps in basic employer coverage, what it costs and whether your family needs it.', es: 'Qué es el seguro de vida suplementario, cómo complementa la cobertura del empleador, cuánto cuesta y si su familia lo necesita.' },
    service: 'life',
  },
  {
    slug: { en: 'difference-between-professional-and-general-liability', es: 'diferencia-entre-responsabilidad-profesional-y-general' },
    cat: 'business', date: '2026-09-10', updated: '2026-09-10',
    img: 'difference-between-professional-and-general-liability.webp',
    title: { en: 'Professional Liability vs. General Liability Insurance: What’s the Difference?', es: 'Responsabilidad profesional vs. responsabilidad general: ¿cuál es la diferencia?' },
    seoTitle: { en: 'Professional vs. General Liability: Key Differences', es: 'Responsabilidad profesional vs. general: diferencias clave' },
    desc: { en: 'General liability covers injuries and property damage; professional liability covers mistakes in your advice or services. Learn which your business needs.', es: 'La responsabilidad general cubre lesiones y daños a la propiedad; la profesional cubre errores en sus servicios. Descubra cuál necesita su negocio.' },
    service: 'commercial',
  },
  {
    slug: { en: 'what-is-commercial-general-liability-cgl-insurance', es: 'que-es-el-seguro-de-responsabilidad-civil-general-comercial' },
    cat: 'business', date: '2026-09-01', updated: '2026-09-01',
    img: 'ChatGPT-Image-Sep-1-2026-01_33_06-PM.png',
    title: { en: 'What Is Commercial General Liability (CGL) Insurance?', es: '¿Qué es el seguro de responsabilidad civil general comercial (CGL)?' },
    seoTitle: { en: 'What Is Commercial General Liability (CGL) Insurance?', es: '¿Qué es el seguro de responsabilidad civil general (CGL)?' },
    desc: { en: 'What Commercial General Liability insurance covers, what it excludes, why most businesses need it and how to choose the right limits.', es: 'Qué cubre el seguro de responsabilidad civil general comercial, qué excluye, por qué lo necesita su negocio y cómo elegir los límites.' },
    service: 'commercial',
  },
  {
    slug: { en: 'do-i-need-business-insurance-if-i-have-an-llc', es: 'necesito-seguro-de-negocio-si-tengo-una-llc' },
    cat: 'business', date: '2026-08-19', updated: '2026-08-19',
    img: 'Do-I-Need-Business-Insurance-If-I-Have-an-LLC.webp',
    title: { en: 'Do I Need Business Insurance If I Have an LLC?', es: '¿Necesito seguro de negocio si tengo una LLC?' },
    seoTitle: { en: 'Do I Need Business Insurance If I Have an LLC?', es: '¿Necesito seguro de negocio si tengo una LLC?' },
    desc: { en: 'An LLC protects personal assets from some business debts — not from every risk. Learn which business insurance an LLC still needs in Nevada.', es: 'Una LLC protege sus bienes personales de ciertas deudas, pero no de todos los riesgos. Descubra qué seguros sigue necesitando su LLC.' },
    service: 'commercial',
  },
  {
    slug: { en: 'benefits-of-auto-insurance', es: 'beneficios-del-seguro-de-auto' },
    cat: 'auto', date: '2026-08-12', updated: '2026-09-25',
    img: 'Meta-Title-Top-5-Benefits-of-Auto-Insurance-Protect-Your-Vehicle.webp',
    title: { en: 'Top 5 Benefits of Auto Insurance: Protect Your Investment on the Road', es: 'Los 5 principales beneficios del seguro de auto: proteja su inversión en el camino' },
    seoTitle: { en: 'Top 5 Benefits of Auto Insurance | Protect Your Vehicle', es: 'Los 5 beneficios del seguro de auto | Proteja su vehículo' },
    desc: { en: 'The top 5 benefits of auto insurance — financial protection, liability coverage, vehicle repairs, medical costs and peace of mind — explained simply.', es: 'Los 5 principales beneficios del seguro de auto — protección financiera, responsabilidad, reparaciones, gastos médicos y tranquilidad.' },
    service: 'auto',
  },
  {
    slug: { en: 'what-is-accidental-death-and-dismemberment-insurance', es: 'que-es-el-seguro-de-muerte-accidental-y-desmembramiento' },
    cat: 'life', date: '2026-07-29', updated: '2026-09-25',
    img: 'accidental-death-and-dismemberment-insurance.jpg',
    title: { en: 'Complete Guide: What Is AD&D Insurance?', es: 'Guía completa: ¿qué es el seguro AD&D?' },
    seoTitle: { en: 'What Is Accidental Death and Dismemberment (AD&D) Insurance?', es: '¿Qué es el seguro AD&D (muerte accidental)?' },
    desc: { en: 'How Accidental Death and Dismemberment (AD&D) insurance protects your family after a serious accident, how payouts work and how it differs from life insurance.', es: 'Cómo el seguro de muerte accidental y desmembramiento protege a su familia, cómo funcionan los pagos y en qué se diferencia del seguro de vida.' },
    service: 'life',
  },
];

export const postPath = (p, lang) => (lang === 'es' ? `/es/blog/${p.slug.es}/` : `/${p.slug.en}/`);
