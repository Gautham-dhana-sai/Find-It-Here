// Read Vite environment variables (prefix VITE_) so values set in Vercel
// (or in a local .env) are picked up at build time. Provide sensible
// fallbacks for local development.
const VITE = (import.meta as any)?.env || {}

export const env = {
    secretKey: VITE.VITE_SECRET_KEY ?? 'ABCD',
    apiUrl: VITE.VITE_API_URL ?? 'https://find-it-here-server.vercel.app',
    loginApiUrl: VITE.VITE_LOGIN_API_URL ?? 'https://dhana-login-server.vercel.app',
    locationApiUrl: VITE.VITE_LOCATION_API_URL ?? 'https://countriesnow.space/api/v0.1/countries'
}