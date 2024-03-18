import { TextFieldProps } from "@mui/material";
import { cloneElement, ReactElement } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

const ControlledTextField = <TFieldValues extends FieldValues>({
  textField,
  ...props
}: { textField: ReactElement<TextFieldProps> } & Omit<ControllerProps<TFieldValues>, "render">) => {
  return (
    <Controller
      render={({ field: { disabled, ...field }, fieldState: { error, invalid } }) => {
        return cloneElement(textField, {
          ...field,
          disabled: disabled ?? textField.props.disabled,
          helperText: textField.props.helperText ?? error?.message,
          error: invalid,
          value: field.value ?? "",
        });
      }}
      {...props}
    />
  );
};

export default ControlledTextField;
