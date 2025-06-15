// src/lib/types.ts

/**
 * Standard SWAPI paginated response
 * (same shape swapi.dev uses: count / next / previous / results)
 */
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
  
  /**
   * Some endpoints on swapi.info return *just* an array.
   * This union type lets TypeScript accept either form without
   * casting in every fetch wrapper.
   */
  export type ApiListResponse<T> = PaginatedResponse<T> | T[];
  