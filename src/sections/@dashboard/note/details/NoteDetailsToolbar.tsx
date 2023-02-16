import { useState } from 'react';
// @mui
import { Stack, Button, Tooltip, IconButton, Typography } from '@mui/material';
// hooks
import useResponsive from '@yourapp/src/hooks/useResponsive';
// components
import Iconify from '@yourapp/src/components/iconify';
import ConfirmDialog from '@yourapp/src/components/confirm-dialog';

// ----------------------------------------------------------------------

type Props = {
  columnName: string;
  taskName?: string;
  onDelete?: VoidFunction;
  onCloseDetails: VoidFunction;
};

export default function KanbanDetailsToolbar({
  taskName,
  onDelete,
  onCloseDetails,
  columnName,
}: Props) {
  const isDesktop = useResponsive('up', 'sm');

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Stack p={2.5} direction="row" alignItems="center">
        {!isDesktop && (
          <Tooltip title="Back">
            <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>
          </Tooltip>
        )}

        <Typography variant="h4">{columnName}</Typography>

        <Stack direction="row" spacing={1} justifyContent="flex-end" flexGrow={1}>
          {onDelete && (
            <Tooltip title="Delete task">
              <IconButton onClick={handleOpenConfirm} size="small">
                <Iconify icon="eva:trash-2-outline" />
              </IconButton>
            </Tooltip>
          )}

          <IconButton size="small">
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {taskName} </strong>?
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
}
