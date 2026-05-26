import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { User, Bell, MapPin, WifiOff, Shield, LogOut, ChevronRight, Moon } from 'lucide-react-native';
import { T } from '@/theme';
import { useAuth } from '@/context/AuthContext';

export default function SettingsScreen({ navigation }) {
  const { logout, user } = useAuth();
  const [dark, setDark] = React.useState(false);
  const [notifs, setNotifs] = React.useState(true);

  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  const Item = ({ icon: Icon, label, value, onPress, isSwitch, switchVal, onSwitch }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.itemLeft}>
        <View style={styles.iconBox}>
          <Icon size={20} color={T.n600} />
        </View>
        <Text style={styles.itemLabel}>{label}</Text>
      </View>
      {isSwitch ? (
        <Switch 
          value={switchVal} 
          onValueChange={onSwitch}
          trackColor={{ false: T.n200, true: T.primary }}
          thumbColor="#fff"
        />
      ) : (
        <View style={styles.itemRight}>
          {value && <Text style={styles.itemValue}>{value}</Text>}
          <ChevronRight size={18} color={T.n400} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Section title="Account">
          <Item icon={User} label="Profile Information" value={user?.full_name ?? 'User'} />
          <Item icon={Shield} label="Security & Privacy" />
        </Section>

        <Section title="System">
          <Item 
            icon={Moon} 
            label="Dark Mode" 
            isSwitch 
            switchVal={dark} 
            onSwitch={setDark} 
          />
          <Item 
            icon={Bell} 
            label="Push Notifications" 
            isSwitch 
            switchVal={notifs} 
            onSwitch={setNotifs} 
          />
          <Item 
            icon={MapPin} 
            label="GPS & Location" 
            onPress={() => navigation.navigate('GPS')} 
          />
          <Item 
            icon={WifiOff} 
            label="Offline Mode" 
            onPress={() => navigation.navigate('Offline')} 
          />
        </Section>

        <Section title="Support">
          <Item icon={Shield} label="Terms of Service" />
          <Item icon={Shield} label="Privacy Policy" />
        </Section>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <LogOut size={20} color={T.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>EchoVolt v1.0.4 (Stable)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.n100,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: T.surf,
  },
  headerTitle: {
    fontFamily: T.fontSora,
    fontSize: 24,
    fontWeight: T.w9,
    color: T.n900,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n400,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: T.surf,
    borderRadius: 24,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: T.n100,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: T.n100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w7,
    color: T.n900,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemValue: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w6,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: T.dangerSoft,
    paddingVertical: 18,
    borderRadius: 20,
    marginTop: 8,
  },
  logoutText: {
    fontFamily: T.fontNunito,
    fontSize: 16,
    fontWeight: T.w9,
    color: T.danger,
  },
  version: {
    fontFamily: T.fontNunito,
    textAlign: 'center',
    fontSize: 12,
    color: T.n400,
    fontWeight: T.w6,
    marginTop: 32,
    marginBottom: 20,
  },
});
