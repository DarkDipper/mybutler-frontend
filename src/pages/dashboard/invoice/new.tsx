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
import InvoiceNewEditForm from '@yourapp/src/sections/@dashboard/invoice/form';

// ----------------------------------------------------------------------

InvoiceCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function InvoiceCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Invoices: Create a new invoice | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new invoice"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.list,
            },
            {
              name: 'New invoice',
            },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </>
  );
}
