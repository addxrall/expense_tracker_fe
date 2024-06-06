import { gql, useMutation } from "@apollo/client";
import {
  RemoveUserAccountMutation,
  RemoveUserAccountMutationVariables,
} from "../interfaces";

export const REMOVE_USER_ACCOUNT = gql`
  mutation RemoveUserAccount($userId: Int!) {
    removeUserAccount(userId: $userId) {
      message
    }
  }
`;

export const useRemoveUserAccount = () =>
  useMutation<RemoveUserAccountMutation, RemoveUserAccountMutationVariables>(
    REMOVE_USER_ACCOUNT
  );
