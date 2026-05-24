import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import { T } from '@/theme';
import { useAuth } from '@/context/AuthContext';
import { updateAccessibility, updateReminders } from '@/services/userService';

const FREQUENCIES = ["Daily", "Twice daily", "Weekly", "Custom"];

export default function Reg4Screen({ navigation, route }) {
  const { register } = useAuth();
  const [freq, setFreq] = useState("Daily");
  const [time, setTime] = useState("09:00");
  const [loading, setLoading] = useState(false);

  const { full_name, email, password, role, accessibility } = route.params ?? {};

  const handleFinish = async () => {
    setLoading(true);
    try {
      // 1. Registrar usuario y hacer login automático
      await register({ full_name, email, password, role });

      // 2. Guardar preferencias de accesibilidad
      if (accessibility) {
        await updateAccessibility(accessibility).catch(() => {});
      }

      // 3. Guardar configuración de recordatorios
      await updateReminders({
        checkin_enabled: true,
        checkin_time: time,
        weekly_summary_enabled: true,
      }).catch(() => {});

      // AppNavigator detecta el cambio de auth y redirige automáticamente
    } catch (err) {
      const data = err.response?.data;
      const msg = data?.email?.[0] || data?.detail || 'No se pudo completar el registro.';
      Alert.alert('Error al registrarse', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <ChevronLeft size={24} color={T.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.stepIndicator}>
            {[1, 2, 3, 4].map(n => (
              <View key={n} style={[styles.stepDot, styles.stepDotActive]} />
            ))}
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Step 4 of 4</Text>
          </View>
          <Text style={styles.title}>Reminder settings</Text>
          <Text style={styles.subtitle}>Pick a reminder schedule that fits your day.</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.freqGrid}>
              {FREQUENCIES.map(f => (
                <TouchableOpacity
                  key={f}
                  style={[styles.freqBtn, freq === f && styles.freqBtnSel]}
                  onPress={() => setFreq(f)}
                >
                  <Text style={[styles.freqText, freq === f && styles.freqTextSel]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred time</Text>
              <TextInput
                style={styles.input}
                value={time}
                onChangeText={setTime}
                placeholder="09:00"
              />
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>You're ready</Text>
            <Text style={styles.infoBody}>Your first reminder will arrive at the chosen time.</Text>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.finishButton, loading && styles.btnDisabled]}
          onPress={handleFinish}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.finishButtonText}>Finish Setup</Text>
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.n100 },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 20, paddingBottom: 40 },
  backButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 20 },
  backText: { fontFamily: T.fontNunito, color: T.primary, fontSize: 14, fontWeight: T.w8, marginLeft: 4 },
  header: { marginBottom: 24 },
  stepIndicator: { flexDirection: 'row', gap: 6, marginBottom: 20 },
  stepDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: T.n300 },
  stepDotActive: { backgroundColor: T.primary },
  badge: { backgroundColor: T.primarySoft, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 12 },
  badgeText: { fontFamily: T.fontNunito, color: T.primary, fontSize: 11, fontWeight: T.w9 },
  title: { fontFamily: T.fontSora, fontSize: 26, fontWeight: T.w8, color: T.n900 },
  subtitle: { fontFamily: T.fontNunito, color: T.n500, fontSize: 14, marginTop: 8, lineHeight: 20 },
  scroll: { flex: 1 },
  card: { backgroundColor: T.surf, borderRadius: 24, padding: 24, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, marginBottom: 20 },
  label: { fontFamily: T.fontNunito, fontSize: 11, fontWeight: T.w9, color: T.n500, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  freqGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  freqBtn: { flex: 1, minWidth: '45%', paddingVertical: 12, borderRadius: 12, borderWidth: 2, borderColor: T.n300, alignItems: 'center', justifyContent: 'center' },
  freqBtnSel: { borderColor: T.primary, backgroundColor: T.primarySoft },
  freqText: { fontFamily: T.fontNunito, fontSize: 13, fontWeight: T.w7, color: T.n900 },
  freqTextSel: { fontFamily: T.fontNunito, color: T.primary, fontWeight: T.w8 },
  inputGroup: { gap: 8 },
  input: { fontFamily: T.fontNunito, width: '100%', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 14, borderWidth: 2, borderColor: T.n300, fontSize: 16, color: T.n900, backgroundColor: T.n100 },
  infoCard: { backgroundColor: T.successSoft, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: T.success + '33' },
  infoTitle: { fontFamily: T.fontSora, fontSize: 17, fontWeight: T.w8, color: T.n900 },
  infoBody: { fontFamily: T.fontNunito, fontSize: 13, color: T.n700, marginTop: 6, lineHeight: 18 },
  finishButton: { backgroundColor: T.success, paddingVertical: 18, borderRadius: 9999, alignItems: 'center', marginTop: 24, elevation: 4, shadowColor: T.success, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 16 },
  btnDisabled: { opacity: 0.7 },
  finishButtonText: { fontFamily: T.fontNunito, color: '#fff', fontSize: 16, fontWeight: T.w9 },
});
