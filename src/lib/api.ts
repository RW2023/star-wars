/* ------------------------------------------------------------------
   lib/api.ts – typed API fetchers for SWAPI
   Works with swapi.info and swapi.dev shapes.
------------------------------------------------------------------ */

const BASE = "https://swapi.info/api";

/**
 * Handles both relative paths and absolute SWAPI URLs.
 * Supports Next.js ISR with `revalidate`.
 */
export async function getResource<T>(
  pathOrUrl: string,
  nextOpts = { revalidate: 3600 } // default: revalidate every hour
): Promise<T> {
  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${BASE}${pathOrUrl}`;
  const res = await fetch(url, { next: nextOpts });
  if (!res.ok) throw new Error("Network error");
  return (await res.json()) as T;
}

/** Extracts the numeric ID from a SWAPI URL */
export function extractId(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

/* ---------------------- Types ---------------------- */

export interface Planet {
  name: string;
  climate: string;
  population: string;
  terrain: string;
  gravity: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  residents: string[];
}

export interface Person {
  name: string;
  url: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
}

export interface Film {
  title: string;
  url: string;
  episode_id: number;
}

export interface Species {
  name: string;
  url: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  language: string;
  homeworld?: string;
}

/* ------------------ Planet Wrappers ------------------ */

export async function getAllPlanets(): Promise<Planet[]> {
  return getResource<Planet[]>("/planets");
}

export async function getPlanetByName(name: string): Promise<Planet | undefined> {
  const response = await getResource<Planet[] | { results?: Planet[] }>(
    `/planets/?search=${encodeURIComponent(name)}`
  );
  const list = Array.isArray(response) ? response : response.results ?? [];
  return list.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

/* ------------------ Person Wrappers ------------------ */

export async function getPerson(id: string): Promise<Person> {
  return getResource<Person>(`/people/${id}`);
}

export async function getPeoplePage(
page: number
): Promise<{ list: Person[]; hasMore: boolean }> {
const response = await getResource<
Person[] | { results?: Person[]; next?: string | null }
>(`/people?page=${page}`);
const fullList = Array.isArray(response)
? response
: response.results ?? [];
const list = fullList.slice((page - 1) * 10, page * 10);
const hasMore = Array.isArray(response)
? page * 10 < fullList.length
: Boolean((response as { next?: string | null }).next);

return { list, hasMore };
}

/* ------------------ Film Wrappers ------------------ */

export async function getFilm(id: string): Promise<Film> {
  return getResource<Film>(`/films/${id}`);
}

/* ------------------ Species Wrappers ------------------ */

export async function getSpeciesPage(
page: number
): Promise<{ list: Species[]; hasMore: boolean }> {
const response = await getResource<
Species[] | { results?: Species[]; next?: string | null }
>(`/species?page=${page}`);
const fullList = Array.isArray(response)
? response
: response.results ?? [];
const list = fullList.slice((page - 1) * 10, page * 10);
const hasMore = Array.isArray(response)
? page * 10 < fullList.length
: Boolean((response as { next?: string | null }).next);

return { list, hasMore };
}

export async function getSpeciesByName(
  name: string
): Promise<Species | undefined> {
  const response = await getResource<
    Species[] | { results?: Species[] }
  >(`/species/?search=${encodeURIComponent(name)}`);
  const list = Array.isArray(response)
    ? response
    : response.results ?? [];
  return list.find((s) => s.name.toLowerCase() === name.toLowerCase());
}

// Fetches the species name from a given URL
export async function getSpeciesName(url: string): Promise<string> {
  if (!url) return "Unknown";
  const res = await fetch(url);
  if (!res.ok) return "Unknown";
  const data = await res.json();
  return (data as { name?: string }).name || "Unknown";
}
