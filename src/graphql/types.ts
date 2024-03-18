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
  Any: { input: any; output: any; }
  Time: { input: any; output: any; }
  Upload: { input: File; output: string; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  accessTokenTtl: Scalars['Int']['output'];
  refreshToken: Scalars['String']['output'];
  refreshTokenTtl: Scalars['Int']['output'];
};

export type ChangePasswordPayload = {
  confirmPassword: Scalars['String']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  id: Scalars['ID']['output'];
};

export type FieldFilterInput = {
  contains?: InputMaybe<Scalars['Any']['input']>;
  eq?: InputMaybe<Scalars['Any']['input']>;
  exists?: InputMaybe<Scalars['Any']['input']>;
  gt?: InputMaybe<Scalars['Any']['input']>;
  gte?: InputMaybe<Scalars['Any']['input']>;
  in?: InputMaybe<Scalars['Any']['input']>;
  like?: InputMaybe<Scalars['Any']['input']>;
  lt?: InputMaybe<Scalars['Any']['input']>;
  lte?: InputMaybe<Scalars['Any']['input']>;
  ne?: InputMaybe<Scalars['Any']['input']>;
  notIn?: InputMaybe<Scalars['Any']['input']>;
};

export type LoginPayload = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Media = {
  __typename?: 'Media';
  alt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  senderId?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean']['output'];
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


export type MutationChangePasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
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
  refreshToken?: InputMaybe<Scalars['String']['input']>;
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


export type MutationUpdateAccountArgs = {
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  images?: InputMaybe<Array<InputMaybe<Scalars['Upload']['input']>>>;
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

export type OrderAndInput = {
  and?: InputMaybe<Array<InputMaybe<OrderFilterInput>>>;
};

export type OrderFilterInput = {
  id?: InputMaybe<FieldFilterInput>;
  total?: InputMaybe<FieldFilterInput>;
};

export type OrderFiltersInput = {
  where?: InputMaybe<Array<InputMaybe<OrderOrInput>>>;
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

export type OrderOrInput = {
  or?: InputMaybe<Array<InputMaybe<OrderAndInput>>>;
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  count?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Maybe<Product>>>;
  limit?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
};

export type Product = {
  __typename?: 'Product';
  createdAt?: Maybe<Scalars['Time']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

export type ProductAndInput = {
  and?: InputMaybe<Array<InputMaybe<ProductFilterInput>>>;
};

export type ProductFilterInput = {
  createdAt?: InputMaybe<FieldFilterInput>;
  description?: InputMaybe<FieldFilterInput>;
  id?: InputMaybe<FieldFilterInput>;
  name?: InputMaybe<FieldFilterInput>;
  price?: InputMaybe<FieldFilterInput>;
};

export type ProductFiltersInput = {
  where?: InputMaybe<ProductOrInput>;
};

export type ProductOrInput = {
  or?: InputMaybe<Array<InputMaybe<ProductAndInput>>>;
};

export type Query = {
  __typename?: 'Query';
  chatRooms: Array<ChatRoom>;
  me?: Maybe<User>;
  messages: Array<Message>;
  products?: Maybe<PaginatedProducts>;
  users: Array<User>;
};


export type QueryMessagesArgs = {
  roomId: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  filter?: InputMaybe<ProductFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
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


export type MessageSubscription = { __typename?: 'Subscription', message: { __typename?: 'Message', id: string, content: string, senderId?: string | null } };

export type CreateChatRoomMutationVariables = Exact<{
  userIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateChatRoomMutation = { __typename?: 'Mutation', createChatRoom: boolean };

export type SendChatMessageMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type SendChatMessageMutation = { __typename?: 'Mutation', sendChatMessage: boolean };

export type ProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<ProductFiltersInput>;
  sort?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsQuery = { __typename?: 'Query', products?: { __typename?: 'PaginatedProducts', page?: number | null, limit?: number | null, count?: number | null, items?: Array<{ __typename?: 'Product', id: string, name: string, price: number, description?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null } | null> | null } | null };

export type CreateProductMutationVariables = Exact<{
  input: NewProduct;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string, price: number, description?: string | null, status?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type UpdateAccountMutationVariables = Exact<{
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, id: string, name?: string | null, avatarUrl?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, accessTokenTtl: number, refreshTokenTtl: number } };

export type LogoutMutationVariables = Exact<{
  refreshToken?: InputMaybe<Scalars['String']['input']>;
}>;


export type LogoutMutation = { __typename?: 'Mutation', logOut: boolean };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, accessTokenTtl: number, refreshTokenTtl: number } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name?: string | null, email: string, avatarUrl?: string | null }> };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };
