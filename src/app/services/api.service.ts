import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }

  get<T>(quantity: number): Observable<T[]> {
    let url = `${this.apiUrl}/movies/random/${quantity}`
    return this.http.get<T[]>(url, {
      responseType: 'json'
    })
  }
}
