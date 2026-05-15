import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { T } from '@/theme';

export default function ScreeningResultScreen({ route, navigation }) {
  const { type, score } = route.params || { type: 'PHQ-9', score: 12 };

  const getSeverity = (s, t) => {
    if (t === 'PHQ-9') {
      if (s <= 4) return { lbl: 'Minimal', col: T.success, desc: 'Score indicates minimal symptoms of depression.' };
      if (s <= 9) return { lbl: 'Mild', col: T.primary, desc: 'Score indicates mild symptoms of depression.' };
      if (s <= 14) return { lbl: 'Moderate', col: T.accent, desc: 'Score indicates moderate symptoms of depression.' };
      if (s <= 19) return { lbl: 'Moderately Severe', col: T.danger, desc: 'Score indicates moderately severe symptoms.' };
      return { lbl: 'Severe', col: T.danger, desc: 'Score indicates severe symptoms of depression.' };
    } else {
      if (s <= 4) return { lbl: 'Minimal', col: T.success, desc: 'Score indicates minimal anxiety levels.' };
      if (s <= 9) return { lbl: 'Mild', col: T.primary, desc: 'Score indicates mild anxiety levels.' };
      if (s <= 14) return { lbl: 'Moderate', col: T.accent, desc: 'Score indicates moderate anxiety levels.' };
      return { lbl: 'Severe', col: T.danger, desc: 'Score indicates severe anxiety levels.' };
    }
  };

  const sev = getSeverity(score, type);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={[styles.iconBox, { backgroundColor: sev.col + '15' }]}>
            <CheckCircle2 size={48} color={sev.col} />
          </View>
          <Text style={styles.title}>Assessment Complete</Text>
          <Text style={styles.subtitle}>Your {type} results have been processed.</Text>
        </View>

        <View style={styles.resultCard}>
          <View style={styles.scoreRow}>
            <View>
              <Text style={styles.scoreLbl}>Total Score</Text>
              <Text style={[styles.scoreVal, { color: sev.col }]}>{score}</Text>
            </View>
            <View style={[styles.sevBadge, { backgroundColor: sev.col }]}>
              <Text style={styles.sevText}>{sev.lbl}</Text>
            </View>
          </View>
          <Text style={styles.sevDesc}>{sev.desc}</Text>
        </View>

        <View style={styles.aiInsight}>
          <ShieldCheck size={20} color={T.primary} />
          <Text style={styles.aiText}>
            EchoVolt AI has updated your therapeutic baseline. We'll adjust your daily check-in questions accordingly.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.doneBtn}
          onPress={() => navigation.navigate('ScreeningHub')}
        >
          <Text style={styles.doneBtnText}>Return to Hub</Text>
          <ArrowRight size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.n100,
  },
  content: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 24,
    fontWeight: T.w9,
    color: T.n900,
  },
  subtitle: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w7,
    marginTop: 8,
  },
  resultCard: {
    backgroundColor: T.surf,
    width: '100%',
    borderRadius: 32,
    padding: 32,
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  scoreLbl: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n400,
    textTransform: 'uppercase',
  },
  scoreVal: {
    fontFamily: T.fontSora,
    fontSize: 48,
    fontWeight: T.w8,
    marginTop: 4,
  },
  sevBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sevText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 12,
    fontWeight: T.w9,
    textTransform: 'uppercase',
  },
  sevDesc: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    color: T.n600,
    fontWeight: T.w6,
    lineHeight: 22,
  },
  aiInsight: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: T.primarySoft,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  aiText: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 13,
    color: T.primaryDark,
    fontWeight: T.w7,
    lineHeight: 18,
  },
  doneBtn: {
    backgroundColor: T.n900,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 9999,
  },
  doneBtnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
});
