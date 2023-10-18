import {ActionTypes} from '@constants';

export const setSignature = (signature: string) => {
  return {
    type: ActionTypes.SET_SIGNATURE,
    signature,
  };
};
