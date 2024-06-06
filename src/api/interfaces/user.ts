import { ID } from "./auth";

export interface IsUserLoggedInQuery {
  isUserLoggedIn: {
    email: string | null;
    userId: ID | null;
  };
}

export interface GetCurrentUserQuery {
  currentUser: {
    email?: string;
    username?: string;
    userId?: ID;
  };
}

export interface GetUserByIdQuery {
  user: {
    email: string;
    username: string;
  };
}

export interface GetUserByIdVariables {
  userId: ID;
}

export interface RemoveUserAccountMutation {
  removeUserAccount: {
    message: string;
  };
}

export interface RemoveUserAccountMutationVariables {
  userId: ID;
}
