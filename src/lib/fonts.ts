import localFont from 'next/font/local';

/**
 * Manrope Variable, self-hosted from the official brand file (vault:
 * Empresa/Thexify/Marca/Tipografia). License next to it: src/assets/fonts/OFL.txt.
 *
 * The CSS variable must go on <html>, not <body>: :root reads it in global.css.
 */
export const manrope = localFont({
  src: '../assets/fonts/Manrope-Variable-Latin.woff2',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  variable: '--ff-sans',
});
