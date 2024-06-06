export type ID = string | number;

export interface RegisterInput {
  email: string;
  password: string;
  username: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginUserMutation {
  loginUser: {
    message: string;
    userId: string;
  };
}

export interface LoginUserMutationVariables {
  loginUserInput: LoginInput;
}

export interface RegisterUserMutation {
  registerUser: {
    userId: ID;
  };
}

export interface RegisterUserMutationVariables {
  registerUserInput: RegisterInput;
}
