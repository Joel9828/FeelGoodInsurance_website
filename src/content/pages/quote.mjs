import { SITE, ROUTES, SERVICES, t, L } from '../site.mjs';
import { icon } from '../../lib/icons.mjs';
import { img } from '../../lib/images.mjs';
import { consents, stars } from '../../lib/components.mjs';

export default function quote(lang) {
  const es = lang === 'es';
  const x = (en, sp) => (es ? sp : en);
  const sel = (name, label, opts, req = false) => `<div class="field"><label for="q-${name}">${label}${req ? '' : ` <span class="opt">(${x('optional', 'opcional')})</span>`}</label><select class="select" id="q-${name}" name="${name}"${req ? ' required' : ''}><option value="">${x('Select', 'Seleccione')}</option>${opts.map((o) => `<option>${o}</option>`).join('')}</select><span class="field-error" aria-live="polite"></span></div>`;
  const inp = (name, label, attrs = '', req = false) => `<div class="field"><label for="q-${name}">${label}${req ? '' : ` <span class="opt">(${x('optional', 'opcional')})</span>`}</label><input class="input" id="q-${name}" name="${name}" ${attrs}${req ? ' required' : ''}><span class="field-error" aria-live="polite"></span></div>`;
  const pill = (name, val, label, checked) => `<label class="choice"><input type="radio" name="${name}" value="${val}"${checked ? ' checked' : ''}><span>${label}</span></label>`;
  const yn = [x('Yes', 'Sí'), x('No', 'No'), x('Not sure', 'No estoy seguro')];

  const coverageChoices = SERVICES.map((s) => `<label class="choice"><input type="checkbox" name="coverage[]" value="${s.id}"><span>${icon(s.icon)}${L(s.name, lang)}<small>${L(s.blurb, lang)}</small></span></label>`).join('');

  const main = `
<section class="section" style="padding-top:calc(var(--header-h) + clamp(36px,6vw,72px))">
  <div class="container" style="display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);gap:clamp(28px,4vw,56px);align-items:start" id="quote-layout">
    <div class="wizard form-card" id="wizard">
      <p class="eyebrow">${x('Free quote · About 2 minutes', 'Cotización gratis · Unos 2 minutos')}</p>
      <h1 class="h2" style="margin-bottom:26px">${x('Let’s find your <em>best coverage</em>', 'Encontremos su <em>mejor cobertura</em>')}</h1>
      <div class="wizard-progress" aria-hidden="true"><span class="done"></span><span></span><span></span></div>
      <form action="${SITE.formEndpoint}" method="post" data-form="quote" novalidate>
        <div class="wizard-step active" data-step="1">
          <p class="step-label">${x('Step 1 of 3', 'Paso 1 de 3')}</p>
          <h2>${x('What would you like to protect?', '¿Qué le gustaría proteger?')}</h2>
          <p class="muted">${x('Choose everything that applies — bundling often saves money.', 'Elija todo lo que aplique — combinar pólizas suele ahorrar dinero.')}</p>
          <div class="choices">${coverageChoices}</div>
          <p class="field-error step-error mt-1" aria-live="polite"></p>
          <div class="wizard-nav"><span class="small muted">${icon('lock', '', 16)} ${x('Your information is private and never sold.', 'Su información es privada y nunca se vende.')}</span><button class="btn" type="button" data-next>${x('Continue', 'Continuar')} ${icon('arrow', 'arrow-ico')}</button></div>
        </div>

        <div class="wizard-step" data-step="2">
          <p class="step-label">${x('Step 2 of 3', 'Paso 2 de 3')}</p>
          <h2>${x('A few quick details', 'Algunos datos rápidos')}</h2>
          <p class="muted">${x('Only what we need to prepare accurate options. Skip anything you’re unsure about.', 'Solo lo necesario para preparar opciones exactas. Omita lo que no sepa.')}</p>
          <div class="form-row">${inp('zip', x('ZIP code', 'Código postal'), 'inputmode="numeric" autocomplete="postal-code" maxlength="5" pattern="[0-9]{5}"', true)}${sel('timeline', x('When do you need coverage?', '¿Cuándo necesita la cobertura?'), [x('Today / ASAP', 'Hoy / lo antes posible'), x('Within 2 weeks', 'En 2 semanas'), x('Within a month', 'En un mes'), x('Just comparing', 'Solo comparando')])}</div>
          <div class="detail-group" data-for="auto motorcycle"><h3>${icon('car')}${x('Vehicles', 'Vehículos')}</h3>
            <div class="form-row">${sel('vehicles', x('Number of vehicles', 'Número de vehículos'), ['1', '2', '3', '4+'])}${sel('drivers', x('Number of drivers', 'Número de conductores'), ['1', '2', '3', '4+'])}</div>
            <div class="form-row">${sel('sr22', x('Do you need an SR-22?', '¿Necesita SR-22?'), yn)}${inp('current_insurer', x('Current insurer', 'Aseguradora actual'))}</div>
          </div>
          <div class="detail-group" data-for="home renters"><h3>${icon('home')}${x('Your home', 'Su vivienda')}</h3>
            <div class="form-row">${sel('property_type', x('Property type', 'Tipo de vivienda'), [x('House', 'Casa'), x('Condo / townhome', 'Condominio'), x('Apartment', 'Departamento'), x('Mobile / manufactured', 'Casa móvil / prefabricada')])}${inp('year_built', x('Year built', 'Año de construcción'), 'inputmode="numeric" maxlength="4"')}</div>
          </div>
          <div class="detail-group" data-for="life"><h3>${icon('heart')}${x('Life insurance', 'Seguro de vida')}</h3>
            <div class="form-row">${sel('age_range', x('Your age', 'Su edad'), ['18–29', '30–39', '40–49', '50–59', '60–69', '70+'])}${sel('life_amount', x('Coverage amount', 'Monto de cobertura'), ['$100,000', '$250,000', '$500,000', '$1,000,000+', x('Not sure', 'No estoy seguro')])}</div>
          </div>
          <div class="detail-group" data-for="commercial"><h3>${icon('briefcase')}${x('Your business', 'Su negocio')}</h3>
            <div class="form-row">${inp('business_type', x('Type of business', 'Tipo de negocio'))}${sel('employees', x('Employees', 'Empleados'), [x('Just me', 'Solo yo'), '2–5', '6–20', '21–50', '50+'])}</div>
          </div>
          <div class="detail-group" data-for="travel"><h3>${icon('plane')}${x('Your trip', 'Su viaje')}</h3>
            <div class="form-row">${inp('destination', x('Destination', 'Destino'))}${inp('travel_dates', x('Travel dates', 'Fechas del viaje'))}</div>
          </div>
          <div class="detail-group" data-for="dmv notary"><h3>${icon('file')}${x('DMV / notary', 'DMV / notaría')}</h3>
            <div class="field"><label for="q-doc_need">${x('What do you need help with?', '¿Con qué necesita ayuda?')} <span class="opt">(${x('optional', 'opcional')})</span></label><textarea class="textarea" id="q-doc_need" name="doc_need" rows="3" placeholder="${x('e.g. title transfer, registration renewal, power of attorney…', 'p. ej. traspaso de título, renovación de registro, poder notarial…')}"></textarea></div>
          </div>
          <div class="wizard-nav"><button class="btn ghost" type="button" data-prev>${icon('chevronLeft')} ${x('Back', 'Atrás')}</button><button class="btn" type="button" data-next>${x('Continue', 'Continuar')} ${icon('arrow', 'arrow-ico')}</button></div>
        </div>

        <div class="wizard-step" data-step="3">
          <p class="step-label">${x('Step 3 of 3', 'Paso 3 de 3')}</p>
          <h2>${x('Where should we send your options?', '¿Dónde le enviamos sus opciones?')}</h2>
          <p class="muted">${x('A licensed agent will review your request and contact you — usually the same business day.', 'Un agente revisará su solicitud y le contactará — normalmente el mismo día hábil.')}</p>
          <div class="form">
            <div class="form-row">${inp('first_name', x('First name', 'Nombre'), 'autocomplete="given-name"', true)}${inp('last_name', x('Last name', 'Apellido'), 'autocomplete="family-name"', true)}</div>
            <div class="form-row">${inp('phone', x('Phone number', 'Teléfono'), 'type="tel" autocomplete="tel" inputmode="tel"', true)}${inp('email', x('Email', 'Correo electrónico'), 'type="email" autocomplete="email"', true)}</div>
            <div class="field"><span class="label">${x('Best way to reach you', 'Mejor forma de contactarle')}</span><div class="choices pills">${pill('contact_method', 'call', `${icon('phone', '', 18)}${x('Call', 'Llamada')}`, true)}${pill('contact_method', 'text', `${icon('sms', '', 18)}${x('Text', 'Mensaje')}`)}${pill('contact_method', 'email', `${icon('mail', '', 18)}${x('Email', 'Correo')}`)}</div></div>
            <div class="field"><span class="label">${x('Preferred language', 'Idioma preferido')}</span><div class="choices pills">${pill('language', 'English', 'English', !es)}${pill('language', 'Español', 'Español', es)}</div></div>
            <div class="field"><label for="q-message">${x('Anything else we should know?', '¿Algo más que debamos saber?')} <span class="opt">(${x('optional', 'opcional')})</span></label><textarea class="textarea" id="q-message" name="message" rows="3"></textarea></div>
            <input class="hp" type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
            ${consents(lang, 'q')}
            <div class="form-status" role="status" aria-live="polite"></div>
          </div>
          <div class="wizard-nav"><button class="btn ghost" type="button" data-prev>${icon('chevronLeft')} ${x('Back', 'Atrás')}</button><button class="btn gold lg" type="submit"><span class="spinner"></span>${x('Get my free quote', 'Obtener mi cotización')} ${icon('arrow', 'arrow-ico')}</button></div>
        </div>
      </form>
      <div class="success-panel" hidden tabindex="-1">
        <div class="ok-ico">${icon('check')}</div>
        <h2 class="h2">${x('Thank you — <em>request received!</em>', '¡Gracias — <em>recibimos su solicitud!</em>')}</h2>
        <p class="lead mt-2" style="margin-inline:auto">${x('An agent is reviewing your information and will contact you shortly with options from multiple carriers.', 'Un agente está revisando su información y le contactará pronto con opciones de varias aseguradoras.')}</p>
        <div class="btn-row mt-3" style="justify-content:center"><a class="btn" href="tel:${SITE.phoneIntl}">${icon('phone')} ${x('Need it sooner? Call', '¿Lo necesita antes? Llame')} ${SITE.phone}</a><a class="btn ghost" href="${ROUTES.home[lang]}">${x('Back to home', 'Volver al inicio')}</a></div>
      </div>
    </div>

    <aside class="stack" style="--stack:18px;position:sticky;top:calc(var(--header-h) + 24px)">
      <div class="rating-card" style="position:static">
        <div class="g">${icon('google')} Google</div>
        <div class="big">${SITE.rating.value}</div>${stars()}
        <p>${x(`Rated ${SITE.rating.value} by ${SITE.rating.count} clients on Google.`, `Calificación ${SITE.rating.value} de ${SITE.rating.count} clientes en Google.`)}</p>
        <ul class="checks">
          ${(es ? ['Cotización 100% gratis', 'Comparamos 10+ aseguradoras', 'Sin presión ni spam', 'Atención en inglés y español'] : ['100% free quote', 'We compare 10+ carriers', 'No pressure, no spam', 'English & Spanish service']).map((c) => `<li style="color:#e9e3d8">${icon('checkCircle')}${c}</li>`).join('')}
        </ul>
      </div>
      <div class="card" style="padding:24px">
        <div style="display:flex;gap:14px;align-items:center">
          ${img('Untitled-design-2026-08-21T140316.204-scaled.webp', { alt: 'Christian Vega', widths: [480], sizes: '64px', style: 'width:64px;height:64px;border-radius:50%;object-fit:cover;object-position:50% 15%' })}
          <div><b style="display:block;color:var(--ink)">${x('Prefer to talk?', '¿Prefiere hablar?')}</b><span class="muted small">${x('Our agents are one call away.', 'Nuestros agentes están a una llamada.')}</span></div>
        </div>
        <a class="btn block mt-2" href="tel:${SITE.phoneIntl}">${icon('phone')} ${SITE.phone}</a>
      </div>
      <div class="card" style="padding:24px">
        <b style="display:block;color:var(--ink);margin-bottom:10px">${x('Prefer an instant online quote?', '¿Prefiere cotizar en línea al instante?')}</b>
        <div class="stack" style="--stack:8px">
          <a class="link-arrow" href="${SITE.partners.autoHome}" target="_blank" rel="noopener" data-partner>${x('Auto & home', 'Auto y casa')} ${icon('external')}</a><br>
          <a class="link-arrow" href="${SITE.partners.business}" target="_blank" rel="noopener" data-partner>${x('Small business', 'Pequeño negocio')} ${icon('external')}</a><br>
          <a class="link-arrow" href="${SITE.partners.renters}" target="_blank" rel="noopener" data-partner>${x('Renters', 'Inquilinos')} ${icon('external')}</a><br>
          <a class="link-arrow" href="${SITE.partners.travel}" target="_blank" rel="noopener" data-partner>${x('Travel', 'Viaje')} ${icon('external')}</a>
        </div>
      </div>
    </aside>
  </div>
</section>
<style>@media (max-width: 960px) { #quote-layout { grid-template-columns: 1fr !important; } #quote-layout aside { position: static !important; } }</style>`;

  return {
    title: x('Get a Free Insurance Quote | Feel Good Insurance, Sparks NV', 'Cotización de Seguro Gratis | Feel Good Insurance, Sparks NV'),
    description: x('Request a free, no-obligation insurance quote in 2 minutes. Auto, home, renters, life, motorcycle, travel and business insurance compared across 10+ carriers.', 'Solicite una cotización de seguro gratis y sin compromiso en 2 minutos. Auto, casa, inquilinos, vida, moto, viaje y negocio comparados entre más de 10 aseguradoras.'),
    header: 'solid',
    breadcrumbs: [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('getQuote', lang), url: ROUTES.quote[lang] }],
    main,
  };
}
