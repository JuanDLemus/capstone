import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, User } from 'lucide-react-native';
import { T } from '@/theme';

const STEPS = [
  { lbl: "Feet & Legs", desc: "Notice the weight of your feet on the ground. Relax your leg muscles." },
  { lbl: "Hips & Core", desc: "Feel the support of your chair. Let your stomach soften and expand." },
  { lbl: "Chest & Back", desc: "Gently drop your shoulders. Feel your ribcage expand as you breathe." },
  { lbl: "Arms & Hands", desc: "Let your fingers go loose. Drop any tension in your forearms." },
  { lbl: "Neck & Head", desc: "Unclench your jaw. Smooth your forehead. Let everything rest." }
];

export default function BodyScanScreen({ navigation }) {
  const [stepIdx, setStepIdx] = useState(0);
  const s = STEPS[stepIdx];

  const next = () => {
    if (stepIdx < STEPS.length - 1) setStepIdx(s => s + 1);
    else navigation.navigate('ActivitiesHub');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Body Scan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.iconBox}>
            <User size={40} color={T.taker} />
          </View>
          <Text style={styles.stepTitle}>{s.lbl}</Text>
          <Text style={styles.stepDesc}>{s.desc}</Text>
        </View>

        <View style={styles.progress}>
          {STEPS.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                { backgroundColor: i === stepIdx ? T.taker : (i < stepIdx ? T.taker + '66' : T.n300) }
              ]} 
            />
          ))}
        </View>

        <View style={styles.controls}>
          {stepIdx > 0 && (
            <TouchableOpacity 
              style={styles.secondaryBtn}
              onPress={() => setStepIdx(s => s - 1)}
            >
              <Text style={styles.secondaryBtnText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.primaryBtn}
            onPress={next}
          >
            <Text style={styles.btnText}>
              {stepIdx < STEPS.length - 1 ? "Next Area" : "Finish Scan"}
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
    fontWeight: T.w8,
    color: T.n900,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: T.taker + '15',
    borderWidth: 4,
    borderColor: T.taker,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepTitle: {
    fontFamily: T.fontSora,
    fontSize: 24,
    fontWeight: T.w9,
    color: T.n900,
  },
  stepDesc: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    color: T.n500,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
    fontWeight: T.w6,
  },
  progress: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 60,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  controls: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: T.taker,
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: T.taker,
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
