import { Collapse, CollapseProps, Stack } from "@mui/material";

import { themeColors } from "@/theme";

const TableInputsContainer = ({ children, ...props }: CollapseProps) => {
  return (
    <Collapse {...props}>
      <Stack p={3} mt={3} spacing={1} borderRadius={10} bgcolor={themeColors.brown[10]}>
        {children}
      </Stack>
    </Collapse>
  );
};

export default TableInputsContainer;
