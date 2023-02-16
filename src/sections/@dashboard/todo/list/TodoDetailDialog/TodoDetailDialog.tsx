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
} from '@mui/material';
// utils
import { fDate } from '@yourapp/src/utils/formatTime';
// components
import Label from '@yourapp/src/components/label';
//
import { TodoDetailDialogProps } from './types';

// ----------------------------------------------------------------------

export default function TodoDetailDialog({
  title,
  content,
  action,
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
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="h6">
              {task.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant="soft"
                color={
                  (task.status === 'completed' && 'success') ||
                  (task.status === 'progressing' && 'warning') ||
                  (task.status === 'overdue' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {task.status}
              </Label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Description
            </Typography>

            <Typography variant="body2" textAlign={'justify'}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit iste cupiditate
              voluptas enim neque ea, dolorum consequuntur ut nisi unde facere quidem dolore ab
              nihil distinctio alias non commodi harum. Officia quia optio, saepe libero, accusamus
              eius soluta cum labore consectetur suscipit aspernatur voluptatibus? Iure,
              perspiciatis. Obcaecati pariatur ab delectus. Repudiandae nihil esse consectetur,
              tempora officiis saepe enim rerum deleniti. Nobis vitae illo sunt omnis, non placeat
              fugiat cupiditate. Quibusdam, voluptates accusantium. Possimus, perferendis
              distinctio. Quis voluptas autem dicta cum illum beatae assumenda, debitis minima,
              voluptate provident numquam possimus consequatur?
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Date create
            </Typography>

            <Typography variant="body2">{fDate(task.createDate)}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Due date
            </Typography>

            <Typography variant="body2">{fDate(task.dueDate)}</Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Mark as {task.status === 'completed' ? 'progressing' : 'completed'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
