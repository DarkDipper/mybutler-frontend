// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// auth
import { useAuthContext } from '@yourapp/src/auth/useAuthContext';
// layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '@yourapp/src/_mock/arrays';
// components
import { useSettingsContext } from '@yourapp/src/components/settings';
import LinkWidget from '@yourapp/src/components/LinkWidget';
// sections
import { AppWelcome, AppFeatured } from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Home Page | My Butler</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title={`Welcome back! \n ${user?.displayName || 'Master'}`}
              description="Welcome to My Butler, a comprehensive life management website designed to simplify and streamline your daily routine. With a range of features including a to-do list, budget management, note-taking, and more, My Butler is the perfect tool to help you get organized and stay on top of your life."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={[<Button variant="contained">Go Now</Button>]}
            />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid> */}

          <Grid item xs={12} md={4}>
            <LinkWidget
              title="Github"
              link="https://github.com/DarkDipper"
              description="of Dipper"
              icon="ant-design:github-filled"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <LinkWidget
              title="Google"
              link="https://www.google.com/"
              description="Shortcut to google"
              icon="ph:google-chrome-logo-light"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <LinkWidget
              title="Leetcode"
              link="https://leetcode.com/"
              description="Practice makes perfect"
              icon="simple-icons:leetcode"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
