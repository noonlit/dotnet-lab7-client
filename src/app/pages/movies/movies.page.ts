import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Movie } from './../../models/movie.model';
import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoviesPage {
  movies: Array<Movie>;
  isAuthenticated: Observable<boolean>;

  constructor(private apiSvc: ApiService, private router: Router, private dataSvc: DataService, private authSvc: AuthService) { }
  ionViewWillEnter() {
    this.dataSvc.movie = null;
    this.isAuthenticated = this.authSvc.isAuthenticated();
    this.loadMovies();
  }

  goToAddMovie() {
    this.router.navigateByUrl('movies/add');
  }

  editMovie(movie: Movie) {
    this.dataSvc.movie = movie;
    this.router.navigateByUrl('movies/edit/' + movie.id);
  }

  viewMovie(movie: Movie) {
    this.dataSvc.movie = movie;
    this.router.navigateByUrl('movies/view/' + movie.id);
  }

  deleteMovie(movie: Movie) {
    this.apiSvc.delete(`api/Movies/${movie.id}`).subscribe(() => {
      this.loadMovies();
    });
  }

  private loadMovies() {
    this.apiSvc.get('api/Movies').subscribe((response: Array<Movie>) => {
      this.movies = response;
    });
  }
}
