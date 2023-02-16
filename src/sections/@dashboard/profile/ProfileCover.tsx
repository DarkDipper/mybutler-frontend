import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// utils
import { bgBlur } from '@yourapp/src/utils/cssStyles';
// components
import { CustomAvatar } from '@yourapp/src/components/custom-avatar';
import Image from '@yourapp/src/components/image';
import Cat from '@yourapp/src/assets/images/Cat look.jpg';
import WWII from '@yourapp/src/assets/images/The great war.jpg';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    ...bgBlur({ blur: 2, color: theme.palette.grey[800] }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  myProfile: PropTypes.object,
};

export default function ProfileCover() {
  return (
    <RootStyle>
      <InfoStyle>
        <CustomAvatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
          src={Cat.src}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">Zennomi</Typography>
          <Typography sx={{ opacity: 0.72 }}>loser, vozer, shitposter, huster, ITer</Typography>
        </Box>
      </InfoStyle>
      <Image
        alt="profile cover"
        src={WWII.src}
        sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}
