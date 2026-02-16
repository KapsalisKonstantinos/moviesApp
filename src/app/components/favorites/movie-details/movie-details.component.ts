import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Movie } from '../../../models/model';
import { MoviesStore } from '../../../store/movies.store';
import { ActivatedRoute, Router } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider'
import { CardModule } from 'primeng/card'
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, CardModule, TagModule, ChipModule, DividerModule, ButtonModule, DataViewModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class MovieDetailsComponent {
  movie: Movie | undefined = undefined;
  movieID = -1;
  store = inject(MoviesStore);
  route = inject(ActivatedRoute)
  messageService = inject(MessageService)
  router = inject(Router)

  constructor() {}

  ngOnInit() {
    this.movieID = +this.route.snapshot.paramMap.get('id')!
    this.movie = this.store.getMovie(this.movieID);

    if(!this.movie) this.router.navigateByUrl(`/home`);
  }

  /**
   *
   * @param event
   */
  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'movie-image-error.png';
    (event.target as HTMLImageElement).style.height = '135px';
    (event.target as HTMLImageElement).style.width = '240px'
  }

  /**
   *
   * @param movie
   */
  addToFavorites(movie: Movie) {
    movie.favorite = !movie.favorite;
    this.store.makeFavorite(movie)
    this.messageService.add({severity: 'info', summary: 'Done!', detail: `Added to favorites!`})
  }
}
