import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { T } from '@/theme';

export default function RegisterScreen({ navigation }) {
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
          <Text style={styles.title}>Account details</Text>
          <Text style={styles.subtitle}>Enter the basic details to create your account.</Text>
        </View>

        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: T.n500}}>Registration flow coming soon.</Text>
        </View>

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
    fontSize: 12,
    fontWeight: T.w8,
  },
  header: {
    marginTop: 28,
    marginBottom: 28,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 24,
    fontWeight: T.w8,
    color: T.n900,
  },
  subtitle: {
    color: T.n500,
    fontSize: 13,
    marginTop: 8,
  },
});
