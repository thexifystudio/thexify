/**
 * Only the cookie name, in its own module: the middleware imports it without
 * pulling bcryptjs and jose (lib/auth) into the Edge bundle.
 */
export const SESSION_COOKIE = '__Host-thx_session';
export const DEV_SESSION_COOKIE = 'thx_session';
export const SESSION_COOKIES = [SESSION_COOKIE, DEV_SESSION_COOKIE] as const;

export function sessionCookieName(secure: boolean) {
  return secure ? SESSION_COOKIE : DEV_SESSION_COOKIE;
}
