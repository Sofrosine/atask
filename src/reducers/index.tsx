import {createContext, useReducer} from 'react';
import {
  initialSignatureState,
  signatureReducer,
} from '@reducers/signature-reducer';

interface Props {
  children: any;
}

export const Store = createContext<any>(null);

export const StoreProvider = (props: Props) => {
  const mainReducer = {
    signature: useReducer(signatureReducer, initialSignatureState),
  };
  return <Store.Provider value={mainReducer}>{props.children}</Store.Provider>;
};
