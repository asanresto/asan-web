import { gql } from "@urql/next";

// export const updateAccountDoc = gql`
//   mutation Account($name: String, $avatar: CroppedFile, $deleteAvatar: Boolean) {
//     account(name: $name, avatar: $avatar, deleteAvatar: $deleteAvatar)
//   }
// `;

export const getMeDoc = gql`
  query Me {
    me {
      # avatar
      # email
      id
      name
    }
  }
`;

export const loginDoc = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      accessTokenTtl
      refreshTokenTtl
    }
  }
`);

export const logoutDoc = gql`
  mutation Logout($refreshToken: String!) {
    logOut(refreshToken: $refreshToken)
  }
`;

// export const changePasswordDoc = gql`
//   mutation ChangePassword($currentPassword: String!, $newPassword: String!, $confirmPassword: String!) {
//     changePassword(currentPassword: $currentPassword, newPassword: $newPassword, confirmPassword: $confirmPassword)
//   }
// `;
