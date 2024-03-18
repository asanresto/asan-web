import { Box, BoxProps } from "@mui/material";

import { themeColors } from "@/theme";

const FilterText = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      fontSize="14px"
      fontWeight={800}
      letterSpacing="-0.01em"
      color={themeColors.brown[80]}
      sx={{
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: "32px",
        letterSpacing: "-0.01em",
        color: themeColors.brown[80],
      }}
    >
      {children}
    </Box>
  );
};

export default FilterText;
