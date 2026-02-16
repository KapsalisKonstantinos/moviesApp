import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersistMoviesResolver } from './resolvers/persisted-movie.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    resolve: {movies: PersistMoviesResolver}
  },
  {
    path: 'favorites',
    loadComponent: () => import('./components/favorites/favorites.component') .then(m => m.FavoritesComponent),
    resolve: { movies: PersistMoviesResolver }
  },
  {
    path: 'favorites/edit/:id',
    loadComponent: () => import('./components/favorites/edit-movie/edit-movie.component') .then(m => m.EditMovieComponent),
    resolve: { movie: PersistMoviesResolver }
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./components/favorites/movie-details//movie-details.component') .then(m => m.MovieDetailsComponent),
    resolve: { movie: PersistMoviesResolver }
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: '**',
    redirectTo: ''
  }
];


