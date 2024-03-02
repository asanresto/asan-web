"use client";

import { gql, useSubscription } from "urql";

const doc = gql`
  subscription Chat {
    chat(roomId: "1") {
      id
      content
    }
  }
`;

const TestPage = () => {
  const [res] = useSubscription<any, any[]>({ query: doc }, (previous = [], data) => {
    return [data.chat, ...previous];
  });

  return (
    <div>
      {res.data?.map((item, index) => {
        return <p key={index}>{item.content}</p>;
      })}
    </div>
  );
};

export default TestPage;
