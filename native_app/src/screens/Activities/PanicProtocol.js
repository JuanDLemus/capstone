import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Activity } from 'lucide-react-native';
import { T } from '@/theme';

const STEPS = [
  "Sit or lie down securely",
  "Press both feet flat onto the floor",
  "Rest your hands firmly on your thighs",
  "Drop your shoulders down",
  "Notice 1 thing you can see right now"
];

export default function PanicProtocolScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Panic Attack</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.iconBox}>
            <Activity size={36} color={T.danger} strokeWidth={3} />
          </View>
          <Text style={styles.title}>This will pass.</Text>
          <Text style={styles.subtitle}>You are safe. Follow these steps with me.</Text>
        </View>

        <View style={styles.steps}>
          {STEPS.map((s, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.stepNumBox}>
                <Text style={styles.stepNum}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{s}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => navigation.navigate('breath_i')}
        >
          <Text style={styles.actionBtnText}>I'm ready to breathe</Text>
        </TouchableOpacity>
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
    padding: 28,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: T.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 26,
    fontWeight: T.w9,
    color: T.n900,
  },
  subtitle: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n700,
    fontWeight: T.w7,
    marginTop: 8,
    textAlign: 'center',
  },
  steps: {
    gap: 14,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderLeftWidth: 4,
    borderLeftColor: T.danger,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  stepNumBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: T.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontFamily: T.fontSora,
    color: T.danger,
    fontWeight: T.w9,
    fontSize: 16,
  },
  stepText: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
    lineHeight: 20,
  },
  actionBtn: {
    marginTop: 40,
    backgroundColor: T.danger,
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    elevation: 8,
    shadowColor: T.danger,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  actionBtnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
});
