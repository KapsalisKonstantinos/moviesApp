import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/model';
import { environment } from './../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  apiUrl = environment.apiUrl;
  apiService = inject(ApiService)

  constructor() { }

  getMovies(quantity: number): Observable<Movie[]> {
    return this.apiService.get(quantity)
  }
}
