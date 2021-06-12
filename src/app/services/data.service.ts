import { Injectable } from '@angular/core';
import { Favourites } from '../models/favourites';
import { Movie } from './../models/movie.model';

@Injectable()
export class DataService {
  public movie: Movie;
  public favourites: Favourites;
}
