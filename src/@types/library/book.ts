import { GENRE_OPTION, TAG_OPTION } from '@yourapp/src/constant';
import { CustomFile } from '@yourapp/src/components/upload';
export type Book = {
  id?: string;
  title?: string;
  titles?: string[];
  originalLanguage?: string;
  score?: number;
  description?: string;
  genres?: typeof GENRE_OPTION;
  tags?: typeof TAG_OPTION;
  coverArt: (string | CustomFile)[];
  type?: string;
  isLisensed?: boolean;
  author?: string[];
  artist?: string[];
  status?: string;
  urls?: {
    raw?: string[];
    vi?: string[];
    en?: string[];
  };
  links?: [
    {
      name?: string;
      link?: string;
    }
  ];
};
