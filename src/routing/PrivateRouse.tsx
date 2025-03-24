import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { CircularProgress } from "@mui/material";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
