import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { T } from '@/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        
        <View style={styles.logoContainer}>
          <Image 
            source={require('./logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>ECHOVOLT</Text>
          <Text style={styles.tagline}>
            Voice-first care tools for daily wellbeing and simple support.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, styles.btnPrimary]} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.btnPrimaryText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.btnSecondary]} 
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.btnSecondaryText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLinks}>
            <Text style={styles.link} onPress={() => navigation.navigate('Legal')}>Privacy & Terms</Text>  ·  <Text style={styles.muted}>Not a medical device</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  brandTitle: {
    fontFamily: T.fontSora,
    fontSize: 40,
    fontWeight: T.w8,
    color: T.n900,
    letterSpacing: -1.2,
    marginBottom: 10,
  },
  tagline: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    color: T.n700,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  actions: {
    width: '100%',
    gap: 12,
    marginTop: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
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
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: T.primary,
  },
  btnSecondaryText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontSize: 17,
    fontWeight: T.w8,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerLinks: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
  },
  link: {
    color: T.n500,
    textDecorationLine: 'underline',
  },
  muted: {
    color: T.n300,
  }
});
