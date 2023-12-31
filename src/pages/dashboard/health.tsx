// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Button, Typography, Stack } from '@mui/material';
// layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// assets
import { MaintenanceIllustration } from '@yourapp/src/assets/illustrations';

// ----------------------------------------------------------------------

HealthPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function HealthPage() {
  return (
    <>
      <Head>
        <title> Health Management | My butler</title>
      </Head>

      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          The feature is currently under maintenance
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          We are currently working hard on this page!
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 440 }} />
      </Stack>
    </>
  );
}
