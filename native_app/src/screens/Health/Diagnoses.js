import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ClipboardList, Info } from 'lucide-react-native';
import { T } from '@/theme';

const DX = [
  { name: "Generalized Anxiety Disorder", code: "ICD-10 F41.1", status: "Active", date: "Jan 2024", dr: "Dr. Elena Smith" },
  { name: "Asthma", code: "ICD-10 J45.909", status: "Chronic", date: "May 2018", dr: "Dr. Marcus Chen" },
  { name: "Vitamin D Deficiency", code: "ICD-10 E55.9", status: "Resolved", date: "Mar 2023", dr: "Dr. Elena Smith" },
];

export default function DiagnosesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Diagnoses</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.list}>
          {DX.map((d, i) => (
            <TouchableOpacity key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.titleRow}>
                  <Text style={styles.dxName}>{d.name}</Text>
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: d.status === 'Resolved' ? T.n300 : T.accentSoft }
                  ]}>
                    <Text style={[
                      styles.statusText, 
                      { color: d.status === 'Resolved' ? T.n700 : T.accent }
                    ]}>{d.status}</Text>
                  </View>
                </View>
                <Text style={styles.dxCode}>{d.code}</Text>
              </View>
              
              <View style={styles.footer}>
                <View style={styles.footerItem}>
                  <Text style={styles.fLbl}>Diagnosed</Text>
                  <Text style={styles.fVal}>{d.date}</Text>
                </View>
                <View style={styles.footerItem}>
                  <Text style={styles.fLbl}>Clinician</Text>
                  <Text style={styles.fVal}>{d.dr}</Text>
                </View>
                <Info size={18} color={T.n300} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.aiNote}>
          <ClipboardList size={20} color={T.accent} />
          <Text style={styles.aiNoteText}>
            These diagnoses are shared with EchoVolt AI to provide context-aware emotional support and health tracking.
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
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  dxName: {
    fontFamily: T.fontSora,
    flex: 1,
    fontSize: 16,
    fontWeight: T.w7,
    color: T.n900,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w9,
    textTransform: 'uppercase',
  },
  dxCode: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w7,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: T.n100,
    paddingTop: 16,
    gap: 20,
  },
  footerItem: {
    flex: 1,
  },
  fLbl: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w8,
    color: T.n400,
    textTransform: 'uppercase',
  },
  fVal: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    fontWeight: T.w7,
    color: T.n700,
    marginTop: 2,
  },
  aiNote: {
    backgroundColor: T.accentSoft,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  aiNoteText: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 13,
    color: T.accent,
    fontWeight: T.w7,
    lineHeight: 18,
  },
});
