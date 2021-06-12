import { ApiService } from './../../services/api.service';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Favourites } from '../../models/favourites';
import { Movie } from '../../models/movie.model';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-favourites',
  templateUrl: 'edit.favourites.page.html',
  styleUrls: ['edit.favourites.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditFavouritesPage {
  favourites: Favourites;
  moviesToAdd: Movie[];

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private dataSvc: DataService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.dataSvc.favourites == null) {
      this.goToList();
    }

    this.favourites = this.dataSvc.favourites;
    this.favourites.movieIds = this.favourites.movies.map(m => m.id);
    this.favourites = this.dataSvc.favourites;
    this.loadMovies();
  }

  addMovie(movie: Movie) {
    this.favourites.movies.push(movie);
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

  saveFavourites() {
    this.apiSvc.put('api/favourites', this.favourites).subscribe(
      () => this.navCtrl.pop(),
      (err) => {
        console.log(err);
      }
    );
  }

  private loadMovies() {
      this.apiSvc.get('api/Movies').subscribe((response: Array<Movie>) => {
        this.moviesToAdd = response.filter(m => this.favourites.movieIds.indexOf(m.id) == -1);
    });
  }

  goToList() {
    this.dataSvc.favourites = null;
    this.navCtrl.navigateBack('/favourites');
  }
}
