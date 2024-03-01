import { Alert } from "@mui/material";
import { VariantType } from "notistack";
import React, { ReactNode, forwardRef } from "react";

const Notifier = forwardRef<HTMLDivElement, { variant: VariantType; message: ReactNode }>(
  function Notifier(props, ref) {
    return (
      <Alert
        ref={ref}
        severity={props.variant === "default" ? undefined : props.variant}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {props.message}
      </Alert>
    );
  },
);

export default Notifier;
