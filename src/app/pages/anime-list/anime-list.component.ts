import { Component } from '@angular/core';
import { combineLatest, lastValueFrom } from 'rxjs';
import { Anime } from 'src/app/interfaces/anime';
import { Genre } from 'src/app/interfaces/genre';
import { AnimeService } from 'src/app/services/anime.service';
import { GenreService } from '../../services/genre.service';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/interfaces/status';
import { Router, ActivatedRoute } from '@angular/router';
import { statusConstants } from 'src/app/constants/status-constants';

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

  statusFilter: Status = { id: -1, value: '-' };
  genreFilter: Genre = { id: -1, title: '-', description: '-' };

  statuses = [this.statusFilter];
  genres = [this.genreFilter];

  sortDetails: { title: SortDetail; status: SortDetail } = {
    title: undefined,
    status: undefined
  };

  constructor(
    private animeService: AnimeService,
    private genreService: GenreService,
    private statusService: StatusService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const urlQueryParamMap = this.route.snapshot.queryParamMap;
    const statusId = urlQueryParamMap.get('status');
    const genreId = urlQueryParamMap.get('genre');

    const animeList$ = this.animeService.getAnimes();
    const statusList$ = this.statusService.getStatuses();
    const genreList$ = this.genreService.getGenres();

    lastValueFrom(combineLatest([animeList$, statusList$, genreList$])).then((data) => {
      const animeList = data[0];
      const statusList = data[1];
      const genreList = data[2];

      this.animes = animeList;
      this.filteredAnimes = [...animeList];

      this.statuses = this.statuses.concat(statusList);
      this.genres = this.genres.concat(genreList);

      if (statusId) {
        const status = this.statuses.find((status) => {
          if (status.id == parseInt(statusId)) {
            return true;
          }

          return false;
        });

        if (status) {
          this.statusFilter = status;
        }
      }

      if (genreId) {
        const genre = this.genres.find((genre) => {
          if (genre.id == parseInt(genreId)) {
            return true;
          }

          return false;
        });

        if (genre) {
          this.genreFilter = genre;
        }
      }

      this.updateFilter();
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

  updateFilter() {
    this.clearSortOrders();

    if (!this.animes) {
      return;
    }

    const toFilterStatus = this.statusFilter.id != -1;
    const toFilterGenre = this.genreFilter.id != -1;

    if (toFilterStatus || toFilterGenre) {
      const queryParams = {
        status: toFilterStatus ? this.statusFilter.id : undefined,
        genre: toFilterGenre ? this.genreFilter.id : undefined
      };

      this.router.navigate([], { queryParams: queryParams });
    }

    this.filteredAnimes = this.animes.filter((anime) => {
      if (toFilterStatus) {
        if (anime.status.id != this.statusFilter.id) {
          return false;
        }
      }

      if (toFilterGenre) {
        for (let genre of anime.genres) {
          if (genre.id == this.genreFilter.id) {
            return true;
          }
        }

        return false;
      }

      return true;
    });
  }

  goToDetailsPage(id: number) {
    this.router.navigate(['anime', id]);
  }

  getStatusString(status: Status) {
    const statusString = status.value as keyof typeof statusConstants;

    return statusConstants[statusString];
  }
}
