import { Box, Grid } from "@mui/material";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box p={{ xs: 2, sm: 3 }} display="flex" height="100vh" minHeight="900px">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
            {children}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
