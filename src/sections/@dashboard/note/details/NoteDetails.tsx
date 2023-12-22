import { useState, useRef, useCallback } from 'react';
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
import { NoteDetailsAttachments } from '..';

// ----------------------------------------------------------------------

const StyledLabel = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  width: 120,
  flexShrink: 0,
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------
export type FormValuesProps = {
  section: string;
  name: string;
  content: string;
  listFile: File[];
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
  const [listFile, setListFile] = useState<File[]>([]);

  const NewNoteSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    listFile: Yup.array().test('fileType', 'only accept image', (value) => {
      if (!value) return true;
      return value.every((file: File) => {
        const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        return value.every((file) => supportedFormats.includes(file.type));
      });
    }),
  });

  const defaultValues = {
    name: task?.name || '',
    content: task?.description || '',
    listFile: [],
  };
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewNoteSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      data.section = columnName;
      // data.listFile = listFile;
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
            <Stack direction="column" spacing={3}>
              <StyledLabel> Attachment </StyledLabel>
              <NoteDetailsAttachments
                listFile={listFile}
                setListFile={setListFile}
                updateFileForm={setValue}
              />
            </Stack>
          </Stack>
        </FormProvider>
      </Scrollbar>
      <Divider />
      <Stack spacing={3} sx={{ px: 2.5, py: 3 }}>
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          loading={isSubmitting}
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          Save
        </LoadingButton>
      </Stack>
    </Drawer>
  );
}
