"use client";

import { Box, Button, Stack } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useLayoutEffect } from "react";
import { useQuery } from "urql";

import { ChatDoubleIcon } from "@/assets";
import { getUsersDoc } from "@/graphql/documents/user";
import { User, UsersQuery, UsersQueryVariables } from "@/graphql/types";
import { themeColors } from "@/theme";

const Contacts = ({ currentUserId }: { currentUserId: string }) => {
  const [{ data, fetching, error }, executeQuery] = useQuery<UsersQuery, UsersQueryVariables>({
    pause: true,
    query: getUsersDoc,
  });

  useLayoutEffect(() => {
    executeQuery();
  }, []);

  // if (fetching) return <p>Loading...</p>;
  // if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Box bgcolor="#F7F4F2" width="330px">
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        px={2}
        py={5}
        fontSize="30px"
        fontWeight={700}
        lineHeight={1}
        letterSpacing="-0.02em"
      >
        <ChatDoubleIcon style={{ width: "32px", height: "32px" }} />
        <Box color="#4B3425" ml="16px">
          Rooms
        </Box>
        <Box color="#926247" ml="auto">
          24
        </Box>
      </Box>
      <Stack divider={<Box height="1px" bgcolor="#E8DDD9" />}>
        {data?.users.map((item, index) => {
          return <ContactItem key={index} item={item} isActive={item.id === currentUserId} />;
        })}
      </Stack>
    </Box>
  );
};

const ContactItem = ({ item, isActive }: { item: User; isActive?: boolean }) => {
  return (
    <Button
      LinkComponent={NextLink}
      href={`/customer-support?userId=${item.id}`}
      sx={{
        bgcolor: isActive ? "#E5EAD7" : "transparent",
        p: 2,
        justifyContent: "flex-start",
        textTransform: "none",
        position: "relative",
        borderRadius: 0,
      }}
    >
      <Stack width="100%" direction="row" alignItems="center" spacing={2}>
        <Box width="64px" height="64px" bgcolor={isActive ? "#F7F8F2" : "#E8DDD9"} borderRadius="32px"></Box>
        <Stack spacing={1} flex={1} lineHeight="initial" alignItems="flex-start">
          <Box fontSize="18px" fontWeight={700} letterSpacing="-0.02em" color={isActive ? "#3D4A26" : "#4B3425"}>
            Mental Health
          </Box>
          <Stack direction="row" spacing={2}></Stack>
        </Stack>
        <Box
          bgcolor={themeColors.green[50]}
          fontSize="18px"
          fontWeight={700}
          lineHeight="24px"
          minWidth="24px"
          textAlign="center"
          px="4px"
          borderRadius="12px"
          color="white"
        >
          2
        </Box>
      </Stack>
      {isActive && <Box width="4px" bgcolor={themeColors.green[50]} position="absolute" top={0} bottom={0} right={0} />}
    </Button>
  );
};

export default Contacts;
