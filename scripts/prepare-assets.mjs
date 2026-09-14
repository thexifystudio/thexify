import sharp from 'sharp';
import { mkdir, rm, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// All portfolio visuals come from local captures of actual Thexify projects.
// No network requests or generated project interfaces are used.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const projectsRoot = resolve(root, '../..');
const imageRoot = resolve(root, 'public/images');
const canangueno = resolve(projectsRoot, 'canangueno-lodge/web-canangueno-lodge');
const sources = {
  desktop: resolve(canangueno, '.shots/hero-now.png'),
  mobile: resolve(canangueno, '.shots/home-mobile.png'),
  detail: resolve(canangueno, '.shots/tours-desktop.png'),
  sunsu: resolve(root, 'qa/sunsu-source.png'),
};

await mkdir(imageRoot, { recursive: true });

if (process.argv.includes('--inspect-mobile')) {
  const metadata = await sharp(sources.mobile).metadata();
  const preview = resolve(imageRoot, '_mobile-inspection.webp');
  await sharp(sources.mobile).resize({ width: 180 }).webp({ quality: 76 }).toFile(preview);
  console.log(
    JSON.stringify({ source: sources.mobile, width: metadata.width, height: metadata.height, preview }),
  );
  process.exit(0);
}

async function saveImage(name, pipeline) {
  const output = resolve(imageRoot, name);
  const result = await pipeline.webp({ quality: 86, effort: 6 }).toFile(output);
  console.log(`${name}: ${result.width}x${result.height}, ${Math.round(result.size / 1024)} KB`);
}

await saveImage(
  'canangueno-desktop.webp',
  sharp(sources.desktop).resize({ width: 1440, withoutEnlargement: true }),
);
await saveImage(
  'canangueno-small.webp',
  sharp(sources.desktop).resize({ width: 800, withoutEnlargement: true }),
);

// The source is a full-page 2x mobile capture (780 px wide). Keep the top
// two screen-widths so the real navigation and hero remain in a phone frame.
const mobileMetadata = await sharp(sources.mobile).metadata();
const mobileHeight = Math.min(mobileMetadata.height, mobileMetadata.width * 2);
await saveImage(
  'canangueno-mobile.webp',
  sharp(sources.mobile)
    .extract({ left: 0, top: 0, width: mobileMetadata.width, height: mobileHeight })
    .resize({ width: 390, withoutEnlargement: true }),
);

// The SUNSU source includes a 16 px native scrollbar at its right edge.
// Removing only browser chrome preserves the complete site composition.
const sunsuMetadata = await sharp(sources.sunsu).metadata();
const sunsuCrop = { left: 0, top: 0, width: sunsuMetadata.width - 16, height: sunsuMetadata.height };
await saveImage('sunsu-desktop.webp', sharp(sources.sunsu).extract(sunsuCrop));
await saveImage(
  'sunsu-small.webp',
  sharp(sources.sunsu).extract(sunsuCrop).resize({ width: 800, withoutEnlargement: true }),
);

// Editorial detail: the real tour comparison interface, including its cards.
const detailMetadata = await sharp(sources.detail).metadata();
await saveImage(
  'canangueno-detail.webp',
  sharp(sources.detail)
    .extract({ left: 0, top: 0, width: detailMetadata.width, height: Math.min(detailMetadata.height, 1360) })
    .resize({ width: 1200, withoutEnlargement: true }),
);

// Brand-only social image. It intentionally makes no client/result claims.
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#101110"/>
  <path d="M840 -80L1250 330M970 -80L1280 230M840 720L1250 310M970 720L1280 410" stroke="#2fd79b" stroke-opacity=".13" stroke-width="58"/>
  <circle cx="75" cy="70" r="5" fill="#2fd79b"/>
  <text x="94" y="77" fill="#dedfda" font-family="Arial, Helvetica, sans-serif" font-size="17" letter-spacing="3">ESTUDIO DIGITAL INDEPENDIENTE</text>
  <text x="62" y="316" fill="#f4f4ec" font-family="Arial, Helvetica, sans-serif" font-size="178" font-weight="700" letter-spacing="-12">THEXIFY<tspan fill="#2fd79b">.</tspan></text>
  <text x="72" y="414" fill="#f4f4ec" font-family="Arial, Helvetica, sans-serif" font-size="38" letter-spacing="-1">Diseño que se siente. Webs que funcionan.</text>
  <path d="M72 505H1128" stroke="#f4f4ec" stroke-opacity=".18"/>
  <text x="72" y="557" fill="#a8aca7" font-family="Arial, Helvetica, sans-serif" font-size="20">ESTRATEGIA · DISEÑO · DESARROLLO WEB</text>
  <text x="1128" y="557" fill="#2fd79b" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20">thexify.com ↗</text>
</svg>`;
const ogPath = resolve(root, 'public/og.png');
await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(ogPath);
console.log(`og.png: 1200x630, ${Math.round((await stat(ogPath)).size / 1024)} KB`);

// This optional inspection file is generated solely by this script.
await rm(resolve(imageRoot, '_mobile-inspection.webp'), { force: true });
