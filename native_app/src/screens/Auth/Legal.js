import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ShieldCheck, AlertTriangle } from 'lucide-react-native';
import { T } from '@/theme';

const SECTIONS = [
  ["1. What We Collect", "Daily journal entries (voice/text), mood ratings, symptom logs, medication adherence, screening responses (PHQ-9, GAD-7), GPS location (if enabled), and usage metadata. No raw biometric audio is stored."],
  ["2. Clinical Data Processing", "Your entries are processed by an LLM to extract structured clinical data points mapped to ICD-10/DSM-5 categories. Screening scores are calculated using validated algorithms. All processing uses anonymised identifiers — your name and email are never sent to AI APIs."],
  ["3. Who Can See Your Data", "Only you and any Takers you explicitly invite. Takers see dashboards and AI flags but never raw entries. Clinician reports are generated only on your explicit request. We do not share data with insurers, employers, or advertisers."],
  ["4. AI Clinical Flags", "AI pattern observations use heuristic frameworks (PHQ-9, GAD-7, ICD-10, NICE guidelines). These are NOT diagnoses. Confidence scores reflect pattern matching only. Always share observations with a qualified clinician before acting."],
  ["5. GPS & Location", "Off by default. Requires explicit consent. Encrypted at rest. Visible only to authorised Takers. You may delete location history at any time from Settings."],
  ["6. Data Retention & Rights", "Data retained while your account is active. Permanent deletion within 30 days of account closure. Export in JSON/CSV at any time. EU users: GDPR rights apply. California users: CCPA rights apply."],
  ["7. Emergency Situations", "The app provides general crisis guidance only. Always call emergency services (911/112) for immediate danger. Emergency protocol activation may notify your linked Taker."],
  ["8. Children & Special Needs", "Users under 13 require guardian (Taker) account management. SNU profiles require Taker oversight. All LLM interactions are filtered for age-appropriate content."],
];

export default function LegalScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.title}>Privacy & Legal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.alertCard}>
          <AlertTriangle size={20} color={T.danger} style={styles.alertIcon} />
          <View style={styles.alertInfo}>
            <Text style={styles.alertTitle}>Medical Disclaimer</Text>
            <Text style={styles.alertBody}>
              This app is NOT a medical device and does NOT diagnose, treat, or predict any medical or mental health condition. It is a data companion only.
            </Text>
          </View>
        </View>

        {SECTIONS.map(([title, body], i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionBody}>{body}</Text>
          </View>
        ))}
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
    backgroundColor: T.surf,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: T.n100,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w8,
    color: T.n900,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: T.dangerSoft,
    borderLeftWidth: 4,
    borderLeftColor: T.danger,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  alertIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontFamily: T.fontSora,
    fontSize: 14,
    fontWeight: T.w8,
    color: T.n900,
    marginBottom: 4,
  },
  alertBody: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n700,
    lineHeight: 18,
    fontWeight: T.w6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w7,
    color: T.n900,
    marginBottom: 8,
  },
  sectionBody: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    color: T.n700,
    lineHeight: 22,
  },
});
