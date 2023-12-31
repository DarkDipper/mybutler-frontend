// next
import Head from 'next/head';
import NextLink from 'next/link';
// hooks
import { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useAuthContext } from '@yourapp/src/hooks/useAuth';
// @mui
import {
  Button,
  Typography,
  Stack,
  Grid,
  Pagination,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
} from '@mui/material';
// layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// assets
import { MaintenanceIllustration } from '@yourapp/src/assets/illustrations';
import { Box, Container } from '@mui/system';
// components
import CustomBreadcrumbs from '@yourapp/src/components/custom-breadcrumbs';
import BookCardSkeleton from '@yourapp/src/components/book/BookCardSkeleton';
import BookCard from '@yourapp/src/components/book/BookCard';
import BookDrawer from '@yourapp/src/sections/library/BookDrawer';
import Iconify from '@yourapp/src/components/iconify';
//constant
import { TYPE_OPTION } from '@yourapp/src/constant';
import { Book } from '@yourapp/src/@types/library';
//mock
import { mockBook } from '@yourapp/src/_mock/book';

// ----------------------------------------------------------------------

LibExplorePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LibExplorePage() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const [book, setBook] = useState<Book | undefined>();
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams({ page: 1, sortBy: 'score:desc' });
  const toggleButtonRef = useRef(null);

  const handleClose = () => {
    setBook(undefined);
  };

  useEffect(() => {
    setTimeout(() => {
      setBooks([mockBook, mockBook, mockBook, mockBook]);
    }, 3000);
  }, []);

  return (
    <>
      <Head>
        <title> Library | My butler</title>
      </Head>

      <Container maxWidth="xl">
        {/* {user?.role === 'admin' && <h1>Hello</h1>} */}
        <CustomBreadcrumbs
          heading="Library"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Library', href: '/dashboard/title' },
          ]}
        />
        <ToggleButtonGroup
          ref={toggleButtonRef}
          color="primary"
          // value={searchParams.get('type')}
          exclusive
          // onChange={handleTypeClick}
          fullWidth
          sx={{ mb: 3 }}
        >
          {TYPE_OPTION.map((_type) => (
            <ToggleButton value={_type} key={_type}>
              {_type.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Grid container spacing={3}>
          {books.length === 0
            ? Array.from({ length: 24 }).map((_, idx) => (
                <Grid item xs={4} md={2} key={idx}>
                  <BookCardSkeleton />
                </Grid>
              ))
            : books.map((book, idx) => (
                <Grid item xs={4} md={2} key={idx}>
                  <div style={{ position: 'relative' }}>
                    <BookCard book={book} />
                    {user?.role === 'admin' && (
                      <IconButton
                        color="primary"
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        aria-haspopup="true"
                        onClick={() => setBook(book)}
                      >
                        <Iconify icon={'jam:more-vertical-f'} />
                      </IconButton>
                    )}
                  </div>
                </Grid>
              ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Pagination
            sx={{ my: 2 }}
            count={total}
            page={1}
            // onChange={handlePageChange}
          />
        </Box>
        <Alert severity="success" sx={{ mb: 1 }}>
          Cập nhật bộ lọc theo tựa đề đã chính xác hơn, thêm một số thuộc tính
        </Alert>
        <Alert severity="info">
          Thông tin từng bộ còn thiếu khá nhiều, bạn nào có nhã ý muốn đóng góp thì liên lạc với
          mình nhé!
        </Alert>
        {user?.role === 'admin' && (
          <BookDrawer book={book} onClose={handleClose} setBook={setBook} />
        )}
      </Container>
    </>
  );
}
