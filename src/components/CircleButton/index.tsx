"use client";

import { Button, ButtonProps } from "@mui/material";

import { themeColors } from "@/theme";

const CircleButton = ({ Icon, ...props }: { Icon: any } & ButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="brown"
      sx={{ minWidth: 0, minHeight: 0, p: "5px", borderColor: themeColors.brown[80] }}
      {...props}
    >
      <Icon width="20px" height="20px" />
    </Button>
  );
};

export default CircleButton;
