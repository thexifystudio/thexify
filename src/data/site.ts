// NEXT_PUBLIC_ so the value is inlined at build time for both server and client code.
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

export const site = {
  name: 'Thexify',
  url: 'https://thexify.com',
  domain: 'thexify.com',
  email: 'hola@thexify.com',
  whatsappNumber,
  // Submissions are stored in D1 and read from /admin/mensajes.
  // Set to '' to go back to the mailto-only flow.
  contactEndpoint: '/api/mensajes/',
} as const;

export function whatsappHref(message: string) {
  return whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : null;
}
