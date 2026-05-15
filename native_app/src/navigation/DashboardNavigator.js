import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '@/screens/Main/DashboardScreen';
import WeeklySummaryScreen from '@/screens/Dashboard/WeeklySummary';
import HealthNavigator from './HealthNavigator';

const Stack = createNativeStackNavigator();

export default function DashboardNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="DashboardMain" component={DashboardScreen} />
      <Stack.Screen name="WeeklySummary" component={WeeklySummaryScreen} />
      <Stack.Screen name="HealthHub" component={HealthNavigator} />
    </Stack.Navigator>
  );
}
