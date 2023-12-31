//react
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
//layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// hooks
import useSettings from '@yourapp/src/hooks/useSettings';
import useIsMountedRef from '@yourapp/src/hooks/useIsMountedRef';
// components
import Head from 'next/head';
// sections
import BookNewForm from '@yourapp/src/sections/library/BookNewForm';
// utils
import axios from '@yourapp/src/utils/axios';
import { Book } from '@yourapp/src/@types/library';
// mock
import { mockBook } from '@yourapp/src/_mock/book';
// ----------------------------------------------------------------------

EditBookPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function EditBookPage() {
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const [book, setBook] = useState<Book>(mockBook);
  const { id } = useRouter().query;

  const getBook = useCallback(async () => {
    try {
      // const response = await axios.get(`/v1/titles/${id}`);
      if (isMountedRef.current) {
        setBook(mockBook);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  const bookSubmit = async (book: Book) => {
    return await axios({
      method: 'post',
      url: `/v1/titles`,
      data: book,
    });
  };

  useEffect(() => {
    getBook();
  }, [getBook]);

  return (
    <>
      <Head>
        <title> Edit Book | My butler</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <BookNewForm isEdit={true} currentBook={book} bookSubmit={bookSubmit} />
      </Container>
    </>
  );
}
