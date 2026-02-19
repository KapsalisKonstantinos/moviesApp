import { signalStore, withState, withMethods, patchState, withComputed, withHooks, watchState } from '@ngrx/signals';
import { inject, computed, effect } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Cast, Movie } from '../models/model';
import { MoviesPersistService } from '../services/persist-data.service';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';

type MoviesState = {
  movies: Movie[];
  isLoading: boolean;
  emptyDB: boolean;
  dbLoaded: boolean;
  deletedMovies: number[]
  filter: { query: string };
};

const initialState: MoviesState = {
  movies: [],
  isLoading: false,
  emptyDB: true,
  dbLoaded: false,
  deletedMovies: [],
  filter: { query: '' }
};

export const MoviesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withHooks({
    onInit: (store) => {
      patchState(store, {isLoading: true });
      const messageService = inject(MessageService);
      const persistService = inject(MoviesPersistService);
      persistService.load().then((saved: MoviesState) => {
        if (saved) {
          patchState(store,
            { ...saved, emptyDB: saved.movies.length > 0 ? false : true, dbLoaded: true, isLoading: false });
            if(store.movies().length > 0) messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Enjoy your Movie History` });
        } else {
          patchState(store, { emptyDB: true, dbLoaded: true, isLoading: false });
        }
      });

      effect(() => {
        persistService.save({
          movies: store.movies(),
          isLoading: store.isLoading(),
          emptyDB: store.emptyDB(),
          dbLoaded: store.dbLoaded(),
          deletedMovies: store.deletedMovies(),
          filter: store.filter()
        });
      })
    }
  }),

  withMethods((store) => {
    const api = inject(MoviesService);
    const messageService = inject(MessageService);

    return {
      /**
       *
       * @param quantity
       */
      loadMovies(quantity: number) {
        patchState(store, {isLoading: true });

        api.getMovies(quantity).pipe(take(1)).subscribe({
          next: (movies) => {
            movies = movies.map(movie => {
              movie.favorite = false;
              movie.deleted = false;
              movie.backdrop_path =
                movie.backdrop_path.includes('https://image.tmdb.org/t/p/original')
                ? movie.backdrop_path.replace('https://image.tmdb.org/t/p/original', 'https://image.tmdb.org/t/p/w300')
                : movie.backdrop_path;
              movie.casts = movie.casts.map(cast => {
                cast.profile_path =
                  cast.profile_path.includes('https://image.tmdb.org/t/p/original')
                  ? cast.profile_path.replace('https://image.tmdb.org/t/p/original', 'https://image.tmdb.org/t/p/w300')
                  : cast.profile_path
                  return cast;
                })

              return movie;
            })
            movies = movies.filter(movie => !store.deletedMovies().includes(movie.movie_id)); // Do not add movies that may have been previously deleted

            patchState(store, {
              movies: store.movies().concat(movies),
              isLoading: false,
              emptyDB: false
            });
            messageService.add({ severity: 'success', summary: 'Confirmed', detail: `${quantity} more Movies in your list` });
          },
          error: () => {
            patchState(store, { isLoading: false });
            messageService.add({ severity: 'err', summary: 'Error', detail: 'Could not fetch Movies' });
          }
        });
      },

      loadMoviesOnScroll(quantity: number) {
        this.loadMovies(quantity);
      },

      initialFetch(quantity: number) {
        messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Lets find some movies for you!` });
        this.loadMovies(quantity);
      },

      /**
       *
       * @param fmovie
       */
      makeFavorite(fmovie: Movie) {
        patchState(store, {
          movies: store.movies().map(movie => {
            if(movie.id === fmovie.id) {
              return { ...movie, favorite: fmovie.favorite }
            } else {
              return {...movie }
            }
          })
        });
      },

      /**
       *
       * @param fmovie
       */
      update(umovie: Movie) {
        patchState(store, {
          movies: store.movies().map(movie => {
            if(movie.id === umovie.id) {
              return { ...umovie }
            } else {
              return {...movie }
            }
          })
        });
      },

      remove(fmovie: Movie) {
        patchState(store, {
          movies: store.movies().filter(movie => movie.movie_id !== fmovie.movie_id),
          deletedMovies: [...store.deletedMovies(), fmovie.movie_id]
        });
      },

      /** */
      getMovie(id: number) {
        return store.movies().find(movie => movie.movie_id === id)
      },

      /** */
      getAllMovies() {
        return store.movies().find(movie => !movie.deleted)
      },

      /** */
      // getFavoriteMovies() {
      //   return store.movies().find(movie => movie.favorite)
      // },

      /** */
      updateFilterQuery(fquery: string) {
        patchState(store, {
          filter: {...store.filter(), query: fquery}
        });
      },

    };
  }),
  withComputed((store) => ({
    filteredMovies: computed(() => {
      if(store.filter().query) {
        return store.movies().filter(movie => !movie.deleted && movie.casts.some(
          (cast: Cast) => cast.character.toLowerCase().includes(store.filter().query.toLowerCase())
        ))
      } else {
        return store.movies().filter(movie => !movie.deleted);
      }
    }),

    favoriteMovies: computed(() => {
      let favorites = store.movies().filter(movie => !movie.deleted).filter( movie => movie.favorite === true)
      return favorites.filter(movie => movie.casts.some(
          (cast: Cast) => cast.character.toLowerCase().includes(store.filter().query.toLowerCase())
        ));
    }),

    searchedMovies: computed(() => {
      return store.movies().filter(movie => movie.casts.filter((cast:Cast) => cast.character.includes(store.filter().query)))
    }),

    loading: computed(() => store.isLoading() ),
  }))
);






