import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import SubscriptionForm from './SubscriptionForm';

export type RootStackParamList = {
  Home: undefined;
  SubscriptionForm: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SubscriptionForm" component={SubscriptionForm} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
