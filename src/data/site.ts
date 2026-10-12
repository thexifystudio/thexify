export const site = {
  name: 'Thexify',
  url: 'https://thexify.com',
  domain: 'thexify.com',
  email: 'hola@thexify.com',
  /** Requests about personal data (privacy policy). */
  privacyEmail: 'info@thexify.com',
  // Submissions are stored in D1 and read from /admin/mensajes.
  // Set to '' to go back to the mailto-only flow.
  contactEndpoint: '/api/mensajes/',
} as const;
