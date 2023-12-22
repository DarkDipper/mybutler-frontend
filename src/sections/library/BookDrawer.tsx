//@mui
import { Alert, Box, Stack, Drawer, Tooltip, Divider, Typography, Container } from '@mui/material';
// components
import Iconify from '@yourapp/src/components/iconify';
import { IconButtonAnimate } from '@yourapp/src/components/animate';
import BookUpdateForm from './BookUpdateForm';
//hooks
import useResponsive from '@yourapp/src/hooks/useResponsive';
//types
import { Book } from '@yourapp/src/@types/library';

// Props
type BookDrawerProps = {
  book?: Book;
  onClose: VoidFunction;
  setBook: React.Dispatch<React.SetStateAction<Book | undefined>>;
};

export default function BookDrawer({ book, onClose, setBook }: BookDrawerProps) {
  const isDesktop = useResponsive('up', 'sm');
  return (
    <Drawer
      open={Boolean(book)}
      onClose={onClose}
      anchor="right"
      PaperProps={{ sx: { width: { xs: 1, sm: 480 }, py: 5 } }}
    >
      <Container>
        {!isDesktop && (
          <>
            <Tooltip title="Back">
              <IconButtonAnimate onClick={onClose} sx={{ mr: 1 }}>
                <Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          </>
        )}
        <Alert color="error">
          Thông tin ở đây có thể chưa được cập nhật sau lần cập nhật trước, reload lại nếu cần
        </Alert>
        <BookUpdateForm book={book} onClose={onClose} setBook={setBook} />
      </Container>
    </Drawer>
  );
}
