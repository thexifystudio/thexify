import { notFound } from 'next/navigation';
import { CasePage } from '@/components/CasePage';
import { SiteFrame } from '@/components/SiteFrame';
import { projects } from '@/data/projects';
import { jsonLd, pageMetadata, projectImage, projectSchema } from '@/lib/metadata';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — Proyecto de Thexify`,
    description: project.intro.es,
    lang: 'es',
    path: `/es/proyectos/${project.slug}/`,
    alternatePath: `/work/${project.slug}/`,
    image: projectImage(project.image, `Web de ${project.client}, diseñada por Thexify`),
  });
}

export default async function ProyectoPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  const path = `/es/proyectos/${project.slug}/`;

  return (
    <SiteFrame lang="es" alternatePath={`/work/${project.slug}/`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(projectSchema(project, 'es', path)) }}
      />
      <CasePage project={project} lang="es" />
    </SiteFrame>
  );
}
