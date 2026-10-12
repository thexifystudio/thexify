import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pairs: [string, string][] = [
    ['/', '/es/'],
    ['/contact/', '/es/contacto/'],
    ['/websites/', '/es/webs/'],
    ['/privacy/', '/es/privacidad/'],
    ...projects.map((project): [string, string] => [
      `/work/${project.slug}/`,
      `/es/proyectos/${project.slug}/`,
    ]),
  ];

  return pairs.flatMap(([en, es]) => {
    const languages = { en: `${site.url}${en}`, es: `${site.url}${es}`, 'x-default': `${site.url}${en}` };
    return [
      { url: `${site.url}${en}`, alternates: { languages } },
      { url: `${site.url}${es}`, alternates: { languages } },
    ];
  });
}
