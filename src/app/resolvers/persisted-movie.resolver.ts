import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MoviesStore } from '../store/movies.store';

export const PersistMoviesResolver: ResolveFn<any> = () => {
  const store = inject(MoviesStore);
  const movies = store.getAllMovies();
  return movies;
};
