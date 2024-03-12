import { getMe } from "@/actions/user";
import { ChatDouble, Dashboard, Search } from "@/assets";
import Chat from "@/components/Chat";
import { Avatar, Box, Button, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { Urbanist } from "next/font/google";
import NextLink from "next/link";
import { Suspense } from "react";

const ChatThread = dynamic(() => import("@/components/Chat/MessageContainer"), { ssr: false });

const urbanist = Urbanist({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const CustomerSupportPage = async ({
  params,
  searchParams,
}: {
  params: Record<string, string>;
  searchParams: { userId: string };
}) => {
  await getMe();

  return (
    <Box fontFamily={urbanist.style.fontFamily} display="flex" alignItems="stretch" height="100vh" minHeight="1028px">
      <Suspense>
        <Sidebar />
      </Suspense>
      <Folders></Folders>
      <Contacts currentUserId={searchParams.userId} />
      <ThreadContainer></ThreadContainer>
    </Box>
  );
};

const Sidebar = async () => {
  const data = await getMe();

  return (
    <Stack bgcolor="#4B3425" p={2} justifyContent="space-between">
      <Button
        LinkComponent={NextLink}
        href="/"
        sx={{ bgcolor: "white", width: "64px", height: "64px", borderRadius: "32px" }}
      ></Button>
      <Stack spacing={2}>
        {["1", "2", "3", "4", "5", "6"].map((item, index) => {
          return <SidebarItem key={index} />;
        })}
      </Stack>
      <Avatar alt={data.data.me.name ?? ""} src={data.data?.me?.avatar} sx={{ width: "64px", height: "64px" }} />
    </Stack>
  );
};

const SidebarItem = () => {
  return (
    <Button sx={{ width: "64px", height: "64px", borderRadius: "32px" }}>
      <Dashboard style={{ width: "32px", height: "32px", color: "white" }} />
    </Button>
  );
};

const Folders = () => {
  return <Box bgcolor="#E8DDD9" width="235px" borderRight="1px solid #D5C2B9"></Box>;
};

const Contacts = ({ currentUserId }: { currentUserId: string }) => {
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
        <ChatDouble style={{ width: "32px", height: "32px" }} />
        <Box color="#4B3425" ml="16px">
          Rooms
        </Box>
        <Box color="#926247" ml="auto">
          24
        </Box>
      </Box>
      <Stack divider={<Box height="1px" bgcolor="#E8DDD9" />}>
        {["1", "2", "3"].map((item, index) => {
          return <ContactItem key={index} userId={item} isActive={item === currentUserId}></ContactItem>;
        })}
      </Stack>
    </Box>
  );
};

const ContactItem = ({ userId, isActive }: { userId: string; isActive?: boolean }) => {
  return (
    <Button
      LinkComponent={NextLink}
      href={`/customer-support?userId=${userId}`}
      sx={{
        fontFamily: urbanist.style.fontFamily,
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
          bgcolor="#9BB068"
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
      {isActive && <Box width="4px" bgcolor="#9BB068" position="absolute" top={0} bottom={0} right={0} />}
    </Button>
  );
};

const ThreadContainer = () => {
  return (
    <Box bgcolor="white" flex={1} display="flex" flexDirection="column">
      <Stack direction="row" alignItems="center" width="100%" p={3}>
        <Box fontSize="36px" fontWeight={700} lineHeight="44px" letterSpacing="-0.03em" color="#4B3425">
          Mr. White
        </Box>
        <Stack direction="row" flex={1} mx={3} spacing={1} justifyContent="flex-start">
          <Tag />
          <Tag />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button sx={{ bgcolor: "#F7F4F2", width: "64px", height: "64px", borderRadius: "32px" }}>
            <Search style={{ width: "32px", height: "32px" }} />
          </Button>
          <Button sx={{ bgcolor: "#F7F4F2", width: "64px", height: "64px", borderRadius: "32px" }}></Button>
        </Stack>
      </Stack>
      <Box height="1px" bgcolor="#D5C2B9" />
      <Chat />
    </Box>
  );
};

const Tag = () => {
  return (
    <Box
      bgcolor="#E5EAD7"
      fontSize="12px"
      color="#9BB068"
      fontWeight={800}
      lineHeight="34px"
      px="10px"
      letterSpacing="0.1em"
      borderRadius="17px"
    >
      CHEMIST
    </Box>
  );
};

export default CustomerSupportPage;
