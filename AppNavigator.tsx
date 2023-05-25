import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

enableScreens();

// Define a type for the root stack param list
type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
};

// Create a Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <SafeAreaProvider>
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Home" component={Home} />
      {/* Main is your new screen component */}
    </Stack.Navigator>
  </SafeAreaProvider>
);

export default AppNavigator;
