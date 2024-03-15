import { Message } from "@/graphql/types";
import { Box, Stack, alpha } from "@mui/material";
import { memo } from "react";

const ChatBubble = memo(function ChatBubble({ message }: { message: Message }) {
  // TODO: store current user id somewhere to compare with sender id
  const variant = message.senderId !== "1" ? "in" : "out";
  const alignSelf = variant === "in" ? "flex-start" : "flex-end";
  const bgcolor = variant === "in" ? "#E8DDD9" : "#4B3425";

  return (
    <Stack
      marginLeft={variant === "out" ? "auto" : undefined}
      marginRight={variant === "in" ? "auto" : undefined}
      width="max-content"
      maxWidth="70%"
    >
      <Stack
        direction={variant === "in" ? "row-reverse" : "row"}
        spacing="12px"
        bgcolor={bgcolor}
        borderRadius={variant === "in" ? "16px 16px 16px 0" : "16px 16px 0 16px"}
        p={2}
        color={variant === "in" ? alpha("#1F160F", 0.64) : "white"}
      >
        <Box flex={1} fontSize="18px" fontWeight={600} letterSpacing="-0.02em" lineHeight="initial">
          {message.content}
        </Box>
        <Box bgcolor={variant === "in" ? "#FE814B" : "#9BB068"} width="40px" height="40px" borderRadius="20px"></Box>
      </Stack>
      <Box
        alignSelf={alignSelf}
        bgcolor={bgcolor}
        width="16px"
        height="16px"
        borderRadius={variant === "in" ? "0 0 16px 0" : "0 0 0 16px"}
      />
    </Stack>
  );
});

export default ChatBubble;
