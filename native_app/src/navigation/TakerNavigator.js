import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TakerHomeScreen from '@/screens/Taker/TakerHome';
import ClinicalBIScreen from '@/screens/Taker/ClinicalBI';
import AIFlagsScreen from '@/screens/Taker/AIFlags';
import DrReportScreen from '@/screens/Taker/DrReport';
import RAGChatScreen from '@/screens/Taker/RAGChat';

const Stack = createNativeStackNavigator();

export default function TakerNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="TakerMain" component={TakerHomeScreen} />
      <Stack.Screen name="ClinicalBI" component={ClinicalBIScreen} />
      <Stack.Screen name="AIFlags" component={AIFlagsScreen} />
      <Stack.Screen name="DrReport" component={DrReportScreen} />
      <Stack.Screen name="RAGChat" component={RAGChatScreen} />
    </Stack.Navigator>
  );
}
