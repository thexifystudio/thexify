import { notFound } from 'next/navigation';

// Unknown /es/* URLs: render (es)/not-found.tsx inside the Spanish layout.
export default function Missing() {
  notFound();
}
