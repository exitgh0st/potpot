import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Anime } from '../interfaces/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  animes?: Anime[];

  constructor(private http: HttpClient) {}

  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${environment.apiUrl}/api/animes`);
  }

  getAnime(id: string): Observable<Anime> {
    return this.http.get<Anime>(`${environment.apiUrl}/api/animes/${id}`);
  }

  getLastAnimeId(): Observable<{ last_value: string }> {
    return this.http.get<{ last_value: string }>(`${environment.apiUrl}/api/animes_last_id`);
  }

  createAnime(anime: Anime): Observable<Anime> {
    return this.http.post<Anime>(`${environment.apiUrl}/api/animes`, anime);
  }
}
