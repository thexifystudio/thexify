import { NotFound } from '@/components/NotFound';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Página no encontrada / Page not found — Thexify',
  path: '/404/',
  errorPage: true,
});

export default function SpanishNotFound() {
  return <NotFound lang="es" />;
}
