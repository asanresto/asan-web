"use client";

import { logoutDoc } from "@/graphql/documents/user";
import { LogoutMutation, LogoutMutationVariables } from "@/graphql/types";
import { getCookie } from "@/utils/cookie";
import { IconButton, IconButtonProps, Menu, MenuItem, Typography } from "@mui/material";
import { useMutation } from "@urql/next";
import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";

const settings = ["Account", "Logout"];

const LoggedInUser = forwardRef<any, IconButtonProps>(function LoggedInUser({ children, ...props }, ref) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [logoutResult, logout] = useMutation<LogoutMutation, LogoutMutationVariables>(logoutDoc);
  const router = useRouter();

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
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={async () => {
              setAnchorElUser(null);
              if (setting === "Logout") {
                const refreshToken = getCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);
                if (refreshToken) {
                  await logout({ refreshToken: refreshToken });
                }
                router.replace("/login");
                return;
              }
              if (setting === "Account") {
                router.replace("/account");
                return;
              }
            }}
          >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});

export default LoggedInUser;
