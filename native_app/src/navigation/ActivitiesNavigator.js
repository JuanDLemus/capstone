import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ActivitiesScreen from '@/screens/Main/ActivitiesScreen';
import BreathIScreen from '@/screens/Activities/BreathI';
import BoxBreathScreen from '@/screens/Activities/BoxBreath';
import GroundingScreen from '@/screens/Activities/Grounding';
import CalmModeScreen from '@/screens/Activities/CalmMode';
import BodyScanScreen from '@/screens/Activities/BodyScan';
import EmergencyScreen from '@/screens/Activities/Emergency';
import ActHistScreen from '@/screens/Activities/ActHist';
import PanicProtocolScreen from '@/screens/Activities/PanicProtocol';
import Dial911Screen from '@/screens/Activities/Dial911';

const Stack = createNativeStackNavigator();

export default function ActivitiesNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ActivitiesHub"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="ActivitiesHub" component={ActivitiesScreen} />
      <Stack.Screen name="breath_i" component={BreathIScreen} />
      <Stack.Screen name="box_breath" component={BoxBreathScreen} />
      <Stack.Screen name="grounding" component={GroundingScreen} />
      <Stack.Screen name="calm_mode" component={CalmModeScreen} />
      <Stack.Screen name="body_scan" component={BodyScanScreen} />
      <Stack.Screen name="Emergency" component={EmergencyScreen} />
      <Stack.Screen name="ActHist" component={ActHistScreen} />
      <Stack.Screen name="panic_protocol" component={PanicProtocolScreen} />
      <Stack.Screen name="dial_911" component={Dial911Screen} />
    </Stack.Navigator>
  );
}
