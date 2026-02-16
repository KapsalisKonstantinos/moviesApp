import { ChangeDetectionStrategy, Component, effect, HostListener, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesStore } from '../../store/movies.store';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-shared-movie-display',
  imports: [CommonModule, MovieCardComponent, ToolbarModule],
  providers: [],
  templateUrl: './shared-movie-display.component.html',
  styleUrl: './shared-movie-display.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class SharedMovieDisplayComponent {
  @HostListener('window:scrollend', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight) { // we have to reach the end of the page.
      if(this.viewType === 'explore')
        this.store.loadMoviesOnScroll(5) // the total number can be improved according to the size of the viewport - BreakpointObserver
    }
  }

  // @Input() actions: MenuItem[] = [];
  @Input() viewType: 'explore' | 'favorites' = 'explore'

  store = inject(MoviesStore);

  constructor() {
    effect(() => {
      const dbLoaded = this.store.dbLoaded();
      const emptyDB = this.store.emptyDB();

      if (dbLoaded && emptyDB && this.viewType === 'explore') {
        this.store.initialFetch(10);
      }
    });
  }
}
