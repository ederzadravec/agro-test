import React from "react";

import { AuthContext } from "#/contexts";

const Logout: React.FC = () => {
  const { setLogout } = AuthContext.useAuth();

  React.useEffect(() => {
    setLogout();
    window.location.href = "/";
  }, []);

  return null;
};

export default Logout;
