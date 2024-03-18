import { MenuItem, MenuList, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

const CustomTooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            margin: 0,
            padding: "4px",
            borderRadius: "20px",
            backgroundColor: "white",
            boxShadow: "0px 8px 16px rgba(72,52,37,0.05)",
          },
        },
      }}
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
              marginLeft: "24px",
            },
          },
        },
      }}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
