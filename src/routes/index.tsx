import React from "react";
import { useAuth } from "../contexts/auth";
import Loading from "../pages/Loading";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
