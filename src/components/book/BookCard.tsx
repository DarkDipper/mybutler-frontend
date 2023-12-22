import Link from 'next/link';
import parse, { Text } from 'html-react-parser';
// @mui
import { styled, alpha } from '@mui/material/styles';

import {
  Typography,
  Card,
  CardActionArea,
  Chip,
  Rating,
  Box,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';

// components
import Image from '@yourapp/src/components/image';
import CustomStyle from './CustomStyle';
import Label from '../label';
import TextMaxLine from '../text-max-line';
// paths
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';
// utils
import resizeImage from '@yourapp/src/utils/resizeImage';
//types
import { Book } from '@yourapp/src/@types/library';

export default function BookCard({ book }: { book: Book }) {
  return (
    <StyledTooltip title={<BookTooltip book={book} />} placement="right-start">
      <Card>
        <CardActionArea LinkComponent={Link} href="#">
          <Image src={resizeImage(book.coverArt, 300)} ratio="4/6" />
          <OverlayStyle />
          <CaptionStyle>
            <TextMaxLine line={2}>
              <Typography width="100%" variant="subtitle1" component="span">
                {book.title}
              </Typography>
            </TextMaxLine>
          </CaptionStyle>
          <Chip
            label={book.type}
            color="primary"
            size="small"
            sx={(theme) => ({
              position: 'absolute',
              top: theme.spacing(0.5),
              left: theme.spacing(0.5),
              opacity: 0.9,
              [theme.breakpoints.down('md')]: {
                fontSize: 12,
                borderRadius: 1,
              },
            })}
          />
        </CardActionArea>
      </Card>
    </StyledTooltip>
  );
}

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundImage: `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(
    theme.palette.grey[900],
    0
  )} 50%)`,
}));

const CaptionStyle = styled(CardActionArea)(({ theme }) => ({
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    '& .css-wbyhs2-MuiTypography-root': {
      fontSize: 12,
      lineHeight: 1,
    },
    '& .css-1c5ddyz-MuiTypography-root': {
      fontSize: 12,
      lineHeight: 1,
    },
    '& .css-mht6sy-MuiTypography-root, ': {
      lineHeight: 1,
    },
  },
}));

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
  },
}));

const BookTooltip = ({ book }: { book: Book }) => (
  <>
    <Rating readOnly max={5} value={(book.score / 100) * 5} />
    <Typography variant="body2" sx={{ mb: 2 }}>
      <TextMaxLine line={5}>
        <CustomStyle>{parse(book.description || '')}</CustomStyle>
      </TextMaxLine>
    </Typography>
    <TextMaxLine line={3}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {book?.genres.map((genre: string) => (
          <Label key={genre} color="primary" sx={{ m: 0.2 }}>
            {genre}
          </Label>
        ))}
        {book?.tags.map((tag: string) => (
          <Label key={tag} color="primary" variant="outlined" sx={{ m: 0.2 }}>
            {tag}
          </Label>
        ))}
      </Box>
    </TextMaxLine>
  </>
);
