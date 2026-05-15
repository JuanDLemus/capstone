import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VoiceIdleScreen from '@/screens/Communication/VoiceIdle';
import VoiceListenScreen from '@/screens/Communication/VoiceListen';
import VoiceProcScreen from '@/screens/Communication/VoiceProc';
import VoiceRespScreen from '@/screens/Communication/VoiceResp';
import AACMainScreen from '@/screens/Communication/AACMain';
import GuidedQScreen from '@/screens/Communication/GuidedQ';

const Stack = createNativeStackNavigator();

export default function CommunicationNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="VoiceIdle"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="VoiceIdle" component={VoiceIdleScreen} />
      <Stack.Screen name="VoiceListen" component={VoiceListenScreen} />
      <Stack.Screen name="VoiceProc" component={VoiceProcScreen} />
      <Stack.Screen name="VoiceResp" component={VoiceRespScreen} />
      <Stack.Screen name="AACMain" component={AACMainScreen} />
      <Stack.Screen name="GuidedQ" component={GuidedQScreen} />
    </Stack.Navigator>
  );
}
