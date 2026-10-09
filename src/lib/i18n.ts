export type Lang = 'es' | 'en';

export const paths = {
  home: (lang: Lang) => (lang === 'en' ? '/en/' : '/'),
  contact: (lang: Lang) => (lang === 'en' ? '/en/contact/' : '/contacto/'),
  work: (lang: Lang) => (lang === 'en' ? '/en/work/' : '/proyectos/'),
  privacy: (lang: Lang) => (lang === 'en' ? '/en/privacy/' : '/privacidad/'),
};
