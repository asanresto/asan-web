import { alpha, Box, Button, ButtonProps, Stack } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import merge from "lodash.merge";
import { InputHTMLAttributes } from "react";

import { UploadIcon } from "@/assets";
import { themeColors } from "@/theme";
import theme from "@/theme/theme";

const Upload = ({ sx, children, ...props }: Pick<ButtonProps, "sx"> & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Button
      component="label"
      color="brown10"
      variant="contained"
      sx={merge(
        {
          padding: 0,
          width: "220px",
          height: "220px",
          borderRadius: "28px",
          lineHeight: "initial",
          color: alpha(themeColors.brown[80], 0.42),
        },
        sx,
      )}
    >
      {children || (
        <Stack
          width="100%"
          height="100%"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          border="1px solid transparent"
          borderRadius="28px"
          sx={{
            transition: theme.transitions.create(["border", "box-shadow"], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
            "&:hover": {
              borderColor: themeColors.brown[40],
            },
            "&:active": {
              borderColor: themeColors.brown[80],
              boxShadow: `${alpha(themeColors.brown[80], 0.2)} 0 0 0 4px}`,
            },
          }}
        >
          <UploadIcon width="24px" height="24px" color={themeColors.brown[80]} />
          <Box fontSize="16px" fontWeight={700} letterSpacing="-0.01em" textAlign="center">
            Click here or drop <br /> to upload
          </Box>
        </Stack>
      )}
      <input
        type="file"
        onClick={(event) => {
          event.currentTarget.value = "";
        }}
        style={visuallyHidden}
        {...props}
      />
    </Button>
  );
};

export default Upload;
