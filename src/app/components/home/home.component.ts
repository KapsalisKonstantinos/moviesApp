import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MoviesStore } from '../../store/movies.store';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';
import { SharedMovieDisplayComponent } from '../../shared/shared-movie-display/shared-movie-display.component';
import { SearchBar } from "../../shared/search-bar/search-bar.component";

@Component({
  selector: 'app-home',
  imports: [SharedMovieDisplayComponent, SearchBar],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class HomeComponent {
  constructor() {}

  ngOnInit() {}
}
