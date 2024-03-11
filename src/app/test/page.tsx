"use client";

import { chatDoc } from "@/graphql/documents/chat";
import { ChatSubscriptionVariables } from "@/graphql/types";
import { useSubscription } from "urql";

const TestPage = () => {
  const [res] = useSubscription<any, any[], ChatSubscriptionVariables>(
    { query: chatDoc, variables: { roomId: "1" } },
    (previous = [], data) => {
      return [data.chat, ...previous];
    },
  );

  return (
    <div>
      {res.data?.map((item, index) => {
        return <p key={index}>{item.content}</p>;
      })}
    </div>
  );
};

export default TestPage;
