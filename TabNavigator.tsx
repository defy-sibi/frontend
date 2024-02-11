import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/Home';
import SubscriptionForm from './components/SubscriptionForm';
import LiveChat from './components/Livechat';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TabNavigatorParamList = {
  Home: undefined;
  LiveChat: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false, // This hides the header globally for all screens in this navigator
      }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="SubscriptionForm" component={SubscriptionForm} />
    </HomeStack.Navigator>
  );
}


const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'LiveChat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen
        name="LiveChat"
        component={LiveChat}
        options={{tabBarLabel: 'Live Chat'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
