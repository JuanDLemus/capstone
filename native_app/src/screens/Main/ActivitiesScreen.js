import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Activity, Wind, HeartPulse, History, AlertCircle, Zap, Layers, User } from 'lucide-react-native';
import { T } from '@/theme';

const TOOLS = [
  { id: 'breath_i', title: '4-7-8 Breathing', sub: 'Anxiety & Sleep', icon: Wind, col: T.primary },
  { id: 'box_breath', title: 'Box Breathing', sub: 'Focus & Stress', icon: Layers, col: T.success },
  { id: 'grounding', title: '5-4-3-2-1 Grounding', sub: 'Panic & Detachment', icon: Activity, col: T.accent },
  { id: 'calm_mode', title: 'Calm Mode', sub: 'Sensory Reduction', icon: HeartPulse, col: T.taker },
  { id: 'body_scan', title: 'Body Scan', sub: 'Physical Awareness', icon: User, col: T.clin },
];

export default function ActivitiesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Activities</Text>
        <TouchableOpacity 
          style={styles.historyBtn}
          onPress={() => navigation.navigate('ActHist')}
        >
          <History size={20} color={T.n700} />
          <Text style={styles.historyText}>Journey Log</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity 
          style={styles.emergencyCard}
          onPress={() => navigation.navigate('Emergency')}
        >
          <View style={styles.emergencyIcon}>
            <AlertCircle size={32} color="#fff" />
          </View>
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyTitle}>Need immediate help?</Text>
            <Text style={styles.emergencySub}>Crisis protocols & emergency contacts</Text>
          </View>
          <Zap size={24} color="#fff" opacity={0.5} />
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>Regulation Tools</Text>
        <View style={styles.grid}>
          {TOOLS.map((t) => (
            <TouchableOpacity 
              key={t.id} 
              style={styles.toolCard}
              onPress={() => navigation.navigate(t.id)}
            >
              <View style={[styles.iconBox, { backgroundColor: t.col + '15' }]}>
                <t.icon size={28} color={t.col} />
              </View>
              <Text style={styles.toolTitle}>{t.title}</Text>
              <Text style={styles.toolSub}>{t.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Activity size={20} color={T.primary} />
          <Text style={styles.infoText}>
            Consistent practice strengthens your nervous system's baseline.
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
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: T.n100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  historyText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w8,
    color: T.n700,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  emergencyCard: {
    backgroundColor: T.danger,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: T.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  emergencyIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyTitle: {
    fontFamily: T.fontSora,
    color: '#fff',
    fontSize: 18,
    fontWeight: T.w8,
  },
  emergencySub: {
    fontFamily: T.fontNunito,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: T.w6,
    marginTop: 2,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    backgroundColor: T.surf,
    width: '48%',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    textAlign: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 12,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  toolTitle: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w9,
    color: T.n900,
    textAlign: 'center',
  },
  toolSub: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    color: T.n500,
    fontWeight: T.w7,
    marginTop: 4,
    textAlign: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: T.primarySoft,
    padding: 16,
    borderRadius: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: T.primary + '22',
  },
  infoText: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 12,
    color: T.primaryDark,
    fontWeight: T.w7,
    lineHeight: 18,
  },
});
