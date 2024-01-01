import { useState, useCallback, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import parse from 'html-react-parser';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
//hooks
import useSettings from '@yourapp/src/hooks/useSettings';
import useIsMountedRef from '@yourapp/src/hooks/useIsMountedRef';
import { useAuthContext } from '@yourapp/src/hooks/useAuth';
import { useSnackbar } from 'notistack';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import {
  Container,
  Grid,
  Typography,
  Card,
  Box,
  Skeleton,
  Stack,
  Divider,
  Rating,
  Button,
  CardHeader,
  CardContent,
  MenuList,
  Menu,
  Alert,
  Link,
} from '@mui/material';
// components
import Image from '@yourapp/src/components/image';
import Label, { LabelColor } from '@yourapp/src/components/label';
import CustomBreadcrumbs from '@yourapp/src/components/custom-breadcrumbs/CustomBreadcrumbs';
import CustomStyle from '@yourapp/src/components/book/CustomStyle';
import { CarouselDots, CarouselArrows } from '@yourapp/src/components/carousel';
import { Settings } from 'react-slick';
import ReadButtons from '@yourapp/src/sections/library/ReadButtons';
import BookTable from '@yourapp/src/sections/library/BookTable';
// layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// assets
import { MaintenanceIllustration } from '@yourapp/src/assets/illustrations';
// mocks
import { Book } from '@yourapp/src/@types/library';
import { mockBook } from '@yourapp/src/_mock/book';
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';

// ----------------------------------------------------------------------

DetailPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DetailPage() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useRouter().query;
  const { user, isAuthenticated } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const carouselRef = useRef<Slider | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [book, setBook] = useState<Book>();
  const [titleLists, setTitleLists] = useState([]);
  const [userLists, setUserLists] = useState([]);

  const settings: Settings = {
    speed: 800,
    dots: true,
    arrows: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    ...CarouselDots({
      zIndex: 9,
      bottom: 5,
      position: 'absolute',
    }),
  };

  const getBook = useCallback(async () => {
    try {
      // const { data } = await axios.get(`/v1/titles/${id}`);
      if (isMountedRef.current) {
        setBook(mockBook);
      }
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' });
      // navigate(PATH_DASHBOARD.library.root);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getBook();
  }, [getBook]);

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.slickPrev();
    }
  };
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slickNext();
    }
  };

  return (
    <>
      <Head>
        <title> Book Detail | My butler</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading={book?.title || <Skeleton width={200} variant="text" />}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Library', href: PATH_DASHBOARD.library.root },
            {
              name: book?.title || <Skeleton variant="text" />,
              href: PATH_DASHBOARD.library.view('123'),
            },
          ]}
        />
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={12} md={3}>
            <CardSlider>
              <Slider ref={carouselRef} {...settings}>
                {book?.coverArt !== undefined ? (
                  book.coverArt.map((cover, index) => (
                    <CarouselItem
                      key={index}
                      coverArt={cover as string}
                      isActive={index === currentIndex}
                    />
                  ))
                ) : (
                  <CarouselItem coverArt={undefined} isActive={true} />
                )}
              </Slider>
              <CarouselArrows
                onNext={handleNext}
                onPrevious={handlePrevious}
                spacing={0}
                sx={{
                  top: 16,
                  right: 16,
                  position: 'absolute',
                  '& .arrow': {
                    p: 0,
                    width: 32,
                    height: 32,
                    // opacity: 0.48,
                    color: 'common.white',
                    '&:hover': { color: 'common.white', opacity: 1 },
                  },
                }}
              />
            </CardSlider>
          </Grid>
          <Grid item xs={12} md={9}>
            <Stack direction="row" spacing={0.5}>
              <Label color="error" variant="filled">
                {book?.type?.toUpperCase()}
              </Label>
              <StatusLabel status={book?.status} />
            </Stack>
            <Typography variant="h3">
              {book?.title?.toUpperCase() || <Skeleton />}
              {book?.score && <Rating value={(book.score / 100) * 5} precision={0.5} readOnly />}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              {book?.titles?.[0]?.toUpperCase()}
            </Typography>
            {book &&
              book.author?.map((a) => (
                <Label sx={{ m: 0.5 }} variant="filled" key={`author-${a}`}>
                  {a}
                </Label>
              ))}
            {book &&
              book.artist?.map((a) => (
                <Label sx={{ m: 0.5 }} variant="filled" key={`artist-${a}`}>
                  {a}
                </Label>
              ))}
            {book?.description && (
              <CustomStyle>
                <Typography variant="body1">{parse(book.description)}</Typography>
              </CustomStyle>
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
              {book?.genres?.map((genre) => (
                <Label key={genre} color="primary" sx={{ m: 0.2 }}>
                  <Link
                    component={NextLink}
                    href={`${PATH_DASHBOARD.library.root}?genres=${genre}`}
                  >
                    {genre}
                  </Link>
                </Label>
              ))}
              {book?.tags?.map((tag) => (
                <Label key={tag} color="primary" variant="outlined" sx={{ m: 0.2 }}>
                  <Link component={NextLink} href={`${PATH_DASHBOARD.library.root}?tags=${tag}`}>
                    {tag}
                  </Link>
                </Label>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
          </Grid>
          {/* <Grid item xs={12}>
            <ReadButtons urls={book?.urls} />
          </Grid> */}
          <Grid item xs={12}>
            <BookTable urls={book?.urls} />
          </Grid>
          <Grid item xs={12}>
            <Alert severity="info">
              Data crawl bằng bot nên khả năng bị sai nhiều, phiền bạn đăng nhập và bình luận vào bộ
              có thông tin sai nhé, bổ sung thông tin chuẩn nữa thì càng tốt! Cảm ơn nhiềuuu ♥
            </Alert>
          </Grid>
        </Grid>
        {user?.role === 'admin' && (
          <Card sx={{ my: 2 }}>
            <CardContent>
              <Grid container xs={12}>
                <Grid item xs={10}>
                  <Typography variant="h5">Admin</Typography>
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="contained"
                    color="info"
                    component={NextLink}
                    href={PATH_DASHBOARD.library.edit('123')}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    component={NextLink}
                    href={PATH_DASHBOARD.library.edit('123')}
                  >
                    Xoá
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------
function CarouselItem({ coverArt, isActive }: { coverArt: string | undefined; isActive: boolean }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Image src={coverArt} ratio="4/6" />
    </Box>
  );
}

function StatusLabel({ status = 'ongoing' }) {
  let color: LabelColor = 'default';
  if (status === 'ongoing') color = 'info';
  else if (status === 'completed') color = 'success';
  else if (status === 'hiatus') color = 'warning';
  else color = 'error';
  return (
    <Label color={color} variant="filled">
      {status.toUpperCase()}
    </Label>
  );
}

const CardSlider = styled(Card)(({ theme }) => {
  return {
    [theme.breakpoints.down('md')]: {
      width: '70%',
    },
  };
});
