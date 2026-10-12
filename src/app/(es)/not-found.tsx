import { NotFound } from '@/components/NotFound';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Página no encontrada — Thexify',
  path: '/es/404/',
  lang: 'es',
  errorPage: true,
});

export default function SpanishNotFound() {
  return <NotFound lang="es" />;
}
