import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, CardHeader, Stack, IconButton } from '@mui/material';
// components
import Iconify from '@yourapp/src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  profile?: any;
};

export default function ProfileSocialInfo({ profile }: Props) {
  const SOCIALS = [
    {
      name: 'Gitub',
      icon: <Iconify icon="akar-icons:github-fill" width={1} />,
      href: 'https://github.com/DarkDipper',
    },
    {
      name: 'Facebook',
      icon: <Iconify icon="bi:facebook" width={1} />,
      href: 'https://www.facebook.com/profile.php?id=100009169309130',
    },
  ];

  return (
    <Card>
      {/* <CardHeader title="Social" /> */}
      <Stack spacing={2} sx={{ p: 3 }} direction={'row'}>
        {SOCIALS.map((link) => (
          <Stack key={link.name} alignItems="center">
            <IconButton LinkComponent={'a'} href={link.href}>
              {link.icon}
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
