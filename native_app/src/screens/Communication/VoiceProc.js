import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { T } from '@/theme';
import { Activity } from 'lucide-react-native';

export default function VoiceProcScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('VoiceResp');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Activity size={36} color={T.primary} />
        </View>

        <ActivityIndicator size="large" color={T.primary} style={styles.spinner} />

        <Text style={styles.title}>Understanding your entry...</Text>
        <Text style={styles.subtitle}>Organizing what you shared into your journal.</Text>

        <View style={styles.steps}>
          {[
            { t: "Saving audio...", c: T.success },
            { t: "Understanding your words...", c: T.success },
            { t: "Organizing your entry...", c: T.primary },
            { t: "Updating your tracking...", c: T.n500 },
            { t: "Saving to your journal", c: T.n500 },
          ].map((s, i) => (
            <Text key={i} style={[styles.stepText, { color: s.c }]}>
              {s.t}
            </Text>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.skipBtn}
          onPress={() => navigation.navigate('VoiceResp')}
        >
          <Text style={styles.skipBtnText}>Skip preview</Text>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: T.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  spinner: {
    marginBottom: 20,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 20,
    fontWeight: T.w8,
    color: T.n900,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  steps: {
    alignItems: 'center',
    gap: 8,
  },
  stepText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
  },
  skipBtn: {
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipBtnText: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 14,
  }
});
