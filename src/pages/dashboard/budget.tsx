// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack } from '@mui/material';
// layouts
import DashboardLayout from '@yourapp/src/layouts/dashboard';
// _mock_
import {
  _bankingContacts,
  _bankingCreditCard,
  _bankingRecentTransitions,
} from '@yourapp/src/_mock/arrays';
// components
import { useSettingsContext } from '@yourapp/src/components/settings';
// sections
import {
  BudgetIncome,
  BudgetWidgetSummary,
  BudgetExpense,
  BudgetBalanceStatistics,
  BudgetRecentExpenses,
  BudgetExpensesCategories,
} from '@yourapp/src/sections/@dashboard/budget';

// ----------------------------------------------------------------------

GeneralBankingPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------
export default function GeneralBankingPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Budget Management | My butler</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              sx={{
                pb: 3,
              }}
            >
              <BudgetWidgetSummary
                title="Income"
                icon="eva:diagonal-arrow-left-down-fill"
                percent={2.6}
                total={18765}
                chart={{
                  series: [111, 136, 76, 108, 74, 54, 57, 84],
                }}
              />

              <BudgetWidgetSummary
                title="Expenses"
                color="warning"
                icon="eva:diagonal-arrow-right-up-fill"
                percent={-0.5}
                total={8938}
                chart={{
                  series: [111, 136, 76, 108, 74, 54, 57, 84],
                }}
              />
            </Stack>
            <Stack spacing={3}>
              <BudgetBalanceStatistics
                title="Balance Statistics"
                subheader="(+43% Income | +12% Expense) than last year"
                chart={{
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                  colors: [theme.palette.primary.main, theme.palette.warning.main],
                  series: [
                    // {
                    //   type: 'Week',
                    //   data: [
                    //     { name: 'Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                    //     { name: 'Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    //   ],
                    // },
                    {
                      type: 'Month',
                      data: [
                        { name: 'Income', data: [149, 91, 69, 62, 49, 51, 35, 41, 10] },
                        { name: 'Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                      ],
                    },
                    // {
                    //   type: 'Year',
                    //   data: [
                    //     { name: 'Income', data: [76, 42, 29, 41, 27, 138, 117, 86, 63] },
                    //     { name: 'Expenses', data: [80, 55, 34, 114, 80, 130, 15, 28, 55] },
                    //   ],
                    // },
                  ],
                }}
              />

              <BudgetExpensesCategories
                title="Expenses Categories"
                chart={{
                  series: [
                    { label: 'Saving', value: 20 },
                    { label: 'Housing', value: 23 },
                    { label: 'Food', value: 21 },
                    { label: 'Books', value: 17 },
                    { label: 'Gaming', value: 15 },
                    { label: 'Shoping', value: 0 },
                    { label: 'Insurance', value: 12 },
                    { label: 'General', value: 17 },
                    // { label: 'Category 9', value: 21 },
                  ],
                  colors: [
                    theme.palette.success.main,
                    theme.palette.primary.main,
                    theme.palette.warning.dark,
                    theme.palette.success.darker,
                    theme.palette.error.main,
                    theme.palette.info.dark,
                    theme.palette.info.darker,
                    theme.palette.warning.main,
                    theme.palette.info.main,
                  ],
                }}
              />

              <BudgetRecentExpenses
                title="Recent Expenses"
                tableData={_bankingRecentTransitions}
                tableLabels={[
                  { id: 'description', label: 'Description' },
                  { id: 'date', label: 'Date' },
                  { id: 'amount', label: 'Amount' },
                  { id: 'status', label: 'Category' },
                ]}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <BudgetIncome
                title="Income"
                subheader="How many you earn today ?"
                list={_bankingContacts.slice(-5)}
              />
              <BudgetExpense
                title="Expense"
                subheader="How many you spend today ?"
                list={_bankingContacts}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
