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
import { _invoices } from '@yourapp/src/_mock/arrays';
// components
import { useSettingsContext } from '@yourapp/src/components/settings';
import CustomBreadcrumbs from '@yourapp/src/components/custom-breadcrumbs';
// sections
import InvoiceNewEditForm from '@yourapp/src/sections/@dashboard/invoice/form';

// ----------------------------------------------------------------------

InvoiceEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function InvoiceEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <>
      <Head>
        <title> Invoice: Edit | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit invoice"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.list,
            },
            { name: `INV-${currentInvoice?.invoiceNumber}` },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </>
  );
}
