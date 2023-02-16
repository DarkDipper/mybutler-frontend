// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@yourapp/src/routes/paths';
// layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// _mock_
import { _invoices, _todo } from '@yourapp/src/_mock/arrays';
// components
import { useSettingsContext } from '@yourapp/src/components/settings';
import CustomBreadcrumbs from '@yourapp/src/components/custom-breadcrumbs';
// sections
import { NewTaskForm } from '@yourapp/src/sections/@dashboard/todo/form';

// ----------------------------------------------------------------------

TodoEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function TodoEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();

  const currentTask = _todo.find((invoice) => invoice.id === id);

  return (
    <>
      <Head>
        <title> Todo: Edit | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Task"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Todos',
              href: PATH_DASHBOARD.dailylife.todo.root,
            },
            { name: `${currentTask?.name}` },
          ]}
        />

        <NewTaskForm isEdit currentTask={currentTask} />
      </Container>
    </>
  );
}
