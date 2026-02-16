# Movies App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.
I have used NgRx SignalStore@19, standalone architecture, styled with PrimeNG@19, and tailwindcss for basic griding and responsiveness.

## Trade-offs:
- Application fetches random Movies from https://jsonfakery.com/.
- On first start, it fetches 10 movies, and on every scroll, adds 5 more movies in the list. (This can be improved by watching the media size, and increase/decrease accordingly the total movies in the API response )
- Movies history preserved byIndexDB can not be cleared through the application. 
- User can only edit the favorite movies.
- User can only delete a movie from the main list. The movie will totally be removed, and there is no recover action.
- Deleted movies' ids are kept in the state management, and new entries in the list are excluded if they match any of the deleted ones.
- User can delete an actor from the casts. The actor will totally be removed, and there is no recover action.
- Character search engine, does not match the exact character, but any character that contains the query text.
- The responsiveness of the UI, is not the best for small devices.

- <b>!!!! Environement's `apiKey` is personal and will be removed in the future.</b>

## Implementation Details:

- IndexDB was selected to preserve the state due to bigger storage capacity. (According to the requirements I should create an iternal scroll, and each scroll increases the stored data.)
- Refresh does not affect any of the content that is served through the valid routes (home, favorites, movie/`<id>`, favorites/edit/`<movieid>`)
- Loading from IndexDB is in high priority.
- Fetch of images is happening when they reach the viewport, and url path is mapped in order to ask for lighter version of the original image.
- A fail safe image is displayd when image src can not be loaded.
- Most of the components are dummy, letting the state management to handle changes in the movies' data.
- I have created shared components to increase the reusability the reduce duplicated code.
- Edit of casts, supports only the deletion of actors.
- Editing of a movie does not require any button for saving the changes.
- More popup messages have been added to provide a better experience and expose the movies current state. 
- The movie deletion action, should ask for confirmation, but is not implemented.  
- The menu items should be highlighted for active routes, but is not implemented.
- movie-details component is not using a Signal`<Movie>`, compared to movie-edit component because details page is readonly, so no changes are expected there.
-Unit tests are not implemented and karma/jasmine configuration is not completed.

## Development server

To start a local development server, run:

```bash
npm install
```

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.




Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
