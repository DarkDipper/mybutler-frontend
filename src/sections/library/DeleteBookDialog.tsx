import { useState, useCallback, useEffect, useRef, use } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
// @mui
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
} from '@mui/material';
// hooks
import useSettings from '@yourapp/src/hooks/useSettings';
import useIsMountedRef from '@yourapp/src/hooks/useIsMountedRef';
// utils
import axios from '@yourapp/src/utils/axios';
// sections
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';
import { DeleteBookDialogProps } from './types';
import { Stack } from '@mui/system';
import { clear } from 'console';
// ---------------------------------------------------------------------

export default function DeleteBookDialog({
  title,
  content,
  open,
  onClose,
  idBook,
  ...other
}: DeleteBookDialogProps) {
  const [progress, setProgress] = useState(0);
  const { push } = useRouter();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [pressTimer, setPressTimer] = useState<any>(null);
  const timer = useRef(null);

  const handleMouseDown = () => {
    const increment = (50 / 500) * 100;
    setProgress((oldProgress) => {
      console.log('oldProgress', oldProgress);
      return oldProgress + increment;
    });
  };

  const handleReleaseMouse = () => {
    clearInterval(pressTimer);
    setProgress(0);
  };

  const handleClick = useCallback(async () => {
    try {
      // const { data } = await axios.delete(`/v1/titles/${idBook}`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('DATA', idBook);
      enqueueSnackbar('Delete success', { variant: 'success' });
      onClose();
      // push(PATH_DASHBOARD.library.root);
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
    }
  }, [isMountedRef, idBook]);

  useEffect(() => {
    if (progress >= 100) {
      clearInterval(pressTimer);
      handleClick();
    }
  }, [progress]);

  useEffect(() => {
    return () => {
      clearInterval(pressTimer);
    };
  }, []);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }} variant="overline">
        {title}
      </DialogTitle>
      <DialogContent sx={{ typography: 'body2' }}>
        <Typography variant="body1">Are you sure you want to delete {title} ?</Typography>
        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ my: 3 }}>
          <Button
            variant="contained"
            color="error"
            onMouseDown={() => {
              setPressTimer(setInterval(handleMouseDown, 500));
            }}
            onMouseUp={handleReleaseMouse}
            onTouchEnd={handleReleaseMouse}
          >
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </DialogContent>
      <LinearProgress variant="determinate" value={progress} />
    </Dialog>
  );
}
