import { Alert, alertClasses } from "@mui/material";
import { VariantType } from "notistack";
import { forwardRef, ReactNode } from "react";

import { WarningFilledIcon } from "@/assets";
import { themeColors } from "@/theme";

const Notifier = forwardRef<HTMLDivElement, { variant: VariantType; message: ReactNode }>(
  function Notifier(props, ref) {
    return (
      <Alert
        ref={ref}
        severity={props.variant === "default" ? undefined : props.variant}
        variant="filled"
        icon={
          props.variant === "error" ? (
            <WarningFilledIcon width="20px" height="20px" color={themeColors.red[50]} />
          ) : undefined
        }
        sx={{
          width: "100%",
          backgroundColor: props.variant === "error" ? themeColors.red[20] : undefined,
          color: themeColors.brown[80],
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "initial",
          alignItems: "center",
          border: props.variant === "error" ? `1px solid ${themeColors.red[50]}` : undefined,
          padding: "10px 11px",
          borderRadius: "28px",
          [`.${alertClasses.icon}`]: {
            marginRight: "4px",
          },
        }}
      >
        {props.message}
      </Alert>
    );
  },
);

export default Notifier;
