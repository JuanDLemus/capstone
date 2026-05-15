import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mic, FileText, Layers } from 'lucide-react-native';
import { T } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function VoiceIdleScreen({ navigation }) {
  const [trans, setTrans] = useState(false);

  const handleMicPress = () => {
    setTrans(true);
    setTimeout(() => {
      navigation.navigate('VoiceListen');
      setTrans(false);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Title */}
        <View style={[styles.headerContainer, { opacity: trans ? 0 : 1 }]}>
          <Text style={styles.title}>How are you doing?</Text>
          <Text style={styles.subtitle}>Tap to talk, or choose another input method</Text>
        </View>

        {/* Central Mic Button */}
        <View style={styles.micCenterContainer}>
          <View style={[styles.pulseRingOuter, trans && styles.pulseRingOuterActive]} />
          <View style={[styles.pulseRingInner, trans && styles.pulseRingInnerActive]} />
          
          <TouchableOpacity activeOpacity={0.8} onPress={handleMicPress} style={styles.micButtonWrapper}>
            <LinearGradient
              colors={trans ? ['#E05C5C', '#b04040'] : [T.primary, T.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.micButton}
            >
              <Mic size={38} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Bottom Actions */}
        <View style={[styles.bottomActions, { opacity: trans ? 0 : 1 }]}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => {}}>
            <FileText size={16} color={T.n700} />
            <Text style={styles.actionBtnText}>Questions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('AACMain')}>
            <Layers size={16} color={T.n700} />
            <Text style={styles.actionBtnText}>AAC Cards</Text>
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
    paddingBottom: 28,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 22,
    fontWeight: T.w8,
    color: T.n900,
  },
  subtitle: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 14,
    marginTop: 6,
  },
  micCenterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 190,
    height: 190,
  },
  pulseRingOuter: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 2,
    borderColor: T.primarySoft,
  },
  pulseRingOuterActive: {
    borderColor: T.dangerSoft,
  },
  pulseRingInner: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: T.primary + "33",
  },
  pulseRingInnerActive: {
    borderColor: T.danger + "4d",
  },
  micButtonWrapper: {
    zIndex: 10,
    shadowColor: T.primary,
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
  bottomActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: T.surf,
    borderColor: T.n300,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: T.n900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionBtnText: {
    fontFamily: T.fontNunito,
    color: T.n700,
    fontWeight: T.w9,
    fontSize: 13,
  }
});
