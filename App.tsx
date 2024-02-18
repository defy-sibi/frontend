import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import {ThemeProvider} from '@rneui/themed';

const theme = {
  lightColors: {
    primary: 'red',
  },
  darkColors: {
    primary: 'blue',
  },
  components: {
    Button: {
      raised: true,
    },
  },
};

const App = () => (
  <ThemeProvider theme={theme}>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </ThemeProvider>
);

export default App;
