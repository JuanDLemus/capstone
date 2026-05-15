import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ArrowRight, Check } from 'lucide-react-native';
import { T } from '@/theme';

const QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen"
];

const OPTIONS = [
  { lbl: "Not at all", val: 0 },
  { lbl: "Several days", val: 1 },
  { lbl: "More than half the days", val: 2 },
  { lbl: "Nearly every day", val: 3 }
];

export default function GAD7Screen({ navigation }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));

  const onSelect = (val) => {
    const newAns = [...answers];
    newAns[step] = val;
    setAnswers(newAns);
    
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    }
  };

  const finish = () => {
    const total = answers.reduce((a, b) => a + (b || 0), 0);
    navigation.navigate('ScreeningResult', { type: 'GAD-7', score: total });
  };

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <View>
            <Text style={styles.headerTitle}>GAD-7 Assessment</Text>
            <Text style={styles.headerSub}>Question {step + 1} of {QUESTIONS.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.progBar}>
        <View style={[styles.progFill, { width: progress + '%', backgroundColor: T.accent }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.questionText}>{QUESTIONS[step]}</Text>
        <Text style={styles.contextText}>Over the last 2 weeks, how often have you been bothered by this?</Text>

        <View style={styles.options}>
          {OPTIONS.map((opt, i) => (
            <TouchableOpacity 
              key={i} 
              style={[styles.optBtn, answers[step] === opt.val && styles.optBtnActive]}
              onPress={() => onSelect(opt.val)}
            >
              <Text style={[styles.optText, answers[step] === opt.val && styles.optTextActive]}>{opt.lbl}</Text>
              {answers[step] === opt.val && <Check size={20} color={T.accent} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          {step > 0 && (
            <TouchableOpacity style={styles.secBtn} onPress={() => setStep(step - 1)}>
              <Text style={styles.secBtnText}>Previous</Text>
            </TouchableOpacity>
          )}
          {step === QUESTIONS.length - 1 && answers[step] !== null && (
            <TouchableOpacity style={[styles.priBtn, { backgroundColor: T.accent }]} onPress={finish}>
              <Text style={styles.priBtnText}>Complete</Text>
              <ArrowRight size={18} color="#fff" />
            </TouchableOpacity>
          )}
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
    gap: 12,
  },
  headerTitle: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.n900,
  },
  headerSub: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w7,
  },
  progBar: {
    height: 4,
    backgroundColor: T.n200,
  },
  progFill: {
    height: '100%',
  },
  content: {
    padding: 28,
  },
  questionText: {
    fontFamily: T.fontSora,
    fontSize: 24,
    fontWeight: T.w8,
    color: T.n900,
    lineHeight: 32,
    marginBottom: 12,
  },
  contextText: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w7,
    marginBottom: 40,
    lineHeight: 20,
  },
  options: {
    gap: 12,
  },
  optBtn: {
    backgroundColor: T.surf,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optBtnActive: {
    borderColor: T.accent,
    backgroundColor: T.accentSoft,
  },
  optText: {
    fontFamily: T.fontNunito,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.n700,
  },
  optTextActive: {
    color: T.accent,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 40,
  },
  priBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 9999,
  },
  priBtnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
  secBtn: {
    flex: 0.4,
    backgroundColor: T.n200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  secBtnText: {
    fontFamily: T.fontNunito,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.n600,
  },
});
