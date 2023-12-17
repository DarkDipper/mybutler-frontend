import { forwardRef, useState } from 'react';
// form
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from '@yourapp/src/components/hook-form';
import TaskNewEditStatusDate from './NewTaskEditStatusDate';
// @mui
import {
  Slide,
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar } from '@yourapp/src/components/snackbar';

// ----------------------------------------------------------------------

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

// ----------------------------------------------------------------------

export default function NewTaskDialogs({
  title = 'Transitions Dialogs',
  startIcon = null,
  colorBtn = 'success',
  variant = 'outlined',
}: Props) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button startIcon={startIcon} variant={variant} color={colorBtn} onClick={handleClickOpen}>
        {title}
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth={true}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`New Task`}</DialogTitle>

        <DialogContent>
          <NewTaskForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
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

function NewTaskForm({ handleClose }: { handleClose?: () => void }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewTaskSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    createDate: Yup.date().required('Create date is required'),
    dueDate: Yup.date().required('Due date is required'),
  });

  const defaultValues = {
    name: '',
    description: '',
    createDate: new Date(),
    dueDate: null,
    status: 'progressing',
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

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Create task success!');
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
          {'Create'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  // children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  colorBtn?: 'inherit' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
  startIcon?: React.ReactNode;
};
