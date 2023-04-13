import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '../interfaces/genre';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.apiUrl}/api/genres`);
  }

  getGenre(id: string): Observable<Genre> {
    return this.http.get<Genre>(`${environment.apiUrl}/api/genres/${id}`);
  }
}
