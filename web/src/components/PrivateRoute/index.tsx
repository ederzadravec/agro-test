import React from "react";

import { AuthContext } from "#/contexts";

interface PrivateRouteProps {
  type: "ADMIN" | "COMPANY";
  children: any;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ type, children }) => {
  const { state } = AuthContext.useAuth();

  if (!state.isLogged || state.user?.type !== type) return (window.location.href = "/auth");

  return children;
};

export default PrivateRoute;
