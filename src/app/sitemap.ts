import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pairs: [string, string][] = [
    ['/', '/en/'],
    ['/contacto/', '/en/contact/'],
    ...projects.map((project): [string, string] => [
      `/proyectos/${project.slug}/`,
      `/en/work/${project.slug}/`,
    ]),
  ];

  return pairs.flatMap(([es, en]) => {
    const languages = { es: `${site.url}${es}`, en: `${site.url}${en}` };
    return [
      { url: `${site.url}${es}`, alternates: { languages } },
      { url: `${site.url}${en}`, alternates: { languages } },
    ];
  });
}
