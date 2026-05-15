import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Terminal, Cpu, Bug, Trash2 } from 'lucide-react-native';
import { T } from '@/theme';

export default function DevModeScreen({ navigation }) {
  const LogItem = ({ label, value }) => (
    <View style={styles.logItem}>
      <Text style={styles.logLbl}>{label}</Text>
      <Text style={styles.logVal}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#fff" />
          <Text style={styles.headerTitle}>Developer Console</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.warnBox}>
          <Bug size={20} color={T.danger} />
          <Text style={styles.warnText}>Warning: Modifying system state may cause data corruption.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.secTitle}>Environment</Text>
          <View style={styles.card}>
            <LogItem label="App Version" value="1.0.4-native-beta" />
            <LogItem label="OS Version" value="Android 14" />
            <LogItem label="Kernel" value="5.15.0-x86_64" />
            <LogItem label="User ID" value="echo_dev_8829" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.secTitle}>System Actions</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Terminal size={18} color={T.primary} />
              <Text style={styles.actionText}>Trigger Remote Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Cpu size={18} color={T.primary} />
              <Text style={styles.actionText}>Flush Neural Weights</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { borderColor: T.danger }]}>
              <Trash2 size={18} color={T.danger} />
              <Text style={[styles.actionText, { color: T.danger }]}>Wipe Local DB</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.console}>
          <Text style={styles.consoleHeader}>Live Logs</Text>
          <Text style={styles.consoleLine}>[10:15:22] IPC Bridge Initialized</Text>
          <Text style={styles.consoleLine}>[10:15:24] Syncing HealthFile.json...</Text>
          <Text style={styles.consoleLine}>[10:15:25] AI Analysis Layer 4: READY</Text>
          <Text style={[styles.consoleLine, { color: T.danger }]}>[10:15:28] WARN: Jitter offset detected (0.12)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1a1a1a',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w9,
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  warnBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    marginBottom: 24,
    alignItems: 'center',
  },
  warnText: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 13,
    color: T.danger,
    fontWeight: T.w7,
  },
  section: {
    marginBottom: 32,
  },
  secTitle: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 16,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  logLbl: {
    fontFamily: T.fontNunito,
    color: '#888',
    fontSize: 13,
    fontWeight: T.w7,
  },
  logVal: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 13,
    fontWeight: T.w8,
  },
  actions: {
    gap: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#1a1a1a',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  actionText: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w8,
    color: T.primary,
  },
  console: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
    minHeight: 200,
  },
  consoleHeader: {
    fontFamily: T.fontNunito,
    color: '#0f0',
    fontSize: 12,
    fontWeight: T.w9,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  consoleLine: {
    color: '#0c0',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 12,
    marginBottom: 4,
  },
});
