import { cloneElement, ReactElement } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import { NumberFormatValues } from "react-number-format";

import { NumericTextFieldProps } from "../NumericTextField";

const ControlledNumericTextField = <TFieldValues extends FieldValues>({
  numericTextField,
  ...props
}: Omit<ControllerProps<TFieldValues>, "render"> & {
  numericTextField: ReactElement<NumericTextFieldProps>;
} & Omit<ControllerProps<TFieldValues>, "render">) => {
  return (
    <Controller
      render={({ field: { disabled, onChange, ...field }, fieldState: { error, invalid } }) => {
        return cloneElement(numericTextField, {
          ...field,
          disabled: disabled ?? numericTextField.props.disabled,
          helperText: numericTextField.props.helperText ?? error?.message,
          error: invalid,
          value: field.value ?? "",
          onValueChange: (values: NumberFormatValues) => {
            onChange(values.value);
          },
          // inputRef: ref,
          // onChange: (event) => {
          //   onChange(event);
          //   props.onChange?.(event);
          // },
          // error: invalid,
          // helperText: error?.message,
          // inputProps: { inputMode: "decimal" },
          // onKeyUp:
          //   props.max !== undefined
          //     ? (event) => {
          //         if (toNumber((event.target as HTMLInputElement).value) >= Number(props.max)) {
          //           setValue(name, props.max as any);
          //         }
          //       }
          //     : undefined,
          // onKeyPress:
          //   props.max !== undefined
          //     ? (event) => {
          //         if (toNumber((event.target as HTMLInputElement).value) >= Number(props.max)) {
          //           event.preventDefault();
          //         }
          //       }
          //     : undefined,
        });
      }}
      {...props}
    />
  );
};

export default ControlledNumericTextField;
