import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApolloError } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { RegisterInput, LoginInput } from "../../api/interfaces";
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "../../api/mutations";
import { useIsCookiePresent } from "../../api/queries";
interface AuthContextProps {
  authenticated: boolean;
  login: (params: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  register: (params: RegisterInput) => Promise<void>;
  error?: ApolloError | null;
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
  const mainLocation = "/dashboard";

  const [error, setError] = useState<ApolloError | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [registerMutation] = useRegisterMutation();
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const { data } = useIsCookiePresent();

  const [authenticated, setAuthenticated] = useState<boolean>(
    data?.isUserLoggedIn !== null
  );

  useEffect(() => {
    setAuthenticated(data?.isUserLoggedIn !== null);
  }, [data]);

  const login = useCallback(
    async (params: LoginInput) => {
      setLoading(true);
      try {
        const response = await loginMutation({
          variables: { loginUserInput: params },
        });

        if (response.data?.loginUser.userId) {
          setAuthenticated(true);
          navigate(mainLocation);
          navigate(mainLocation, { replace: true });
        }
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    },
    [loginMutation]
  );

  const register = useCallback(
    async (params: RegisterInput) => {
      try {
        const response = await registerMutation({
          variables: { registerUserInput: params },
        });

        if (response.data?.registerUser.userId) {
          setAuthenticated(true);
          navigate(mainLocation);
          navigate(mainLocation, { replace: true });
        }
      } catch (err: any) {
        setError(err);
      }
    },
    [registerMutation]
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation();
      setAuthenticated(false);
      navigate("/");
    } catch (err: any) {
      setError(err);
    }
  }, [logoutMutation]);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        login,
        logout,
        error,
        loading,
        register,
      }}
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
