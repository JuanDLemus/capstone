import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import { T } from '@/theme';

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

const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

export default function AppNavigator() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: T.surf }}>
        <ActivityIndicator size="large" color={T.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isAuthenticated ? (
        // Authenticated — show app based on role
        user?.role === 'taker' ? (
          <Stack.Screen name="TakerRoot" component={TakerNavigator} />
        ) : (
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        )
      ) : (
        // Not authenticated — show auth flow
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={Reg1Screen} />
          <Stack.Screen name="Reg2" component={Reg2Screen} />
          <Stack.Screen name="Reg3" component={Reg3Screen} />
          <Stack.Screen name="Reg4" component={Reg4Screen} />
          <Stack.Screen name="ForgotPW" component={ForgotPWScreen} />
          <Stack.Screen name="Legal" component={LegalScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
