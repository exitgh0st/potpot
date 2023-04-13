import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Anime } from 'src/app/interfaces/anime';
import { Genre } from 'src/app/interfaces/genre';
import { AnimeService } from 'src/app/services/anime.service';

enum SortOrder {
  ASCENDING = 'arrow_drop_up',
  DESCENDING = 'arrow_drop_down'
}

type SortDetail = undefined | SortOrder;

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent {
  animes?: Anime[];
  filteredAnimes?: Anime[];

  sortDetails: { title: SortDetail; status: SortDetail } = {
    title: undefined,
    status: undefined
  };

  titleSortOrder?: SortOrder;
  statusSortOrder?: SortOrder;

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
    const genreMap = genres.map((genre) => genre.title);

    return genreMap.join(',');
  }

  clearSortOrders() {
    this.sortDetails.title = undefined;
    this.sortDetails.status = undefined;
  }

  switchSortOrder(sortHeader: keyof typeof this.sortDetails) {
    let sortOrder: SortOrder;

    if (this.sortDetails[sortHeader] !== SortOrder.ASCENDING) {
      sortOrder = SortOrder.ASCENDING;
    } else {
      sortOrder = SortOrder.DESCENDING;
    }

    this.clearSortOrders();
    this.sortDetails[sortHeader] = sortOrder;
    this.sortBy(sortHeader, sortOrder);
  }

  sortBy(sortHeader: keyof typeof this.sortDetails, sortOrder: SortOrder) {
    if (!this.filteredAnimes) {
      return;
    }

    switch (sortOrder) {
      case SortOrder.ASCENDING:
        this.filteredAnimes.sort((anime_a, anime_b) => this.sortByHeader(sortHeader, anime_a, anime_b));
        break;
      case SortOrder.DESCENDING:
        this.filteredAnimes.sort((anime_b, anime_a) => this.sortByHeader(sortHeader, anime_a, anime_b));
        break;
    }
  }

  sortByHeader(sortHeader: keyof typeof this.sortDetails, anime_a: Anime, anime_b: Anime) {
    switch (sortHeader) {
      case 'title':
        return anime_a.title.localeCompare(anime_b.title);
      case 'status':
        return anime_a.status.value.localeCompare(anime_b.status.value);
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
