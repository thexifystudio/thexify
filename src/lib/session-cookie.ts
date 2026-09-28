/**
 * Only the cookie name, in its own module: the middleware imports it without
 * pulling bcryptjs and jose (lib/auth) into the Edge bundle.
 */
export const SESSION_COOKIE = 'thx_session';
