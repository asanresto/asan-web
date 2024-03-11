import { gql } from "urql";

export const chatDoc = gql`
  subscription Chat($roomId: String!) {
    chat(roomId: $roomId) {
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
