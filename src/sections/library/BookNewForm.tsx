import { useCallback, useEffect, useMemo } from 'react';
// form
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BookNewFormSchema } from '@yourapp/src/utils/validation/library/BookNewFormSchema';
import { isString, set } from 'lodash';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Box,
  InputAdornment,
} from '@mui/material';
// components
import Image from '@yourapp/src/components/image';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFSwitch,
  RHFUpload,
  RHFAutocomplete,
} from '@yourapp/src/components/hook-form';
import { useSnackbar } from '@yourapp/src/components/snackbar';
import Label from '@yourapp/src/components/label/Label';
// paths
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';
// utils
import imgur from '@yourapp/src/utils/imgur';
import { TYPE_OPTION, STATUS_OPTION, GENRE_OPTION, TAG_OPTION } from '@yourapp/src/constant';
import { Book } from '@yourapp/src/@types/library';
import { CustomFile } from '@yourapp/src/components/upload';

type BookNewFormProps = {
  isEdit: boolean;
  currentBook: Book | null;
  bookSubmit: (data: Book) => void;
};

export default function BookNewForm({ isEdit, currentBook, bookSubmit }: BookNewFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues: Book = useMemo(
    () => ({
      title: currentBook?.title || '',
      titles: currentBook?.titles || [],
      originalLanguage: currentBook?.originalLanguage || '',
      score: currentBook?.score || 0,
      description: currentBook?.description || '',
      genres: currentBook?.genres || [],
      tags: currentBook?.tags || [],
      coverArt: currentBook?.coverArt || [
        'https://mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/40dfaef9-0360-4086-b0d2-d655579bf1d0.jpg',
      ],
      type: currentBook?.type || '',
      isLisensed: currentBook?.isLisensed || false,
      author: currentBook?.author || [],
      artist: currentBook?.artist || [],
      status: currentBook?.status || 'ongoing',
      urls: {
        raw: currentBook?.urls?.raw || [],
        vi: currentBook?.urls?.vi || [],
        en: currentBook?.urls?.en || [],
      },
    }),
    [currentBook]
  );
  const method = useForm<Book>({
    defaultValues,
    resolver: yupResolver(BookNewFormSchema),
  });
  const {
    watch,
    setValue,
    getValues,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = method;
  const values = watch();

  const onSubmit = async (data: Book) => {
    try {
      // await bookSubmit(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(data);
      enqueueSnackbar('Book updated', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Error updating book', { variant: 'error' });
    }
  };

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setValue(
        'coverArt',
        [...getValues('coverArt'), ...acceptedFiles].map((file) =>
          isString(file)
            ? file
            : Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
        )
      );
    },
    [setValue, values.coverArt]
  );
  const handleRemoveAll = () => {
    setValue('coverArt', []);
  };
  const handleRemove = (file: CustomFile | string) => {
    const filterFiles = values.coverArt.filter((item) => item !== file);
    setValue('coverArt', filterFiles);
  };
  return (
    <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Title" />
              <RHFAutocomplete
                name="titles"
                label="Alternative Titles"
                value={getValues('titles') || []}
                multiple
                options={[]}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      variant="outlined"
                      label={option}
                    />
                  ))
                }
              />
              <div>
                <LabelStyled>Description</LabelStyled>
                <RHFEditor simple name="description" />
              </div>
              <div>
                <LabelStyled>Images</LabelStyled>
                <RHFUpload
                  name="coverArt"
                  multiple
                  thumbnail
                  accept={{ 'image/*': ['jpg', 'jpeg', 'png'] }}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </div>
              <Controller
                name="urls.raw"
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
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                          label={option}
                          variant="soft"
                          color="info"
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        label="Link japan"
                        error={!!error}
                        {...params}
                        helperText={
                          Array.isArray(error) && error.length ? error[0]?.message : undefined
                        }
                      />
                    )}
                  />
                )}
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
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                          label={option}
                          variant="soft"
                          color="info"
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        label="Link viet"
                        error={!!error}
                        {...params}
                        helperText={
                          Array.isArray(error) && error.length ? error[0]?.message : undefined
                        }
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
                    multiple
                    value={field.value || []}
                    freeSolo
                    options={[]}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                          label={option}
                          variant="soft"
                          color="info"
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        label="Link Eng"
                        error={!!error}
                        {...params}
                        helperText={
                          Array.isArray(error) && error.length ? error[0]?.message : undefined
                        }
                      />
                    )}
                  />
                )}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <RHFSwitch name="isLisensed" label="Có bản quyền" />
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
                <RHFAutocomplete
                  name="genres"
                  label="Genres"
                  options={GENRE_OPTION.map((option: string) => option)}
                  value={getValues('genres') || []}
                  multiple
                  freeSolo
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
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                    ))
                  }
                />
              </Stack>
            </Card>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Controller
                  name="author"
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
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            size="small"
                            label={option}
                          />
                        ))
                      }
                      renderInput={(params) => <TextField label="Authors" {...params} />}
                    />
                  )}
                />
                <Controller
                  name="artist"
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
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            size="small"
                            label={option}
                          />
                        ))
                      }
                      renderInput={(params) => <TextField label="Artists" {...params} />}
                    />
                  )}
                />
                <Controller
                  name="originalLanguage"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      freeSolo
                      options={['jp', 'vi', 'en'].map((option) => option)}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      renderInput={(params) => <TextField label="Original Language" {...params} />}
                    />
                  )}
                />
              </Stack>
            </Card>
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {isEdit ? 'Update' : 'Create'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

const LabelStyled = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
