import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { T } from '@/theme';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Log in</Text>
          <Text style={styles.subtitle}>Access your EchoVolt account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput 
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={T.n300}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={T.n300}
              secureTextEntry
            />
            <TouchableOpacity 
              style={styles.forgotButton}
              onPress={() => navigation.navigate('ForgotPW')}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, styles.btnPrimary]} 
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={styles.btnPrimaryText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            New here?{' '}
            <Text 
              style={styles.linkText}
              onPress={() => navigation.navigate('Register')}
            >
              Create account
            </Text>
          </Text>
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
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  backText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontSize: 14,
    fontWeight: T.w8,
  },
  header: {
    marginTop: 28,
    marginBottom: 28,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 28,
    fontWeight: T.w8,
    color: T.n900,
  },
  subtitle: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 15,
    marginTop: 6,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    fontWeight: T.w8,
    color: T.n500,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    fontFamily: T.fontNunito,
    borderWidth: 2,
    borderColor: T.n300,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: T.n900,
    backgroundColor: T.surf,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  forgotText: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    color: T.primary,
    fontWeight: T.w7,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  btnPrimary: {
    backgroundColor: T.primary,
    elevation: 4,
    shadowColor: T.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  btnPrimaryText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 17,
    fontWeight: T.w8,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
  },
  linkText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontWeight: T.w7,
  }
});
