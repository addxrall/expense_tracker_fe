import { gql, useQuery } from "@apollo/client";
import {
  GetCurrentUserQuery,
  GetUserByIdQuery,
  GetUserByIdVariables,
  ID,
} from "../interfaces";

const GET_USER_BY_ID = gql`
  query Query($userId: Int!) {
    user(id: $userId) {
      email
      username
    }
  }
`;

const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      email
      username
      userId
    }
  }
`;

export const useGetUserById = (userId: ID) =>
  useQuery<GetUserByIdQuery, GetUserByIdVariables>(GET_USER_BY_ID, {
    variables: { userId },
  });

export const useGetCurrentUser = () => {
  const { data, loading, error } =
    useQuery<GetCurrentUserQuery>(GET_CURRENT_USER);

  const email = data?.currentUser?.email;
  const username = data?.currentUser?.username;
  const userId = data?.currentUser?.userId;

  return { data, loading, error, email, username, userId };
};
