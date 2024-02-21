/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/products",
  "/product/[slug]",
];

export const authRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/error",
  "/auth/reset",
  "/auth/forget-password"
];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile";