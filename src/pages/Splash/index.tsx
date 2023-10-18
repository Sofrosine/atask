import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '@styles';

interface Props {
  navigation: NativeStackNavigationProp<RootParamStackList, 'SplashPage'>;
}

const SplashPage: FC<Props> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomePage');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.pages}>
      <Text>Welcome</Text>
    </View>
  );
};

export default SplashPage;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
