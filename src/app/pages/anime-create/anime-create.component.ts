import { Component, ElementRef, ViewChild } from '@angular/core';
import { combineLatest, lastValueFrom } from 'rxjs';
import { Anime } from 'src/app/interfaces/anime';
import { Genre } from 'src/app/interfaces/genre';
import { Status } from 'src/app/interfaces/status';
import { AnimeService } from 'src/app/services/anime.service';
import { GenreService } from 'src/app/services/genre.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-anime-create',
  templateUrl: './anime-create.component.html',
  styleUrls: ['./anime-create.component.scss']
})
export class AnimeCreateComponent {
  @ViewChild('genreSelect') genreSelect?: ElementRef;

  anime: Anime = {
    id: -1,
    title: '',
    synopsis: '',
    status: { id: -1, value: '' },
    genres: []
  };

  statuses?: Status[];
  genres?: Genre[];
  filteredGenres?: Genre[];

  genreInput?: string;

  constructor(private animeService: AnimeService, private statusService: StatusService, private genreService: GenreService) {}

  ngOnInit() {
    const lastAnimeId$ = this.animeService.getLastAnimeId();

    lastValueFrom(lastAnimeId$).then((animeId) => {
      this.anime.id = parseInt(animeId.last_value) + 1;
    });

    const statuses$ = this.statusService.getStatuses();
    const genres$ = this.genreService.getGenres();

    lastValueFrom(combineLatest([statuses$, genres$])).then((result) => {
      this.statuses = result[0];
      this.genres = result[1];
      this.filteredGenres = [...result[1]];
    });
  }

  updateGenres(searchString: string) {
    searchString = searchString.toLowerCase();

    this.filteredGenres = this.genres?.filter((genres) => {
      if (genres.title.toLowerCase().startsWith(searchString)) {
        return true;
      }

      return false;
    });
  }
}
