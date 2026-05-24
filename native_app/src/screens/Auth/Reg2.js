import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, User, Users } from 'lucide-react-native';
import { T } from '@/theme';

const ROLES = [
  { id: "user", Icon: User, label: "User", desc: "Manage your own journal and health information", col: T.primary },
  { id: "snu", Icon: Users, label: "Special Needs User", desc: "A caregiver supports my account", col: T.success },
  { id: "taker", Icon: Users, label: "Taker", desc: "I care for someone and view their wellbeing", col: T.taker },
];

export default function Reg2Screen({ navigation, route }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const prevData = route.params ?? {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={T.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.stepIndicator}>
            {[1, 2, 3, 4].map(n => (
              <View key={n} style={[styles.stepDot, n <= 2 && styles.stepDotActive]} />
            ))}
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Step 2 of 4</Text>
          </View>
          <Text style={styles.title}>Choose your role</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.rolesList}>
            {ROLES.map(role => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleCard,
                  selectedRole === role.id && { borderColor: role.col, backgroundColor: role.col + '11' }
                ]}
                onPress={() => setSelectedRole(role.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: role.col + '22' }]}>
                  <role.Icon size={24} color={role.col} />
                </View>
                <View style={styles.roleInfo}>
                  <Text style={styles.roleLabel}>{role.label}</Text>
                  <Text style={styles.roleDesc}>{role.desc}</Text>
                </View>
                <View style={[
                  styles.radio,
                  { borderColor: selectedRole === role.id ? role.col : T.n300 },
                  selectedRole === role.id && { backgroundColor: role.col }
                ]} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.nextButton, !selectedRole && styles.nextButtonDisabled]}
          onPress={() => navigation.navigate('Reg3', { ...prevData, role: selectedRole })}
          disabled={!selectedRole}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.n100 },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 20, paddingBottom: 40 },
  backButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 20 },
  backText: { fontFamily: T.fontNunito, color: T.primary, fontSize: 14, fontWeight: T.w8, marginLeft: 4 },
  header: { marginBottom: 24 },
  stepIndicator: { flexDirection: 'row', gap: 6, marginBottom: 20 },
  stepDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: T.n300 },
  stepDotActive: { backgroundColor: T.primary },
  badge: { backgroundColor: T.primarySoft, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 12 },
  badgeText: { fontFamily: T.fontNunito, color: T.primary, fontSize: 11, fontWeight: T.w9 },
  title: { fontFamily: T.fontSora, fontSize: 26, fontWeight: T.w8, color: T.n900 },
  scroll: { flex: 1 },
  rolesList: { gap: 16, paddingVertical: 8 },
  roleCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: T.surf, borderRadius: 24, padding: 20, borderWidth: 2, borderColor: 'transparent', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  iconContainer: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  roleInfo: { flex: 1 },
  roleLabel: { fontFamily: T.fontNunito, fontSize: 17, fontWeight: T.w9, color: T.n900 },
  roleDesc: { fontFamily: T.fontNunito, fontSize: 12, color: T.n500, marginTop: 4, lineHeight: 18 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, marginLeft: 12 },
  nextButton: { backgroundColor: T.primary, paddingVertical: 18, borderRadius: 9999, alignItems: 'center', marginTop: 24, elevation: 4, shadowColor: T.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 16 },
  nextButtonDisabled: { backgroundColor: T.n300, elevation: 0, shadowOpacity: 0 },
  nextButtonText: { fontFamily: T.fontNunito, color: '#fff', fontSize: 16, fontWeight: T.w9 },
});
