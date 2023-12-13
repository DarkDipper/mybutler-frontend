import { useState, useRef } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled, alpha } from '@mui/material/styles';
import { Stack, Drawer, Avatar, Tooltip, Divider, TextField, Box, IconButton } from '@mui/material';
// @types
import { IKanbanCard } from '@yourapp/src/@types/kanban';
// components
import Scrollbar from '@yourapp/src/components/scrollbar';
//
import NoteInputName from '../NoteInputName';
import KanbanDetailsToolbar from './NoteDetailsToolbar';
import { RHFEditor } from '@yourapp/src/components/hook-form';
import { useSnackbar } from '@yourapp/src/components/snackbar';
import FormProvider from '@yourapp/src/components/hook-form/FormProvider';

// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: 120,
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------
export type FormValuesProps = {
  name: string;
  content: string;
};

type Props = {
  task?: IKanbanCard;
  openDetails: boolean;
  onCloseDetails: VoidFunction;
  onDeleteTask?: VoidFunction;
  columnName: string;
};

export default function KanbanDetails({
  task,
  openDetails,
  onCloseDetails,
  onDeleteTask,
  columnName,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const NewBlogSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = {
    name: task?.name || '',
    content: task?.description || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBlogSchema),
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
      enqueueSnackbar('Create note success!');
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    onCloseDetails();
    task && reset();
  };
  if (task) console.log(`Task:${task.name}`);
  return (
    <Drawer
      open={openDetails}
      onClose={handleClose}
      anchor="right"
      PaperProps={{
        sx: {
          width: {
            xs: 1,
            sm: 480,
          },
        },
      }}
    >
      <KanbanDetailsToolbar
        columnName={columnName}
        taskName={task?.name}
        onDelete={onDeleteTask}
        onCloseDetails={onCloseDetails}
      />

      <Divider />

      <Scrollbar>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ px: 2.5, pt: 3, pb: 5 }}>
            {/* Note name */}
            <NoteInputName name="name" placeholder="Note name" />

            {/* Content */}
            <Stack direction="column" spacing={3}>
              <StyledLabel> Content </StyledLabel>
              <RHFEditor name="content" />
            </Stack>

            <LoadingButton type="submit" size="large" variant="contained" loading={isSubmitting}>
              Save
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Scrollbar>
    </Drawer>
  );
}
