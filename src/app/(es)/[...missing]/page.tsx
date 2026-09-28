import { notFound } from 'next/navigation';

// With several root layouts Next has no app-wide 404: unknown URLs land here and
// render (es)/not-found.tsx. /en/* has its own catch-all in the English layout.
export default function Missing() {
  notFound();
}
