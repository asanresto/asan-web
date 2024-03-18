import { Divider, Grid, Stack, Typography } from "@mui/material";

import AccountForm from "@/components/AccountForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";

const AccountPage = async () => {
  // const data = await getMe();

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h3">Account Settings</Typography>
        {/* <Box flex={1} />
        <Button variant="contained">Save</Button> */}
      </Stack>
      <Divider />
      <Grid container>
        <Grid item xs={12} sm={7}>
          <Stack spacing={3}>
            {/* <AccountForm values={data.data?.me} /> */}
            <AccountForm />
            <Typography>Change Password</Typography>
            <ChangePasswordForm />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={5}></Grid>
      </Grid>
    </Stack>
  );
};

export default AccountPage;
