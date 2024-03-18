"use client";

import { IconButton, IconButtonProps, Menu, MenuItem, Typography } from "@mui/material";
import { useMutation } from "@urql/next";
import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";

import { logoutDoc } from "@/graphql/documents/user";
import { LogoutMutation, LogoutMutationVariables } from "@/graphql/types";
import { getCookie } from "@/utils/cookie";

const LoggedInUser = forwardRef<any, IconButtonProps>(function LoggedInUser({ children, ...props }, ref) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [logoutResult, logout] = useMutation<LogoutMutation, LogoutMutationVariables>(logoutDoc);
  const router = useRouter();

  const menuItems = [
    {
      label: "Account",
      onClick: () => {
        router.replace("/account");
      },
    },
    {
      label: "Log out",
      onClick: async () => {
        await logout({ refreshToken: "" });
        // const refreshToken = getCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);
        // if (refreshToken) {
        //   await logout({ refreshToken: refreshToken });
        // }
        router.replace("/login");
      },
    },
  ];

  return (
    <>
      <IconButton
        ref={ref}
        sx={{ p: 0 }}
        onClick={(event) => {
          setAnchorElUser(event.currentTarget);
        }}
        {...props}
      >
        {children}
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => {
          setAnchorElUser(null);
        }}
      >
        {menuItems.map(({ label, onClick }, index) => (
          <MenuItem
            key={index}
            onClick={async () => {
              setAnchorElUser(null);
              onClick();
            }}
          >
            <Typography textAlign="center">{label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});

export default LoggedInUser;
