import { Movie, GENRES } from './../../models/movie.model';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Comment } from '../../models/comment.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-movie',
  templateUrl: 'view.movie.page.html',
})
export class ViewMoviePage {
  isAuthenticated: Observable<boolean>
  movie;
  newComment = new Comment();
  comments = [];

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authSvc: AuthService,
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.dataService.movie == null) {
      this.goToList();
    }

    this.isAuthenticated = this.authSvc.isAuthenticated();

    this.movie = this.dataService.movie;
    this.loadComments(this.movie.id);
  }

  saveComment() {
    this.newComment.movieId = this.movie.id;

    this.apiSvc.post('api/Movies/' + this.movie.id + '/comments', this.newComment)
      .subscribe(
        () => {
          this.comments.push(this.newComment);
          this.cd.detectChanges();
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

  deleteComment(commentId: number) {
    this.apiSvc.delete('api/Movies/' + this.movie.id + '/comments/' + commentId).subscribe(
      () => {
        this.comments = this.comments.filter(c => c.id !== commentId),
          this.cd.detectChanges();
      },
      (err) => {
        let message = 'Error';
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

  private loadComments(movieId: number) {
    this.apiSvc.get('api/Movies/' + movieId + '/comments').subscribe(response => {
      this.comments = response.comments;
      this.cd.detectChanges();
    });
  }

  goToList() {
    this.dataService.movie = null;
    this.navCtrl.navigateBack('/movies');
  }
}
