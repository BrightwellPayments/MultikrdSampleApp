import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/login_screen';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );
};

export default App;