import React, {FC, useContext, useState} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ReactNativeBiometrics from 'react-native-biometrics';

import {setSignature} from '@actions';
import Input from '@components/Input';
import {Store} from '@reducers';
import {Colors} from '@styles';
import {scale} from '@utils';

interface Props {
  navigation: NativeStackNavigationProp<RootParamStackList, 'SplashPage'>;
}

const HomePage: FC<Props> = ({navigation}) => {
  const {signature: signatureStore} = useContext(Store);

  const [, setSignatureData] = signatureStore;

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const validate = () => {
    let isValidate = true;

    if (!password) {
      setErrorPassword('This field is required');
      isValidate = false;
    }

    return isValidate;
  };

  const handleSignIn = async () => {
    if (validate()) {
      const rnBiometrics = new ReactNativeBiometrics();
      const {available} = await rnBiometrics.isSensorAvailable();

      rnBiometrics
        .biometricKeysExist()
        .then(async resultObject => {
          const {keysExist} = resultObject;
          if (keysExist) {
            console.log('Keys exist');
          } else {
            await rnBiometrics.createKeys();
          }
        })
        .catch(() => {
          Alert.alert(
            'There is a problem when check biometric keys, please check your device',
          );
        });
      if (available) {
        const {success, signature} = await rnBiometrics.createSignature({
          promptMessage: 'Sign in',
          payload: password,
        });
        if (success && signature) {
          setSignatureData(setSignature(signature));
          navigation.replace('NoteListPage');
        } else {
          Alert.alert('Failed to create signature');
        }
      } else {
        Alert.alert('Your device is not support for biometric authentication');
      }
    }
  };

  return (
    <View style={styles.pages}>
      <View style={styles.content}>
        <Input
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={val => {
            setPassword(val);
            if (errorPassword) {
              setErrorPassword('');
            }
          }}
          errorMessage={errorPassword}
        />
        <Button title="Sign in" onPress={handleSignIn} />
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
  content: {
    gap: scale(24),
    width: '100%',
  },
});
