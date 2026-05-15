import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Pill, Clock, AlertCircle } from 'lucide-react-native';
import { T } from '@/theme';

const MEDS = [
  { name: "Sertraline", dose: "50mg", schedule: "Daily, Morning", status: "Active", col: T.primary },
  { name: "Albuterol Inhaler", dose: "90mcg", schedule: "As needed (PRN)", status: "Active", col: T.success },
];

export default function MedicationsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Medications</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.adherence}>
          <View style={styles.adhHeader}>
            <Text style={styles.adhTitle}>Adherence</Text>
            <Text style={styles.adhPct}>92%</Text>
          </View>
          <View style={styles.adhBar}>
            <View style={[styles.adhFill, { width: '92%' }]} />
          </View>
          <Text style={styles.adhSub}>You've taken 24 of 26 doses this month.</Text>
        </View>

        <Text style={styles.sectionLabel}>Active Prescriptions</Text>
        <View style={styles.list}>
          {MEDS.map((m, i) => (
            <View key={i} style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: m.col + '15' }]}>
                <Pill size={24} color={m.col} />
              </View>
              <View style={styles.cardInfo}>
                <View style={styles.cardHeader}>
                  <Text style={styles.medName}>{m.name}</Text>
                  <Text style={styles.medDose}>{m.dose}</Text>
                </View>
                <View style={styles.schedRow}>
                  <Clock size={14} color={T.n500} />
                  <Text style={styles.schedText}>{m.schedule}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.warning}>
          <AlertCircle size={20} color={T.danger} />
          <Text style={styles.warningText}>
            Never change your medication schedule without consulting your physician.
          </Text>
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
  adherence: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  adhHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  adhTitle: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w7,
    color: T.n900,
  },
  adhPct: {
    fontFamily: T.fontSora,
    fontSize: 20,
    fontWeight: T.w9,
    color: T.success,
  },
  adhBar: {
    height: 8,
    backgroundColor: T.n200,
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  adhFill: {
    height: '100%',
    backgroundColor: T.success,
  },
  adhSub: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
  },
  sectionLabel: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  list: {
    gap: 12,
    marginBottom: 32,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  medName: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  medDose: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    fontWeight: T.w9,
    color: T.primary,
  },
  schedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  schedText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
  },
  warning: {
    backgroundColor: T.dangerSoft,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  warningText: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 12,
    color: T.danger,
    fontWeight: T.w7,
    lineHeight: 18,
  },
});
