import { Component } from '@angular/core';
import { Anime } from 'src/app/interfaces/anime';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-anime-collection',
  templateUrl: './anime-collection.component.html',
  styleUrls: ['./anime-collection.component.scss'],
})
export class AnimeCollectionComponent {
  animes?: Anime[];

  constructor(private animeService: AnimeService) {}

  ngOnInit() {
    this.animeService.getAnimes().subscribe((animes) => {
      console.log(animes);
      this.animes = animes;
    });
  }
}
