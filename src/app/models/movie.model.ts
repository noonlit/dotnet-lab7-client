export class Movie {
  id?: number;
  title?: string;
  genre?: Genre;
  description?: string;
  durationMinutes?: number;
  releaseYear?: number;
  director?: string;
  watched?: boolean;
  rating?: number;
}

export enum Genre {
  Action,
  Comedy,
  Horror,
  Thriller
}

export const GENRES = ['Action', 'Comedy', 'Horror', 'Thriller'];

export class PaginatedMovies {
  firstPages: number[];
  lastPages: number[];
  previousPages: number[];
  nextPages: number[];
  totalEntities: number;
  entities: Movie[];
}
