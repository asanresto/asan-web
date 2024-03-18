import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, Stack, TextField } from "@mui/material";

import TextField2 from "@/components/TextFields2";
import { themeColors } from "@/theme";

const Seo = () => {
  return (
    <Box px={6} borderTop={`1px solid ${themeColors.brown[30]}`} py={3}>
      <Box fontSize="24px" fontWeight={800} lineHeight="32px" letterSpacing="-0.02em" color={themeColors.brown[80]}>
        SEO
      </Box>
      <Stack spacing={4} mt={3}>
        <TextField2 label="Title" />
      </Stack>
    </Box>
  );
};

export default Seo;
