import { ROUTES, t } from '../site.mjs';
import { pageHero } from '../../lib/components.mjs';
import DOC from '../legal/terms.mjs';

export default function terms(lang) {
  const es = lang === 'es';
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('terms', lang), url: ROUTES.terms[lang] }];
  return {
    title: es ? 'Términos de Servicio | Feel Good Insurance' : 'Terms of Service | Feel Good Insurance',
    description: es ? 'Términos de uso del sitio web de Feel Good Insurance, LLC en Sparks, Nevada.' : 'Terms of use for the Feel Good Insurance, LLC website in Sparks, Nevada.',
    header: 'dark', breadcrumbs: crumbs,
    main: `${pageHero({ lang, crumbs, compact: true, eyebrow: 'Feel Good Insurance, LLC', title: t('terms', lang), lead: es ? 'Última actualización: 2026' : 'Last updated: 2026', image: 'maxresdefault-6-1.webp' })}
<section class="section legal"><div class="container narrow"><div class="prose">${DOC[lang]}</div></div></section>`,
  };
}
