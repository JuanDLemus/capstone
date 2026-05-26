import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, MessageCircle, AlertCircle, Mic, Layers } from 'lucide-react-native';
import { T } from '@/theme';
import { useAuth } from '@/context/AuthContext';
import { getStrings } from '@/services/strings';

const INTENT_COLORS = {
  general: T.primary,
  medication: T.med,
  mood: T.accent,
  anxiety: T.danger,
  appointment: T.success,
  emergency: T.danger,
};

export default function VoiceRespScreen({ navigation, route }) {
  const { user } = useAuth();
  const strings = getStrings(user);

  const transcript = route?.params?.transcript ?? '';
  const aiResult = route?.params?.aiResult ?? null;
  const history = route?.params?.history ?? [];
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const reply = aiResult?.reply ?? strings.no_response;
  const summary = aiResult?.summary ?? strings.done;
  const intent = aiResult?.intent ?? 'general';
  const intentColor = INTENT_COLORS[intent] ?? T.primary;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={styles.chipOk}>
            <CheckCircle2 size={12} color={T.success} />
            <Text style={styles.chipOkText}>{strings.entry_captured}</Text>
          </View>
          <Text style={styles.timestamp}>Today, {now}</Text>
        </View>

        <Text style={styles.title}>{strings.echovolt_response}</Text>
        <Text style={styles.subtitle}>{summary}</Text>

        {/* USER TRANSCRIPT */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>{strings.what_you_said}</Text>
          <Text style={styles.transcriptText}>"{transcript}"</Text>
        </View>

        {/* AI RESPONSE */}
        <View style={[styles.card, styles.replyCard, { borderLeftColor: intentColor }]}>
          <View style={styles.replyHeader}>
            <MessageCircle size={16} color={intentColor} />
            <Text style={[styles.intentChip, { color: intentColor, backgroundColor: intentColor + '18' }]}>
              {intent.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.replyText}>{reply}</Text>
        </View>

        {intent === 'emergency' && (
          <View style={styles.alertBox}>
            <AlertCircle size={16} color={T.danger} />
            <Text style={styles.alertText}>{strings.crisis_hint}</Text>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <Text style={styles.continueTitle}>{strings.say_more}</Text>
          
          <View style={styles.actionsRow}>
            {/* CONTINUE WITH VOICE */}
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={() => navigation.navigate('VoiceListen', { history })}
            >
              <Mic size={16} color={T.n700} />
              <Text style={styles.btnSecondaryText}>{strings.voice}</Text>
            </TouchableOpacity>

            {/* CONTINUE WITH AAC */}
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={() => navigation.navigate('AACMain', { history })}
            >
              <Layers size={16} color={T.n700} />
              <Text style={styles.btnSecondaryText}>{strings.aac_cards}</Text>
            </TouchableOpacity>
          </View>

          {/* DONE ACTION */}
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary]}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <CheckCircle2 size={16} color="#fff" />
            <Text style={styles.btnPrimaryText}>{strings.done}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: T.n100 },
  container: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  chipOk: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: T.successSoft, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 99,
  },
  chipOkText: { fontFamily: T.fontNunito, fontSize: 12, fontWeight: T.w8, color: T.success },
  timestamp: { fontFamily: T.fontNunito, fontSize: 12, color: T.n500 },
  title: { fontFamily: T.fontSora, fontSize: 20, fontWeight: T.w8, color: T.n900 },
  subtitle: { fontFamily: T.fontNunito, fontSize: 13, color: T.n500, marginTop: 4, marginBottom: 16 },
  card: {
    backgroundColor: T.surf, borderRadius: 16, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  replyCard: { borderLeftWidth: 4 },
  cardLabel: {
    fontFamily: T.fontNunito, fontSize: 10, fontWeight: T.w9, color: T.n400,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  transcriptText: { fontFamily: T.fontNunito, color: T.n600, fontSize: 14, lineHeight: 22, fontStyle: 'italic' },
  replyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  intentChip: {
    fontFamily: T.fontNunito, fontSize: 10, fontWeight: T.w9,
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99,
  },
  replyText: { fontFamily: T.fontNunito, color: T.n800, fontSize: 15, lineHeight: 24 },
  alertBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: T.dangerSoft, padding: 12, borderRadius: 12, marginBottom: 12,
  },
  alertText: { fontFamily: T.fontNunito, fontSize: 12, color: T.danger, flex: 1, lineHeight: 18 },
  actionsContainer: { marginTop: 12, gap: 12 },
  continueTitle: {
    fontFamily: T.fontNunito, fontSize: 11, fontWeight: T.w9, color: T.n400,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
  },
  actionsRow: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, height: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  btnSecondary: { backgroundColor: T.surf, borderWidth: 2, borderColor: T.n300 },
  btnSecondaryText: { fontFamily: T.fontNunito, fontSize: 15, fontWeight: T.w8, color: T.n700 },
  btnPrimary: { backgroundColor: T.n900, flex: 0, width: '100%' },
  btnPrimaryText: { fontFamily: T.fontNunito, fontSize: 15, fontWeight: T.w8, color: '#fff' },
});
