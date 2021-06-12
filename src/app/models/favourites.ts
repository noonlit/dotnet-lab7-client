import { Movie } from "./movie.model";

export class Favourites {
  id?: number;
  year?: number;
  movies?: Movie[];
  movieIds?: number[];
}
