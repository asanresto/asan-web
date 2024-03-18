import { Box, Button, Stack } from "@mui/material";
import { ReactNode } from "react";

import { SearchIcon } from "@/assets";
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { themeColors } from "@/theme";

// const urbanist = localFont({
//   src: "../../fonts/Urbanist-VariableFont_wght_vn.ttf",
//   display: "swap",
// });

// const urbanist = Urbanist({
//   weight: ["300", "400", "500", "600", "700", "800"],
//   subsets: ["latin"],
//   display: "swap",
// });

const NewLayout = async ({
  params,
  searchParams,
  children,
}: {
  params: Record<string, string>;
  searchParams: { userId: string };
  children: ReactNode;
}) => {
  // await getMe();

  return (
    <Box
      //  fontFamily={urbanist.style.fontFamily}
      display="flex"
      alignItems="stretch"
      height="100vh"
    >
      {/* <Suspense> */}
      <Sidebar />
      {/* </Suspense> */}
      <Box overflow="auto" width="100%">
        {children}
      </Box>
    </Box>
  );
};

const Folders = () => {
  return <Box bgcolor="#E8DDD9" width="235px" borderRight="1px solid #D5C2B9"></Box>;
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
            <SearchIcon style={{ width: "32px", height: "32px" }} />
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
      color={themeColors.green[50]}
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

export default NewLayout;
