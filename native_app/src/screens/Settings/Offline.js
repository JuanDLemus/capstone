import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, WifiOff, CloudSync, Database } from 'lucide-react-native';
import { T } from '@/theme';

export default function OfflineScreen({ navigation }) {
  const [offline, setOffline] = React.useState(false);
  const [sync, setSync] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Offline Mode</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.iconBox}>
            <WifiOff size={32} color={T.primary} />
          </View>
          <Text style={styles.heroTitle}>Data Resilience</Text>
          <Text style={styles.heroSub}>EchoVolt works without an internet connection using local neural caches.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>Force Offline</Text>
              <Text style={styles.itemDesc}>Save battery and bandwidth by using local processing only.</Text>
            </View>
            <Switch 
              value={offline} 
              onValueChange={setOffline}
              trackColor={{ false: T.n200, true: T.primary }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>Background Sync</Text>
              <Text style={styles.itemDesc}>Automatically upload local logs when Wi-Fi is available.</Text>
            </View>
            <Switch 
              value={sync} 
              onValueChange={setSync}
              trackColor={{ false: T.n200, true: T.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.syncStatus}>
          <CloudSync size={20} color={T.n400} />
          <View>
            <Text style={styles.statusTitle}>Storage Usage</Text>
            <Text style={styles.statusVal}>242 MB (Local Cache) • 12 unsynced items</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.priBtn}>
          <Database size={18} color="#fff" />
          <Text style={styles.priBtnText}>Flush Local Cache</Text>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: T.surf,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w8,
    color: T.n900,
  },
  content: {
    padding: 20,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: T.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: T.fontSora,
    fontSize: 22,
    fontWeight: T.w9,
    color: T.n900,
  },
  heroSub: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    color: T.n500,
    fontWeight: T.w6,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 12,
    marginBottom: 24,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  itemInfo: {
    flex: 1,
    marginRight: 16,
  },
  itemTitle: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w7,
    color: T.n900,
  },
  itemDesc: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 2,
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: T.surf,
    padding: 20,
    borderRadius: 24,
    marginBottom: 32,
  },
  statusTitle: {
    fontFamily: T.fontSora,
    fontSize: 14,
    fontWeight: T.w7,
    color: T.n900,
  },
  statusVal: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 2,
  },
  priBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: T.n900,
    paddingVertical: 18,
    borderRadius: 20,
  },
  priBtnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
});
