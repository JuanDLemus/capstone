import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlertCircle, Mic, MessageCircle } from 'lucide-react-native';
import { T } from '@/theme';

export default function Dial911Screen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.pulseContainer}>
          <AlertCircle size={64} color="#fff" strokeWidth={2} />
        </View>
        <Text style={styles.title}>Dialing 911</Text>
        <Text style={styles.subtitle}>(Emergency Services)</Text>

        <View style={styles.actions}>
          <View style={styles.actionCol}>
            <View style={styles.iconCircle}>
              <Mic size={24} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Speaker</Text>
          </View>

          <TouchableOpacity 
            style={styles.endBtn}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.endIconCircle}>
              <AlertCircle size={32} color="#fff" />
            </View>
            <Text style={styles.endLabel}>End Call</Text>
          </TouchableOpacity>

          <View style={styles.actionCol}>
            <View style={styles.iconCircle}>
              <MessageCircle size={24} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Keypad</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.n900,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  pulseContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: T.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    elevation: 20,
    shadowColor: T.danger,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 32,
    fontWeight: T.w9,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: T.fontNunito,
    fontSize: 16,
    color: T.dangerSoft,
    fontWeight: T.w6,
  },
  actions: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 80,
    alignItems: 'flex-end',
  },
  actionCol: {
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: T.n800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontFamily: T.fontNunito,
    color: T.n300,
    fontSize: 13,
    fontWeight: T.w7,
  },
  endBtn: {
    alignItems: 'center',
    gap: 12,
  },
  endIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: T.danger,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: T.danger,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  endLabel: {
    fontFamily: T.fontNunito,
    color: T.dangerSoft,
    fontSize: 13,
    fontWeight: T.w8,
  },
});
