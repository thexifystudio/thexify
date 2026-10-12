export type Lang = 'es' | 'en';

/** English is the default site at the root; Spanish lives under /es/. */
export const paths = {
  home: (lang: Lang) => (lang === 'en' ? '/' : '/es/'),
  contact: (lang: Lang) => (lang === 'en' ? '/contact/' : '/es/contacto/'),
  work: (lang: Lang) => (lang === 'en' ? '/work/' : '/es/proyectos/'),
  privacy: (lang: Lang) => (lang === 'en' ? '/privacy/' : '/es/privacidad/'),
  webs: (lang: Lang) => (lang === 'en' ? '/websites/' : '/es/webs/'),
};
