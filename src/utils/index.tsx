import {useState} from 'react';
import {
  Alert,
  Dimensions,
  PixelRatio,
  Platform,
  ToastAndroid,
} from 'react-native';

export {default as MMKVStorage} from '@utils/MMKVStorage';

const DESIGN_WIDTH = 360;

export const deviceWidth = () => Dimensions.get('window').width;

export const deviceHeight = () => Dimensions.get('window').height;

export const scale = (size: number): number => {
  return Math.round(
    PixelRatio.roundToNearestPixel((size * deviceWidth()) / DESIGN_WIDTH),
  );
};

export function useForm(initialState: any) {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: any) =>
    setState((prevState: any) => Object.assign({}, prevState, newState));
  return [state, setMergedState];
}

export const showToast = (message: string = '') => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      80,
    );
  } else {
    Alert.alert(message);
  }
};
