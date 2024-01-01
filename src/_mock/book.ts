import { Book } from '@yourapp/src/@types/library';
export const mockBook: Book = {
  id: '1',
  title: 'The Art of War',
  titles: ['Magic Martial Arts', 'Magic Jujutsu', '呪術廻戦', '주술회전', '咒术回战'],
  score: 80,

  description:
    "Yuuji is a genius at track and field. But he has zero interest running around in circles, he's happy as a clam in the Occult Research Club. Although he's only in the club for kicks, things get serious when a real spirit shows up at school! Life's about to get really strange in Sugisawa Town #3 High School!",
  genres: ['shounen', 'tragedy', 'supernatural'],
  tags: ['brother complex', 'war', 'neighbor', 'slow romance'],
  // coverArt: 'https://i.imgur.com/PdqpgcK.png',
  coverArt: [
    'https://mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/40dfaef9-0360-4086-b0d2-d655579bf1d0.jpg',
    'https://mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/f632fd73-e513-497f-b7c8-d22d52938ddb.png',
    'https://mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/35c10838-d718-4c92-ab9c-325805fd42c0.png',
  ],
  originalLanguage: 'jp',
  author: ['Gege Akutami'],
  artist: ['Gege Akutami'],
  type: 'manga',
  isLisensed: true,
  status: 'ongoing',
  urls: {
    raw: ['https://mangadex.org/title/c52b2ce3-7f95-469c-96b0-479524fb7a1a/jujutsu-kaisen'],
    vi: ['https://mangadex.org/title/c52b2ce3-7f95-469c-96b0-479524fb7a1a/jujutsu-kaisen'],
    en: [
      'https://drive.google.com/file/d/1YY2_LjyTSjfm-TV60qJACz-fIYY2Rnwe/',
      'https://drive.google.com/file/d/1YY2_LjyTSjfm-TV60qJACz-fIYY2Rnwe/',
      'https://drive.google.com/file/d/1YY2_LjyTSjfm-TV60qJACz-fIYY2Rnwe/',
      'https://drive.google.com/file/d/1YY2_LjyTSjfm-TV60qJACz-fIYY2Rnwe/',
    ],
  },
};
