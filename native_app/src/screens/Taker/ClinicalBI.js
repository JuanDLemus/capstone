import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, TrendingUp, Mic, Activity, Brain } from 'lucide-react-native';
import { T } from '@/theme';

export default function ClinicalBIScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Clinical BI: Maria</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroVal}>84.2</Text>
          <Text style={styles.heroLbl}>Aggregated Risk Score</Text>
          <View style={styles.trendRow}>
            <TrendingUp size={16} color={T.danger} />
            <Text style={styles.trendText}>+14% from last week</Text>
          </View>
        </View>

        <View style={styles.layers}>
          <Text style={styles.sectionTitle}>Processing Layers</Text>
          
          <View style={styles.layerCard}>
            <View style={[styles.layerIcon, { backgroundColor: T.primarySoft }]}>
              <Mic size={20} color={T.primary} />
            </View>
            <View style={styles.layerInfo}>
              <Text style={styles.layerName}>Acoustic Analysis</Text>
              <Text style={styles.layerData}>Jitter: 0.12% | Shimmer: 0.8%</Text>
              <View style={styles.layerBadge}>
                <Text style={styles.badgeText}>Nominal</Text>
              </View>
            </View>
          </View>

          <View style={styles.layerCard}>
            <View style={[styles.layerIcon, { backgroundColor: T.dangerSoft }]}>
              <Brain size={20} color={T.danger} />
            </View>
            <View style={styles.layerInfo}>
              <Text style={styles.layerName}>Semantic Trace</Text>
              <Text style={styles.layerData}>High-arousal keywords detected: "panic", "suffocating"</Text>
              <View style={[styles.layerBadge, { backgroundColor: T.danger }]}>
                <Text style={[styles.badgeText, { color: '#fff' }]}>Alert</Text>
              </View>
            </View>
          </View>

          <View style={styles.layerCard}>
            <View style={[styles.layerIcon, { backgroundColor: T.accentSoft }]}>
              <Activity size={20} color={T.accent} />
            </View>
            <View style={styles.layerInfo}>
              <Text style={styles.layerName}>Biometric Sync</Text>
              <Text style={styles.layerData}>Heart Rate Variance: -12ms</Text>
              <View style={[styles.layerBadge, { backgroundColor: T.accent }]}>
                <Text style={[styles.badgeText, { color: '#fff' }]}>Shifted</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => navigation.navigate('AIFlags')}
        >
          <Text style={styles.actionBtnText}>Analyze Signal Origin</Text>
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
    padding: 20,
  },
  hero: {
    backgroundColor: T.n900,
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  heroVal: {
    fontFamily: T.fontSora,
    fontSize: 56,
    fontWeight: T.w8,
    color: '#fff',
  },
  heroLbl: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n400,
    fontWeight: T.w8,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  trendText: {
    fontFamily: T.fontNunito,
    color: T.danger,
    fontSize: 12,
    fontWeight: T.w8,
  },
  sectionTitle: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  layers: {
    gap: 12,
    marginBottom: 32,
  },
  layerCard: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  layerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layerInfo: {
    flex: 1,
  },
  layerName: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  layerData: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 2,
    marginBottom: 8,
  },
  layerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: T.n100,
  },
  badgeText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
  },
  actionBtn: {
    backgroundColor: T.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    elevation: 4,
  },
  actionBtnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
});
