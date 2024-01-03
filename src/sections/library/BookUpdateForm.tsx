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
  MenuItem,
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
  RHFAutocomplete,
} from '@yourapp/src/components/hook-form';
// utils
import axios from '@yourapp/src/utils/axios';
import { Book } from '@yourapp/src/@types/library';

import { GENRE_OPTION, STATUS_OPTION, TAG_OPTION, TYPE_OPTION } from '@yourapp/src/constant';
// schema
import { BookUpdateFormSchema } from '@yourapp/src/utils/validation/library/BookUpdateFormSchema';

// Props
type FormValuesProps = {
  book?: Book;
  onClose: VoidFunction;
  setBook: React.Dispatch<React.SetStateAction<Book | undefined>>;
};

export default function BookUpdateForm({ book, onClose, setBook }: FormValuesProps) {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues: Book = useMemo(() => {
    return {
      title: book?.title || '',
      score: book?.score || 0,
      description: book?.description || '',
      genres: book?.genres || [],
      tags: book?.tags || [],
      coverArt: book?.coverArt || [],
      type: book?.type || '',
      isLisensed: book?.isLisensed || false,
      author: book?.author || [],
      artist: book?.artist || [],
      status: book?.status || '',
      urls: {
        raw: book?.urls?.raw || [],
        vi: book?.urls?.vi || [],
        en: book?.urls?.en || [],
      },
    };
  }, [book]);

  const methods = useForm<Book>({
    defaultValues,
    resolver: yupResolver(BookUpdateFormSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
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
      enqueueSnackbar('Book updated', {
        variant: 'success',
        anchorOrigin: { horizontal: 'left', vertical: 'top' },
      });
      onClose();
    } catch (error) {
      enqueueSnackbar('Error updating book', { variant: 'error' });
    }
  };
  useEffect(() => {
    reset(defaultValues);
  }, [book]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="h5">{book?.title}</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <RHFSelect name="type" label="Type" InputLabelProps={{ shrink: true }}>
              {TYPE_OPTION.map((status: string) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={6}>
            <RHFSelect name="status" label="Status">
              {STATUS_OPTION.map((status: string) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
        </Grid>
        <RHFAutocomplete
          name="genres"
          label="Genres"
          options={GENRE_OPTION.map((option: string) => option)}
          value={getValues('genres') || []}
          multiple
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
            ))
          }
        />
        <RHFAutocomplete
          name="tags"
          label="Tags"
          options={TAG_OPTION}
          value={getValues('tags') || []}
          multiple
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
            ))
          }
        />
        <Controller
          name="urls.vi"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              multiple
              value={field.value || []}
              freeSolo
              options={[]}
              onChange={(event, newValue) => field.onChange(newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  label="Link việt"
                  error={!!error}
                  {...params}
                  helperText={Array.isArray(error) && error.length ? error[0]?.message : undefined}
                />
              )}
            />
          )}
        />
        <Controller
          name="urls.en"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              value={field.value || []}
              multiple
              freeSolo
              options={[]}
              onChange={(event, newValue) => field.onChange(newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  label="Link eng"
                  error={!!error}
                  {...params}
                  helperText={Array.isArray(error) && error.length ? error[0]?.message : undefined}
                />
              )}
            />
          )}
        />
        <RHFTextField
          name="score"
          label="Điểm số"
          placeholder="0.00"
          onChange={(event) => {
            setValue('score', Number(event.target.value));
            console.log(getValues('score'));
          }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: <InputAdornment position="end">/100</InputAdornment>,
            type: 'number',
            inputProps: {
              pattern: '[0-9]*',
            },
          }}
          helperText={errors.score?.message}
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
      {/* {errors && <pre>{JSON.stringify(errors, null, 2)}</pre>} */}
    </FormProvider>
  );
}
