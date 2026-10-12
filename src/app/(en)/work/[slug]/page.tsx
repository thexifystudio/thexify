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
    title: `${project.title} — A Thexify project`,
    description: project.intro.en,
    lang: 'en',
    path: `/work/${project.slug}/`,
    alternatePath: `/es/proyectos/${project.slug}/`,
    image: projectImage(project.image, `${project.client} website, designed by Thexify`),
  });
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  const path = `/work/${project.slug}/`;

  return (
    <SiteFrame lang="en" alternatePath={`/es/proyectos/${project.slug}/`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(projectSchema(project, 'en', path)) }}
      />
      <CasePage project={project} lang="en" />
    </SiteFrame>
  );
}
