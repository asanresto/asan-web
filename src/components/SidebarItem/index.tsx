"use client";

import { Button, MenuItem, MenuList, tooltipClasses } from "@mui/material";
import { ElementType } from "react";

import { themeColors } from "@/theme";

import CustomNextLink from "../CustomNextLink";
import CustomTooltip from "../CustomTooltip";

export type SidebarItemProps = {
  Icon?: ElementType;
  label?: string;
  href?: string;
  onClick?: () => void;
  subItems?: { label: string; href: string }[];
};

const SidebarItem = ({ href, Icon }: SidebarItemProps) => {
  return (
    <>
      <CustomTooltip
        placement="right-start"
        title={
          <MenuList>
            <MenuItem onClick={() => {}}>Profile</MenuItem>
            <MenuItem onClick={() => {}}>My account</MenuItem>
            <MenuItem onClick={() => {}}>Logout</MenuItem>
          </MenuList>
        }
        slotProps={{
          popper: {
            sx: {
              [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
                marginLeft: "24px",
              },
            },
          },
        }}
      >
        <Button
          color="brown40"
          variant="text"
          sx={{
            width: "64px",
            height: "64px",
            borderRadius: "32px",
            p: 0,
            "&.active": {
              bgcolor: themeColors.brown[60],
              color: "white",
            },
          }}
          LinkComponent={CustomNextLink}
          href={href}
        >
          {Icon && (
            <Icon
              style={{
                width: "32px",
                height: "32px",
              }}
            />
          )}
        </Button>
      </CustomTooltip>
    </>
  );
};

export default SidebarItem;
