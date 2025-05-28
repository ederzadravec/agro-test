export interface IStoreState {
  customer?: {
    _id: string;
    name: string;
  };
}

export interface IStoreValue {
  store: IStoreState;
  setStore: (value: Partial<IStoreState>) => void;
  unsetStore: (field: string) => void;
}
