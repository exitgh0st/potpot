import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Anime } from 'src/app/interfaces/anime';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.scss']
})
export class AnimeDetailComponent {
  anime?: Anime;

  constructor(private activatedRoute: ActivatedRoute,
    private animeService: AnimeService) {
    const animeId = this.activatedRoute.snapshot.paramMap.get('id');

    if (animeId) {
      const anime$ = this.animeService.getAnime(animeId);

      lastValueFrom(anime$).then(anime => {
        this.anime = anime;
      });
    }
  }
}
