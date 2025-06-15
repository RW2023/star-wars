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
}

