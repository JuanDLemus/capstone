import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Plus, Calendar, MapPin, FileText } from 'lucide-react-native';
import { T } from '@/theme';

const VISITS = [
  { dr: "Dr. Elena Smith", type: "General Checkup", date: "Oct 24, 2025", loc: "City Hospital", note: "Routine blood work requested." },
  { dr: "Dr. Marcus Chen", type: "Cardiology", date: "Sep 15, 2025", loc: "Heart Center", note: "BP within normal range. No changes." },
];

export default function VisitsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Medical Visits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddVisit')}>
          <Plus size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.upcoming}>
          <Text style={styles.sectionLabel}>Upcoming</Text>
          <View style={styles.upCard}>
            <View style={styles.upHeader}>
              <View style={styles.drInfo}>
                <Text style={styles.drName}>Dr. Sarah Wilson</Text>
                <Text style={styles.upType}>Psychiatry Consultation</Text>
              </View>
              <View style={styles.dateBadge}>
                <Text style={styles.dateText}>Tomorrow</Text>
              </View>
            </View>
            <View style={styles.upDetail}>
              <View style={styles.detailRow}>
                <Calendar size={14} color={T.n500} />
                <Text style={styles.detailText}>Oct 28, 10:30 AM</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={14} color={T.n500} />
                <Text style={styles.detailText}>Virtual Clinic (Telehealth)</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Past Visits</Text>
        <View style={styles.list}>
          {VISITS.map((v, i) => (
            <View key={i} style={styles.visitCard}>
              <View style={styles.visitHeader}>
                <Text style={styles.visitDr}>{v.dr}</Text>
                <Text style={styles.visitDate}>{v.date}</Text>
              </View>
              <Text style={styles.visitType}>{v.type}</Text>
              <View style={styles.visitFooter}>
                <FileText size={14} color={T.primary} />
                <Text style={styles.visitNote} numberOfLines={1}>{v.note}</Text>
              </View>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: T.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
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
  upcoming: {
    marginBottom: 32,
  },
  upCard: {
    backgroundColor: T.primary,
    borderRadius: 24,
    padding: 24,
    elevation: 4,
    shadowColor: T.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  upHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  drName: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w9,
    color: '#fff',
  },
  upType: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: T.w7,
    marginTop: 2,
  },
  dateBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w9,
    color: '#fff',
    textTransform: 'uppercase',
  },
  upDetail: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontFamily: T.fontNunito,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: T.w6,
  },
  list: {
    gap: 12,
  },
  visitCard: {
    backgroundColor: T.surf,
    borderRadius: 20,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: T.primary,
  },
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  visitDr: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  visitDate: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w7,
  },
  visitType: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    color: T.n600,
    fontWeight: T.w6,
    marginBottom: 12,
  },
  visitFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: T.n100,
    padding: 8,
    borderRadius: 8,
  },
  visitNote: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    color: T.n500,
    fontWeight: T.w6,
  },
});
