import { Box } from "@mui/material";

import Chat from "@/components/Chat";
import Contacts from "@/components/Chat/Contacts";
import Header from "@/components/Header";
import { themeColors } from "@/theme";

const CustomerSupportPage = async ({
  params,
  searchParams,
}: {
  params: Record<string, string>;
  searchParams: { userId: string };
}) => {
  // await getMe();

  return (
    <>
      <Folders></Folders>
      <Contacts currentUserId={searchParams.userId} />
      <ThreadContainer />
    </>
  );
};

const Folders = () => {
  return <Box bgcolor="#E8DDD9" width="235px" borderRight="1px solid #D5C2B9"></Box>;
};

const ThreadContainer = () => {
  return (
    <Box bgcolor="white" flex={1} display="flex" flexDirection="column">
      <Header titleText="Mr. White" />
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

export default CustomerSupportPage;
