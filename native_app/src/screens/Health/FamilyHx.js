import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Users, ShieldAlert } from 'lucide-react-native';
import { T } from '@/theme';

const HX = [
  { relation: "Father", conditions: ["Hypertension", "Type 2 Diabetes"], age: "65" },
  { relation: "Mother", conditions: ["Anxiety Disorder", "Migraines"], age: "62" },
  { relation: "Paternal Grandfather", conditions: ["Alzheimer's Disease"], age: "Deceased (82)" },
];

export default function FamilyHxScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Family History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.iconBox}>
            <Users size={32} color={T.n600} />
          </View>
          <Text style={styles.heroTitle}>Genetic Context</Text>
          <Text style={styles.heroSub}>Understanding family health patterns for proactive care.</Text>
        </View>

        <View style={styles.list}>
          {HX.map((h, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.relation}>{h.relation}</Text>
                <Text style={styles.age}>Age: {h.age}</Text>
              </View>
              <View style={styles.condList}>
                {h.conditions.map((c, j) => (
                  <View key={j} style={styles.condBadge}>
                    <ShieldAlert size={12} color={T.n600} />
                    <Text style={styles.condText}>{c}</Text>
                  </View>
                ))}
              </View>
            </View>
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
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: T.n200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: T.fontSora,
    fontSize: 22,
    fontWeight: T.w8,
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
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: T.n100,
    paddingBottom: 12,
  },
  relation: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w9,
    color: T.n900,
  },
  age: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w7,
  },
  condList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  condBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: T.n100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  condText: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    fontWeight: T.w7,
    color: T.n700,
  },
});
