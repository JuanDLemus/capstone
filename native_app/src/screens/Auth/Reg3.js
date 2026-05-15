import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import { T } from '@/theme';

const ACCESS_OPTIONS = [
  { id: 'mic', label: 'Microphone', sub: 'Enable voice entry' },
  { id: 'aac', label: 'Symbol cards', sub: 'Simplified pictorial choices' },
  { id: 'cb', label: 'Color mode', sub: 'Colorblind friendly' },
  { id: 'lt', label: 'Large text', sub: 'Easier to read labels' },
  { id: 'hc', label: 'High contrast', sub: 'Sharper visuals' },
];

export default function Reg3Screen({ navigation }) {
  const [toggles, setToggles] = useState({
    mic: true,
    aac: false,
    cb: false,
    lt: false,
    hc: false,
  });

  const toggle = (id) => {
    setToggles({ ...toggles, [id]: !toggles[id] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={T.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.stepIndicator}>
            {[1, 2, 3, 4].map(n => (
              <View key={n} style={[styles.stepDot, n <= 3 && styles.stepDotActive]} />
            ))}
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Step 3 of 4</Text>
          </View>
          <Text style={styles.title}>Accessibility</Text>
          <Text style={styles.subtitle}>Choose the accessibility features that help you most.</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.card}>
            {ACCESS_OPTIONS.map((opt, i) => (
              <View 
                key={opt.id} 
                style={[styles.row, i < ACCESS_OPTIONS.length - 1 && styles.rowBorder]}
              >
                <View style={styles.rowInfo}>
                  <Text style={styles.rowLabel}>{opt.label}</Text>
                  <Text style={styles.rowSub}>{opt.sub}</Text>
                </View>
                <Switch 
                  value={toggles[opt.id]} 
                  onValueChange={() => toggle(opt.id)}
                  trackColor={{ false: T.n300, true: T.primary }}
                  thumbColor={toggles[opt.id] ? '#fff' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => navigation.navigate('Reg4')}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.n100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontSize: 14,
    fontWeight: T.w8,
    marginLeft: 4,
  },
  header: {
    marginBottom: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  stepDot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: T.n300,
  },
  stepDotActive: {
    backgroundColor: T.primary,
  },
  badge: {
    backgroundColor: T.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontSize: 11,
    fontWeight: T.w9,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 26,
    fontWeight: T.w8,
    color: T.n900,
  },
  subtitle: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 24,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: T.n100,
  },
  rowInfo: {
    flex: 1,
  },
  rowLabel: {
    fontFamily: T.fontNunito,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.n900,
  },
  rowSub: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    marginTop: 2,
  },
  nextButton: {
    backgroundColor: T.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    marginTop: 24,
    elevation: 4,
    shadowColor: T.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  nextButtonText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
});
