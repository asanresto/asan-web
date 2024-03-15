"use client";

import { ArrowCurveBottomLeft } from "@/assets";
import { createChatRoomDoc, messageDoc, sendMessageDoc } from "@/graphql/documents/chat";
import {
  CreateChatRoomMutation,
  CreateChatRoomMutationVariables,
  Message,
  MessageSubscription,
  MessageSubscriptionVariables,
  SendMessageMutation,
  SendMessageMutationVariables,
} from "@/graphql/types";
import { getCookie } from "@/utils/cookie";
import { Box, Button, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useSubscription } from "urql";
import { VListHandle } from "virtua";
import ChatInput from "./ChatInput";
import MessageContainer from "./MessageContainer";

const Chat = () => {
  const messageContainerRef = useRef<VListHandle | null>(null);
  const [data, setData] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [createChatRoomResult, createChatRoom] = useMutation<CreateChatRoomMutation, CreateChatRoomMutationVariables>(
    createChatRoomDoc,
  );
  const [sendMessageResult, sendMessage] = useMutation<SendMessageMutation, SendMessageMutationVariables>(
    sendMessageDoc,
  );

  const [res, start] = useSubscription<MessageSubscription, any, MessageSubscriptionVariables>(
    { query: messageDoc },
    (previous, data: MessageSubscription) => {
      if (data) {
        setData((previous) => {
          return [
            ...previous,
            { content: data.message?.content, senderId: data.message.senderId, id: data.message.id },
          ];
        });
      }
      return;
    },
  );

  return (
    <>
      <MessageContainer
        ref={messageContainerRef}
        initialData={data}
        onLoadMore={(data) => {
          // setData((previous) => {
          //   return [...data, ...previous];
          // });
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
              // if (!data.length) {
              //   await createChatRoom({ userIds: [] });
              // }
              // setData((prevData) => {
              //   return [...prevData, { content: message }];
              // });
              await sendMessage({ message: message, roomId: "1" });
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
