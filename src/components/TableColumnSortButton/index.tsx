import { Button, ButtonProps } from "@mui/material";

import { ChevronDownSmallIcon, ChevronUpSmallIcon } from "@/assets";

const TableColumnSortButton = ({
  direction,
  isActive,
  ...props
}: { direction: "asc" | "desc"; isActive?: boolean } & ButtonProps) => {
  const Icon = direction === "asc" ? ChevronUpSmallIcon : ChevronDownSmallIcon;

  return (
    <Button
      disableRipple
      color="brown"
      sx={{
        minWidth: 0,
        minHeight: 0,
        padding: 0,
        borderRadius: 0,
        bgcolor: "transparent !important",
        opacity: isActive ? "1 !important" : 0.16,
        "&:hover": {
          opacity: 0.64,
        },
      }}
      {...props}
    >
      <Icon width="20px" height="20px" />
    </Button>
  );
};

export default TableColumnSortButton;
