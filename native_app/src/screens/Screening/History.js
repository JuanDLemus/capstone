import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Calendar } from 'lucide-react-native';
import { T } from '@/theme';

const LOG = [
  { type: 'PHQ-9', score: 8, sev: 'Mild', date: 'Oct 12, 2025' },
  { type: 'GAD-7', score: 14, sev: 'Moderate', date: 'Oct 05, 2025' },
  { type: 'PHQ-9', score: 12, sev: 'Moderate', date: 'Sep 28, 2025' },
  { type: 'GAD-7', score: 9, sev: 'Mild', date: 'Sep 15, 2025' },
];

export default function ScreeningHistoryScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Screening History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartTitle}>Score Trends</Text>
          <View style={styles.chartArea}>
            {[40, 60, 45, 75, 55, 85].map((h, i) => (
              <View key={i} style={[styles.bar, { height: h, backgroundColor: i % 2 === 0 ? T.primary : T.accent }]} />
            ))}
          </View>
          <View style={styles.legend}>
            <View style={styles.legItem}>
              <View style={[styles.legDot, { backgroundColor: T.primary }]} />
              <Text style={styles.legText}>PHQ-9</Text>
            </View>
            <View style={styles.legItem}>
              <View style={[styles.legDot, { backgroundColor: T.accent }]} />
              <Text style={styles.legText}>GAD-7</Text>
            </View>
          </View>
        </View>

        <View style={styles.list}>
          {LOG.map((l, i) => (
            <View key={i} style={styles.item}>
              <View style={styles.itemMain}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>{l.type}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.itemSev}>{l.sev} Symptoms</Text>
                  <View style={styles.dateRow}>
                    <Calendar size={12} color={T.n400} />
                    <Text style={styles.itemDate}>{l.date}</Text>
                  </View>
                </View>
                <Text style={styles.itemScore}>{l.score}</Text>
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
  chartPlaceholder: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  chartTitle: {
    fontFamily: T.fontNunito,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.n900,
    marginBottom: 20,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  bar: {
    width: 20,
    borderRadius: 6,
  },
  legend: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  legItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w7,
    color: T.n500,
  },
  list: {
    gap: 12,
  },
  item: {
    backgroundColor: T.surf,
    borderRadius: 20,
    padding: 16,
  },
  itemMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  typeBadge: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: T.n100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n900,
  },
  info: {
    flex: 1,
  },
  itemSev: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  itemDate: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
  },
  itemScore: {
    fontFamily: T.fontSora,
    fontSize: 24,
    fontWeight: T.w8,
    color: T.primary,
  },
});
