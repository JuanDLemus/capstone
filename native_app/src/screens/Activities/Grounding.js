import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import { T } from '@/theme';

const STEPS = [
  { n: 5, s: "SEE", col: T.primary, desc: "Identify 5 things you can see", ex: "Notice the lighting, colors, or objects" },
  { n: 4, s: "TOUCH", col: T.success, desc: "Acknowledge 4 things you feel", ex: "Focus on textures, temperature, or the floor" },
  { n: 3, s: "HEAR", col: T.accent, desc: "Listen for 3 distinct sounds", ex: "Try picking up background noises" },
  { n: 2, s: "SMELL", col: T.taker, desc: "Find 2 things you can smell", ex: "Fresh air, coffee, or a nearby scent" },
  { n: 1, s: "TASTE", col: T.danger, desc: "Focus on 1 thing you can taste", ex: "A mint, water, or the aftertaste in your mouth" },
];

export default function GroundingScreen({ navigation }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [taps, setTaps] = useState(0);

  const s = STEPS[stepIdx];

  const nextStep = () => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx(s => s + 1);
      setTaps(0);
    } else {
      navigation.navigate('ActivitiesHub');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>5-4-3-2-1 Grounding</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.badge, { borderColor: s.col, backgroundColor: s.col + '15' }]}>
          <Text style={[styles.badgeNum, { color: s.col }]}>{s.n}</Text>
          <Text style={[styles.badgeText, { color: s.col }]}>{s.s}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.desc}>{s.desc}</Text>
          <Text style={styles.ex}>{s.ex}</Text>
        </View>

        <View style={styles.tapsGrid}>
          {Array.from({ length: s.n }).map((_, i) => (
            <TouchableOpacity 
              key={i} 
              style={[
                styles.tapBox, 
                { backgroundColor: i < taps ? s.col : T.surf, borderColor: i < taps ? s.col : T.n300 }
              ]}
              onPress={() => setTaps(prev => Math.max(prev, i + 1))}
            >
              {i < taps && <CheckCircle2 size={28} color="#fff" strokeWidth={3} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.controls}>
          {stepIdx > 0 && (
            <TouchableOpacity 
              style={styles.secondaryBtn}
              onPress={() => {
                setStepIdx(s => s - 1);
                setTaps(STEPS[stepIdx - 1].n);
              }}
            >
              <Text style={styles.secondaryBtnText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={[
              styles.primaryBtn, 
              { flex: 1, backgroundColor: taps === s.n ? s.col : T.n300 }
            ]}
            disabled={taps < s.n}
            onPress={nextStep}
          >
            <Text style={styles.btnText}>
              {stepIdx < STEPS.length - 1 ? `Next: ${STEPS[stepIdx + 1].n} ${STEPS[stepIdx + 1].s}` : "Finish"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  badge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  badgeNum: {
    fontFamily: T.fontSora,
    fontSize: 36,
    fontWeight: T.w9,
  },
  badgeText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    marginTop: -4,
  },
  info: {
    alignItems: 'center',
    marginBottom: 40,
  },
  desc: {
    fontFamily: T.fontSora,
    fontSize: 20,
    fontWeight: T.w8,
    color: T.n900,
    textAlign: 'center',
  },
  ex: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 8,
    textAlign: 'center',
  },
  tapsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 60,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tapBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  controls: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
  secondaryBtn: {
    flex: 0.4,
    borderWidth: 2,
    borderColor: T.n300,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 16,
    fontWeight: T.w8,
  },
});
