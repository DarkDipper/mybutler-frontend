// @mui
import { Alert, AlertTitle, Stack, Typography, Chip } from '@mui/material';

export default function ProfileUpdate() {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">
        Classified by: <Chip label="Completed" color="success" />{' '}
        <Chip label="Coding" color="info" /> <Chip label="Bug" color="warning" />{' '}
        <Chip label="Expected" color="error" />
      </Typography>
      <Alert severity="success">
        <AlertTitle>UI Home Page</AlertTitle>
      </Alert>
      <Alert severity="success">
        <AlertTitle>UI About me</AlertTitle>
      </Alert>
      <Alert severity="success">
        <AlertTitle>UI Todo list</AlertTitle>
      </Alert>
      <Alert severity="success">
        <AlertTitle>UI Note</AlertTitle>
      </Alert>
      <Alert severity="error">
        <AlertTitle>UI Email</AlertTitle>
        So you can tracking all your email
      </Alert>
      <Alert severity="error">
        <AlertTitle>UI Analytics</AlertTitle>
        Observe all your machine learning and deep learning models being trained from colab and
        kaggle
      </Alert>
      <Alert severity="error">
        <AlertTitle>UI News</AlertTitle>
        Get all the latest news about technology, science, and business from all over the world
      </Alert>
      <Alert severity="success">
        <AlertTitle>UI Budget</AlertTitle>
        Manage your budget and expenses
      </Alert>
      <Alert severity="info">
        <AlertTitle>UI Health</AlertTitle>
        Manage your budget and expenses
      </Alert>
      <Alert severity="warning">
        <AlertTitle>UI Project</AlertTitle>
        Manage your repository and project from github
      </Alert>
      <Alert severity="info">
        <AlertTitle>Connect to backend</AlertTitle>
      </Alert>
    </Stack>
  );
}
