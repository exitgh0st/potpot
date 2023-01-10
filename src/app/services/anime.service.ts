import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anime } from '../interfaces/anime';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  animes?: Anime[];

  constructor(private http: HttpClient) {}

  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>('https://potpot-server.onrender.com/animes');
  }
}
