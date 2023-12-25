// @mui
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Box,
  Typography,
  Select,
  MenuItem,
  Card,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
// utils
import { fDate } from '@yourapp/src/utils/formatTime';
// components
import Label from '@yourapp/src/components/label';
//form
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TodoDetailDialogProps } from './types';
import FormProvider, { RHFTextField } from '@yourapp/src/components/hook-form';
import TaskNewEditStatusDate from '../../form/NewTaskEditStatusDate';
import { ITodo } from '@yourapp/src/@types/todo';

// ----------------------------------------------------------------------

export default function TodoDetailDialog({
  title,
  content,
  open,
  onClose,
  task,
  ...other
}: TodoDetailDialogProps) {
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }} variant="overline">
        {title}
      </DialogTitle>
      <DialogContent sx={{ typography: 'body2' }}>
        <ViewUpdateTaskForm handleClose={onClose} task={task} />
      </DialogContent>
    </Dialog>
  );
}
// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  description: string;
  status: string;
  createDate: Date | null;
  dueDate: Date | null;
};

type viewUpdateTaskFormProps = {
  handleClose: VoidFunction;
  task: ITodo;
};

function ViewUpdateTaskForm({ handleClose, task }: viewUpdateTaskFormProps) {
  const { enqueueSnackbar } = useSnackbar();

  const NewTaskSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    createDate: Yup.date().required('Create date is required'),
    dueDate: Yup.date().required('Due date is required'),
  });

  const defaultValues = {
    name: task.name,
    description: task.description,
    createDate: task.createDate,
    dueDate: task.dueDate,
    status: task.status,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewTaskSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update task success!');
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

          <RHFTextField name="description" label="Description" multiline rows={10} />
        </Stack>
      </Card>
      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ my: 3 }}>
        <Button onClick={handleClose} color="inherit" variant="outlined">
          {'Cancel'}
        </Button>
        <LoadingButton type="submit" size="large" variant="contained" loading={isSubmitting}>
          {'Update'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
