/**
 * Prefix an absolute site path with Astro's configured `base` (/LearnNLP2Agents).
 * Use for every internal link/asset so the site works under the GitHub Pages
 * subpath as well as at the root in dev.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
