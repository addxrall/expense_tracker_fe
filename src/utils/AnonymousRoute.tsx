import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext/AuthContext";
import { ReactNode } from "react";

const AnonymousRoute = ({ children }: { children: ReactNode }) => {
  const { authenticated, loading } = useAuth();

  if (authenticated && !loading) return <Navigate to="/" replace={true} />;
  return children;
};

export default AnonymousRoute;
