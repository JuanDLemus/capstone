import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Mic, Activity, Calendar, LayoutDashboard, Settings2, Home } from 'lucide-react-native';
import { T } from '@/theme';
import CommunicationNavigator from './CommunicationNavigator';
import ActivitiesNavigator from './ActivitiesNavigator';
import DashboardNavigator from './DashboardNavigator';
import SettingsNavigator from './SettingsNavigator';
import CalendarScreen from '@/screens/Main/Calendar';
import HomeScreen from '@/screens/Main/HomeScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 72,
          backgroundColor: T.surf,
          borderTopWidth: 1,
          borderTopColor: T.n100,
          elevation: 10,
          shadowColor: T.n900,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 20,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: T.primary,
        tabBarInactiveTintColor: T.n500,
        tabBarLabelStyle: {
          fontFamily: 'Nunito',
          fontSize: 10,
          fontWeight: '800',
          letterSpacing: 0.2,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Home color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Talk" 
        component={CommunicationNavigator}
        options={{
          tabBarIcon: ({ color }) => <Mic color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Activities" 
        component={ActivitiesNavigator} 
        options={{
          tabBarIcon: ({ color }) => <Activity color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen} 
        options={{
          tabBarIcon: ({ color }) => <Calendar color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardNavigator} 
        options={{
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsNavigator} 
        options={{
          tabBarIcon: ({ color }) => <Settings2 color={color} size={24} />
        }}
      />
    </Tab.Navigator>
  );
}
