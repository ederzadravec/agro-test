import React from "react";

import { AuthContext } from "#/contexts";

interface PrivateRouteProps {
  children: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { state } = AuthContext.useAuth();

  React.useEffect(() => {
    if (!state.isLogged || !state.token) {
      window.location.href = "/logout";
    }
  }, []);

  if (state.isLogged) return children;

  return null;
};

export default PrivateRoute;
