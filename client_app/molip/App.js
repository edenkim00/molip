import React from 'react';
import {View, Text} from 'react-native';
import Logo from './src/components/logo';
import LoginPage from './src/pages/LoginPage';

// justify는 flex 주축을 정렬
// items는 flex 교차축을 정렬

function AppContainer() {
  return <LoginPage />;
}

export default AppContainer;
