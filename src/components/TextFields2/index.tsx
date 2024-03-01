import theme from "@/theme/theme";
import { Box, InputBase, InputBaseProps, InputLabel, TextFieldProps, alpha } from "@mui/material";
import { forwardRef } from "react";

const TextField2 = forwardRef<
  any,
  { label: TextFieldProps["label"]; helperText?: TextFieldProps["helperText"] } & InputBaseProps
>(function TextField2({ label, helperText, ...props }, ref) {
  return (
    <Box ref={ref}>
      <InputLabel sx={{ fontSize: "14px", fontWeight: 800, mb: "8px", lineHeight: "initial" }}>{label}</InputLabel>
      <InputBase
        {...props}
        sx={{
          borderRadius: "9999px",
          input: {
            border: "1px solid transparent",
            bgcolor: "#F7F4F2",
            borderRadius: "9999px",
            height: "54px",
            padding: "0 15px",
            transition: theme.transitions.create(["box-shadow", "border"]),
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "initial",
            letterSpacing: "-0.01em",
            "&:focus": {
              border: "1px solid #9BB068",
              boxShadow: `${alpha("#9BB068", 0.25)} 0 0 0 4px`,
            },
          },
        }}
      ></InputBase>
    </Box>
  );
});

export default TextField2;
