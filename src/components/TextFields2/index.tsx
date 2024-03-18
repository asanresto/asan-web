"use client";

import { alpha, Box, InputBase, inputBaseClasses, InputBaseProps, InputLabel, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

import { themeColors } from "@/theme";
import theme from "@/theme/theme";

export type TextField2Props = TextFieldProps;

const TextField2 = forwardRef<any, TextField2Props>(function TextField2(
  {
    label,
    placeholder,
    helperText,
    fullWidth = true,
    sx,
    size,
    error,
    variant = "filled",
    margin,
    inputProps,
    inputRef,
    InputProps,
    InputLabelProps,
    ...props
  },
  ref,
) {
  const outlineColor = error ? alpha(themeColors.red[50], 0.2) : alpha(themeColors.brown[80], 0.2);

  return (
    <Box ref={ref} sx={sx}>
      {label && (
        <InputLabel
          disabled={props.disabled}
          required={props.required}
          sx={{ fontSize: "14px", fontWeight: 800, mb: "8px", lineHeight: "16px", color: themeColors.brown[80] }}
          {...InputLabelProps}
        >
          {label}
        </InputLabel>
      )}
      {/* @ts-expect-error */}
      <InputBase
        placeholder={placeholder}
        {...props}
        {...InputProps}
        value={props.value ?? ""}
        sx={{
          overflow: "hidden",
          width: fullWidth ? "100%" : undefined,
          color: themeColors.brown[80],
          bgcolor: themeColors.brown[10],
          borderRadius: "28px !important",
          border: "1px solid transparent",
          transition: theme.transitions.create(["box-shadow", "border"]),
          borderColor: error ? themeColors.red[50] : variant === "outlined" ? themeColors.brown[30] : "transparent",
          "&:hover": {
            borderColor: error ? themeColors.red[50] : themeColors.brown[40],
          },
          "&:has(input:focus)": {
            borderColor: (error ? themeColors.red[50] : themeColors.brown[80]) + "!important",
            boxShadow: `${outlineColor} 0 0 0 4px`,
          },
          [`&.${inputBaseClasses.adornedStart}`]: {
            color: error ? themeColors.red[50] : themeColors.brown[80],
          },
        }}
        inputProps={{
          ref: inputRef,
          ...inputProps,
          sx: {
            flex: 1,
            padding: "0 15px",
            height: (size === "small" ? "32px" : "54px") + " !important",
            fontSize: size === "small" ? "14px" : "16px",
            fontWeight: size === "small" ? 600 : 700,
            lineHeight: "initial",
            letterSpacing: "-0.01em",
          },
        }}
      />
    </Box>
  );
});

export default TextField2;
