import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TrendingUp, Calendar, ArrowRight, ShieldCheck, Zap } from 'lucide-react-native';
import { T } from '@/theme';

export default function DashboardScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>My Journey</Text>
        <TouchableOpacity style={styles.calBtn}>
          <Calendar size={20} color={T.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Overall Progress</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Improving</Text>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95].map((h, i) => (
              <View key={i} style={[styles.bar, { height: h + '%', backgroundColor: h > 70 ? T.success : T.primary }]} />
            ))}
          </View>
          
          <Text style={styles.cardInfo}>
            Your emotional regulation has increased by 12% this week.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <TrendingUp size={24} color={T.primary} />
            <Text style={styles.metricVal}>84%</Text>
            <Text style={styles.metricLabel}>AI Baseline</Text>
          </View>
          <View style={styles.metricCard}>
            <ShieldCheck size={24} color={T.success} />
            <Text style={styles.metricVal}>92%</Text>
            <Text style={styles.metricLabel}>Adherence</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => navigation.navigate('WeeklySummary')}
        >
          <View style={styles.actionIcon}>
            <Zap size={24} color={T.accent} />
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Weekly Summary</Text>
            <Text style={styles.actionSub}>Detailed analysis of your trends</Text>
          </View>
          <ArrowRight size={20} color={T.n400} />
        </TouchableOpacity>

        <View style={styles.insightBox}>
          <Text style={styles.insightTitle}>AI Observation</Text>
          <Text style={styles.insightBody}>
            "We've noticed a pattern of higher anxiety on Tuesday evenings. This correlates with your work meetings. Let's schedule a proactive breathing session next Tuesday at 5 PM."
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: T.surf,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 24,
    fontWeight: T.w9,
    color: T.n900,
  },
  calBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: T.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  mainCard: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w8,
    color: T.n900,
  },
  statusBadge: {
    backgroundColor: T.successSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w9,
    color: T.success,
    textTransform: 'uppercase',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  bar: {
    width: '8%',
    borderRadius: 4,
  },
  cardInfo: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n600,
    fontWeight: T.w6,
    lineHeight: 20,
  },
  sectionTitle: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  metricVal: {
    fontFamily: T.fontSora,
    fontSize: 24,
    fontWeight: T.w8,
    color: T.n900,
  },
  metricLabel: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    color: T.n500,
    fontWeight: T.w7,
    textTransform: 'uppercase',
  },
  actionCard: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: T.n100,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: T.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w7,
    color: T.n900,
  },
  actionSub: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 2,
  },
  insightBox: {
    backgroundColor: T.primarySoft,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: T.primary + '22',
  },
  insightTitle: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w9,
    color: T.primary,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  insightBody: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.primaryDark,
    fontWeight: T.w6,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
