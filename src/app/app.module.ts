
import { AddMoviePage } from './pages/add-movie-page/add.movie.page';
import { SideMenuComponent } from './components/side.menu/side.menu.component';
import { MoviesPage } from './pages/movies/movies.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditMoviePage } from './pages/edit-movie-page/edit.movie.page';
import { DataService } from './services/data.service';
import { LoginPage } from './pages/login/login.page';
import { AuthService } from './services/auth.service';
import { ViewMoviePage } from './pages/view-movie-page/view.movie.page';
import { FavouritesPage } from './pages/favourites/favourites.page';
import { TokenInterceptor } from './interceptors/auth.token.interceptor';
import { EditFavouritesPage } from './pages/edit-favourites-page/edit.favourites.page';
import { AddFavouritesPage } from './pages/add-favourites-page/add.favourites.page';

@NgModule({
  declarations: [
    // components
    AppComponent,
    NavbarComponent,
    SideMenuComponent,
    // pages
    MoviesPage,
    LoginPage,
    AddMoviePage,
    EditMoviePage,
    ViewMoviePage,
    FavouritesPage,
    EditFavouritesPage,
    AddFavouritesPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DataService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
