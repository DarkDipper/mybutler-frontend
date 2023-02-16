import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '@yourapp/src/utils/formatNumber';
// components
import Label from '@yourapp/src/components/label';
import Scrollbar from '@yourapp/src/components/scrollbar';
import { TableHeadCustom, TablePaginationCustom, useTable } from '@yourapp/src/components/table';

// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  name: string | null;
  avatar: string | null;
  type: string;
  message: string;
  category: string;
  date: number;
  status: string;
  amount: number;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

export default function BankingRecentTransitions({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}: Props) {
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <BankingRecentTransitionsRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      <TablePaginationCustom
        count={tableData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type BankingRecentTransitionsRowProps = {
  row: RowProps;
};

function BankingRecentTransitionsRow({ row }: BankingRecentTransitionsRowProps) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <>
      <TableRow>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2"> {row.category}</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{format(new Date(row.date), 'dd MMM yyyy')}</Typography>
        </TableCell>

        <TableCell>{fCurrency(row.amount)}</TableCell>

        <TableCell>
          <Label
            variant={isLight ? 'soft' : 'filled'}
            color={
              (row.status === 'completed' && 'success') ||
              (row.status === 'in_progress' && 'warning') ||
              'default'
            }
          >
            {sentenceCase(row.status)}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}
