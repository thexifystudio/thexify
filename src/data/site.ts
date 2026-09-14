const whatsappNumber = (import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

export const site = {
  name: 'Thexify',
  url: 'https://thexify.com',
  domain: 'thexify.com',
  email: 'hola@thexify.com',
  whatsappNumber,
  // Set after the owner explicitly approves where form submissions are delivered.
  contactEndpoint: '',
} as const;

export function whatsappHref(message: string) {
  return whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : null;
}
