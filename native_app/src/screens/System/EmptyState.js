import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ghost } from 'lucide-react-native';
import { T } from '@/theme';

export default function EmptyStateScreen({ title, desc }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Ghost size={48} color={T.n400} />
        </View>
        <Text style={styles.title}>{title || "Nothing here yet"}</Text>
        <Text style={styles.desc}>{desc || "This section is currently empty. Check back later or start a new activity."}</Text>
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
    backgroundColor: T.n200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: T.fontSora,
    fontSize: 20,
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
  },
});
