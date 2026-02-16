import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { Movie } from "../../models/model";
import { MoviesStore } from "../../store/movies.store";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, CardModule, ButtonModule],
  providers: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class MovieCardComponent {

  @Input() movie: Movie | null = null;
  @Input() viewType: 'explore' | 'favorites' = 'explore'
  store = inject(MoviesStore);
  messageService = inject(MessageService);

  constructor(private router: Router) { }

  /**
   *
   * @param movie
   */
  addToFavorites(movie: Movie) {
    movie.favorite = !movie.favorite;
    this.store.makeFavorite(movie)
    this.messageService.add({severity: 'info', summary: 'Done!', detail: `Added to favorites!`})
  }

  /**
   * Remove a movie from the list
   * @param movie
   */
  remove(movie: Movie): void {
    this.messageService.add({severity: 'info', summary: 'Done!', detail: `Movie totally removed from all the lists.`})
    movie.deleted = true;
    this.store.remove(movie)
  }

  /**
   * Edit a movie. This is available only for movies in favorites list.
  */
  edit(movie: Movie): void {
    this.router.navigateByUrl("/favorites/edit/" + movie.movie_id);
  }

  /**
   * Fail safe method for missing images
   * Can be removed and added to Utils.ts since it can be used also in other cases.
   * @param event
   */
  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'movie-image-error.png';
    (event.target as HTMLImageElement).style.height = '135px';
    (event.target as HTMLImageElement).style.width = '240px'
  }

  /**
   * Show movie details page.
   * @param movie
   */
  showDetails(movie: Movie): void {
    this.router.navigate([`/movie/${movie.movie_id}`]);
  }

}
