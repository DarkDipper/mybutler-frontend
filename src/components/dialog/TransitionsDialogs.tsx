import { forwardRef, useState } from 'react';
// @mui
import {
  Slide,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

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

export default function TransitionsDialogs({
  title = 'Transitions Dialogs',
  startIcon = null,
  colorBtn = 'success',
  variant = 'outlined',
}: Props) {
  const [open, setOpen] = useState(false);

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
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`Use Google's location service?`}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Disagree
          </Button>

          <Button variant="contained" onClick={handleClose}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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
