import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '@/screens/Settings/Settings';
import GPSScreen from '@/screens/Settings/GPS';
import OfflineScreen from '@/screens/Settings/Offline';

const Stack = createNativeStackNavigator();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
      <Stack.Screen name="GPS" component={GPSScreen} />
      <Stack.Screen name="Offline" component={OfflineScreen} />
    </Stack.Navigator>
  );
}
