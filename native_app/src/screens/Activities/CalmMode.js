import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, HeartPulse, Activity, Layers, Bell, BedDouble } from 'lucide-react-native';
import { T } from '@/theme';

const AMBIENTS = [
  { icon: Activity, label: "Ocean Sounds (8 min)" },
  { icon: Layers, label: "Rain Ambient (15 min)" },
  { icon: Bell, label: "Wind Chimes (10 min)" },
  { icon: BedDouble, label: "Sleep Preparation" },
];

export default function CalmModeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Calm Mode</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Deep Rest Mode</Text>
          <Text style={styles.heroSub}>Lower your stimulation. Focus on gentle ambient sounds.</Text>
        </View>

        <View style={styles.pulseContainer}>
          <View style={styles.pulseInner}>
            <HeartPulse size={48} color={T.success} />
          </View>
        </View>

        <View style={styles.list}>
          {AMBIENTS.map((item, i) => (
            <TouchableOpacity key={i} style={styles.card}>
              <View style={styles.iconBox}>
                <item.icon size={22} color={T.success} />
              </View>
              <Text style={styles.cardLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.finishBtn}
          onPress={() => navigation.navigate('ActivitiesHub')}
        >
          <Text style={styles.finishBtnText}>End Session</Text>
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
    fontWeight: T.w7,
    color: T.n900,
  },
  content: {
    padding: 28,
    alignItems: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroTitle: {
    fontFamily: T.fontSora,
    fontSize: 24,
    fontWeight: T.w8,
    color: T.n900,
  },
  heroSub: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
    fontWeight: T.w6,
  },
  pulseContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: T.success + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    borderWidth: 4,
    borderColor: T.success,
  },
  pulseInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: T.success + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    gap: 12,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: T.success + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  finishBtn: {
    marginTop: 40,
    backgroundColor: T.n900,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 9999,
  },
  finishBtnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 14,
    fontWeight: T.w9,
    letterSpacing: 1,
  },
});
