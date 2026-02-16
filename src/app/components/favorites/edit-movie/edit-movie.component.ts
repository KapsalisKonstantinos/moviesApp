import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, SimpleChanges, effect, signal, Signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { Cast, Movie } from '../../../models/model';
import { MoviesStore } from '../../../store/movies.store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import  { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import{ CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-movie',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    ChipModule,
    DataViewModule,
    DividerModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule
  ],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditMovieComponent {
  movie: any;
  store = inject(MoviesStore);
  messageService = inject(MessageService);
  router = inject(Router);
  route =  inject(ActivatedRoute);
  image: string | null = null
  movieID = -1;

  constructor() { }

  ngOnInit() {
    this.movieID = +this.route.snapshot.paramMap.get('id')!
    this.movie = signal(this.store.getMovie(this.movieID))
    if(!this.movie() || !this.movie().favorite) this.router.navigateByUrl(`/favorites`);
  }

  /**
   *
   * @param event
   * @returns
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.movie.update((m: Movie) => ({ ...m, backdrop_path: reader.result as string }));
      this.updateStore();
    };

    reader.readAsDataURL(file);
    input.value = '';
  }

  /** */
  update<K extends keyof Movie>(key: K, value: Movie[K]) {
    this.movie.update((m: Movie) => ({ ...m, [key]: value }));
    this.updateStore();
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

  removeCharacter(item: Cast) {
    console.log(this.movie().casts.filter((c: Cast) => c.id !== item.id ))
    this.movie.update(
      (m:Movie) => (
        {
          ...m,
          casts: this.movie().casts.filter((c: Cast) => c.id !== item.id )
        }
    ))
    this.updateStore();
  }

  /** */
  updateStore() {
    this.store.update(this.movie());
    this.messageService.add({ severity: 'success', summary: 'Done!', detail: `Movie was updated!` });
  }

}
