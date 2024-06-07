import { gql, useQuery } from "@apollo/client";
import { GetExpensesByUserIdData, ID } from "../interfaces";

export const GET_EXPENSES_BY_USER_ID = gql`
  query Query($userId: Int!) {
    getExpensesByUserId(userId: $userId) {
      amount
      description
      id
      name
      tags
      updatedAt
      createdAt
    }
  }
`;

export const useGetExpensesByUserId = (userId: ID) =>
  useQuery<GetExpensesByUserIdData>(GET_EXPENSES_BY_USER_ID, {
    variables: { userId },
    skip: !userId,
  });
