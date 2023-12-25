import { GENRE_OPTION, TAG_OPTION } from '@yourapp/src/constant';
export type Book = {
  id?: string;
  title?: string;
  score?: number;
  description?: string;
  genres?: typeof GENRE_OPTION;
  tags?: typeof TAG_OPTION;
  coverArt: string[];
  type?: string;
  isLisensed?: boolean;
  author?: string;
  artist?: string;
  status?: string;
  urls?: {
    raw?: string[];
    vi?: string[];
    en?: string[];
  };
};
