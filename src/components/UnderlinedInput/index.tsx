import { inputClasses, TextField } from "@mui/material";
import { forwardRef } from "react";

import { themeColors } from "@/theme";

const UnderlinedInput = forwardRef<HTMLDivElement, any>(function UnderlinedInput(props, ref) {
  return (
    <TextField
      ref={ref}
      placeholder="Enter a value"
      InputProps={{
        sx: {
          fontSize: "16px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: themeColors.brown[80],
          "&::before": {
            borderColor: themeColors.brown[30],
          },
          "&::after": {
            display: "none",
          },
          [`&:hover:not(.${inputClasses.disabled}, .${inputClasses.error})::before`]: {
            borderBottom: `1px solid ${themeColors.brown[80]}`,
          },
        },
      }}
      sx={{
        flex: 1,
      }}
    />
  );
});

export default UnderlinedInput;
