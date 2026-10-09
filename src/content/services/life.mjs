import { icon } from '../../lib/icons.mjs';

const calc = (es) => {
  const r = (id, name, label, min, max, step, val, fmt = 'money') => `<div class="range-field"><div class="top"><label for="${id}">${label}</label><output for="${id}"></output></div><input type="range" id="${id}" name="${name}" min="${min}" max="${max}" step="${step}" value="${val}" data-fmt="${fmt}"></div>`;
  return `<section class="section paper" id="calculator">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${es ? 'Herramienta gratuita' : 'Free tool'}</p><h2 class="h2 split-words">${es ? '¿Cuánto seguro de vida <em>necesito?</em>' : 'How much life insurance <em>do I need?</em>'}</h2><p class="lead reveal">${es ? 'Una estimación rápida basada en reemplazar su ingreso, pagar deudas, financiar la educación y cubrir gastos finales. Ajuste los valores para ver el resultado al instante.' : 'A quick estimate based on replacing your income, paying off debts, funding education and covering final expenses. Move the sliders to see your number instantly.'}</p></div>
    <div class="calc reveal">
      <div class="calc-inputs">
        ${r('c-income', 'income', es ? 'Ingreso anual' : 'Annual income', 20000, 300000, 5000, 75000)}
        ${r('c-years', 'years', es ? 'Años de ingreso a reemplazar' : 'Years of income to replace', 1, 30, 1, 10, 'num')}
        ${r('c-debts', 'debts', es ? 'Hipoteca y deudas' : 'Mortgage & debts', 0, 1000000, 10000, 250000)}
        ${r('c-kids', 'kids', es ? 'Hijos por educar' : 'Children to put through college', 0, 6, 1, 2, 'num')}
        ${r('c-savings', 'savings', es ? 'Ahorros y seguro existente' : 'Savings & existing coverage', 0, 1000000, 10000, 50000)}
      </div>
      <div class="calc-output" aria-live="polite">
        <p class="eyebrow">${es ? 'Cobertura estimada' : 'Estimated coverage need'}</p>
        <div class="amount">$0</div>
        <p>${es ? 'Incluye $100,000 por hijo para educación y $15,000 para gastos finales. Es solo una guía — un agente calcula su necesidad real sin costo.' : 'Includes $100,000 per child for education and $15,000 for final expenses. This is a guide only — an agent will calculate your real need at no cost.'}</p>
        <div class="btn-row mt-2"><a class="btn gold" href="${es ? '/es/cotizar/' : '/get-a-quote/'}?type=life">${es ? 'Cotizar esta cobertura' : 'Quote this coverage'} ${icon('arrow', 'arrow-ico')}</a></div>
      </div>
    </div>
  </div>
</section>`;
};

export default {
  en: {
    title: 'Life Insurance Agent in Sparks, NV | Term & Whole Life',
    description: 'Work with a local life insurance agent in Sparks, NV to compare term, whole and universal life. Free needs analysis, multiple carriers and a coverage calculator.',
    eyebrow: 'Life insurance · Nevada families',
    h1: 'Life insurance that secures your <em>family’s future</em>',
    lead: 'Life insurance isn’t for you — it’s for the people who depend on you. Could your family keep the house, pay for college and cover everyday expenses if something happened to you?',
    heroAlt: 'Hands protecting paper cut-outs of a family, representing life insurance',
    intro: {
      eyebrow: 'About life insurance in Nevada',
      title: 'Protection for the people <em>who count on you</em>',
      paras: [
        'Life insurance replaces lost income, pays off debts and final expenses, and helps your family maintain their standard of living. Nevada doesn’t require it — but if you have dependents, a mortgage or family counting on your income, you almost certainly need it.',
        'Term life is affordable protection for 10, 20 or 30 years — great for young families with house payments. Whole life is permanent and builds cash value, which suits long-term protection and estate planning. A healthy 40-year-old can often get $500,000 of 20-year term coverage for about $50–60 a month.',
        'A common rule of thumb is 10–15 times your annual income. But your real need depends on your dependents, debts, education goals and savings — which is exactly what we calculate with you.',
      ],
      checks: ['Free needs analysis', 'Term, whole & universal', 'Multiple carriers', 'Health conditions considered'],
      img: 'life-insurance2.jpg', alt: 'Life insurance policy document with a paper family',
      img2: 'life-insurance3.webp', alt2: 'Hands protecting a paper family',
    },
    why: {
      title: 'Why you need <em>life insurance</em>',
      lead: 'If something happens to you, your family needs financial security that replaces your income and covers major expenses.',
      items: [
        { icon: 'home', t: 'Mortgage payment security', d: 'A $350,000 mortgage can mean $1,400+ monthly payments. A life insurance payout lets your family keep the home.' },
        { icon: 'book', t: 'Education funding', d: 'College can cost $100,000+ per child. Life insurance helps make sure your children can still attend without heavy loans.' },
        { icon: 'calendar', t: 'Income replacement', d: 'If your income supports your family, a policy can replace it for the 15–25 years they depend on you.' },
        { icon: 'heart', t: 'Funeral & final costs', d: 'Funerals often cost $8,000–$12,000 and probate can add more. A payout provides immediate cash during a difficult time.' },
        { icon: 'users', t: 'Spousal transition support', d: 'If you are the primary earner, coverage bridges the gap while a surviving spouse adjusts — without a financial crisis.' },
        { icon: 'briefcase', t: 'Business continuity', d: 'For business owners, life insurance can fund continuation plans and protect employees who depend on the business.' },
      ],
    },
    coverage: {
      title: 'Life insurance <em>types explained</em>',
      lead: 'Three main options — we’ll show you the cost and benefits of each for your situation.',
      items: [
        { t: 'Term life insurance', d: 'Affordable coverage for a set period — 10, 20 or 30 years. If you pass away during the term, your beneficiary receives the death benefit. No cash value.' },
        { t: 'Whole life insurance', d: 'Permanent coverage for your entire life (as long as premiums are paid). Builds cash value you can borrow against. Costs more than term.' },
        { t: 'Universal life insurance', d: 'Flexible permanent coverage with adjustable premiums and death benefits. Builds cash value and typically costs less than whole life.' },
      ],
    },
    tool: calc(false),
    steps: {
      title: 'Four steps to <em>family security</em>',
      lead: 'Honest needs analysis — not a sales pitch.',
      items: [
        { t: 'Assess your needs', d: 'We look at income, dependents, debts, education goals and calculate the real income replacement your family needs.' },
        { t: 'Explain your options', d: 'We compare term and whole life costs and benefits so you understand exactly what you’re buying.' },
        { t: 'Compare quotes', d: 'You see quotes from multiple carriers side by side and choose what works for your family.' },
        { t: 'Implement & review', d: 'We manage the application and underwriting, then review periodically as your life changes.' },
      ],
    },
    mission: [
      'Every Nevada family has life insurance that protects them adequately — calculated on actual needs, not profit models.',
      'Provide honest needs analysis, clear explanations of term and whole life, and life insurance that protects Nevada families financially.',
    ],
    faqs: [
      { q: 'How much life insurance do I need?', a: 'A general rule is 10–12 times your annual income. A more accurate approach adds up your family’s expenses, debts, education goals and the years they’ll depend on you. Try the calculator above — then we’ll refine it with you for free.' },
      { q: 'What’s the difference between term and whole life insurance?', a: 'Term covers you for a specific period (10, 20 or 30 years) and then expires — it’s inexpensive and temporary. Whole life covers your entire life, builds cash value and costs significantly more.' },
      { q: 'Is term life insurance expensive?', a: 'Usually not. A healthy 30-year-old can often get $500,000 of term coverage for about $30–60 a month. Rates increase with age, so buying while young is very affordable.' },
      { q: 'Do I need life insurance if I’m single with no dependents?', a: 'Only if someone depends on your income (such as an aging parent) or you want to make sure your funeral costs don’t burden others. We’ll assess your situation honestly.' },
      { q: 'Can I get life insurance with health conditions?', a: 'Most health conditions don’t disqualify you, though they may increase rates. Some serious conditions face limitations — we work with carriers that specialize in these situations.' },
      { q: 'What’s the underwriting process like?', a: 'You apply with health and lifestyle information. The insurer may request medical records or a brief exam, or approve based on the application alone. Most approvals take 2–4 weeks; some carriers are faster.' },
    ],
    cta: { title: 'Get your free <em>life insurance quote</em>', lead: 'Our agents will discuss your family situation, calculate appropriate coverage and find options that fit your budget — throughout Sparks, Reno, Carson City and beyond.' },
  },
  es: {
    title: 'Seguro de Vida en Sparks, NV | Término y Vida Entera',
    description: 'Trabaje con un agente local de seguros de vida en Sparks, NV para comparar vida a término, entera y universal. Análisis gratis, varias aseguradoras y calculadora de cobertura.',
    eyebrow: 'Seguro de vida · Familias de Nevada',
    h1: 'Seguro de vida que asegura el <em>futuro de su familia</em>',
    lead: 'El seguro de vida no es para usted — es para quienes dependen de usted. ¿Podría su familia conservar la casa, pagar la universidad y cubrir los gastos diarios si algo le pasara?',
    heroAlt: 'Manos protegiendo siluetas de una familia, representando el seguro de vida',
    intro: {
      eyebrow: 'El seguro de vida en Nevada',
      title: 'Protección para quienes <em>cuentan con usted</em>',
      paras: [
        'El seguro de vida reemplaza el ingreso perdido, paga deudas y gastos finales, y ayuda a que su familia mantenga su nivel de vida. Nevada no lo exige — pero si tiene dependientes, una hipoteca o familia que depende de su ingreso, casi seguro lo necesita.',
        'El seguro a término es una protección accesible por 10, 20 o 30 años — ideal para familias jóvenes con hipoteca. El seguro de vida entera es permanente y acumula valor en efectivo, útil para protección a largo plazo y planificación patrimonial. Una persona sana de 40 años a menudo obtiene $500,000 a 20 años por unos $50–60 al mes.',
        'Una regla común es entre 10 y 15 veces su ingreso anual. Pero su necesidad real depende de sus dependientes, deudas, metas de educación y ahorros — y eso es justo lo que calculamos con usted.',
      ],
      checks: ['Análisis de necesidades gratis', 'A término, entera y universal', 'Varias aseguradoras', 'Consideramos condiciones de salud'],
      img: 'life-insurance2.jpg', alt: 'Póliza de seguro de vida con una familia de papel',
      img2: 'life-insurance3.webp', alt2: 'Manos protegiendo una familia de papel',
    },
    why: {
      title: 'Por qué necesita <em>seguro de vida</em>',
      lead: 'Si algo le pasa, su familia necesita seguridad financiera que reemplace su ingreso y cubra los gastos importantes.',
      items: [
        { icon: 'home', t: 'Pago de la hipoteca', d: 'Una hipoteca de $350,000 puede significar pagos de $1,400+ al mes. El pago del seguro permite que su familia conserve su hogar.' },
        { icon: 'book', t: 'Educación de sus hijos', d: 'La universidad puede costar $100,000+ por hijo. El seguro de vida ayuda a que sus hijos estudien sin préstamos pesados.' },
        { icon: 'calendar', t: 'Reemplazo de ingreso', d: 'Si su ingreso sostiene a su familia, una póliza puede reemplazarlo durante los 15–25 años en que dependan de usted.' },
        { icon: 'heart', t: 'Gastos funerarios', d: 'Un funeral suele costar $8,000–$12,000 y la sucesión puede sumar más. El pago da liquidez inmediata en un momento difícil.' },
        { icon: 'users', t: 'Apoyo al cónyuge', d: 'Si usted es el principal sostén, la cobertura da tiempo a su pareja para ajustarse — sin una crisis financiera.' },
        { icon: 'briefcase', t: 'Continuidad del negocio', d: 'Para dueños de negocio, el seguro de vida puede financiar la continuidad y proteger a los empleados.' },
      ],
    },
    coverage: {
      title: 'Tipos de seguro de vida <em>explicados</em>',
      lead: 'Tres opciones principales — le mostramos el costo y los beneficios de cada una para su situación.',
      items: [
        { t: 'Vida a término', d: 'Cobertura accesible por un periodo fijo — 10, 20 o 30 años. Si fallece durante el plazo, su beneficiario recibe la suma asegurada. Sin valor en efectivo.' },
        { t: 'Vida entera', d: 'Cobertura permanente de por vida (mientras pague las primas). Acumula valor en efectivo que puede usar como préstamo. Cuesta más que el término.' },
        { t: 'Vida universal', d: 'Cobertura permanente y flexible con primas y beneficios ajustables. Acumula valor en efectivo y suele costar menos que la vida entera.' },
      ],
    },
    tool: calc(true),
    steps: {
      title: 'Cuatro pasos hacia <em>la seguridad familiar</em>',
      lead: 'Un análisis honesto — no una venta.',
      items: [
        { t: 'Evaluamos sus necesidades', d: 'Revisamos ingreso, dependientes, deudas y metas de educación para calcular el reemplazo de ingreso que su familia necesita.' },
        { t: 'Explicamos sus opciones', d: 'Comparamos costos y beneficios de vida a término y entera para que entienda exactamente lo que compra.' },
        { t: 'Compare cotizaciones', d: 'Vea cotizaciones de varias aseguradoras lado a lado y elija lo mejor para su familia.' },
        { t: 'Implementación y revisión', d: 'Gestionamos la solicitud y la suscripción, y revisamos su póliza cuando su vida cambia.' },
      ],
    },
    mission: [
      'Que cada familia de Nevada tenga un seguro de vida que la proteja adecuadamente — calculado según sus necesidades reales.',
      'Brindar un análisis honesto, explicaciones claras de vida a término y entera, y seguros que protejan financieramente a las familias de Nevada.',
    ],
    faqs: [
      { q: '¿Cuánto seguro de vida necesito?', a: 'Una regla general es de 10 a 12 veces su ingreso anual. Un cálculo más exacto suma los gastos de su familia, deudas, metas de educación y los años que dependerán de usted. Pruebe la calculadora — luego la afinamos con usted gratis.' },
      { q: '¿Cuál es la diferencia entre vida a término y vida entera?', a: 'El seguro a término le cubre por un periodo específico (10, 20 o 30 años) y luego vence — es económico y temporal. La vida entera le cubre toda la vida, acumula valor en efectivo y cuesta bastante más.' },
      { q: '¿El seguro a término es caro?', a: 'Normalmente no. Una persona sana de 30 años suele obtener $500,000 de cobertura por unos $30–60 al mes. Las tarifas suben con la edad, así que contratarlo joven es muy accesible.' },
      { q: '¿Necesito seguro de vida si soy soltero y sin dependientes?', a: 'Solo si alguien depende de su ingreso (por ejemplo, un padre mayor) o si desea que sus gastos funerarios no sean una carga. Evaluamos su situación con honestidad.' },
      { q: '¿Puedo obtener seguro de vida con problemas de salud?', a: 'La mayoría de las condiciones no le descalifican, aunque pueden aumentar la tarifa. Algunas condiciones graves tienen limitaciones — trabajamos con aseguradoras especializadas.' },
      { q: '¿Cómo es el proceso de suscripción?', a: 'Usted presenta información de salud y estilo de vida. La aseguradora puede pedir expedientes médicos o un examen breve, o aprobar solo con la solicitud. La mayoría tarda 2–4 semanas; algunas son más rápidas.' },
    ],
    cta: { title: 'Obtenga su cotización <em>de seguro de vida</em>', lead: 'Hablamos de su situación familiar, calculamos la cobertura adecuada y buscamos opciones a su alcance — en Sparks, Reno, Carson City y más allá.' },
  },
};
