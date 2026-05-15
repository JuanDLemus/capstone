import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Wind } from 'lucide-react-native';
import { T } from '@/theme';

const PHASES = {
  start: { l: "Ready?", c: T.n500, t: 0 },
  inhale: { l: "Inhale", c: T.primary, t: 4 },
  hold: { l: "Hold", c: T.accent, t: 7 },
  exhale: { l: "Exhale", c: T.success, t: 8 },
};

export default function BreathIScreen({ navigation }) {
  const [phase, setPhase] = useState("start");
  const [timer, setTimer] = useState(0);
  const [anim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (phase === "start") return;

    const current = PHASES[phase];
    setTimer(current.t);

    // Animation logic
    if (phase === "inhale") {
      Animated.timing(anim, { toValue: 1.5, duration: 4000, useNativeDriver: true }).start();
    } else if (phase === "exhale") {
      Animated.timing(anim, { toValue: 1, duration: 8000, useNativeDriver: true }).start();
    }

    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          // Auto transition
          if (phase === "inhale") setPhase("hold");
          else if (phase === "hold") setPhase("exhale");
          else if (phase === "exhale") setPhase("inhale");
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
          <Text style={styles.headerTitle}>4-7-8 Breathing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Animated.View style={[
          styles.circle, 
          { 
            borderColor: p.c, 
            backgroundColor: p.c + '10',
            transform: [{ scale: anim }]
          }
        ]}>
          {phase === "start" ? (
            <Wind size={48} color={T.n300} />
          ) : (
            <View style={styles.timerBox}>
              <Text style={[styles.phaseLabel, { color: p.c }]}>{p.l}</Text>
              <Text style={[styles.timerText, { color: p.c }]}>{timer}</Text>
            </View>
          )}
        </Animated.View>

        <View style={styles.controls}>
          {phase === "start" ? (
            <TouchableOpacity 
              style={styles.primaryBtn}
              onPress={() => setPhase("inhale")}
            >
              <Text style={styles.btnText}>Start Sequence</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.btnRow}>
              <TouchableOpacity 
                style={styles.secondaryBtn}
                onPress={() => {
                  setPhase("start");
                  anim.setValue(1);
                }}
              >
                <Text style={styles.secondaryBtnText}>Stop</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.primaryBtn, { flex: 1 }]}
                onPress={() => navigation.navigate('ActivitiesHub')}
              >
                <Text style={styles.btnText}>Complete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.guide}>
          <Text style={styles.guideTitle}>Instructions</Text>
          <Text style={styles.guideBody}>
            Inhale for 4s, hold for 7s, then exhale slowly for 8s. Repeat for 4 cycles to lower your heart rate.
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
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  timerBox: {
    alignItems: 'center',
  },
  phaseLabel: {
    fontFamily: T.fontNunito,
    fontSize: 20,
    fontWeight: T.w9,
    textTransform: 'uppercase',
  },
  timerText: {
    fontFamily: T.fontSora,
    fontSize: 48,
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
    backgroundColor: T.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    elevation: 4,
    shadowColor: T.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
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
