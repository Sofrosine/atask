import CardNote from '@components/Card/CardNote';
import {Storage} from '@constants';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Store} from '@reducers';
import {Colors} from '@styles';
import {MMKVStorage, scale} from '@utils';
import React, {FC, useCallback, useContext, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  navigation: NativeStackNavigationProp<RootParamStackList, 'NoteListPage'>;
}

const NoteListPage: FC<Props> = ({navigation}) => {
  const {signature: signatureStore} = useContext(Store);

  const [signatureData] = signatureStore;

  const [notes, setNotes] = useState<Note[]>([]);

  useFocusEffect(
    useCallback(() => {
      getNotes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const getNotes = () => {
    const notesStorage = MMKVStorage.getItem(
      Storage.NOTES + `_${signatureData?.signature}`,
    );
    setNotes(notesStorage ? JSON.parse(notesStorage) : []);
  };

  return (
    <View style={styles.pages}>
      <FlatList
        data={notes}
        keyExtractor={i => i?.created_at?.toString()}
        renderItem={({item}) => <CardNote item={item} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        contentContainerStyle={styles.contentContainer}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('NoteDetailPage')}
        activeOpacity={0.8}
        style={styles.btnAdd}>
        <Text style={styles.btnAddText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteListPage;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  divider: {
    marginBottom: scale(12),
  },
  contentContainer: {
    padding: scale(20),
  },
  btnAdd: {
    backgroundColor: Colors.DARK_BLUE,
    height: scale(60),
    width: scale(60),
    borderRadius: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: scale(24),
    bottom: scale(24),
    elevation: 2,
  },
  btnAddText: {
    color: Colors.WHITE,
    fontSize: scale(32),
  },
});
