import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MoviesStore } from '../../store/movies.store';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  store = inject(MoviesStore);
  private searchWaiting: any = null;

  constructor() {}

  search(searchInput: string) {
    clearTimeout(this.searchWaiting);
    this.searchWaiting = setTimeout( () => {this.store.updateFilterQuery(searchInput)}, 300)

  }
}
