// @mui
import { DialogProps } from '@mui/material';
import { ITodo } from '@yourapp/src/@types/todo';

// ----------------------------------------------------------------------

export interface TodoDetailDialogProps extends Omit<DialogProps, 'title'> {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
  task: ITodo;
}
