# Procedencia de los recursos visuales

Los mockups muestran capturas de interfaces reales de proyectos de Thexify. No se generaron imágenes con IA para esta web ni se consumieron créditos de generación. Los marcos, perspectivas y animaciones se construyen en la propia página.

## Canangueno Lodge

Proyecto local: `../../canangueno-lodge/web-canangueno-lodge/`.

- `canangueno-desktop.webp` y `canangueno-small.webp`: `.shots/hero-now.png`, captura de escritorio del 11 de septiembre de 2026. Se conserva su composición y relación de aspecto.
- `canangueno-mobile.webp`: parte superior de `.shots/home-mobile.png`, captura móvil completa del 10 de septiembre de 2026. Se recorta sin distorsión a una relación 1:2 y se exporta a 390 × 780 px.
- `canangueno-detail.webp`: parte superior de `.shots/tours-desktop.png`, con la interfaz real de comparación de tours.

El rediseño de Canangueno se presenta como proyecto **en desarrollo**. Estas capturas no implican que esté publicado en el dominio del cliente. El sitio implementa recorridos bilingües, itinerarios y consultas directas. La API de captación no está configurada y responde 503; no se atribuyen a este caso pagos, reservas confirmadas ni persistencia operativa de leads.

La fotografía del hero procede de un fotograma del video oficial del lodge, según `src/config/media.ts` del proyecto. La página de tours incorpora elementos ilustrativos de fauna que forman parte del diseño existente. No se presentan estos elementos como fotos documentales de instalaciones o resultados comerciales.

## SUNSU Cleaning Service

- `sunsu-desktop.webp` y `sunsu-small.webp`: `qa/sunsu-source.png`, captura de la interfaz real del sitio SUNSU. Se elimina únicamente la barra de desplazamiento del navegador (16 px a la derecha).
- Dominio documentado en `README.md` y `astro.config.mjs` del proyecto: `https://sunsucleaningservices.com`.
- Proyecto local: `../../sunsu-cleaning-services/web-sunsu-cleaning-services/`.

Se describe el alcance entregado —web de servicios de limpieza, galería, diseño responsive y consultas por WhatsApp— sin inventar métricas de rendimiento comercial ni reutilizar opiniones de sus clientes como testimonios sobre Thexify.

## Open Graph

`public/og.png` es una composición tipográfica propia, generada mediante SVG y Sharp a 1200 × 630 px. Usa los colores de Thexify y no contiene imágenes externas ni afirmaciones sobre resultados de clientes.

## Regenerar

Desde la raíz del proyecto: `node scripts/prepare-assets.mjs`.

El script utiliza únicamente archivos locales y requiere que los proyectos originales y `qa/sunsu-source.png` sigan en las rutas indicadas. No realiza peticiones de red ni cambia los originales. Los WebP finales se exportan con calidad 86.
