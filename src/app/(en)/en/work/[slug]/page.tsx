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
    title: `${project.title} — A Thexify project`,
    description: project.intro.en,
    lang: 'en',
    path: `/en/work/${project.slug}/`,
    alternatePath: `/proyectos/${project.slug}/`,
  });
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  return (
    <SiteFrame lang="en" alternatePath={`/proyectos/${project.slug}/`}>
      <CasePage project={project} lang="en" />
    </SiteFrame>
  );
}
