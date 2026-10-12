# Thexify — dirección visual

Brief: el texto adjunto del 12 de septiembre de 2026. No se adjuntaron imágenes de referencia; esta dirección interpreta el brief y las decisiones de marca del vault. La oferta vigente para esta versión tiene tres servicios: sitios web, sitios con panel y tiendas online. Los precios todavía no están aprobados y no se publican cifras inventadas.

La fuente maestra de identidad es `Empresa/Thexify/Identidad Visual.md` dentro del vault. El símbolo oficial es la X asimétrica de dos direcciones, el asterisco es únicamente un gesto editorial y nunca se añade al logotipo horizontal.

## Sistema visual antes de implementar

- Estudio editorial oscuro: tinta #101110, blanco cálido #eeefeb y verde Thexify #2fd79b. El verde ocupa momentos concretos (CTA, señal de marca, declaración), no todos los fondos.
- Retícula de 12 columnas. Márgenes de 4.4vw en escritorio, 22px en móvil. Ancho de lectura contenido; imágenes y titulares casi a sangre. Ritmo de 100–150px entre capítulos, 64–88px en móvil.
- Manrope variable autohospedada. Titulares 72–150px según viewport, interlineado 0.98–1.04, tracking negativo. Etiquetas 11–12px mayúsculas; cuerpo 16–19px. No depender de texto diminuto para información importante.
- Portada: una frase grande cruzada por una composición editorial de interfaces reales, con el nombre Thexify gigante cerrando la primera pantalla. El trabajo es el objeto visual, no un dispositivo decorativo.
- Proyectos: dos piezas amplias, materiales propios, encuadres distintos y una página de caso por trabajo. No inventar testimonios, métricas ni un estado de lanzamiento.
- Servicios: tres propuestas claras con entregables y CTA inequívocos. Las tarjetas pueden compartir estructura, pero deben variar en composición gráfica y responder al servicio que explican.
- Declaración de estudio con cambio de color, proceso en cuatro pasos y cierre tipográfico con contacto.
- Móvil: composición de proyectos escalonada, sin eliminar la pieza visual; navegación accesible, enlaces grandes y scroll vertical natural.

## Movimiento y arquitectura

Next.js 15.5 (App Router) + TypeScript + CSS propio, sin Tailwind. Migrado desde Astro el 14 de septiembre de 2026 conservando el mismo marcado y CSS; el sitio público sigue prerenderizado como estático. GSAP/ScrollTrigger se usa para el encuadre del hero, los proyectos y transiciones puntuales; el scroll permanece nativo. Los cambios de página usan `next/link` dentro de una View Transition (el mismo fundido que daba el ClientRouter de Astro). Los listeners y animaciones se limpian al navegar. El HTML es visible sin JavaScript y `prefers-reduced-motion` evita scrub, transformaciones grandes y transiciones de página.

Home en español e inglés, casos estáticos, contacto guardado en D1 y leído desde `/admin/mensajes`, con fallback directo por correo. Configuración y contenido desacoplados de los componentes. SEO semántico, canonical, hreflang, sitemap y metadatos por página. No promesas de ranking, tráfico ni citas de IA.

## Recursos visuales

Prioridad: capturas de proyectos locales y fotografías del cliente ya disponibles. Marcos de navegador/dispositivo creados con CSS. Ninguna generación de Higgsfield prevista para esta primera versión: la dirección se sostiene con el trabajo real y animación nativa, sin consumir créditos.
