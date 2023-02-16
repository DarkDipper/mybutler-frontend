import { useState, useEffect, useRef } from 'react';
// form
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Control, FieldValues, Controller } from 'react-hook-form';
// @mui
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Link,
  Stack,
  Input,
  Button,
  Avatar,
  Dialog,
  Slider,
  Tooltip,
  TextField,
  CardProps,
  Typography,
  CardHeader,
  InputProps,
  DialogTitle,
  DialogProps,
  CardContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
// utils
import { fCurrency } from '@yourapp/src/utils/formatNumber';
// components
import Carousel, { CarouselArrows } from '@yourapp/src/components/carousel';
import { useSnackbar } from '@yourapp/src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFSelect,
  RHFSlider,
} from '@yourapp/src/components/hook-form';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

const STEP = 10;

const MIN_AMOUNT = 0;

const MAX_AMOUNT = 10000;

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  }[];
}

export type FormValuesProps = {
  amount: number;
  createDate: Date;
};

export default function AddExpenseCard({ title, subheader, list, sx, ...other }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const NewExpenseSchema = Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
    createDate: Yup.date().required('Date is required'),
  });

  const defaultValues = {
    amount: 0,
    createDate: new Date(),
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewExpenseSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    control,
  } = methods;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('amount', Number(event.target.value));
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Add expense success!');
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          boxShadow: 0,
          bgcolor: 'background.neutral',
          ...sx,
        }}
        {...other}
      >
        <CardHeader title={title} subheader={subheader} />
        <CardContent>
          {/* <Stack spacing={3} direction={'row'} sx={{ pb: 3 }}>
            <RHFTextField name="description" label="Description" />

            <RHFSelect
              fullWidth
              name="category"
              label="Category"
              InputLabelProps={{ shrink: true }}
            >
              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack> */}
          <Stack spacing={3}>
            <Controller
              name="createDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  disabled
                  label="Date create"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                  )}
                />
              )}
            />

            {/* <RHFSlider name="amount" step={STEP} min={MIN_AMOUNT} max={MAX_AMOUNT} /> */}

            <InputAmount control={control} onChange={handleChangeInput} />

            <LoadingButton variant="contained" size="large" type="submit" loading={isSubmitting}>
              Add expense
            </LoadingButton>
          </Stack>
        </CardContent>
      </Card>
    </FormProvider>
  );
}

// ----------------------------------------------------------------------

type AmountProps = number | string | Array<number | string>;

interface InputAmountProps extends InputProps {
  control: Control<FormValuesProps, any>;
}

function InputAmount({ control, onChange, sx, ...other }: InputAmountProps) {
  return (
    <Controller
      name="amount"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack direction="row" justifyContent="center" spacing={1} sx={sx}>
          <Input
            {...field}
            // disableUnderline
            fullWidth
            size="small"
            value={typeof field.value === 'number' && field.value === 0 ? 0 : field.value}
            onChange={onChange}
            inputProps={{ step: STEP, min: MIN_AMOUNT + 10, max: MAX_AMOUNT, type: 'number' }}
            error={!!error}
            endAdornment={'.000VNĐ'}
            sx={{
              typography: 'h3',
              '& input': {
                p: 0,
              },
            }}
            {...other}
          />
        </Stack>
      )}
    />
  );
}

// ----------------------------------------------------------------------
