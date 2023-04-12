import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Anime } from 'src/app/interfaces/anime';
import { Genre } from 'src/app/interfaces/genre';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent {
  animes?: Anime[];

  constructor(private animeService: AnimeService) {}

  ngOnInit() {
    const animeList$ = this.animeService.getAnimes();

    lastValueFrom(animeList$).then((animeList) => {
      this.animes = animeList;
    });
  }

  getGenreString(genres: Genre[]) {
    let genreMap = genres.map((genre) => genre.title);

    return genreMap.join(',');
  }
}
