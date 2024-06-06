import { gql, useMutation } from "@apollo/client";
import {
  LoginUserMutation,
  LoginUserMutationVariables,
  RegisterUserMutation,
  RegisterUserMutationVariables,
} from "../interfaces";

export const LOGIN_USER = gql`
  mutation Mutation($loginUserInput: LoginUserInput) {
    loginUser(loginUserInput: $loginUserInput) {
      message
      userId
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Mutation {
    logoutUser {
      message
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($registerUserInput: RegisterUserInput) {
    registerUser(registerUserInput: $registerUserInput) {
      id
    }
  }
`;

export const useRegisterMutation = () =>
  useMutation<RegisterUserMutation, RegisterUserMutationVariables>(
    REGISTER_USER
  );

export const useLoginMutation = () =>
  useMutation<LoginUserMutation, LoginUserMutationVariables>(LOGIN_USER);

export const useLogoutMutation = () => useMutation(LOGOUT_USER);
