const BASE = "https://swapi.info/api";

export async function getResource<T>(path: string, nextOpts = { revalidate: 3600 }) {
  const res = await fetch(`${BASE}${path}`, { next: nextOpts });
  if (!res.ok) throw new Error("Network error");
  return (await res.json()) as T;
}
