"use client";

import { ArrowCurveBottomLeft } from "@/assets";
import { Box, Button, Stack } from "@mui/material";
import { useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageContainer from "./MessageContainer";
import { VListHandle } from "virtua";
import { useMutation, useSubscription } from "urql";
import { ChatSubscriptionVariables, CreateChatRoomMutation, CreateChatRoomMutationVariables } from "@/graphql/types";
import { chatDoc, createChatRoomDoc } from "@/graphql/documents/chat";
import { useSearchParams } from "next/navigation";

const Chat = () => {
  // const [res] = useSubscription<any, any[], ChatSubscriptionVariables>(
  //   { query: chatDoc, variables: { roomId: "1" } },
  //   (previous = [], data) => {
  //     return [data.chat, ...previous];
  //   },
  // );
  const messageContainerRef = useRef<VListHandle | null>(null);
  const [data, setData] = useState<{ content: string }[]>([]);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [createChatRoomResult, createChatRoom] = useMutation<CreateChatRoomMutation, CreateChatRoomMutationVariables>(
    createChatRoomDoc,
  );

  return (
    <>
      <MessageContainer
        ref={messageContainerRef}
        initialData={data}
        onLoadMore={(data) => {
          setData((previous) => {
            return [...data, ...previous];
          });
        }}
      />
      <Box p={3}>
        <Stack
          direction="row"
          spacing="24px"
          p={3}
          borderRadius="32px"
          width="100%"
          bgcolor="#F7F4F2"
          alignItems="center"
        >
          <Box
            component="label"
            flex={1}
            alignSelf="stretch"
            display="flex"
            alignItems="center"
            sx={{ cursor: "text" }}
          >
            <ChatInput
              maxRows={3}
              placeholder="Type your message here"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </Box>
          <Button
            sx={{ bgcolor: "#9BB068", width: "64px", height: "64px", borderRadius: "32px" }}
            disabled={!message}
            onClick={async () => {
              if (!data.length) {
                await createChatRoom({ userIds: [] });
              }
              setData((prevData) => {
                return [...prevData, { content: message }];
              });
              setMessage("");
              messageContainerRef.current?.scrollToIndex(data.length);
            }}
          >
            <ArrowCurveBottomLeft width="32px" height="32px" />
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Chat;
