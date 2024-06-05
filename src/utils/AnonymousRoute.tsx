import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext/AuthContext";
import { ReactNode } from "react";

const AnonymousRoute = ({ children }: { children: ReactNode }) => {
  const { authenticated, loading } = useAuth();

  return authenticated && !loading ? (
    <Navigate to="/" replace={true} />
  ) : (
    children
  );
};

export default AnonymousRoute;
