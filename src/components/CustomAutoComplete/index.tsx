import {
  Autocomplete,
  autocompleteClasses,
  AutocompleteProps,
  ChipTypeMap,
  inputBaseClasses,
  outlinedInputClasses,
  SxProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import merge from "lodash.merge";

import { ChevronDownIcon, ChevronDownSmallIcon } from "@/assets";
import { themeColors } from "@/theme";
import { Optional } from "@/types";

import TextField2 from "../TextFields2";

export type CustomAutoCompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
> = Pick<TextFieldProps, "placeholder" | "variant" | "label"> &
  Optional<AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>, "renderInput">;

const CustomAutoComplete = <
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = boolean,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
>({
  sx,
  placeholder,
  size,
  variant,
  label,
  ...props
}: CustomAutoCompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>) => {
  const sx1: SxProps = {
    [`.${autocompleteClasses.popupIndicator}`]:
      size === "medium"
        ? {
            mr: 0,
            p: "8px",
          }
        : undefined,
    [`.${autocompleteClasses.inputRoot}`]: {
      borderRadius: "16px",
      p: "0 !important",
      [`.${autocompleteClasses.input}`]: {
        width: "100%",
        height: "32px",
        fontSize: size === "small" ? "14px" : "16px",
        fontWeight: size === "small" ? 600 : 700,
        letterSpacing: "-0.01em",
      },
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: themeColors.brown[80],
      },
      [`.${outlinedInputClasses.notchedOutline}`]: {
        borderColor: themeColors.brown[30],
      },
      [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderWidth: "1px",
        borderColor: themeColors.brown[80],
      },
      [`.${autocompleteClasses.endAdornment}`]: {
        right: size === "small" ? "6px" : "8px",
      },
      [`&.${inputBaseClasses.sizeSmall}`]: {
        [`.${autocompleteClasses.input}`]: {
          p: "0 32px 0 16px",
        },
      },
    },
    [`.${autocompleteClasses.endAdornment}`]: {
      lineHeight: 1,
    },
  };

  return (
    <Autocomplete<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
      popupIcon={
        size === "small" ? (
          <ChevronDownSmallIcon width="20px" height="20px" color={themeColors.brown[80]} />
        ) : (
          <ChevronDownIcon width="24px" height="24px" />
        )
      }
      renderInput={({ InputProps, ...props }) => {
        if (size === "small") {
          return (
            <TextField
              placeholder={placeholder}
              InputProps={{
                notched: false,
                ...InputProps,
                sx: {
                  color: themeColors.brown[80],
                },
              }}
              variant={variant}
              label={label}
              {...props}
              size={size}
            />
          );
        } else {
          return <TextField2 variant={variant} label={label} InputProps={InputProps} {...props} size={size} />;
        }
      }}
      ListboxProps={{
        sx: {
          p: "0",
          [`.${autocompleteClasses.option}`]: {
            padding: "16px 12px",
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "20px",
            letterSpacing: "-0.02em",
            color: "#4B3425",
            borderRadius: "16px",
          },
        },
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "20px",
            padding: "4px",
            boxShadow: "0px 8px 16px rgba(72,52,37,0.05)",
            [`.${autocompleteClasses.noOptions}`]: {
              padding: "16px 12px",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "20px",
              letterSpacing: "-0.02em",
              color: "#4B3425",
              borderRadius: "16px",
            },
          },
        },
      }}
      sx={merge(sx1, sx)}
      {...props}
    />
  );
};

export default CustomAutoComplete;
