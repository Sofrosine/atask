import Input from '@components/Input';
import {Storage} from '@constants';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Store} from '@reducers';
import {Colors} from '@styles';
import {MMKVStorage, scale, showToast, useForm} from '@utils';
import React, {FC, useContext, useEffect} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';

interface Props {
  navigation: NativeStackNavigationProp<RootParamStackList, 'NoteDetailPage'>;
  route: RouteProp<RootParamStackList, 'NoteDetailPage'>;
}

const NoteDetailPage: FC<Props> = ({navigation, route}) => {
  const {data} = route.params || {};

  const {signature: signatureStore} = useContext(Store);

  const [signatureData] = signatureStore;

  const [form, setForm] = useForm({
    title: '',
    content: '',
  });

  const [errorForm, setErrorForm] = useForm({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (data) {
      setForm({title: data?.title, content: data?.content});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    let isValidate = true;

    if (!form.title) {
      setErrorForm({title: 'This field is required'});
      isValidate = false;
    }

    if (!form.content) {
      setErrorForm({content: 'This field is required'});
      isValidate = false;
    }

    return isValidate;
  };

  const handleSubmit = () => {
    if (validate()) {
      let notes: any = MMKVStorage.getItem(
        Storage.NOTES + `_${signatureData?.signature}`,
      );

      if (notes) {
        notes = JSON.parse(notes);
      } else {
        notes = [];
      }
      if (data) {
        const currentDataIndex = notes.findIndex(
          (val: Note) => val?.created_at === data?.created_at,
        );
        notes[currentDataIndex] = {
          title: form?.title,
          content: form?.content,
          created_at: new Date(),
        };
      } else {
        notes.push({
          title: form?.title,
          content: form?.content,
          created_at: new Date(),
        });
      }

      notes = JSON.stringify(notes);
      MMKVStorage.setItem(
        Storage.NOTES + `_${signatureData?.signature}`,
        notes,
      );
      showToast('Add note success');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.pages}>
      <ScrollView contentContainerStyle={styles.contentStyle}>
        <Input
          label="Title"
          placeholder="Write title here..."
          value={form.title}
          onChangeText={val => {
            setForm({title: val});
            if (errorForm.title) {
              setErrorForm({title: ''});
            }
          }}
          errorMessage={errorForm?.title}
        />
        <Input
          label="Content"
          placeholder="Write content here..."
          multiline
          style={styles.contentInput}
          textAlignVertical="top"
          value={form.content}
          onChangeText={val => {
            setForm({content: val});
            if (errorForm.content) {
              setErrorForm({content: ''});
            }
          }}
          errorMessage={errorForm?.content}
        />
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          onPress={handleSubmit}
          title={data ? 'Edit Note' : 'Add Note'}
        />
      </View>
    </View>
  );
};

export default NoteDetailPage;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentStyle: {
    padding: scale(20),
    gap: scale(8),
  },
  contentInput: {
    height: scale(200),
  },
  btnContainer: {
    padding: scale(16),
  },
});
