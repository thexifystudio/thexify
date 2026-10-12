import { notFound } from 'next/navigation';

// With several root layouts Next has no app-wide 404: unknown URLs land here and
// render (en)/not-found.tsx. /es/* has its own catch-all in the Spanish layout.
export default function Missing() {
  notFound();
}
