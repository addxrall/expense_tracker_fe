import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { IS_COOKIE_PRESENT } from "../graphql/queries";
import { LOGIN_USER, LOGOUT_USER } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import {
  LoginUserMutationVariables,
  IsUserLoggedInQuery,
  LoginUserMutation,
} from "../graphql/types";
interface AuthContextProps {
  authenticated: boolean;
  login: (
    loginUserInput: LoginUserMutationVariables["loginUserInput"]
  ) => Promise<void>;
  logout: () => void;
  error?: ApolloError;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: any) => {
  const navigate = useNavigate();

  const { data: cookieData } = useQuery<IsUserLoggedInQuery>(IS_COOKIE_PRESENT);

  const [loginUserMutation, { error, loading }] = useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LOGIN_USER);

  const [logoutUserMutation] = useMutation(LOGOUT_USER);

  const [authenticated, setAuthenticated] = useState<boolean>(
    cookieData?.isUserLoggedIn !== null
  );

  useEffect(() => {
    setAuthenticated(cookieData?.isUserLoggedIn !== null);
  }, [cookieData]);

  const login = async (
    loginUserInput: LoginUserMutationVariables["loginUserInput"]
  ) => {
    try {
      const result = await loginUserMutation({
        variables: { loginUserInput },
      });

      console.log(result);
      if (result.data?.loginUser) {
        setAuthenticated(true);

        navigate("/");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await logoutUserMutation();

      setAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, login, logout, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  if (context.authenticated === null && !context.loading) {
    navigate("/login");
  }

  return context;
};