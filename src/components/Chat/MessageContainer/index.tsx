"use client";

import { Box } from "@mui/material";
import { forwardRef, useEffect, useRef } from "react";
import { VList, VListHandle } from "virtua";

import { Message } from "@/graphql/types";

import ChatBubble from "../ChatBubble";

const MessageContainer = forwardRef<
  VListHandle | null,
  {
    initialData: Message[];
    onLoadMore?: (data: Message[]) => void;
  }
>(function MessageContainer({ initialData, onLoadMore }, ref) {
  const ref2 = useRef<VListHandle | null>(null);

  useEffect(() => {
    ref2.current?.scrollToIndex(initialData.length - 1);
  }, []);

  return (
    <VList
      ref={(element) => {
        ref2.current = element;
        if (typeof ref === "function") {
          ref?.(element);
        } else if (ref) {
          ref.current = element;
        }
      }}
      count={initialData.length}
      reverse
      style={{ padding: "24px", paddingBottom: 0 }}
      onRangeChange={async (startIndex, endIndex) => {
        // console.log("onRangeChange", startIndex, endIndex);
        if (startIndex === 0) {
          // onLoadMore?.();
        }
      }}
    >
      {initialData.map((item, index) => {
        return <ChatBubble key={index} message={item} />;
      })}
    </VList>
  );
});

export default MessageContainer;
