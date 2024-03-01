import { Box } from "@mui/material";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box p={{ xs: 2, sm: 3 }} display="flex" height="100vh" minHeight="900px">
      <Box flex={1} height="100%" display="flex" justifyContent="center" alignItems="center">
        {children}
      </Box>
      <Box flex={1}></Box>
    </Box>
  );
};

export default AuthLayout;
