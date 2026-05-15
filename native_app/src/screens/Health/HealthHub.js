import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  ChevronLeft, 
  Stethoscope, 
  ClipboardList, 
  Pill, 
  FlaskConical, 
  AlertTriangle, 
  Users,
  ChevronRight
} from 'lucide-react-native';
import { T } from '@/theme';

const SECTIONS = [
  { id: 'Visits', lbl: 'Medical Visits', sub: 'Clinical history & notes', icon: Stethoscope, col: T.primary },
  { id: 'Diagnoses', lbl: 'Diagnoses', sub: 'Active & past conditions', icon: ClipboardList, col: T.accent },
  { id: 'Medications', lbl: 'Medications', sub: 'Prescriptions & adherence', icon: Pill, col: T.success },
  { id: 'Labs', lbl: 'Lab Results', sub: 'Tests, bloodwork & imaging', icon: FlaskConical, col: T.clin },
  { id: 'Allergies', lbl: 'Allergies', sub: 'Sensitivities & reactions', icon: AlertTriangle, col: T.danger },
  { id: 'FamilyHx', lbl: 'Family History', sub: 'Genetic & hereditary data', icon: Users, col: T.n600 },
  { id: 'ScreeningHub', lbl: 'Clinical Screening', sub: 'PHQ-9, GAD-7 & Assessments', icon: ClipboardList, col: T.primary },
];

export default function HealthHubScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Medical Hub</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Your Health File</Text>
          <Text style={styles.heroSub}>Centralized clinical data for better AI insights.</Text>
        </View>

        <View style={styles.grid}>
          {SECTIONS.map((s, i) => (
            <TouchableOpacity 
              key={i} 
              style={styles.card}
              onPress={() => navigation.navigate(s.id)}
            >
              <View style={[styles.iconBox, { backgroundColor: s.col + '15' }]}>
                <s.icon size={24} color={s.col} />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{s.lbl}</Text>
                <Text style={styles.cardSub}>{s.sub}</Text>
              </View>
              <ChevronRight size={18} color={T.n300} />
            </TouchableOpacity>
          ))}
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
  hero: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  heroTitle: {
    fontFamily: T.fontSora,
    fontSize: 28,
    fontWeight: T.w8,
    color: T.n900,
  },
  heroSub: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 8,
  },
  grid: {
    gap: 12,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: T.fontNunito,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.n900,
  },
  cardSub: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 2,
  },
});
