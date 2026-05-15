import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HealthHubScreen from '@/screens/Health/HealthHub';
import VisitsScreen from '@/screens/Health/Visits';
import AddVisitScreen from '@/screens/Health/AddVisit';
import DiagnosesScreen from '@/screens/Health/Diagnoses';
import MedicationsScreen from '@/screens/Health/Medications';
import LabsScreen from '@/screens/Health/Labs';
import AllergiesScreen from '@/screens/Health/Allergies';
import FamilyHxScreen from '@/screens/Health/FamilyHx';

import ScreeningHubScreen from '@/screens/Screening/ScreeningHub';
import PHQ9Screen from '@/screens/Screening/PHQ9';
import GAD7Screen from '@/screens/Screening/GAD7';
import ScreeningResultScreen from '@/screens/Screening/Result';
import ScreeningHistoryScreen from '@/screens/Screening/History';

const Stack = createNativeStackNavigator();

export default function HealthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="HealthHub" component={HealthHubScreen} />
      <Stack.Screen name="Visits" component={VisitsScreen} />
      <Stack.Screen name="AddVisit" component={AddVisitScreen} />
      <Stack.Screen name="Diagnoses" component={DiagnosesScreen} />
      <Stack.Screen name="Medications" component={MedicationsScreen} />
      <Stack.Screen name="Labs" component={LabsScreen} />
      <Stack.Screen name="Allergies" component={AllergiesScreen} />
      <Stack.Screen name="FamilyHx" component={FamilyHxScreen} />

      <Stack.Screen name="ScreeningHub" component={ScreeningHubScreen} />
      <Stack.Screen name="PHQ9" component={PHQ9Screen} />
      <Stack.Screen name="GAD7" component={GAD7Screen} />
      <Stack.Screen name="ScreeningResult" component={ScreeningResultScreen} />
      <Stack.Screen name="ScreeningHistory" component={ScreeningHistoryScreen} />
    </Stack.Navigator>
  );
}
