import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';
import { T } from '@/theme';

export default function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <LogOut size={20} color={T.danger} />
          <Text style={styles.logoutTxt}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: T.n100 },
  container: { flex: 1, padding: 20 },
  title: { fontFamily: T.fontSora, fontSize: 24, fontWeight: T.w9, color: T.n900, marginBottom: 30 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: T.dangerSoft,
    borderRadius: 16,
  },
  logoutTxt: {
    fontFamily: T.fontNunito,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.danger,
  }
});
