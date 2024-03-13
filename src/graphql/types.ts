export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  accessTokenTtl: Scalars['Int']['output'];
  refreshToken: Scalars['String']['output'];
  refreshTokenTtl: Scalars['Int']['output'];
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  id: Scalars['ID']['output'];
};

export type LoginPayload = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChatRoom: Scalars['Boolean']['output'];
  createOrder: Order;
  createProduct: Product;
  forgotPassword: Scalars['Boolean']['output'];
  logOut: Scalars['Boolean']['output'];
  login: AuthResponse;
  refreshToken: AuthResponse;
  resetPassword: Scalars['Boolean']['output'];
  sendChatMessage: Scalars['Boolean']['output'];
  signUp: Scalars['Boolean']['output'];
  updateAccount: Scalars['Boolean']['output'];
};


export type MutationCreateChatRoomArgs = {
  userIds: Array<Scalars['String']['input']>;
};


export type MutationCreateOrderArgs = {
  input: NewOrder;
};


export type MutationCreateProductArgs = {
  input: NewProduct;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLogOutArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  resetPasswordToken: Scalars['String']['input'];
};


export type MutationSendChatMessageArgs = {
  message: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  input: SignUpPayload;
};

export type NewOrder = {
  items: Array<NewOrderItem>;
  name: Scalars['String']['input'];
};

export type NewOrderItem = {
  note?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};

export type NewProduct = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Order = {
  __typename?: 'Order';
  createdBy: User;
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  total: Scalars['Float']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  product: Product;
  quantity: Scalars['Int']['output'];
  subtotal: Scalars['Float']['output'];
  user: User;
};

export type Product = {
  __typename?: 'Product';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  chatRooms: Array<ChatRoom>;
  me?: Maybe<User>;
  messages: Array<Message>;
  products: Array<Product>;
  users: Array<User>;
};


export type QueryMessagesArgs = {
  roomId: Scalars['String']['input'];
};

export type SignUpPayload = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  message: Message;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type MessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSubscription = { __typename?: 'Subscription', message: { __typename?: 'Message', id: string, content: string } };

export type CreateChatRoomMutationVariables = Exact<{
  userIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateChatRoomMutation = { __typename?: 'Mutation', createChatRoom: boolean };

export type SendMessageMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendChatMessage: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, accessTokenTtl: number, refreshTokenTtl: number } };

export type LogoutMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logOut: boolean };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, accessTokenTtl: number, refreshTokenTtl: number } };
