import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '@/screens/Auth/Welcome';
import LoginScreen from '@/screens/Auth/Login';
import Reg1Screen from '@/screens/Auth/Reg1';
import Reg2Screen from '@/screens/Auth/Reg2';
import Reg3Screen from '@/screens/Auth/Reg3';
import Reg4Screen from '@/screens/Auth/Reg4';
import ForgotPWScreen from '@/screens/Auth/ForgotPW';
import LegalScreen from '@/screens/Auth/Legal';
import MainTabNavigator from './MainTabNavigator';
import TakerNavigator from './TakerNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Reg1Screen} />
      <Stack.Screen name="Reg2" component={Reg2Screen} />
      <Stack.Screen name="Reg3" component={Reg3Screen} />
      <Stack.Screen name="Reg4" component={Reg4Screen} />
      <Stack.Screen name="ForgotPW" component={ForgotPWScreen} />
      <Stack.Screen name="Legal" component={LegalScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="TakerRoot" component={TakerNavigator} />
    </Stack.Navigator>
  );
}
