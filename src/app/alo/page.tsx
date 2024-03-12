"use client";

import { messageDoc } from "@/graphql/documents/chat";
import { MessageSubscription, MessageSubscriptionVariables } from "@/graphql/types";
import { getCookie } from "@/utils/cookie";
import { useEffect, useMemo } from "react";
import { useSubscription } from "urql";

const TestPage = () => {
  const [res, start] = useSubscription<MessageSubscription, any, MessageSubscriptionVariables>(
    {
      query: messageDoc,
      pause: true,
      context: useMemo(() => {
        return {
          fetchOptions: { headers: { Authorization: `Bearer ${getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)}` } },
        };
      }, []),
    },
    (previous, data: MessageSubscription) => {
      // if (data) {
      //   setData((previous) => {
      //     return [...previous, { content: data.message?.content }];
      //   });
      // }
      return;
    },
  );

  useEffect(() => {
    start();
  }, []);

  return <div>TestPage</div>;
};

export default TestPage;
