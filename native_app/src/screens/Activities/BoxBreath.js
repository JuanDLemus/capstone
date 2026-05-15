import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Svg, Rect, Line, G } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import { T } from '@/theme';

// Svg is from react-native-svg, but I'll use a simpler representation or just boxes for now 
// if I don't want to add dependencies. But the user has expo, so react-native-svg is likely there.

const PHASES = {
  start: { l: "Ready?", c: T.n500 },
  inhale: { l: "Inhale", c: T.success },
  hold1: { l: "Hold", c: T.accent },
  exhale: { l: "Exhale", c: T.primary },
  hold2: { l: "Hold", c: T.accent },
};

const ORDER = ["inhale", "hold1", "exhale", "hold2"];

export default function BoxBreathScreen({ navigation }) {
  const [phase, setPhase] = useState("start");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (phase === "start") return;

    setTimer(4);
    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          const nextIdx = (ORDER.indexOf(phase) + 1) % ORDER.length;
          setPhase(ORDER[nextIdx]);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  const p = PHASES[phase];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Box Breathing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.box, { borderColor: T.n300 }]}>
          {/* We'll simulate the side progress with 4 bars */}
          <View style={[styles.side, styles.left, phase === "inhale" && styles.activeSide, { backgroundColor: phase === "inhale" ? T.success : T.n100 }]} />
          <View style={[styles.side, styles.top, phase === "hold1" && styles.activeSide, { backgroundColor: phase === "hold1" ? T.accent : T.n100 }]} />
          <View style={[styles.side, styles.right, phase === "exhale" && styles.activeSide, { backgroundColor: phase === "exhale" ? T.primary : T.n100 }]} />
          <View style={[styles.side, styles.bottom, phase === "hold2" && styles.activeSide, { backgroundColor: phase === "hold2" ? T.accent : T.n100 }]} />
          
          <View style={styles.inner}>
            <Text style={[styles.phaseLabel, { color: p.c }]}>{p.l}</Text>
            {phase !== "start" && <Text style={[styles.timerText, { color: p.c }]}>{timer}</Text>}
          </View>
        </View>

        <View style={styles.controls}>
          {phase === "start" ? (
            <TouchableOpacity 
              style={[styles.primaryBtn, { backgroundColor: T.success }]}
              onPress={() => setPhase("inhale")}
            >
              <Text style={styles.btnText}>Start Sequence</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.btnRow}>
              <TouchableOpacity 
                style={styles.secondaryBtn}
                onPress={() => setPhase("start")}
              >
                <Text style={styles.secondaryBtnText}>Stop</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.primaryBtn, { flex: 1, backgroundColor: T.success }]}
                onPress={() => navigation.navigate('ActivitiesHub')}
              >
                <Text style={styles.btnText}>Complete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.guide}>
          <Text style={styles.guideTitle}>The 4-Second Box</Text>
          <Text style={styles.guideBody}>
            Follow the sides of the square: Inhale up, Hold across, Exhale down, Hold back.
          </Text>
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
  box: {
    width: 200,
    height: 200,
    backgroundColor: T.surf,
    borderWidth: 2,
    position: 'relative',
    marginBottom: 60,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  side: {
    position: 'absolute',
    opacity: 0.8,
  },
  left: { left: -4, top: 0, bottom: 0, width: 8 },
  top: { top: -4, left: 0, right: 0, height: 8 },
  right: { right: -4, top: 0, bottom: 0, width: 8 },
  bottom: { bottom: -4, left: 0, right: 0, height: 8 },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseLabel: {
    fontFamily: T.fontNunito,
    fontSize: 20,
    fontWeight: T.w9,
  },
  timerText: {
    fontFamily: T.fontSora,
    fontSize: 40,
    fontWeight: T.w8,
    marginTop: 4,
  },
  controls: {
    width: '100%',
    marginBottom: 40,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryBtn: {
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  btnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
  secondaryBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: T.n300,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  secondaryBtnText: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 16,
    fontWeight: T.w8,
  },
  guide: {
    backgroundColor: T.surf,
    padding: 20,
    borderRadius: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: T.n100,
  },
  guideTitle: {
    fontFamily: T.fontSora,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
    marginBottom: 6,
  },
  guideBody: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    color: T.n600,
    lineHeight: 20,
    fontWeight: T.w6,
  },
});
