// @mui
import { Container } from '@mui/material';
import { Book } from '@yourapp/src/@types/library';
//layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// hooks
import useSettings from '@yourapp/src/hooks/useSettings';
// components
import Head from 'next/head';
// sections
import BookNewForm from '@yourapp/src/sections/library/BookNewForm';
// utils
import axios from '@yourapp/src/utils/axios';
// ---------------------------------------------------------------------

NewBookPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ---------------------------------------------------------------------

export default function NewBookPage() {
  const { themeStretch } = useSettings();

  const bookSubmit = async (book: Book) => {
    return await axios({
      method: 'post',
      url: `/v1/titles`,
      data: book,
    });
  };

  return (
    <>
      <Head>
        <title> New Book | My butler</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <BookNewForm isEdit={false} currentBook={null} bookSubmit={bookSubmit} />
      </Container>
    </>
  );
}
