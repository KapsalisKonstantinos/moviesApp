import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { MoviesStore } from '../../store/movies.store';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Movie } from '../../models/model';
import { of } from 'rxjs';

// Mock Store
class MockMoviesStore {
  makeFavorite = jasmine.createSpy('makeFavorite');
  remove = jasmine.createSpy('remove');
}

// Mock Router
class MockRouter {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
  navigate = jasmine.createSpy('navigate');
}

// Mock MessageService
class MockMessageService {
  add = jasmine.createSpy('add');
}

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let store: MockMoviesStore;
  let router: MockRouter;
  let messageService: MockMessageService;

  const mockMovie: Movie = {
    movie_id: 1,
    id: '1',
    original_title: 'Test Movie',
    favorite: false,
    deleted: false,
    adult: 18,
    created_at: null,
    backdrop_path: "",
    original_language: 'en',
    overview: '',
    popularity: 10,
    poster_path: '',
    release_date: '',
    vote_average: 3,
    updated_at: null,
    vote_count: 12,
    casts: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
      providers: [
        { provide: MoviesStore, useClass: MockMoviesStore },
        { provide: Router, useClass: MockRouter },
        { provide: MessageService, useClass: MockMessageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MoviesStore) as any;
    router = TestBed.inject(Router) as any;
    messageService = TestBed.inject(MessageService) as any;

    component.movie = { ...mockMovie };
    fixture.detectChanges();
  });

  // -------------------------------------------------------
  // TESTS
  // -------------------------------------------------------

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle favorite and call store.makeFavorite', () => {
    component.addToFavorites(component.movie!);

    expect(component.movie!.favorite).toBeTrue();
    expect(store.makeFavorite).toHaveBeenCalledWith(component.movie);
    expect(messageService.add).toHaveBeenCalled();
  });

  it('should remove movie and call store.remove', () => {
    component.remove(component.movie!);

    expect(component.movie!.deleted).toBeTrue();
    expect(store.remove).toHaveBeenCalledWith(component.movie);
    expect(messageService.add).toHaveBeenCalled();
  });

  it('should navigate to edit page', () => {
    component.edit(component.movie!);

    expect(router.navigateByUrl)
      .toHaveBeenCalledWith('/favorites/edit/1');
  });

  it('should navigate to movie details', () => {
    component.showDetails(component.movie!);

    expect(router.navigate)
      .toHaveBeenCalledWith(['/movie/1']);
  });

  it('should replace image on error', () => {
    const event = {
      target: document.createElement('img')
    } as unknown as Event;

    component.onImgError(event);

    const img = event.target as HTMLImageElement;
    expect(img.src).toContain('movie-image-error.png');
    expect(img.style.height).toBe('135px');
    expect(img.style.width).toBe('240px');
  });
});
