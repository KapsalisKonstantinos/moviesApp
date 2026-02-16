import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedMovieDisplayComponent } from '../../shared/shared-movie-display/shared-movie-display.component';
import { SearchBar } from '../../shared/search-bar/search-bar.component';
@Component({
  selector: 'app-favorites',
  imports: [CommonModule, SharedMovieDisplayComponent, SearchBar],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FavoritesComponent {
  constructor() {}

  ngOnInit() { }
}
