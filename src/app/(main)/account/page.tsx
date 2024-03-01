import { getMe } from "@/actions/user";
import AccountForm from "@/components/AccountForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import { Box } from "@mui/material";

const AccountPage = async () => {
  const data = await getMe();
  console.log(data);

  return (
    <>
      <AccountForm values={data.data.me} />
      <Box>Change Password</Box>
      <ChangePasswordForm />
    </>
  );
};

export default AccountPage;
