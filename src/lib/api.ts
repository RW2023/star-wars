const BASE = "https://swapi.info/api";

/**
 * Low-level fetch helper with ISR revalidate.
 */
export async function getResource<T>(
  path: string,
  nextOpts = { revalidate: 3600 } // 1 h ISR
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: nextOpts });
  if (!res.ok) throw new Error("Network error");
  return (await res.json()) as T;
}

/* ---------- HIGH-LEVEL WRAPPERS (keep them small & local) ---------- */

export interface Planet {
  name: string;
  climate: string;
  population: string;
  terrain: string;
  gravity: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
}

export async function getAllPlanets(): Promise<Planet[]> {
  return getResource<Planet[]>("/planets");
}

export async function getPlanetByName(name: string): Promise<Planet | undefined> {
  const planets = await getAllPlanets();
  return planets.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
}

/* === Add similar wrappers for people, films, etc. as needed === */
