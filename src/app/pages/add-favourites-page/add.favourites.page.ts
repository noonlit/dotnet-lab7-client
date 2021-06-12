import { Movie, GENRES } from './../../models/movie.model';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { Favourites } from '../../models/favourites';

@Component({
  selector: 'app-add-favourites',
  templateUrl: 'add.favourites.page.html',
})
export class AddFavouritesPage {
  favourites = new Favourites();
  year;
  moviesToAdd: Movie[];

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private cd: ChangeDetectorRef
  ) { }
  saveFavourites() {
    this.favourites.year = new Date(this.year).getFullYear();
    this.apiSvc.post('api/Favourites', this.favourites).subscribe(
      () => {
        this.navCtrl.pop();
      },
      (err) => {
        let message = 'Validation error';
        const errorsArray = err?.error?.errors;
        if (errorsArray) {
          message = Object.values(errorsArray)[0] as string;
        } else {
          message = err.error;
        }

        this.alertCtrl
          .create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
          })
          .then((al) => al.present());
      }
    );
  }

  ngOnInit() {
    this.loadMovies();
  }

  addMovie(movie: Movie) {
    if (!this.favourites.movies) {
      this.favourites.movies = [];
    }

    this.favourites.movies.push(movie);

    if (!this.favourites.movieIds) {
      this.favourites.movieIds = [];
    }

    this.favourites.movieIds.push(movie.id)
    this.moviesToAdd = this.moviesToAdd.filter(m => m.id !== movie.id);
    this.cd.detectChanges();
  }

  deleteMovie(movie: Movie) {
    this.favourites.movies = this.favourites.movies.filter(m => m.id !== movie.id);
    this.favourites.movieIds = this.favourites.movieIds.filter(id => id !== movie.id);
    this.moviesToAdd.push(movie);
    this.cd.detectChanges();
  }

  private loadMovies() {
    this.apiSvc.get('api/Movies').subscribe((response: Array<Movie>) => {
      this.moviesToAdd = response;
    });
  }

  goToList() {
    this.navCtrl.navigateBack('/favourites');
  }
}
