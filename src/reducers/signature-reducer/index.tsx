import {ActionTypes} from '@constants';

interface InititalSignatureState {
  signature: '';
}

export const initialSignatureState: InititalSignatureState = {
  signature: '',
};

export const signatureReducer = (
  state: InititalSignatureState,
  action: any,
) => {
  switch (action.type) {
    case ActionTypes.SET_SIGNATURE:
      return {...state, signature: action.signature};
    default:
      return state;
  }
};
