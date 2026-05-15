import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';
import { T } from '@/theme';

export default function ErrorScreen({ error, onRetry }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <AlertTriangle size={48} color={T.danger} />
        </View>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.desc}>{error || "We encountered an error while processing your request. Please try again."}</Text>
        
        <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
          <RefreshCw size={20} color="#fff" />
          <Text style={styles.retryText}>Retry Operation</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: T.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 22,
    fontWeight: T.w8,
    color: T.n900,
    textAlign: 'center',
  },
  desc: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w6,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    marginBottom: 32,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: T.n900,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 9999,
  },
  retryText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
});
