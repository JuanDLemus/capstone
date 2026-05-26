import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import { T } from '@/theme';

export default function ForgotPWScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

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

        <View style={styles.main}>
          <Text style={styles.emoji}>{sent ? "INBOX" : "RESET"}</Text>
          <Text style={styles.title}>
            {sent ? "Check your inbox" : "Forgot password?"}
          </Text>
          <Text style={styles.subtitle}>
            {sent ? "Reset link sent. Expires in 15 minutes." : "We'll send reset instructions."}
          </Text>

          {!sent ? (
            <View style={styles.form}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput 
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={T.n300}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => setSent(true)}
              >
                <Text style={styles.primaryButtonText}>Send Reset Link</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.primaryButtonText}>Back to Login</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => setSent(false)}
              >
                <Text style={styles.secondaryButtonText}>Try different email</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.surf,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 40,
  },
  backText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontSize: 14,
    fontWeight: T.w8,
    marginLeft: 4,
  },
  main: {
    alignItems: 'center',
    paddingTop: 20,
  },
  emoji: {
    fontSize: 16,
    fontFamily: T.fontNunito,
    fontWeight: T.w9,
    color: T.primary,
    letterSpacing: 2,
    marginBottom: 24,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 26,
    fontWeight: T.w8,
    color: T.n900,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    color: T.n500,
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
    marginTop: 40,
  },
  label: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  input: {
    fontFamily: T.fontNunito,
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: T.n300,
    fontSize: 16,
    color: T.n900,
    backgroundColor: T.surf,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: T.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    elevation: 4,
    shadowColor: T.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  primaryButtonText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
  secondaryButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 14,
    fontWeight: T.w7,
  },
});
