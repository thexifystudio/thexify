# Thexify — sitio web

Sitio bilingüe (es/en) de Thexify con panel privado. Next.js 15.5 sobre Cloudflare Workers
(OpenNext), D1 + Drizzle y auth JWT a mano, según el stack del vault
(`Tecnologias/Stack Tecnológico.md` y `Tecnologias/Flujo de Creación de Proyectos.md`).

Dirección visual: `DIRECTION.md`. Procedencia de imágenes: `docs/ASSETS.md`.

## Rutas

| Ruta                                     | Qué es                                          |
| ---------------------------------------- | ----------------------------------------------- |
| `/`, `/en/`                              | Portada                                         |
| `/contacto/`, `/en/contact/`             | Formulario → D1 (`POST /api/mensajes/`)         |
| `/proyectos/<slug>/`, `/en/work/<slug>/` | Casos (contenido en `src/data/projects.ts`)     |
| `/login/`                                | Acceso al panel                                 |
| `/admin/`                                | Resumen (protegido)                             |
| `/admin/mensajes/`                       | Bandeja del formulario: leído, archivar, borrar |

Tres layouts raíz con grupos de ruta: `(es)` y `(en)` porque `<html lang>` cambia con el idioma,
y `(panel)` para `/login` y `/admin` (español, sin indexar). Ir de uno a otro hace una carga completa.

## Estructura

```
src/app/(es) (en)        páginas públicas (estáticas)
src/app/(panel)          login y admin
src/app/api              auth (login, logout, me) y mensajes
src/components           componentes del sitio (portados 1:1 desde Astro)
src/styles               CSS propio; los estilos por página van con prefijo (.case-page, .contact-page…)
src/data                 textos de casos, portafolio, precios y datos del sitio
src/db/schema.ts         esquema Drizzle (= base thexify-db existente)
src/lib                  auth, sesión, D1, metadatos + JSON-LD, rate limit, lectura segura de JSON
src/middleware.ts        http:// y www. → https://thexify.com (301) y portero de /admin
migrations/              migraciones D1 (0000 a 0002 ya aplicadas en remoto)
```

## Desarrollo local

```bash
npm install
cp .dev.vars.example .dev.vars    # y poner un AUTH_SECRET de 32 bytes
npm run db:migrate:local
npm run db:seed-admin -- hola@thexify.com "una-contraseña-larga-y-real"
npx wrangler d1 execute thexify-db --local --file=seed-admin.sql
npm run dev
```

Borrar `seed-admin.sql` después de aplicarlo (está en `.gitignore`, contiene el hash).
El SQL se aplica con `--file` a propósito: PowerShell rompe el `$2b$` del hash si va en línea.

Antes de dar algo por bueno, probar en el runtime real de Workers, no sólo `next dev`:

```bash
npm run preview                   # opennextjs-cloudflare build + wrangler en :8787
```

Si cambia `wrangler.jsonc`, regenerar los tipos de bindings con `npm run cf-typegen`. El archivo
`worker-configuration.d.ts` lo genera Wrangler; `src/types/cloudflare-env.d.ts` sólo añade secretos.

Verificación: `npm run cf-typecheck`, `npm run typecheck`, `npm run lint`, `npm run build`.

## Producción (cuenta Thexify Studio)

`wrangler.jsonc` usa el Worker `thexify`, la D1 `thexify-db` (`233e2515…`) y el bucket R2
`thexify-photos` de la cuenta `thexifystudio@gmail.com`. El Worker sirve `thexify.com` y
`www.thexify.com` como dominios propios; `workers.dev` está apagado para no duplicar el sitio.

1. `npx wrangler secret put AUTH_SECRET` (mínimo 32 caracteres; si falta, el login responde 500).
2. Sembrar el admin remoto sin dejar la contraseña en el historial: variables temporales
   `THEXIFY_ADMIN_EMAIL` / `THEXIFY_ADMIN_PASSWORD` y `node scripts/seed-admin.mjs --env`,
   luego aplicar `seed-admin.sql` con `--remote`.
3. `npm run db:migrate:remote` sólo si se agregan migraciones nuevas.
4. `npm run deploy`.

### Seguridad

En el código (no depende del dashboard):

- Headers en todas las respuestas (`next.config.ts` + `public/_headers` para archivos estáticos):
  CSP, HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP.
  La CSP permite scripts inline porque las páginas son estáticas (sin nonce); todo origen externo
  está bloqueado. Si se agrega un servicio de terceros (analytics, chat, mapas), hay que sumarlo a la CSP.
- Rate limiting en el edge (`ratelimits` en `wrangler.jsonc`): 5 logins y 5 mensajes por minuto e IP.
- Login: verificación de origen, cuerpo JSON limitado, comparación con hash señuelo para no revelar
  qué correos existen, JWT con emisor/audiencia, cookie `__Host-` HttpOnly Secure SameSite=Lax.
- `/admin`, `/login` y `/api` van con `no-store` y `X-Robots-Tag: noindex`.

Pendiente en el dashboard de Cloudflare (zona `thexify.com`):

- SSL/TLS → Edge Certificates → **Always Use HTTPS** activado (el middleware ya redirige las
  páginas; esto cubre también los archivos estáticos).
- Security → **Bot Fight Mode** activado.
- Regla WAF que bloquee peticiones con el header `x-middleware-subrequest` (defensa extra; el
  layout de `/admin` ya valida el JWT por su cuenta).

Si `opennextjs-cloudflare build` falla con `No loader is configured for ".map" files`,
borrar `.next` y `.open-next` y reintentar.

## Formulario de contacto

`src/data/site.ts → contactEndpoint`. Con `'/api/mensajes/'` guarda en D1; con `''` vuelve al flujo
anterior (abre el correo del visitante). Antispam: campo trampa `website` y tiempo mínimo de
llenado medido en el navegador; a los bots se les responde 201 sin guardar.

## Hacer crecer el panel

- Nueva sección: agregarla en `sections` de `src/app/(panel)/admin/AdminShell.tsx`, su página en
  `src/app/(panel)/admin/<seccion>/` y su API en `src/app/api/<recurso>/` usando `getSession()`.
- La tabla `projects` ya existe en D1 (con columnas `_en`) y el bucket R2 está enlazado como `PHOTOS`
  para cuando los casos se carguen desde el panel. Hoy los casos se leen de `src/data/projects.ts`.
- Un `route.ts` sólo puede exportar métodos HTTP: schemas y helpers van en otro módulo.
- Páginas que lean D1: son dinámicas si usan `cookies()`; si no, `export const dynamic = 'force-dynamic'`.
- Con 2 o más administradores, no ampliar esta auth: usar Cloudflare Access (regla del vault).
