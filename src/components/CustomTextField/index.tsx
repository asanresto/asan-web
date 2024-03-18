import { outlinedInputClasses, TextField, TextFieldProps } from "@mui/material";
import merge from "lodash.merge";

import { themeColors } from "@/theme";

const CustomTextField = ({ inputProps, InputProps, ...props }: TextFieldProps) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      InputProps={{
        notched: false,
        ...InputProps,
        sx: merge(
          {
            color: themeColors.brown[80],
            borderRadius: "16px",
            [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: themeColors.brown[80],
              borderWidth: "1px",
            },
            [`.${outlinedInputClasses.notchedOutline}`]: {
              borderColor: themeColors.brown[30],
            },
          },
          InputProps?.sx,
        ),
      }}
      inputProps={{
        ...inputProps,
        sx: {
          height: "32px",
          padding: "0 16px",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          ...inputProps?.sx,
        },
      }}
      {...props}
    />
  );
};

export default CustomTextField;
