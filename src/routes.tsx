import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { setNavigator } from './services/navigate';

import Welcome from './pages/Welcome';
import Login from './pages/Login';

const RootStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer ref={setNavigator}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Welcome" component={Welcome} />
        <RootStack.Screen name="Login" component={Login} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}