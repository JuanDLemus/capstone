import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ClipboardList, Clock, ArrowRight } from 'lucide-react-native';
import { T } from '@/theme';

const SCREENINGS = [
  { id: 'PHQ9', title: 'PHQ-9', sub: 'Patient Health Questionnaire', desc: 'Assess symptoms of depression over the last 2 weeks.', time: '3 min', col: T.primary },
  { id: 'GAD7', title: 'GAD-7', sub: 'General Anxiety Disorder', desc: 'Assess anxiety levels and worry patterns.', time: '2 min', col: T.accent },
];

export default function ScreeningHubScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Screening Hub</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ScreeningHistory')}>
          <Clock size={22} color={T.n700} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Clinical Assessments</Text>
          <Text style={styles.heroSub}>Regular screening helps EchoVolt AI track your progress and flag significant changes.</Text>
        </View>

        <View style={styles.list}>
          {SCREENINGS.map((s, i) => (
            <TouchableOpacity 
              key={i} 
              style={styles.card}
              onPress={() => navigation.navigate(s.id)}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: s.col + '15' }]}>
                  <Text style={[styles.badgeText, { color: s.col }]}>{s.title}</Text>
                </View>
                <View style={styles.timeRow}>
                  <Clock size={12} color={T.n400} />
                  <Text style={styles.timeText}>{s.time}</Text>
                </View>
              </View>
              <Text style={styles.cardTitle}>{s.sub}</Text>
              <Text style={styles.cardDesc}>{s.desc}</Text>
              <View style={styles.cardFooter}>
                <Text style={[styles.startText, { color: s.col }]}>Start Assessment</Text>
                <ArrowRight size={16} color={s.col} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBox}>
          <ClipboardList size={20} color={T.n500} />
          <Text style={styles.infoText}>
            Assessment results are stored in your secure Health File and used to personalize your therapeutic experience.
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
  },
  heroTitle: {
    fontFamily: T.fontSora,
    fontSize: 26,
    fontWeight: T.w9,
    color: T.n900,
  },
  heroSub: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 8,
    lineHeight: 20,
  },
  list: {
    gap: 16,
    marginBottom: 40,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w7,
    color: T.n400,
  },
  cardTitle: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w7,
    color: T.n900,
    marginBottom: 8,
  },
  cardDesc: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w6,
    lineHeight: 20,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  startText: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w8,
  },
  infoBox: {
    flexDirection: 'row',
    gap: 16,
    padding: 20,
    backgroundColor: T.n200 + '44',
    borderRadius: 20,
    alignItems: 'center',
  },
  infoText: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w7,
    lineHeight: 18,
  },
});
