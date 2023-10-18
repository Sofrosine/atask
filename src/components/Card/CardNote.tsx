import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Colors} from '@styles';
import {scale} from '@utils';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  item: Note;
}

const CardNote: FC<Props> = ({item}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootParamStackList, 'NoteListPage'>
    >();

  return (
    <TouchableOpacity
      testID="card-note-container"
      onPress={() =>
        navigation.navigate('NoteDetailPage', {
          data: item,
        })
      }
      style={styles.container}>
      <Text numberOfLines={2} style={styles.title}>
        {item?.title}
      </Text>
      <Text numberOfLines={3}>{item?.content}</Text>
    </TouchableOpacity>
  );
};

export default CardNote;

const styles = StyleSheet.create({
  container: {
    padding: scale(8),
    borderRadius: scale(8),
    backgroundColor: Colors.WHITE,
    elevation: 2,
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});
