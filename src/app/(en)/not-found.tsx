import { NotFound } from '@/components/NotFound';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Página no encontrada / Page not found — Thexify',
  path: '/404/',
  lang: 'en',
  errorPage: true,
});

export default function EnglishNotFound() {
  return <NotFound lang="en" />;
}
