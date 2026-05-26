import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { T } from '@/theme';
import { Activity, XCircle } from 'lucide-react-native';
import { sendToModel } from '@/services/ai';
import { useAuth } from '@/context/AuthContext';
import { getStrings } from '@/services/strings';

export default function VoiceProcScreen({ navigation, route }) {
  const { user } = useAuth();
  const strings = getStrings(user);

  const STEPS = [
    strings.saving_transcript,
    strings.sending_to_ai,
    strings.analyzing_entry,
    strings.building_response,
    strings.done,
  ];

  const transcript = route?.params?.transcript ?? route?.params?.query ?? '';
  const history = route?.params?.history ?? [];
  const isAac = route?.params?.isAac ?? false;

  const [currentStep, setCurrentStep] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!transcript) {
      navigation.navigate('VoiceIdle');
      return;
    }
    processTranscript();
  }, []);

  async function processTranscript() {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < STEPS.length - 2 ? prev + 1 : prev));
    }, 600);

    try {
      const result = await sendToModel(transcript, history, isAac);
      clearInterval(stepInterval);
      setCurrentStep(STEPS.length - 1);

      const updatedHistory = [
        ...history,
        { sender: 'user', text: transcript },
        { sender: 'ai', text: result.reply }
      ];

      setTimeout(() => {
        navigation.navigate('VoiceResp', { transcript, aiResult: result, history: updatedHistory });
      }, 400);
    } catch (err) {
      clearInterval(stepInterval);
      setFailed(true);
    }
  }

  if (failed) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={[styles.iconCircle, { backgroundColor: T.dangerSoft }]}>
            <XCircle size={36} color={T.danger} />
          </View>
          <Text style={styles.title}>{strings.could_not_reach_ai}</Text>
          <Text style={styles.subtitle}>{strings.make_sure_lm_studio}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => navigation.navigate('VoiceIdle')}>
            <Text style={styles.retryText}>{strings.go_back}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Activity size={36} color={T.primary} />
        </View>

        <ActivityIndicator size="large" color={T.primary} style={styles.spinner} />

        <Text style={styles.title}>{strings.processing_title}</Text>
        <Text style={styles.subtitle}>{strings.processing_subtitle}</Text>

        <View style={styles.steps}>
          {STEPS.map((s, i) => {
            const color = i < currentStep ? T.success : i === currentStep ? T.primary : T.n400;
            return (
              <Text key={i} style={[styles.stepText, { color }]}>
                {i < currentStep ? '✓ ' : i === currentStep ? '→ ' : '  '}{s}
              </Text>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: T.n100 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: T.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  spinner: { marginBottom: 20 },
  title: { fontFamily: T.fontSora, fontSize: 20, fontWeight: T.w8, color: T.n900, textAlign: 'center' },
  subtitle: { fontFamily: T.fontNunito, color: T.n500, fontSize: 14, lineHeight: 22, textAlign: 'center', marginTop: 8, marginBottom: 24 },
  steps: { alignItems: 'flex-start', gap: 8 },
  stepText: { fontFamily: T.fontNunito, fontSize: 13 },
  retryBtn: { marginTop: 24, backgroundColor: T.primary, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 14 },
  retryText: { fontFamily: T.fontNunito, color: '#fff', fontWeight: T.w8, fontSize: 15 },
});
