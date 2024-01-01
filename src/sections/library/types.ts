import { DialogProps } from '@mui/material';
export interface DeleteBookDialogProps extends Omit<DialogProps, 'title'> {
  title: string;
  content?: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
  idBook: string;
}
