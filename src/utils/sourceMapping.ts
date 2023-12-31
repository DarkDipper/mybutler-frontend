import {
  MangadexLogo,
  NhentaiLogo,
  ImgurLogo,
  RedditLogo,
  MangadexViLogo,
  BlogtruyenLogo,
  GoogleDriveLogo,
} from '@yourapp/src/assets/logos';

type sourceToIconType = {
  [key: string]: any;
};

const sourceToIcon: sourceToIconType = {
  mangadex: MangadexLogo,
  'mangadex-vi': MangadexViLogo,
  nhentai: NhentaiLogo,
  imgur: ImgurLogo,
  reddit: RedditLogo,
  blogtruyen: BlogtruyenLogo,
  googledrive: GoogleDriveLogo,
};

type sourceToColorType = {
  [key: string]: any;
};

const sourceToColor: sourceToColorType = {
  mangadex: '#FF6740',
  'mangadex-vi': '#d80027',
  imgur: '#1bb76e',
  nhentai: '#EC2854',
  reddit: '#FF4500',
  blogtruyen: '#4176ed',
  googledrive: '#4285F4',
};

export { sourceToIcon, sourceToColor };
export type { sourceToIconType, sourceToColorType };
