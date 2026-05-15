import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, AlertTriangle, ShieldCheck } from 'lucide-react-native';
import { T } from '@/theme';

const ALLERGIES = [
  { type: "Drug", name: "Penicillin", reaction: "Hives, Shortness of breath", severity: "High" },
  { type: "Food", name: "Peanuts", reaction: "Anaphylaxis", severity: "Critical" },
  { type: "Environmental", name: "Dust Mites", reaction: "Sneezing, Itchy eyes", severity: "Low" },
];

export default function AllergiesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Allergies</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.alertBox}>
          <AlertTriangle size={24} color="#fff" />
          <Text style={styles.alertText}>2 Critical Alerts Identified</Text>
        </View>

        <View style={styles.list}>
          {ALLERGIES.map((a, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.aType}>{a.type} Allergy</Text>
                  <Text style={styles.aName}>{a.name}</Text>
                </View>
                <View style={[
                  styles.sevBadge, 
                  { backgroundColor: a.severity === 'Critical' ? T.danger : (a.severity === 'High' ? T.dangerSoft : T.n200) }
                ]}>
                  <Text style={[
                    styles.sevText, 
                    { color: a.severity === 'Critical' ? '#fff' : (a.severity === 'High' ? T.danger : T.n600) }
                  ]}>{a.severity}</Text>
                </View>
              </View>
              <View style={styles.reactionRow}>
                <Text style={styles.rLabel}>Reaction:</Text>
                <Text style={styles.rValue}>{a.reaction}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.safeZone}>
          <ShieldCheck size={20} color={T.success} />
          <Text style={styles.safeText}>Last verified on Oct 20, 2025</Text>
        </View>
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
    paddingVertical: 16,
    backgroundColor: T.surf,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w8,
    color: T.n900,
  },
  content: {
    padding: 20,
  },
  alertBox: {
    backgroundColor: T.danger,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    elevation: 8,
    shadowColor: T.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  alertText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
  list: {
    gap: 12,
    marginBottom: 32,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  aType: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aName: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w7,
    color: T.n900,
    marginTop: 2,
  },
  sevBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sevText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w9,
    textTransform: 'uppercase',
  },
  reactionRow: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: T.n100,
    padding: 12,
    borderRadius: 12,
  },
  rLabel: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    fontWeight: T.w8,
    color: T.n500,
  },
  rValue: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 13,
    fontWeight: T.w6,
    color: T.n900,
  },
  safeZone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  safeText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w7,
  },
});
