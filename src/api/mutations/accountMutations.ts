import { gql, useMutation } from "@apollo/client";
import { ID } from "../interfaces";

export const REMOVE_USER_ACCOUNT = gql`
  mutation RemoveUserAccount($userId: Int!) {
    removeUserAccount(userId: $userId) {
      message
    }
  }
`;

interface RemoveUserAccountMutation {
  removeUserAccount: {
    message: string;
  };
}

interface RemoveUserAccountMutationVariables {
  userId: ID;
}

export const useRemoveUserAccount = () =>
  useMutation<RemoveUserAccountMutation, RemoveUserAccountMutationVariables>(
    REMOVE_USER_ACCOUNT
  );
