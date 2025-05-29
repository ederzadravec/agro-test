import React from "react";

import { Loader } from "#/components";
import { useState } from "#/hooks";
import type * as Types from "types/contexts/auth";

interface AuthContextProps {
  children: any;
}

const AuthContext = React.createContext<Types.IAuthValue>({
  state: {},
  setAuth: () => null,
  setLogout: () => null,
});

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [state, setState] = useState<Types.IAuthState>({});
  const [loaded, setLoaded] = useState<boolean>(false);

  const setLogout = (redirect: boolean = true) => {
    localStorage.removeItem("auth");
    setState(() => ({}));

    if (redirect) window.location.href = "/auth";
  };

  const setAuth = async (data: Types.IAuthState) => {
    localStorage.setItem("auth", JSON.stringify(data));

    setState({ ...data });
  };

  React.useEffect(() => {
    const json = localStorage.getItem("auth");

    if (!json) {
      setLoaded(true);
      setLogout(false);

      return;
    }

    const data = JSON.parse(json) as Types.IAuthState;

    if (!data) {
      setLoaded(true);
      setLogout();

      return;
    }

    setState({ ...data });
    setLoaded(true);
  }, []);

  const value = {
    state,
    setAuth: (data: Partial<Types.IAuthState>) => setAuth(data),
    setLogout,
  };

  if (!loaded) return <Loader />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default {
  Provider: AuthProvider,
  Consumer: AuthContext.Consumer,
  useAuth: () => React.useContext(AuthContext),
};
