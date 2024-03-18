import { gql } from "@urql/next";

export const updateAccountDoc = gql`
  mutation UpdateAccount($avatar: Upload, $name: String) {
    updateAccount(avatar: $avatar, name: $name)
  }
`;

export const getMeDoc = gql`
  query Me {
    me {
      email
      id
      name
      avatarUrl
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
  mutation Logout($refreshToken: String) {
    logOut(refreshToken: $refreshToken)
  }
`;

export const refreshTokenDoc = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      accessTokenTtl
      refreshTokenTtl
    }
  }
`;

export const getUsersDoc = gql`
  query Users {
    users {
      id
      name
      email
      avatarUrl
    }
  }
`;

export const changePasswordDoc = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!, $confirmPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword, confirmPassword: $confirmPassword)
  }
`;
