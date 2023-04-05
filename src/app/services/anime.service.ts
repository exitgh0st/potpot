import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Anime } from '../interfaces/anime';

import { config } from 'dotenv';
config();

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  animes?: Anime[];

  constructor(private http: HttpClient) {}

  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(`${process.env['API_URL']}/api/animes`);
  }

  getAnime(id: string): Observable<Anime> {
    return this.http.get<Anime>(`${process.env['API_URL']}/api/animes/${id}`);
  }
}
