import { Box, Button, ButtonProps } from "@mui/material";
import usePagination, { UsePaginationItem, UsePaginationProps } from "@mui/material/usePagination";
import { Stack } from "@mui/system";

import { ArrowLeftIcon, ArrowRightIcon } from "@/assets";
import { themeColors } from "@/theme";

const Pagination2 = (props: UsePaginationProps) => {
  const { items } = usePagination(props);

  return (
    <nav>
      <Stack
        component="ul"
        direction="row"
        alignItems="center"
        spacing={2}
        p={0}
        m={0}
        sx={{
          listStyle: "none",
        }}
      >
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = (
              <Box fontSize="14px" fontWeight={600} color={themeColors.brown[80]}>
                . . .
              </Box>
            );
          } else if (type === "page") {
            children = (
              <PageButton color={selected ? "green1" : "brown"} variant={selected ? "contained" : "text"} {...item}>
                {page}
              </PageButton>
            );
          } else {
            children = <ArrowButton paginationType={type} {...item} />;
          }
          return <li key={index}>{children}</li>;
        })}
      </Stack>
    </nav>
  );
};

const PageButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      sx={{
        minWidth: "40px",
        minHeight: "40px",
        padding: 0,
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "-0.02em",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

const ArrowButton = ({
  children,
  paginationType,
  ...props
}: { paginationType: UsePaginationItem["type"] } & ButtonProps) => {
  const Icon = paginationType === "previous" ? ArrowLeftIcon : ArrowRightIcon;

  return (
    <Button
      // variant="contained"
      variant="text"
      color="lightBrown"
      sx={{ minWidth: 0, minHeight: 0, padding: "20px", color: themeColors.brown[60] }}
      {...props}
    >
      <Icon width="24px" height="24px" />
    </Button>
  );
};

export default Pagination2;
