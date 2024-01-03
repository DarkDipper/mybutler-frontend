import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import Iconify from '@yourapp/src/components/iconify';
import { IconButtonAnimate } from '@yourapp/src/components/animate';
// @mui
import {
  Chip,
  Stack,
  Drawer,
  Tooltip,
  Container,
  Grid,
  MenuItem,
  Autocomplete,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useResponsive from '@yourapp/src/hooks/useResponsive';
// components
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
  RHFTextField,
  RHFSwitch,
} from '@yourapp/src/components/hook-form';
// utils
import { TYPE_OPTION, STATUS_OPTION, GENRE_OPTION, TAG_OPTION } from '@yourapp/src/constant';
import ValuesPreview from '../_examples/extra/form/ValuesPreview';
import { status } from 'nprogress';

const SORT_BY_OPTIONS = [
  { value: 'score:desc', label: 'Relevance' },
  { value: 'createdAt:desc', label: 'Newest' },
  { value: 'createdAt:asc', label: 'Oldest' },
];

type FilterDrawerProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  setNewParams: (newParams: any) => void;
};

export default function FilterDrawer({ isOpen, onClose, setNewParams }: FilterDrawerProps) {
  const isDesktop = useResponsive('up', 'sm');
  const { push, query } = useRouter();
  const currentFilter: any = query;
  const { enqueueSnackbar } = useSnackbar();

  if (currentFilter.genres && typeof currentFilter.genres === 'string') {
    currentFilter.genres = currentFilter.genres.split(',');
  }
  if (currentFilter.tags && typeof currentFilter.tags === 'string') {
    currentFilter.tags = currentFilter.tags.split(',');
  }
  if (currentFilter.excludedGenres && typeof currentFilter.excludedGenres === 'string') {
    currentFilter.excludedGenres = currentFilter.excludedGenres.split(',');
  }
  if (currentFilter.excludedTags && typeof currentFilter.excludedTags === 'string') {
    currentFilter.excludedTags = currentFilter.excludedTags.split(',');
  }
  // console.log(currentFilter);
  const defaultValues = useMemo(
    () => ({
      query: (currentFilter?.query as string) || '',
      genres: (currentFilter?.genres as string[]) || [],
      tags: (currentFilter?.tags as string[]) || [],
      excludedGenres: (currentFilter?.excludedGenres as string[]) || [],
      excludedTags: (currentFilter?.excludedTags as string[]) || [],
      isLisensed: (currentFilter?.isLisensed as boolean) || false,
      hasViLink: (currentFilter?.hasViLink as boolean) || false,
      author: (currentFilter?.author as string[]) || [],
      artist: (currentFilter?.artist as string[]) || [],
      status: (currentFilter?.status as string) || 'all',
      type: (currentFilter?.type as string) || 'all',
      sortBy: (currentFilter?.sortBy as string) || 'score:desc',
    }),
    [query]
  );
  const FilterSchema = Yup.object().shape({
    query: Yup.string(),
    genres: Yup.array().of(Yup.string()),
    tags: Yup.array().of(Yup.string()),
    excludedGenres: Yup.array().of(Yup.string()),
    excludedTags: Yup.array().of(Yup.string()),
    isLisensed: Yup.boolean(),
    hasViLink: Yup.boolean(),
    status: Yup.string(),
    type: Yup.string(),
    sortBy: Yup.string(),
  });
  const methods = useForm({
    resolver: yupResolver(FilterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
    getValues,
  } = methods;
  useEffect(() => {
    reset(defaultValues);
  }, [query]);
  const onSubmit = async (filter: any) => {
    console.log(filter);
    let newFilter: any = {};
    if (filter.genres.length > 0) newFilter.genres = filter.genres.join(',');
    if (filter.tags.length > 0) newFilter.tags = filter.tags.join(',');
    if (filter.excludedGenres.length > 0)
      newFilter.excludedGenres = filter.excludedGenres.join(',');
    if (filter.excludedTags.length > 0) newFilter.excludedTags = filter.excludedTags.join(',');
    setNewParams(filter);
    enqueueSnackbar('Filter applied', {
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'left' },
    });
    // onClose();
  };
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      PaperProps={{ sx: { width: { xs: 1, sm: 480 }, py: 5 } }}
    >
      <Container>
        {!isDesktop && (
          <>
            <Tooltip title="Back">
              <IconButtonAnimate onClick={onClose} sx={{ mr: 1 }}>
                <Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          </>
        )}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField name="query" label="Filter" />
            <div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <RHFSelect name="type" label="Type">
                    {[...TYPE_OPTION, 'all'].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={6}>
                  <RHFSelect name="status" label="Status">
                    {[...STATUS_OPTION, 'all'].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
              </Grid>
            </div>
            <RHFAutocomplete
              name="genres"
              label="Genres"
              options={GENRE_OPTION}
              value={(getValues('genres') as string[]) || []}
              multiple
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    color="info"
                    key={option}
                    size="small"
                    label={option}
                  />
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
                  <Chip
                    {...getTagProps({ index })}
                    color="info"
                    key={option}
                    size="small"
                    label={option}
                  />
                ))
              }
            />
            <RHFAutocomplete
              name="excludedGenres"
              label="Exclude Genres"
              options={GENRE_OPTION}
              value={(getValues('excludedGenres') as string[]) || []}
              multiple
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    color="error"
                    key={option}
                    size="small"
                    label={option}
                  />
                ))
              }
            />
            <RHFAutocomplete
              name="excludedTags"
              label="Exclude Tags"
              options={TAG_OPTION}
              value={(getValues('excludedTags') as string[]) || []}
              multiple
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    color="error"
                    key={option}
                    size="small"
                    label={option}
                  />
                ))
              }
            />
            <RHFSelect name="sortBy" label="Sort By">
              {SORT_BY_OPTIONS.map(({ label, value }) => (
                <MenuItem key={label} value={value}>
                  {label}
                </MenuItem>
              ))}
            </RHFSelect>
            <div>
              <Grid container spacing={0.5}>
                <Grid item xs={6}>
                  <RHFSwitch name="isLisensed" label="Is Lisensed" />
                </Grid>
                <Grid item xs={6}>
                  <RHFSwitch name="hasViLink" label="Viet Only" />
                </Grid>
                <Grid item xs={6}>
                  <RHFSwitch name="hasViLink" label="English Only" />
                </Grid>
              </Grid>
            </div>
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {'Filter & Sort'}
            </LoadingButton>
          </Stack>
          {/* <ValuesPreview /> */}
        </FormProvider>
      </Container>
    </Drawer>
  );
}
