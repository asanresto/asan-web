import { Box, BoxProps, Checkbox, CheckboxProps, SxProps } from "@mui/material";
import { HTMLProps, useEffect, useRef } from "react";

import { CheckIcon, MinusIcon } from "@/assets";
import { themeColors } from "@/theme";

type CustomCheckboxVariant = "outlined" | "contained";

type CustomCheckboxProps = { variant?: CustomCheckboxVariant; indeterminate?: boolean } & CheckboxProps;

const CustomCheckbox = ({ indeterminate, variant = "contained", ...props }: CustomCheckboxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const styles: Record<CustomCheckboxVariant, SxProps> = {
    outlined: {
      borderColor: themeColors.brown[40],
      "&:hover": {
        borderColor: themeColors.brown[40],
      },
    },
    contained: {
      "&:hover": {
        backgroundColor: themeColors.brown[10],
      },
    },
  };

  // useEffect(() => {
  //   if (typeof indeterminate === "boolean") {
  //     ref.current.indeterminate = !props.checked && indeterminate;
  //   }
  // }, [ref, indeterminate, props.checked]);

  return (
    <Checkbox
      inputRef={inputRef}
      indeterminate={indeterminate}
      icon={<CheckboxBorder variant={variant} color={themeColors.brown[40]} />}
      checkedIcon={
        <CheckboxBorder variant={variant} hasValue>
          <CheckIcon
            width="20px"
            height="20px"
            style={{ color: variant === "outlined" ? themeColors.green[50] : "white" }}
          />
        </CheckboxBorder>
      }
      indeterminateIcon={
        <CheckboxBorder
          variant={variant}
          hasValue
          color={themeColors.green[50]}
          bgcolor={themeColors.green[10]}
          border="1px solid"
        >
          <MinusIcon width="20px" height="20px" />
        </CheckboxBorder>
      }
      sx={{ p: 0 }}
      {...props}
    />
  );
};

const CheckboxBorder = ({
  children,
  hasValue,
  variant,
  ...props
}: { hasValue?: boolean; variant?: CustomCheckboxVariant } & BoxProps) => {
  const defaultSx: BoxProps = {
    width: "24px",
    height: "24px",
    borderRadius: "9999px",
    border: "1px solid",
  };

  const hasValueSx = hasValue
    ? {
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: variant === "outlined" ? themeColors.green[10] : themeColors.green[50],
        border: variant === "outlined" ? `1px solid ${themeColors.green[50]}` : "none",
      }
    : {};

  return (
    <Box {...defaultSx} {...hasValueSx} {...props}>
      {children}
    </Box>
  );
};

export default CustomCheckbox;
