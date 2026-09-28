import { notFound } from 'next/navigation';
import { CasePage } from '@/components/CasePage';
import { SiteFrame } from '@/components/SiteFrame';
import { projects } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';

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
    path: `/proyectos/${project.slug}/`,
    alternatePath: `/en/work/${project.slug}/`,
  });
}

export default async function ProyectoPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  return (
    <SiteFrame lang="es" alternatePath={`/en/work/${project.slug}/`}>
      <CasePage project={project} lang="es" />
    </SiteFrame>
  );
}
