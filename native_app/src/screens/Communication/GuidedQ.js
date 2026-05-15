import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { T } from '@/theme';

const QUESTIONS = [
  { id: "mood", txt: "How are you feeling emotionally right now?", type: "emoji", opts: ["😢", "😟", "😐", "🙂", "😊", "🥳", "😤", "😴"], clin: "PHQ-9 Q1 proxy" },
  { id: "appetite", txt: "How was your appetite today?", type: "multi", opts: ["Ate normally", "Less than usual", "Skipped meals", "More than usual"], clin: "PHQ-9 Q5" },
  { id: "energy", txt: "Your energy level today?", type: "multi", opts: ["Full energy", "Good", "OK", "Tired", "Exhausted"], clin: "PHQ-9 Q4" },
  { id: "sleep", txt: "How did you sleep last night?", type: "multi", opts: ["Well (7-9 hrs)", "Fell asleep late", "Woke up often", "Too much", "Couldn't sleep"], clin: "PHQ-9 Q3 / GAD-7" },
  { id: "worry", txt: "How anxious or worried have you felt today?", type: "multi", opts: ["Not really", "A little", "Quite a lot", "Overwhelmed"], clin: "GAD-7 Q1" },
  { id: "meds", txt: "Did you take your medications today?", type: "multi", opts: ["Yes, all taken", "No, forgot", "Not yet", "No medications"], clin: "Adherence" },
  { id: "pain", txt: "Any physical pain or discomfort?", type: "multi", opts: ["None (0)", "Mild (1-3)", "Moderate (4-6)", "Severe (7-9)", "Worst (10)"], clin: "Somatic symptoms" },
  { id: "function", txt: "Could you do your usual daily activities?", type: "multi", opts: ["Yes, fully", "Partially", "Struggled", "Stayed in bed"], clin: "Functional capacity" },
  { id: "note", txt: "Anything else for your clinical record today?", type: "text", clin: "Open clinical note" },
];

export default function GuidedQScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [textNote, setTextNote] = useState('');

  const currentQ = QUESTIONS[step];

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Save logic would go here
      navigation.navigate('VoiceResp');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const selectOption = (val) => {
    setAnswers({ ...answers, [currentQ.id]: val });
  };

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <ChevronLeft size={24} color={T.clin} />
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.stepText}>{step + 1} / {QUESTIONS.length}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.qHeader}>
          <View style={styles.clinBadge}>
            <Text style={styles.clinBadgeText}>{currentQ.clin}</Text>
          </View>
          <Text style={styles.qText}>{currentQ.txt}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQ.type === 'emoji' && (
            <View style={styles.emojiGrid}>
              {currentQ.opts.map((e) => (
                <TouchableOpacity 
                  key={e} 
                  style={[styles.emojiBtn, answers[currentQ.id] === e && styles.emojiBtnSel]}
                  onPress={() => selectOption(e)}
                >
                  <Text style={styles.emojiText}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {currentQ.type === 'multi' && (
            <View style={styles.multiCol}>
              {currentQ.opts.map((opt, i) => (
                <TouchableOpacity 
                  key={opt} 
                  style={[styles.multiBtn, answers[currentQ.id] === i && styles.multiBtnSel]}
                  onPress={() => selectOption(i)}
                >
                  <View style={[styles.multiIdx, answers[currentQ.id] === i && styles.multiIdxSel]}>
                    <Text style={[styles.multiIdxText, answers[currentQ.id] === i && styles.multiIdxTextSel]}>{i}</Text>
                  </View>
                  <Text style={[styles.multiText, answers[currentQ.id] === i && styles.multiTextSel]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {currentQ.type === 'text' && (
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Type freely... this goes into your clinical record"
              placeholderTextColor={T.n500}
              value={textNote}
              onChangeText={setTextNote}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.nextBtn, (currentQ.type !== 'text' && answers[currentQ.id] === undefined) && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={currentQ.type !== 'text' && answers[currentQ.id] === undefined}
        >
          <Text style={styles.nextBtnText}>
            {step < QUESTIONS.length - 1 ? 'Next Step' : 'Save Clinical Entry'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: T.n100,
  },
  header: {
    backgroundColor: T.surf,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: T.n100,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtnText: {
    fontFamily: T.fontNunito,
    color: T.clin,
    fontWeight: T.w8,
    fontSize: 14,
  },
  stepText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w7,
  },
  progressBar: {
    height: 6,
    backgroundColor: T.n100,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: T.clin,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  qHeader: {
    marginBottom: 24,
  },
  clinBadge: {
    alignSelf: 'flex-start',
    backgroundColor: T.clinSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  clinBadgeText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    color: T.clin,
    fontWeight: T.w8,
    textTransform: 'uppercase',
  },
  qText: {
    fontFamily: T.fontSora,
    fontSize: 20,
    fontWeight: T.w8,
    color: T.n900,
    lineHeight: 28,
  },
  optionsContainer: {
    flex: 1,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emojiBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: T.surf,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emojiBtnSel: {
    borderColor: T.clin,
    backgroundColor: T.clinSoft,
    transform: [{ scale: 1.1 }],
  },
  emojiText: {
    fontSize: 32,
  },
  multiCol: {
    gap: 12,
  },
  multiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: T.surf,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: T.n300,
  },
  multiBtnSel: {
    borderColor: T.clin,
    backgroundColor: T.clin,
  },
  multiIdx: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: T.n100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  multiIdxSel: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  multiIdxText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n700,
  },
  multiIdxTextSel: {
    color: '#fff',
  },
  multiText: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  multiTextSel: {
    color: '#fff',
  },
  textInput: {
    fontFamily: T.fontNunito,
    backgroundColor: T.surf,
    borderRadius: 16,
    padding: 16,
    height: 160,
    fontSize: 15,
    color: T.n900,
    borderWidth: 2,
    borderColor: T.n300,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 24,
    backgroundColor: T.n100,
  },
  nextBtn: {
    backgroundColor: T.clin,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: T.clin,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  nextBtnDisabled: {
    backgroundColor: T.n300,
    elevation: 0,
    shadowOpacity: 0,
  },
  nextBtnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
});
