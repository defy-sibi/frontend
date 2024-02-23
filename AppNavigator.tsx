import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from './components/Onboarding';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from './TabNavigator';
import Home from './components/Home';
import SubscriptionForm from './components/SubscriptionForm';
enableScreens();

// Define a type for the root stack param list
export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  SubscriptionForm: undefined;
};

// Create a Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <SafeAreaProvider>
    <Stack.Navigator initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false, // Hide the header
      }}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false, // Hide the header for the Onboarding screen
        }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerLeft: () => null, // Hide the back button
        }}
      />
      {/* Main is your new screen component */}
    </Stack.Navigator>
    <Stack.Screen name="SubscriptionForm" component={SubscriptionForm} />
  </SafeAreaProvider>
);

export default AppNavigator;
