import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

import { themeColors } from "@/theme";

const breathingAnimation = keyframes`
  0% {
    transform: scale(0.7);
    background-color: ${themeColors.brown[20]};
  }
  50% {
    transform: scale(1);
    background-color: ${themeColors.green[50]};
  }
  100% {
    transform: scale(0.7);
    background-color: ${themeColors.brown[20]};
  }
`;

const Loader = () => {
  const positions = [
    { gridColumn: 1, gridRow: 1 },
    { gridColumn: 2, gridRow: 1 },
    { gridColumn: 2, gridRow: 2 },
    { gridColumn: 1, gridRow: 2 },
  ];
  return (
    <Box
      display="grid"
      width={`${Math.sqrt((16 * 2 + 3) ** 2 * 2)}px`}
      height={`${Math.sqrt((16 * 2 + 3) ** 2 * 2)}px`}
      gridTemplateColumns="repeat(2, 16px)"
      gridTemplateRows="repeat(2, 16px)"
      justifyContent="center"
      alignContent="center"
      gap="3px"
      sx={{ transform: "rotate(45deg)" }}
    >
      {positions.map((position, index) => {
        const delay = `${index * 0.25}s`; // Staggered delay
        return (
          <Box
            key={index}
            width="16px"
            height="16px"
            borderRadius="9999px"
            bgcolor={themeColors.brown[20]}
            sx={{
              animation: `${breathingAnimation} 1s ease-in-out infinite`,
              animationDelay: delay,
              gridColumn: position.gridColumn,
              gridRow: position.gridRow,
            }}
          />
        );
      })}
    </Box>
  );
};

export default Loader;
