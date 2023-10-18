import HomePage from '@pages/Home';
import NoteDetailPage from '@pages/Note/NoteDetailPage';
import NoteListPage from '@pages/Note';
import SplashPage from '@pages/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<RootParamStackList>();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashPage"
          component={SplashPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NoteDetailPage"
          component={NoteDetailPage}
          options={{title: 'Note Detail'}}
        />
        <Stack.Screen
          name="NoteListPage"
          component={NoteListPage}
          options={{
            title: 'Note List',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
