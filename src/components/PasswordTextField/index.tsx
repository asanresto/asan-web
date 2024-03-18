import { Box, IconButton } from "@mui/material";
import { forwardRef, useState } from "react";

import { EyeFilledIcon } from "@/assets";
import { themeColors } from "@/theme";

import TextField2, { TextField2Props } from "../TextFields2";

const PasswordTextField = forwardRef(function PasswordTextField({ InputProps, ...props }: TextField2Props, ref) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField2
      ref={ref}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <IconButton
            title={showPassword ? "Hide password" : "Show password"}
            sx={{ mr: "8px", color: "currentColor" }}
            onClick={() => {
              setShowPassword((prev) => {
                return !prev;
              });
            }}
          >
            <Box position="relative">
              <EyeFilledIcon width="24px" height="24px" style={{ display: "block" }} />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
              >
                <line
                  x1="20"
                  y1="4"
                  x2="4"
                  y2="20"
                  style={{
                    strokeWidth: "2px",
                    strokeDasharray: 24,
                    strokeDashoffset: showPassword ? 24 : 0,
                    stroke: themeColors.brown[80],
                    transition: "stroke-dashoffset 200ms ease-out",
                  }}
                />
              </svg>
            </Box>
          </IconButton>
        ),
        ...InputProps,
      }}
      {...props}
    />
  );
});

export default PasswordTextField;
