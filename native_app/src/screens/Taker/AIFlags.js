import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, AlertCircle, ShieldAlert, Zap } from 'lucide-react-native';
import { T } from '@/theme';

const FLAGS = [
  { type: 'Acoustic', sev: 'Critical', msg: 'Vocal jitter exceeded baseline by 40% for 3 consecutive days.', date: 'Today, 10:15 AM' },
  { type: 'Semantic', sev: 'High', msg: 'Increased usage of crisis-oriented language in private voice entries.', date: 'Yesterday, 8:45 PM' },
  { type: 'Behavioral', sev: 'Medium', msg: 'Missed morning medication dose for 2 days.', date: 'Oct 25, 2025' },
];

export default function AIFlagsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>AI Clinical Flags</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Zap size={32} color={T.danger} />
          <Text style={styles.heroTitle}>Pattern Detection</Text>
          <Text style={styles.heroSub}>Neural layers flagging non-linear changes in patient state.</Text>
        </View>

        <View style={styles.list}>
          {FLAGS.map((f, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.typeBox}>
                  <ShieldAlert size={14} color={T.n500} />
                  <Text style={styles.typeText}>{f.type}</Text>
                </View>
                <View style={[
                  styles.sevBadge, 
                  { backgroundColor: f.sev === 'Critical' ? T.danger : (f.sev === 'High' ? T.dangerSoft : T.n200) }
                ]}>
                  <Text style={[
                    styles.sevText, 
                    { color: f.sev === 'Critical' ? '#fff' : (f.sev === 'High' ? T.danger : T.n600) }
                  ]}>{f.sev}</Text>
                </View>
              </View>
              <Text style={styles.msgText}>{f.msg}</Text>
              <Text style={styles.dateText}>{f.date}</Text>
            </TouchableOpacity>
          ))}
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
    gap: 8,
  },
  headerTitle: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w8,
    color: T.n900,
  },
  content: {
    padding: 20,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 10,
  },
  heroTitle: {
    fontFamily: T.fontSora,
    fontSize: 22,
    fontWeight: T.w9,
    color: T.n900,
  },
  heroSub: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w6,
    textAlign: 'center',
    marginTop: 4,
  },
  list: {
    gap: 16,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    borderLeftWidth: 6,
    borderLeftColor: T.danger,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  typeText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
  },
  sevBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sevText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w9,
    textTransform: 'uppercase',
  },
  msgText: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w7,
    color: T.n900,
    lineHeight: 22,
    marginBottom: 12,
  },
  dateText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n400,
    fontWeight: T.w6,
  },
});
