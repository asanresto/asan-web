import { ComponentProps, forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import TextField2 from "../TextFields2";

export type NumericTextFieldProps = NumericFormatProps<ComponentProps<typeof TextField2>>;

const NumericTextField = forwardRef(function NumericTextField(props: NumericTextFieldProps, ref) {
  return (
    <NumericFormat
      allowNegative={false}
      thousandSeparator=","
      decimalScale={2}
      customInput={TextField2}
      required
      getInputRef={ref}
      {...props}
    />
  );
});

export default NumericTextField;
