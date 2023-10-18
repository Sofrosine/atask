import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {FC} from 'react';
import {scale} from '@utils';
import {Colors} from '@styles';

interface Props extends TextInputProps {
  label: string;
  errorMessage?: string;
}

const Input: FC<Props> = props => {
  const {label, errorMessage, style} = props;

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput {...props} style={[styles.inputStyle, style]} />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    gap: scale(2),
  },
  inputStyle: {
    borderWidth: scale(1),
    paddingHorizontal: scale(8),
    paddingVertical: scale(6),
    borderRadius: scale(4),
  },
  errorMessage: {
    fontSize: scale(10),
    color: Colors.RED,
  },
});
