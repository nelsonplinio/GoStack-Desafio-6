import React from 'react';
import { StatusBar } from 'react-native';
import './config/reactotronConfig';

import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#7159c1" barStyle="light-content" />
      <Routes />
    </>
  );
};

export default App;
