export interface IAuthState {
  token?: string;
  isLogged?: boolean;
}

export interface IAuthValue {
  state: IAuthState;
  setAuth: (value: Partial<IAuthState>) => void;
  setLogout: () => void;
}
