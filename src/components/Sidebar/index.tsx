"use client";

import { Avatar, Button, MenuItem, MenuList, Stack } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { useMutation, useQuery } from "urql";

import { BookmarkIcon, ChatIcon, DashboardIcon, DocumentIcon, GearIcon, UserIcon } from "@/assets";
import { getMeDoc, logoutDoc } from "@/graphql/documents/user";
import { LogoutMutation, LogoutMutationVariables, MeQuery, MeQueryVariables } from "@/graphql/types";
import { themeColors } from "@/theme";

import CustomTooltip from "../CustomTooltip";
import SidebarItem, { SidebarItemProps } from "../SidebarItem";

const SIDEBAR_ITEMS: SidebarItemProps[] = [
  { Icon: DashboardIcon, href: "/new-layout" },
  { Icon: ChatIcon, href: "/new-layout/customer-support" },
  { Icon: GearIcon, href: "/new-layout/products" },
  { Icon: BookmarkIcon, href: "/new-layout/customer-support" },
  { Icon: UserIcon, href: "/new-layout/permissions" },
  { Icon: DocumentIcon, href: "/new-layout/customer-support" },
];

const Sidebar = () => {
  // const data = await getMe();
  const [logoutResult, logout] = useMutation<LogoutMutation, LogoutMutationVariables>(logoutDoc);
  const router = useRouter();

  return (
    <Stack
      bgcolor={themeColors.brown[80]}
      p={2}
      justifyContent="space-between"
      sx={{ display: { xs: "none", sm: "flex" } }}
    >
      <Button
        LinkComponent={NextLink}
        href="/"
        sx={{ bgcolor: "white", width: "64px", height: "64px", borderRadius: "32px" }}
      ></Button>
      <Stack spacing={2}>
        {SIDEBAR_ITEMS.map(({ Icon, href }, index) => {
          return <SidebarItem key={index} Icon={Icon} href={href} />;
        })}
      </Stack>
      <CustomTooltip
        placement="right-end"
        title={
          <MenuList>
            <MenuItem onClick={() => {}}>Profile</MenuItem>
            <MenuItem component={NextLink} href="/new-layout/account">
              My account
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await logout({});
                router.replace("/login");
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        }
      >
        <SidebarAvatar />
      </CustomTooltip>
    </Stack>
  );
};

const SidebarAvatar = forwardRef<HTMLDivElement>(function SidebarAvatar(props, ref) {
  const [{ data, fetching, error }, executeQuery] = useQuery<MeQuery, MeQueryVariables>({
    query: getMeDoc,
  });

  return (
    <Avatar
      ref={ref}
      src={data?.me?.avatarUrl ?? undefined}
      alt={data?.me?.name ?? ""}
      sx={{ width: "64px", height: "64px", cursor: "pointer" }}
      {...props}
    />
  );
});

export default Sidebar;
