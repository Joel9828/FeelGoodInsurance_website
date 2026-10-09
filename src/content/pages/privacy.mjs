import { ROUTES, t } from '../site.mjs';
import { pageHero } from '../../lib/components.mjs';
import DOC from '../legal/privacy.mjs';

export default function privacy(lang) {
  const es = lang === 'es';
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('privacy', lang), url: ROUTES.privacy[lang] }];
  return {
    title: es ? 'Política de Privacidad | Feel Good Insurance' : 'Privacy Policy | Feel Good Insurance',
    description: es ? 'Cómo Feel Good Insurance recopila, usa y protege su información personal y sus datos de mensajes SMS.' : 'How Feel Good Insurance collects, uses and protects your personal information and SMS data.',
    header: 'dark', breadcrumbs: crumbs,
    main: `${pageHero({ lang, crumbs, compact: true, eyebrow: 'Feel Good Insurance, LLC', title: t('privacy', lang), lead: es ? 'Última actualización: 2026' : 'Last updated: 2026', image: 'maxresdefault-6-1.webp' })}
<section class="section legal"><div class="container narrow"><div class="prose">${DOC[lang]}</div></div></section>`,
  };
}
