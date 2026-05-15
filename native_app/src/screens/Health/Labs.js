import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, FlaskConical, FileText, Download } from 'lucide-react-native';
import { T } from '@/theme';

const LABS = [
  { name: "CBC & Metabolic Panel", date: "Oct 15, 2025", lab: "Quest Diagnostics", status: "Available" },
  { name: "Vitamin D Panel", date: "Sep 22, 2025", lab: "LabCorp", status: "Available" },
  { name: "Thyroid Function (TSH)", date: "Jul 08, 2025", lab: "City Lab", status: "Archived" },
];

export default function LabsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Lab Results</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.iconBox}>
            <FlaskConical size={32} color={T.clin} />
          </View>
          <Text style={styles.heroTitle}>Clinical Tests</Text>
          <Text style={styles.heroSub}>Access your lab reports and diagnostic data.</Text>
        </View>

        <View style={styles.list}>
          {LABS.map((l, i) => (
            <TouchableOpacity key={i} style={styles.card}>
              <View style={styles.cardMain}>
                <View style={styles.fileIcon}>
                  <FileText size={24} color={T.n400} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.labName}>{l.name}</Text>
                  <Text style={styles.labDate}>{l.date} • {l.lab}</Text>
                </View>
                <TouchableOpacity style={styles.dlBtn}>
                  <Download size={20} color={T.primary} />
                </TouchableOpacity>
              </View>
              <View style={styles.statusRow}>
                <View style={[styles.dot, { backgroundColor: l.status === 'Available' ? T.success : T.n400 }]} />
                <Text style={styles.statusText}>{l.status}</Text>
              </View>
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
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 10,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: T.clinSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: T.fontSora,
    fontSize: 22,
    fontWeight: T.w8,
    color: T.n900,
  },
  heroSub: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w6,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 40,
  },
  list: {
    gap: 16,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  cardMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: T.n100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  labName: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  labDate: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 2,
  },
  dlBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: T.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: T.n100,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    fontWeight: T.w8,
    color: T.n500,
    textTransform: 'uppercase',
  },
});
