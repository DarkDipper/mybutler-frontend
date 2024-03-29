import { styled } from '@mui/material';

const RootStyle = styled('div')(({ theme }) => ({
  '& a': {
    color: theme.palette.primary.main,
  },
}));

export default function CustomStyle({ children }: { children: React.ReactNode }) {
  return <RootStyle>{children}</RootStyle>;
}
