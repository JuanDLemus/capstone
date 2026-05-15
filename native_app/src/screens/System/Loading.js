import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { T } from '@/theme';

export default function LoadingScreen({ message }) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color={T.primary} />
        </View>
        <Text style={styles.message}>{message || "Processing neural signals..."}</Text>
        <View style={styles.progTrack}>
          <View style={styles.progFill} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.n100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  loaderBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: T.surf,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  message: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w8,
    color: T.n600,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progTrack: {
    width: 120,
    height: 4,
    backgroundColor: T.n200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progFill: {
    height: '100%',
    width: '40%',
    backgroundColor: T.primary,
  },
});
