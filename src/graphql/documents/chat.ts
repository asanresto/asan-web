import { gql } from "urql";

export const messageDoc = gql`
  subscription Message {
    message {
      id
      content
    }
  }
`;

export const createChatRoomDoc = gql`
  mutation CreateChatRoom($userIds: [String!]!) {
    createChatRoom(userIds: $userIds)
  }
`;

export const sendMessageDoc = gql`
  mutation SendMessage($roomId: String!, $message: String!) {
    sendMessage(message: $message, roomId: $roomId)
  }
`;
