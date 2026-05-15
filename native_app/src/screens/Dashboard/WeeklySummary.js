import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, BarChart2, Star, Zap, Activity } from 'lucide-react-native';
import { T } from '@/theme';

export default function WeeklySummaryScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Weekly Summary</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.dateRange}>Oct 12 - Oct 18, 2025</Text>
          <Text style={styles.summaryTitle}>Excellent Week, Maria!</Text>
          <Text style={styles.summaryDesc}>
            You completed 100% of your daily check-ins and engaged in 5 grounding exercises.
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: T.primarySoft }]}>
              <Star size={20} color={T.primary} />
            </View>
            <Text style={styles.cardVal}>14 Days</Text>
            <Text style={styles.cardLabel}>Longest Streak</Text>
          </View>
          <View style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: T.successSoft }]}>
              <Zap size={20} color={T.success} />
            </View>
            <Text style={styles.cardVal}>8.2</Text>
            <Text style={styles.cardLabel}>Avg Mood</Text>
          </View>
        </View>

        <View style={styles.longCard}>
          <View style={styles.cardHeader}>
            <Activity size={20} color={T.accent} />
            <Text style={styles.cardHeaderTitle}>Regulation Performance</Text>
          </View>
          <View style={styles.chart}>
            {[30, 45, 60, 20, 80, 50, 70].map((h, i) => (
              <View key={i} style={styles.chartCol}>
                <View style={[styles.chartBar, { height: h, backgroundColor: T.accent }]} />
                <Text style={styles.chartLabel}>{["M", "T", "W", "T", "F", "S", "S"][i]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.insightSection}>
          <View style={styles.insightHeader}>
            <BarChart2 size={20} color={T.primary} />
            <Text style={styles.insightTitle}>Clinical AI Insights</Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightItemTitle}>Vocal Stability</Text>
            <Text style={styles.insightItemText}>
              Your voice frequency remained within your healthy baseline for 6 out of 7 days.
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={styles.insightItemTitle}>Emotional Resilience</Text>
            <Text style={styles.insightItemText}>
              Fast recovery noted after Tuesday's high-stress trigger. Grounding was effective.
            </Text>
          </View>
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
  hero: {
    marginBottom: 24,
  },
  dateRange: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.primary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  summaryTitle: {
    fontFamily: T.fontSora,
    fontSize: 26,
    fontWeight: T.w8,
    color: T.n900,
    marginBottom: 8,
  },
  summaryDesc: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    color: T.n600,
    fontWeight: T.w6,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardVal: {
    fontFamily: T.fontSora,
    fontSize: 20,
    fontWeight: T.w8,
    color: T.n900,
  },
  cardLabel: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    color: T.n500,
    fontWeight: T.w7,
    marginTop: 2,
  },
  longCard: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  cardHeaderTitle: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w7,
    color: T.n900,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
  },
  chartCol: {
    alignItems: 'center',
    gap: 8,
  },
  chartBar: {
    width: 14,
    borderRadius: 7,
  },
  chartLabel: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w7,
    color: T.n400,
  },
  insightSection: {
    gap: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  insightTitle: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
  },
  insightItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: T.primary,
  },
  insightItemTitle: {
    fontFamily: T.fontSora,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
    marginBottom: 4,
  },
  insightItemText: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    color: T.n600,
    fontWeight: T.w6,
    lineHeight: 20,
  },
});
