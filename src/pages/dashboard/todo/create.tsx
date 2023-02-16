// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';
// layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// components
import { useSettingsContext } from '@yourapp/src/components/settings';
import CustomBreadcrumbs from '@yourapp/src/components/custom-breadcrumbs';
// sections
import { NewTaskForm } from '@yourapp/src/sections/@dashboard/todo/form';

// ----------------------------------------------------------------------

CreateNewTaskPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function CreateNewTaskPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Todo: New Task | My Butler</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new post"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Todo',
              href: PATH_DASHBOARD.dailylife.todo.root,
            },
            {
              name: 'Create',
            },
          ]}
        />
        <NewTaskForm />
      </Container>
    </>
  );
}
