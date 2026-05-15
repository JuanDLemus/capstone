import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import { T } from '@/theme';

export default function Reg1Screen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={T.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.stepIndicator}>
            {[1, 2, 3, 4].map(n => (
              <View key={n} style={[styles.stepDot, n === 1 && styles.stepDotActive]} />
            ))}
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Step 1 of 4</Text>
          </View>
          <Text style={styles.title}>Account details</Text>
          <Text style={styles.subtitle}>Enter the basic details to create your account.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Your name" 
              placeholderTextColor={T.n300}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput 
              style={styles.input} 
              placeholder="you@example.com" 
              placeholderTextColor={T.n300}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Create a secure password" 
              placeholderTextColor={T.n300}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => navigation.navigate('Reg2')}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.n100,
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontSize: 14,
    fontWeight: T.w8,
    marginLeft: 4,
  },
  header: {
    marginBottom: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  stepDot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: T.n300,
  },
  stepDotActive: {
    backgroundColor: T.primary,
  },
  badge: {
    backgroundColor: T.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontSize: 11,
    fontWeight: T.w9,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 26,
    fontWeight: T.w8,
    color: T.n900,
  },
  subtitle: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 24,
    gap: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  },
  nextButton: {
    backgroundColor: T.primary,
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: 'center',
    marginTop: 32,
    elevation: 4,
    shadowColor: T.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  nextButtonText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
});
