import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';
// components
import { useSnackbar } from '@yourapp/src/components/snackbar';
import FormProvider, { RHFTextField } from '@yourapp/src/components/hook-form';
import TaskNewEditStatusDate from './NewTaskEditStatusDate';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
type Props = {
  isEdit?: boolean;
  currentTask?: FormValuesProps;
};

export type FormValuesProps = {
  name: string;
  description: string;
  status: string;
  createDate: Date | null;
  dueDate: Date | null;
};

export default function NewTaskForm({ isEdit, currentTask }: Props) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewTaskSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    createDate: Yup.date().required('Create date is required'),
    dueDate: Yup.date().required('Due date is required'),
  });

  const defaultValues = {
    name: currentTask?.name || '',
    description: currentTask?.description || '',
    createDate: currentTask?.createDate || new Date(),
    dueDate: currentTask?.dueDate || new Date(),
    status: currentTask?.status || 'progressing',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewTaskSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentTask) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTask]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Create task success!');
      push(PATH_DASHBOARD.dailylife.todo.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <RHFTextField name="name" label="Task Name" />

          <TaskNewEditStatusDate />

          <RHFTextField name="description" label="Description" multiline rows={3} />
        </Stack>
      </Card>
      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton type="submit" size="large" variant="contained" loading={isSubmitting}>
          {isEdit ? 'Utpdate' : 'Create'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
