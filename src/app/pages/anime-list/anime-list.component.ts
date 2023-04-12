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
  filteredAnimes?: Anime[];

  titleSortOrder?: SortOrder;
  titleSortIconName: SortArrow = 'arrow_drop_down';

  statusSortOrder?: SortOrder;
  statusSortIconName: SortArrow = 'arrow_drop_down';

  statusFilter: string = 'on_hiatus';
  genreFilter: string = 'Action';

  constructor(private animeService: AnimeService) {}

  ngOnInit() {
    const animeList$ = this.animeService.getAnimes();

    lastValueFrom(animeList$).then((animeList) => {
      this.animes = animeList;
      this.filteredAnimes = [...animeList];
    });
  }

  getGenreString(genres: Genre[]) {
    let genreMap = genres.map((genre) => genre.title);

    return genreMap.join(',');
  }

  switchTitleSortOrder() {
    this.statusSortOrder = undefined;

    if (this.titleSortOrder != SortOrder.ASCENDING) {
      this.titleSortOrder = SortOrder.ASCENDING;
    } else {
      this.titleSortOrder = SortOrder.DESCENDING;
    }

    this.titleSortIconName = this.titleSortOrder;
    this.sortByTitle();
  }

  switchStatusSortOrder() {
    this.titleSortOrder = undefined;

    if (this.statusSortOrder != SortOrder.ASCENDING) {
      this.statusSortOrder = SortOrder.ASCENDING;
    } else {
      this.statusSortOrder = SortOrder.DESCENDING;
    }

    this.statusSortIconName = this.statusSortOrder;
    this.sortByStatus();
  }

  sortByTitle() {
    if (!this.filteredAnimes) {
      return;
    }

    switch (this.titleSortOrder) {
      case SortOrder.ASCENDING:
        this.filteredAnimes.sort((anime_a, anime_b) => anime_a.title.localeCompare(anime_b.title));
        break;
      case SortOrder.DESCENDING:
        this.filteredAnimes.sort((anime_b, anime_a) => anime_a.title.localeCompare(anime_b.title));
        break;
    }
  }

  sortByStatus() {
    if (!this.filteredAnimes) {
      return;
    }

    switch (this.statusSortOrder) {
      case SortOrder.ASCENDING:
        this.filteredAnimes.sort((anime_a, anime_b) => anime_a.status.value.localeCompare(anime_b.status.value));
        break;
      case SortOrder.DESCENDING:
        this.filteredAnimes.sort((anime_b, anime_a) => anime_a.status.value.localeCompare(anime_b.status.value));
        break;
    }
  }

  filterByStatus(status: string) {
    if (!this.animes) {
      return;
    }

    this.filteredAnimes = this.animes.filter((anime) => {
      if (anime.status.value == status) {
        return true;
      }

      return false;
    });
  }

  filterByGenre(genreFilter: string) {
    if (!this.animes) {
      return;
    }

    this.filteredAnimes = this.animes.filter((anime) => {
      for (let genre of anime.genres) {
        if (genre.title == genreFilter) {
          return true;
        }
      }

      return false;
    });
  }

  filterStatus() {
    this.filterByStatus(this.statusFilter);
  }

  filterGenre() {
    this.filterByGenre(this.genreFilter);
  }
}

export class SortDetail {
  constructor(private filter: string, private sortOrder: SortOrder) {}
}

export enum SortOrder {
  ASCENDING = 'arrow_drop_down',
  DESCENDING = 'arrow_drop_up'
}

export type SortArrow = 'arrow_drop_down' | 'arrow_drop_up';
