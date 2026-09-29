type JsonResult = { ok: true; value: unknown } | { ok: false; status: 400 | 413 | 415; message: string };

/** Read a small JSON body without allowing an unbounded allocation in Workers. */
export async function readJson(request: Request, maxBytes: number): Promise<JsonResult> {
  const contentType = request.headers.get('Content-Type')?.split(';', 1)[0]?.trim().toLowerCase();
  if (contentType !== 'application/json') {
    return { ok: false, status: 415, message: 'Se requiere JSON' };
  }

  const declaredLength = Number(request.headers.get('Content-Length'));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, status: 413, message: 'Solicitud demasiado grande' };
  }
  if (!request.body) return { ok: false, status: 400, message: 'JSON inválido' };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return { ok: false, status: 413, message: 'Solicitud demasiado grande' };
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { ok: true, value: JSON.parse(new TextDecoder().decode(bytes)) as unknown };
  } catch {
    return { ok: false, status: 400, message: 'JSON inválido' };
  }
}

/** SameSite cookies are the first line of defense; this also rejects browser cross-site mutations. */
export function isTrustedMutation(request: Request): boolean {
  if (request.headers.get('Sec-Fetch-Site') === 'cross-site') return false;
  const origin = request.headers.get('Origin');
  return !origin || origin === new URL(request.url).origin;
}
