import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from './components/Onboarding';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from './TabNavigator';
import SubscriptionForm from './components/SubscriptionForm';
import SettingsModal from './components/Settings'; // Ensure this is the correct path
import {Button} from 'react-native';

enableScreens();

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  SubscriptionForm: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    console.log('Logout');
    setModalVisible(false);
    // Implement logout logic here
    // e.g., navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={({navigation}) => ({
            headerLeft: () => null, // Optionally hide the back button
            headerRight: () => (
              <Button
                onPress={() => setModalVisible(true)}
                title="Settings"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen name="SubscriptionForm" component={SubscriptionForm} />
      </Stack.Navigator>
      {modalVisible && (
        <SettingsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onLogout={handleLogout}
        />
      )}
    </SafeAreaProvider>
  );
};

export default AppNavigator;
