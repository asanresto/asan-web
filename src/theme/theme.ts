"use client";
import { buttonClasses, tableCellClasses, tableRowClasses } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  borderBottomLeftRadius,
  borderBottomRightRadius,
} from "html2canvas/dist/types/css/property-descriptors/border-radius";
import { borderBottomStyle } from "html2canvas/dist/types/css/property-descriptors/border-style";
import { Urbanist } from "next/font/google";
import localFont from "next/font/local";

import { themeColors } from "./colors";

declare module "@mui/material/styles" {
  interface Palette {
    brown: Palette["primary"];
    brown10: Palette["primary"];
    brown40: Palette["primary"];
    brown60: Palette["primary"];
    lightBrown: Palette["primary"];
    green: Palette["primary"];
    green1: Palette["primary"];
    orange: Palette["primary"];
    grey10: Palette["primary"];
  }

  interface PaletteOptions {
    brown?: PaletteOptions["primary"];
    brown10?: PaletteOptions["primary"];
    brown40?: PaletteOptions["primary"];
    brown60?: PaletteOptions["primary"];
    lightBrown?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    green1?: PaletteOptions["primary"];
    orange?: PaletteOptions["primary"];
    grey10?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    brown: true;
    brown10: true;
    brown40: true;
    brown60: true;
    lightBrown: true;
    green: true;
    green1: true;
    orange: true;
    grey10: true;
  }
}

export const urbanist = Urbanist({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  preload: true,
});

// const urbanist = localFont({
//   src: "../fonts/Urbanist-VariableFont_wght_vn.ttf",
//   display: "swap",
// });

const theme = createTheme({
  palette: {
    mode: "light",
    grey10: {
      main: themeColors.grey[10],
    },
    brown: {
      main: themeColors.brown[80],
      contrastText: "white",
    },
    brown10: {
      main: themeColors.brown[10],
    },
    brown40: {
      main: themeColors.brown[40],
    },
    brown60: {
      main: themeColors.brown[60],
      contrastText: "white",
    },
    lightBrown: {
      main: themeColors.brown[10],
      contrastText: themeColors.brown[80],
    },
    green: {
      main: themeColors.green[10],
      contrastText: themeColors.green[50],
    },
    green1: {
      main: themeColors.green[50],
      contrastText: "white",
    },
    orange: {
      main: themeColors.orange[40],
      contrastText: "white",
    },
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
    // MuiButtonBase: {
    //   styleOverrides: {
    //     root: {
    //       [`&.${buttonClasses.root}.${buttonClasses.disabled}`]: {
    //         backgroundColor: "rgba(0, 0, 0, 0.04)",
    //         color: "rgba(0, 0, 0, 0.08)",
    //       },
    //     },
    //   },
    // },
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
          paddingLeft: "24px",
          paddingRight: "24px",
        },
        endIcon: {
          "& > *:nth-of-type(1)": {
            fontSize: "24px",
          },
        },
        iconSizeMedium: {
          marginRight: 0,
          marginLeft: "16px",
        },
      },
    },
    MuiList: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "16px 12px",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "20px",
          letterSpacing: "-0.02em",
          color: themeColors.brown[80],
          borderRadius: "16px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: themeColors.orange[60],
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          [`.${tableRowClasses.root}`]: {
            // "&:last-of-type": {
            //   [`.${tableCellClasses.root}`]: {
            //     borderBottom: "none",
            //     "&:first-of-type": {
            //       borderBottomLeftRadius: "28px",
            //     },
            //     "&:last-of-type": {
            //       borderBottomRightRadius: "28px",
            //     },
            //   },
            // },
            "&:nth-of-type(even)": {
              backgroundColor: themeColors.brown[10],
            },
          },
        },
      },
    },
    // MuiTableHead: {
    //   styleOverrides: {
    //     root: {
    //       [`.${tableCellClasses.head}`]: {
    //         "&:first-of-type:not(:empty)": {
    //           borderTopLeftRadius: "28px",
    //         },
    //         "&:last-of-type:not(:empty)": {
    //           borderTopRightRadius: "28px",
    //         },
    //       },
    //     },
    //   },
    // },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          lineHeight: "24px",
          color: "#6F6A65",
          paddingTop: "16px",
          paddingBottom: "16px",
          borderBottom: `1px solid ${themeColors.brown[30]}`,
        },
        head: {
          fontWeight: 700,
          color: themeColors.brown[80],
          backgroundColor: themeColors.brown[10],
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
          padding: "4px",
          boxShadow: "0px 8px 16px rgba(72,52,37,0.05)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          // borderColor: "red",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "12px",
          fontWeight: 800,
          color: themeColors.brown[80],
          backgroundColor: "white",
          boxShadow: "0px 8px 16px rgba(72,52,37,0.05)",
          padding: "8px 12px",
          borderRadius: "16px",
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
        disableGutters: true,
      },
      // styleOverrides: {
      //   expanded: {
      //     margin: 0,
      //   },
      // },
    },
  },
});

export default theme;
