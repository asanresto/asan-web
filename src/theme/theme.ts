"use client";
import { Urbanist } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const urbanist = Urbanist({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: urbanist.style.fontFamily,
  },
  // components: {
  //   MuiAlert: {
  //     styleOverrides: {
  //       root: ({ ownerState }) => ({
  //         ...(ownerState.severity === 'info' && {
  //           backgroundColor: '#60a5fa',
  //         }),
  //       }),
  //     },
  //   },
  // },
  components: {
    MuiTextField: {
      defaultProps: { variant: "standard", InputLabelProps: { shrink: true } },
    },
    MuiSelect: {
      defaultProps: { variant: "standard" },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: { textTransform: "none", borderRadius: "9999px" },
        sizeMedium: {
          minHeight: "56px",
          fontSize: "18px",
          fontWeight: 800,
          letterSpacing: "-0.01em",
          lineHeight: "initial",
        },
      },
    },
  },
});

export default theme;
