const BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://api.api-store.workers.dev/api/bazardor";

const cache = new Map();

function get(path) {
  if (cache.has(path)) return cache.get(path);
  const p = fetch(`${BASE}${path}`)
    .then((r) => {
      if (!r.ok) throw new Error(`Request failed: ${r.status}`);
      return r.json();
    })
    .catch((e) => {
      cache.delete(path);
      throw e;
    });
  cache.set(path, p);
  return p;
}

export const getCategories = () => get("/categories");

export const getProducts = (category) =>
  get(category ? `/products?category=${encodeURIComponent(category)}` : "/products");

export async function getProductBySlug(slug) {
  const list = await get(`/products?slug=${encodeURIComponent(slug)}`);
  return Array.isArray(list) ? list.find((p) => p.slug === slug) || null : null;
}