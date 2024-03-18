import { Dialog, DialogProps } from "@mui/material";
import { forwardRef } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { booleanActions } from "@/store/slices/boolean";
import { Optional } from "@/types";

type AppDialogProps = Optional<DialogProps, "open"> & { booleanKey: string; closeOnClickOutside?: boolean };

const AppDialog = forwardRef<HTMLDivElement | null, AppDialogProps>(function AppDialog(
  { booleanKey, children, closeOnClickOutside = true, ...props },
  ref,
) {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.boolean[booleanKey]);

  return (
    <Dialog
      open={open ?? false}
      {...props}
      ref={ref}
      onClose={
        closeOnClickOutside
          ? (event, reason) => {
              dispatch(booleanActions.off(booleanKey));
              props.onClose?.(event, reason);
            }
          : props.onClose
      }
    >
      {children}
    </Dialog>
  );
});

export default AppDialog;
