import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mic } from 'lucide-react-native';
import { T } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function VoiceListenScreen({ navigation }) {
  const [transcript, setTranscript] = useState("Today I took my Sertraline, I'm feeling a bit tired but less anxious than yesterday...");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.statusIndicator}>
          <View style={styles.redDot} />
          <Text style={styles.statusText}>LISTENING</Text>
        </View>

        <View style={styles.micSection}>
          <View style={styles.rippleOuter} />
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={() => navigation.navigate('VoiceProc')}
            style={styles.micWrapper}
          >
            <LinearGradient
              colors={[T.danger, '#b04040']}
              style={styles.micButton}
            >
              <Mic size={38} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.waveContainer}>
          {[.3,.6,1,.8,.5,.9,.4,.7,1,.6,.3,.8,.5].map((h, i) => (
            <View 
              key={i} 
              style={[styles.waveBar, { height: h * 36 }]} 
            />
          ))}
        </View>

        <View style={styles.transcriptCard}>
          <Text style={styles.transcriptText}>
            "{transcript}"
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerHint}>Tap to stop</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VoiceIdle')}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

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
    paddingHorizontal: 28,
    paddingTop: 40,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: T.dangerSoft,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 100,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: T.danger,
  },
  statusText: {
    fontFamily: T.fontNunito,
    color: T.danger,
    fontSize: 12,
    fontWeight: T.w9,
  },
  micSection: {
    position: 'relative',
    width: 190,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  rippleOuter: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: T.dangerSoft,
  },
  micWrapper: {
    zIndex: 10,
    shadowColor: T.danger,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  micButton: {
    width: 114,
    height: 114,
    borderRadius: 57,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 44,
    marginBottom: 30,
  },
  waveBar: {
    width: 3,
    backgroundColor: T.danger,
    borderRadius: 2,
  },
  transcriptCard: {
    backgroundColor: T.surf,
    borderRadius: 14,
    padding: 18,
    width: '100%',
    shadowColor: T.n900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  transcriptText: {
    fontFamily: T.fontNunito,
    color: T.n700,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 40,
    alignItems: 'center',
    gap: 8,
  },
  footerHint: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 13,
  },
  cancelText: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 13,
    textDecorationLine: 'underline',
  }
});
