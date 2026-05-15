import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AlertCircle, Activity, HeartPulse, Users } from 'lucide-react-native';
import { T } from '@/theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 64) / 2;

export default function EmergencyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>I NEED HELP</Text>
        <Text style={styles.subtitle}>Tap what you need right now.</Text>

        <View style={styles.grid}>
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('panic_protocol')}
          >
            <Activity size={48} color={T.accent} strokeWidth={2.5} />
            <Text style={styles.cardText}>PANIC{"\n"}ATTACK</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('breath_i')}
          >
            <HeartPulse size={48} color={T.success} strokeWidth={2.5} />
            <Text style={styles.cardText}>CALM{"\n"}DOWN</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('taker_conn')}
          >
            <Users size={48} color={T.primary} strokeWidth={2.5} />
            <Text style={styles.cardText}>CALL{"\n"}TAKER</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, styles.cardDark]}
            onPress={() => navigation.navigate('dial_911')}
          >
            <AlertCircle size={48} color={T.n900} strokeWidth={2.5} />
            <Text style={styles.cardText}>CALL{"\n"}911</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelBtnText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.danger,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 40,
    fontWeight: T.w9,
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: T.fontNunito,
    fontSize: 16,
    fontWeight: T.w8,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#fff',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  cardDark: {
    borderWidth: 6,
    borderColor: T.n900,
  },
  cardText: {
    fontFamily: T.fontNunito,
    fontSize: 18,
    fontWeight: T.w9,
    color: T.n900,
    textAlign: 'center',
    lineHeight: 20,
  },
  cancelBtn: {
    marginTop: 60,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  cancelBtnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w8,
    letterSpacing: 1,
  },
});
