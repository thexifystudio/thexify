import { notFound } from 'next/navigation';

// Unknown /en/* URLs: render (en)/not-found.tsx inside the English layout.
export default function Missing() {
  notFound();
}
