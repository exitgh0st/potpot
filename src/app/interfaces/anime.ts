import { Status } from './status';
import { Genre } from './genre';

export interface Anime {
  id: number;
  title: string;
  synopsis: string;
  status: Status;
  genre: Genre;
}
