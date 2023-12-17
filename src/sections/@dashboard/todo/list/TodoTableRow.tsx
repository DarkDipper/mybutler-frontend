import { useState } from 'react';
// @mui
import {
  Link,
  Stack,
  Button,
  Divider,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
} from '@mui/material';
// utils
import { fDate } from '@yourapp/src/utils/formatTime';
// @types
import { ITodo } from '@yourapp/src/@types/todo';
// components
import Label from '@yourapp/src/components/label';
import Iconify from '@yourapp/src/components/iconify';
import MenuPopover from '@yourapp/src/components/menu-popover';
import ConfirmDialog from '@yourapp/src/components/confirm-dialog';
import { TodoDetailDialog } from './TodoDetailDialog';

// ----------------------------------------------------------------------

type Props = {
  row: ITodo;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function TodoTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  const { name, createDate, dueDate, status } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenDetail = () => {
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <div>
              <Link
                variant="subtitle2"
                noWrap
                onClick={onViewRow}
                sx={{ color: 'text.primary', cursor: 'pointer' }}
              >
                {name}
              </Link>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{fDate(createDate)}</TableCell>

        <TableCell align="left">{fDate(dueDate)}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (status === 'completed' && 'success') ||
              (status === 'progressing' && 'warning') ||
              (status === 'overdue' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            // onViewRow();
            handleOpenDetail();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View/Edit
        </MenuItem>

        {/* <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <TodoDetailDialog
        task={row}
        open={openDetail}
        onClose={handleCloseDetail}
        title="Detail"
        content={row.description}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
