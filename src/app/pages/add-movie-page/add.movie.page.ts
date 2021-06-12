import { Movie, GENRES } from './../../models/movie.model';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-movie',
  templateUrl: 'add.movie.page.html',
})
export class AddMoviePage {
  GENRES = GENRES;

  movie = new Movie();

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }
  saveMovie() {
    this.apiSvc.post('api/Movies', this.movie).subscribe(
      () => {
        this.navCtrl.pop();
      },
      (err) => {
        let message = 'Validation error';
        const errorsArray = err?.error?.errors;
        if (errorsArray) {
          message = Object.values(errorsArray)[0] as string;
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

  goToList() {
    this.navCtrl.navigateBack('/movies');
  }
}
