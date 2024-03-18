import { alpha, Box, Stack } from "@mui/material";

import LoginForm from "@/components/LoginForm";
import { themeColors } from "@/theme";

const LoginPage = () => {
  return (
    <Stack maxWidth="100%" width="448px">
      <Box width="64px" height="64px" borderRadius="64px" bgcolor={themeColors.brown[80]} alignSelf="center" />
      <Stack spacing={2} mt={4} mb="44px" textAlign="center">
        <Box fontSize="36px" fontWeight={800} lineHeight="44px" letterSpacing="-0.03em" color={themeColors.brown[80]}>
          Hi there! 👋
        </Box>
        {/* Subtitle for login page */}
        <Box
          fontSize="18px"
          fontWeight={600}
          lineHeight="initial"
          letterSpacing="-0.01em"
          color={themeColors.brown[80]}
          sx={{ opacity: 0.64 }}
        >
          Please sign in to continue
        </Box>
      </Stack>
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
