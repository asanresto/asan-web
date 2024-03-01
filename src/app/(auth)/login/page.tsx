import LoginForm from "@/components/LoginForm";
import { Box, Stack } from "@mui/material";

const LoginPage = () => {
  return (
    <Stack>
      <Box width="64px" height="64px" borderRadius="64px" bgcolor="#4B3425" alignSelf="center" />
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
