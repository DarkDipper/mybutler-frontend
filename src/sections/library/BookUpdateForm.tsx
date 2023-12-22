import { useEffect, useMemo } from 'react';
import Link from 'next/link';
// @mui
import {
  Stack,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Autocomplete,
  Chip,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFSwitch,
} from '@yourapp/src/components/hook-form';
// utils
import * as Yup from 'yup';
import axios from '@yourapp/src/utils/axios';
import { Book } from '@yourapp/src/@types/library';
import { ScrollResponder } from '@fullcalendar/common';
import { description } from '@yourapp/src/_mock/assets';
import { url } from 'inspector';
import { GENRE_OPTION, STATUS_OPTION, TAG_OPTION, TYPE_OPTION } from '@yourapp/src/constant';

// Props
type FormValuesProps = {
  book?: Book;
  onClose: VoidFunction;
  setBook: React.Dispatch<React.SetStateAction<Book | undefined>>;
};
// schema
const BookSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  score: Yup.number().required('Score is required'),
  description: Yup.string().required('Description is required'),
  genres: Yup.array().required('Genres is required'),
  tags: Yup.array().required('Tags is required'),
  coverArt: Yup.string().required('Cover art is required'),
  type: Yup.string().required('Type is required'),
  status: Yup.string().required('Status is required'),
  isLisensed: Yup.boolean().required('Is lisened is required'),
  author: Yup.string().required('Author is required'),
  artist: Yup.string(),
  url: Yup.object().shape({
    raw: Yup.array(),
    vi: Yup.array(),
    en: Yup.array(),
  }),
});

export default function BookUpdateForm({ book, onClose, setBook }: FormValuesProps) {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues: Book = useMemo(() => {
    return {
      id: book?.id || '',
      title: book?.title || '',
      score: book?.score || 0,
      description: book?.description || '',
      genres: book?.genres || [],
      tags: book?.tags || [],
      coverArt: book?.coverArt || '',
      type: book?.type || '',
      isLisensed: book?.isLisensed || false,
      author: book?.author || '',
      artist: book?.artist || '',
      status: book?.status || '',
      url: {
        raw: book?.urls?.raw || [],
        vi: book?.urls?.vi || [],
        en: book?.urls?.en || [],
      },
    };
  }, [book]);

  const methods = useForm<Book>({
    defaultValues,
    resolver: yupResolver(BookSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    getValues,
    setValue,
  } = methods;
  const onSubmit = async (data: Book) => {
    try {
      // const response = await axios.put('/api/library/book', data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(data);
      // setBook(response.data);
      enqueueSnackbar('Book updated', { variant: 'success' });
      onClose();
    } catch (error) {
      enqueueSnackbar('Error updating book', { variant: 'error' });
    }
  };
  useEffect(() => {
    reset(defaultValues);
  });
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="h5">{book?.title}</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <RHFSelect name="type" label="Type">
              {TYPE_OPTION.map((status: string) => (
                <option>{status}</option>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={6}>
            <RHFSelect name="status" label="Status">
              {STATUS_OPTION.map((status: string) => (
                <option>{status}</option>
              ))}
            </RHFSelect>
          </Grid>
        </Grid>
        <Controller
          name="genres"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              freeSolo
              onChange={(event, newValue) => field.onChange(newValue)}
              options={GENRE_OPTION.map((option: string) => option)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                ))
              }
              renderInput={(params) => <TextField label="Genres" {...params} />}
            />
          )}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              freeSolo
              options={TAG_OPTION}
              onChange={(event, newValue) => field.onChange(newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                ))
              }
              renderInput={(params) => <TextField label="Tags" {...params} />}
            />
          )}
        />
        <Controller
          name="urls.vi"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              freeSolo
              options={[]}
              onChange={(event, newValue) => field.onChange(newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                ))
              }
              renderInput={(params) => <TextField label="Link việt" {...params} />}
            />
          )}
        />
        <Button
          component={'a'}
          href={book?.links?.find((l) => l.site === 'GOOGLE-SENSEI')?.link}
          target="_blank"
          variant="contained"
        >
          Tra Google
        </Button>
        <Controller
          name="urls.en"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              freeSolo
              options={[]}
              onChange={(event, newValue) => field.onChange(newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                ))
              }
              renderInput={(params) => <TextField label="Link eng" {...params} />}
            />
          )}
        />
        <RHFTextField
          name="score"
          label="Điểm số"
          placeholder="0.00"
          value={getValues('score') === 0 ? '' : getValues('score')}
          onChange={(event) => setValue('score', Number(event.target.value))}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: <InputAdornment position="end">/100</InputAdornment>,
            type: 'number',
          }}
        />
        <div>
          <RHFSwitch name="isLisensed" label="Có bản quyền" />
        </div>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          Cập nhật
        </LoadingButton>
        <Button
          component={Link}
          href={`/wibu/title/edit/${book?.id}`}
          variant="contained"
          size="large"
        >
          Sửa chi tiết
        </Button>
      </Stack>
    </FormProvider>
  );
}
