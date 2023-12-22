import { Book } from '@yourapp/src/@types/library';
export const mockBook: Book = {
  id: '1',
  title: 'The Art of War',
  score: 80,
  description:
    "Yuuji is a genius at track and field. But he has zero interest running around in circles, he's happy as a clam in the Occult Research Club. Although he's only in the club for kicks, things get serious when a real spirit shows up at school! Life's about to get really strange in Sugisawa Town #3 High School!",
  genres: ['shounen', 'tragedy', 'supernatural'],
  tags: ['brother complex', 'war', 'neighbor', 'slow romance'],
  // coverArt: 'https://i.imgur.com/PdqpgcK.png',
  coverArt:
    'https://mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/40dfaef9-0360-4086-b0d2-d655579bf1d0.jpg',
  type: 'manga',
};
