import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle2, Pill, HeartPulse, Activity, BatteryCharging, MessageCircle, AlertCircle } from 'lucide-react-native';
import { T } from '@/theme';

export default function VoiceRespScreen({ navigation }) {
  const items = [
    { ico: Pill, lbl: "Medication", val: "Sertraline taken", cat: "Tracking", col: T.med },
    { ico: HeartPulse, lbl: "Mood", val: "Better than yesterday", cat: "General", col: T.primary },
    { ico: Activity, lbl: "Anxiety", val: "Reduced, mild", cat: "Feeling Worried", col: T.accent },
    { ico: BatteryCharging, lbl: "Energy", val: "Tired", cat: "Feeling Tired", col: T.n500 },
    { ico: MessageCircle, lbl: "Appetite", val: "Normal", cat: "Eating Habits", col: T.success },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.chipOk}>
            <CheckCircle2 size={12} color={T.success} />
            <Text style={styles.chipOkText}>Entry Captured</Text>
          </View>
          <Text style={styles.timestamp}>Today, 9:41 AM</Text>
        </View>

        <Text style={styles.title}>Here's what I understood</Text>
        <Text style={styles.subtitle}>Review before saving to your journal</Text>

        <View style={styles.list}>
          {items.map((it, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.iconBox}>
                  <View style={[styles.iconBg, { backgroundColor: it.col + '15' }]}>
                    <it.ico size={20} color={it.col} />
                  </View>
                  <View>
                    <Text style={styles.cardCat}>{it.cat}</Text>
                    <Text style={styles.cardLbl}>{it.lbl}</Text>
                  </View>
                </View>
                <Text style={[styles.cardVal, { color: it.col }]}>{it.val}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.alertBox}>
          <AlertCircle size={16} color={T.primary} />
          <Text style={styles.alertText}>Pain level and sleep quality not mentioned - tap to add.</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.btn, styles.btnSecondary]}
            onPress={() => navigation.navigate('VoiceIdle')}
          >
            <Text style={styles.btnSecondaryText}>Re-record</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.btn, styles.btnPrimary]}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <CheckCircle2 size={16} color="#fff" />
            <Text style={styles.btnPrimaryText}>Save to Record</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: T.n100,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chipOk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: T.successSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
  },
  chipOkText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w8,
    color: T.success,
  },
  timestamp: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 20,
    fontWeight: T.w8,
    color: T.n900,
  },
  subtitle: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    color: T.n500,
    marginTop: 4,
  },
  list: {
    marginTop: 16,
    gap: 10,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCat: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    color: T.n500,
    fontWeight: T.w8,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardLbl: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w7,
    color: T.n900,
  },
  cardVal: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    fontWeight: T.w7,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: T.surf,
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: T.n300,
  },
  alertText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n700,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  btn: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  btnSecondary: {
    backgroundColor: T.surf,
    borderWidth: 2,
    borderColor: T.n300,
  },
  btnSecondaryText: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n700,
  },
  btnPrimary: {
    backgroundColor: T.n900,
  },
  btnPrimaryText: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: '#fff',
  },
});
