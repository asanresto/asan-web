import { ButtonProps } from "@mui/material";

import { ChevronDownSmallIcon, ChevronUpSmallIcon } from "@/assets";

import MiniPillButton from "../MiniPillButton";

export type ToggleButton2Props = { isActive?: boolean } & ButtonProps;

const ToggleButton2 = ({ isActive, children, ...props }: ToggleButton2Props) => {
  const Icon = isActive ? ChevronUpSmallIcon : ChevronDownSmallIcon;

  return (
    <MiniPillButton Icon={Icon} sx={{ pl: "10px" }} {...props}>
      {children}
    </MiniPillButton>
  );
};

export default ToggleButton2;
