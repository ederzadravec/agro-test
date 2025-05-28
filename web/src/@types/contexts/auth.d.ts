export interface IAuthState {
  token?: string;
  user?: {
    id: string;
    name: string;
    type: "ADMIN" | "COMAPNY";
    company?: {
      name: string;
    };
  };

  isLogged?: boolean;
  keepLogged?: boolean;
}

export interface IAuthValue {
  state: IAuthState;
  setAuth: (value: Partial<IAuthState>) => void;
  setLogout: () => void;
}
