// src/lib/types.ts

/**
 * Standard paginated response format returned by SWAPI-like APIs
 * Includes metadata (count, next, previous) plus a list of results.
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Some endpoints return just an array, without pagination metadata.
 * This union allows fetch utilities to support both paginated and non-paginated formats.
 */
export type ApiListResponse<T> = PaginatedResponse<T> | T[];

/**
 * Core person type returned by the /people endpoint.
 */
export interface Person {
  name: string;
  url: string;
  gender?: string;
  species: string[]; // SWAPI returns an array of URLs
  height?: string;
  mass?: string;
  homeworld?: string;
  films?: string[];
}

/**
 * Planet type returned by the /planets endpoint.
 */
export interface Planet {
  name: string;
  url: string;
  climate?: string;
  population?: string;
  terrain?: string;
  gravity?: string;
  diameter?: string;
  rotation_period?: string;
  orbital_period?: string;
  residents?: string[];
}

/**
 * Film type returned by the /films endpoint.
 */
export interface Film {
  title: string;
  url: string;
  episode_id: number;
  director?: string;
  producer?: string;
  release_date?: string;
}

/**
 * Species type returned by the /species endpoint.
 */
export interface Species {
  name: string;
  url: string;
  classification?: string;
  designation?: string;
  average_height?: string;
  skin_colors?: string;
  hair_colors?: string;
  eye_colors?: string;
  average_lifespan?: string;
  language?: string;
  homeworld?: string;
}
