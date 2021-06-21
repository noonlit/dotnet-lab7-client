import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Movie, PaginatedMovies } from './../../models/movie.model';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
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
  movies: PaginatedMovies;
  currentPage: number;
  isAuthenticated: Observable<boolean>;

  constructor(private cd: ChangeDetectorRef, private apiSvc: ApiService, private router: Router, private dataSvc: DataService, private authSvc: AuthService) { }
  ionViewWillEnter() {
    this.dataSvc.movie = null;
    this.isAuthenticated = this.authSvc.isAuthenticated();
    this.getMovies();
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
      this.getMovies();
    });
  }

  private getMovies(page: number = 1) {
    this.apiSvc.get('api/Movies', {'page': page}).subscribe((response: PaginatedMovies) => {
      this.currentPage = page;
      this.movies = response;
      this.cd.detectChanges();
    });
  }
}
