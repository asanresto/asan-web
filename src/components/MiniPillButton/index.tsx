import { Button, ButtonProps } from "@mui/material";
import { ElementType } from "react";

import { themeColors } from "@/theme";

const MiniPillButton = ({ sx, Icon, children, ...props }: { Icon?: ElementType } & ButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="brown"
      sx={{
        lineHeight: "20px",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "-0.01em",
        padding: "5px",
        minWidth: 0,
        minHeight: 0,
        display: "flex",
        borderColor: themeColors.brown[80],
        gap: 1,
        ...sx,
      }}
      {...props}
    >
      {children}
      {Icon && <Icon width="20px" height="20px" />}
    </Button>
  );
};

export default MiniPillButton;
