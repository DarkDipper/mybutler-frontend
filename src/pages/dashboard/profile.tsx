import { capitalCase } from 'change-case';
import { useState } from 'react';
import Head from 'next/head';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// hooks
import useSettings from '@yourapp/src/hooks/useSettings';
// components
import Iconify from '@yourapp/src/components/iconify';
// layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// sections
import Profile from '@yourapp/src/sections/@dashboard/profile/Profile';
import ProfileCover from '@yourapp/src/sections/@dashboard/profile/ProfileCover';
import ProfileFetish from '@yourapp/src/sections/@dashboard/profile/ProfileFetish';
import ProfileUpdate from '@yourapp/src/sections/@dashboard/profile/ProfileUpdate';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

UserProfile.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = (newValue: string) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    // {
    //   value: 'fetish',
    //   icon: <Iconify icon={'bi:bookmark-heart-fill'} width={20} height={20} />,
    //   component: <ProfileFetish />,
    // },
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile />,
    },
    {
      value: 'update',
      icon: <Iconify icon={'fluent:clipboard-bullet-list-ltr-16-filled'} width={20} height={20} />,
      component: <ProfileUpdate />,
    },
  ];

  return (
    <>
      <Head>
        <title> About author | My Butler</title>
      </Head>
      <Box>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Card
            sx={{
              mb: 3,
              height: 280,
              position: 'relative',
            }}
          >
            <ProfileCover />

            <TabsWrapperStyle>
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(e, value) => handleChangeTab(value)}
              >
                {PROFILE_TABS.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    value={tab.value}
                    icon={tab.icon}
                    label={capitalCase(tab.value)}
                  />
                ))}
              </Tabs>
            </TabsWrapperStyle>
          </Card>

          {PROFILE_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Container>
      </Box>
    </>
  );
}
