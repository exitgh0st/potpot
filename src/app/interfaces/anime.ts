import { Status } from './status';
import { Genre } from './genre';

export interface Anime {
  id: string;
  title: string;
  synopsis: string;
  status: Status;
  genres: Genre[];
}
