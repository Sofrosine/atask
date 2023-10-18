import {StoreProvider} from '@reducers';
import Main from '@routes';
import React from 'react';

const App = () => {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
};

export default App;
