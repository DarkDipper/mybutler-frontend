import * as Yup from 'yup';
import { Book } from '@yourapp/src/@types/library';

export const BookUpdateFormSchema: Yup.SchemaOf<Book> = Yup.object().shape({
  id: Yup.string(),
  title: Yup.string(),
  score: Yup.number()
    .required('Score is required')
    .positive('Score must be positive')
    .min(0, 'Score must be greater than 0'),
  description: Yup.string(),
  genres: Yup.array().required('Genres is required'),
  tags: Yup.array().required('Tags is required'),
  coverArt: Yup.array().of(Yup.string().url('Invalid URL format').required()),
  type: Yup.string().required('Type is required'),
  isLisensed: Yup.boolean().required('Is lisened is required'),
  author: Yup.string(),
  artist: Yup.string(),
  status: Yup.string().required('Status is required'),
  urls: Yup.object()
    .shape({
      raw: Yup.array().of(Yup.string().url('Link must be a valid URL')),
      vi: Yup.array().of(Yup.string().url('Link must be a valid URL')),
      en: Yup.array().of(Yup.string().url('Link must be a valid URL')),
    })
    .required('URLs is required'),
});
