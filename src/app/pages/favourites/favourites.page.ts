import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Favourites } from '../../models/favourites';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-favourites',
  templateUrl: 'favourites.page.html',
  styleUrls: ['favourites.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FavouritesPage {
  favourites: Array<Favourites>;
  isAuthenticated: Observable<boolean>;

  constructor(
    private apiSvc: ApiService,
    private router: Router,
    private dataSvc: DataService,
    private authSvc: AuthService,
    private cd: ChangeDetectorRef
  ) {
  }

  ionViewWillEnter() {
    this.dataSvc.favourites = null;
    this.isAuthenticated = this.authSvc.isAuthenticated();
    this.loadFavourites();
  }

  goToAddFavourites() {
    this.router.navigateByUrl('favourites/add');
  }

  editFavourites(favourites: Favourites) {
    this.dataSvc.favourites = favourites;
    this.router.navigateByUrl('favourites/edit/' + favourites.id);
  }

  deleteFavourites(favourites: Favourites) {
    this.apiSvc.delete('api/favourites/' + favourites.id).subscribe(
      () => {
        this.favourites = this.favourites.filter(f => f.id !== favourites.id);
        this.cd.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteMovie(favourites: Favourites, movie: Movie) {
    favourites.movies = favourites.movies.filter(m => m.id !== movie.id),
    favourites.movieIds = favourites.movies.map(m => m.id);
    this.apiSvc.put('api/favourites', favourites).subscribe(
      () => this.loadFavourites(),
      (err) => {
        console.log(err);
      }
    );
  }

  private loadFavourites() {
    this.apiSvc.get('api/Favourites').subscribe((response: Array<Favourites>) => {
      this.favourites = response;
    });
  }
}
