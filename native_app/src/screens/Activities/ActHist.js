import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, TrendingUp, Activity, CheckCircle2, Layers } from 'lucide-react-native';
import { T } from '@/theme';

const RECENT = [
  { label: "4-7-8 Breathing", date: "Today, 8:30 AM", dur: "6 min", col: T.primary, icon: Activity },
  { label: "5-4-3-2-1 Grounding", date: "Yesterday, 3:15 PM", dur: "8 min", col: T.accent, icon: CheckCircle2 },
  { label: "4-7-8 Breathing", date: "Mon, 9:00 AM", dur: "5 min", col: T.primary, icon: Activity },
  { label: "Box Breathing", date: "Sun, 10:30 AM", dur: "4 min", col: T.success, icon: Layers },
];

export default function ActHistScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Journey Log</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: T.success + '15' }]}>
              <TrendingUp size={20} color={T.success} />
            </View>
            <Text style={styles.statVal}>5 Days</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: T.primary + '15' }]}>
              <Activity size={20} color={T.primary} />
            </View>
            <Text style={styles.statVal}>14</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </View>
        </View>

        <View style={styles.chartPlaceholder}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Weekly Overview</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Last 7 Days</Text>
            </View>
          </View>
          <View style={styles.barGrid}>
            {[60, 80, 40, 90, 70, 85, 55].map((h, i) => (
              <View key={i} style={styles.barCol}>
                <View style={[styles.bar, { height: h, backgroundColor: T.primary }]} />
                <Text style={styles.barLabel}>{["M", "T", "W", "T", "F", "S", "S"][i]}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.list}>
          {RECENT.map((a, i) => (
            <View key={i} style={styles.item}>
              <View style={[styles.itemIcon, { backgroundColor: a.col + '15' }]}>
                <a.icon size={22} color={a.col} />
              </View>
              <View style={styles.itemInfo}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemLabel}>{a.label}</Text>
                  <View style={styles.durBadge}>
                    <Text style={styles.durText}>{a.dur}</Text>
                  </View>
                </View>
                <Text style={styles.itemDate}>{a.date}</Text>
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
    fontWeight: T.w7,
    color: T.n900,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statVal: {
    fontFamily: T.fontSora,
    fontSize: 22,
    fontWeight: T.w8,
    color: T.n900,
  },
  statLabel: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    color: T.n500,
    fontWeight: T.w7,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  chartPlaceholder: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  chartTitle: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w7,
    color: T.n900,
  },
  badge: {
    backgroundColor: T.n100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w8,
    color: T.n500,
  },
  barGrid: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    paddingHorizontal: 10,
  },
  barCol: {
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: 12,
    borderRadius: 6,
  },
  barLabel: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w7,
    color: T.n400,
  },
  sectionTitle: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w7,
    color: T.n900,
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  item: {
    backgroundColor: T.surf,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLabel: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  durBadge: {
    backgroundColor: T.n100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  durText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w8,
    color: T.n500,
  },
  itemDate: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    marginTop: 2,
    fontWeight: T.w6,
  },
});
