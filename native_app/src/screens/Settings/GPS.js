import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, MapPin, Navigation, ShieldCheck } from 'lucide-react-native';
import { T } from '@/theme';

export default function GPSScreen({ navigation }) {
  const [tracking, setTracking] = React.useState(true);
  const [geo, setGeo] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>GPS & Location</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.mapCircle}>
            <MapPin size={32} color={T.primary} />
            <View style={styles.pulse} />
          </View>
          <Text style={styles.heroTitle}>Active Tracking</Text>
          <Text style={styles.heroSub}>Location data is used for emergency response and movement analysis.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>Emergency GPS</Text>
              <Text style={styles.itemDesc}>Share location with crisis services during protocols.</Text>
            </View>
            <Switch 
              value={tracking} 
              onValueChange={setTracking}
              trackColor={{ false: T.n200, true: T.primary }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>Geofencing</Text>
              <Text style={styles.itemDesc}>Alert caregivers if you leave designated safe zones.</Text>
            </View>
            <Switch 
              value={geo} 
              onValueChange={setGeo}
              trackColor={{ false: T.n200, true: T.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.privacyBox}>
          <ShieldCheck size={20} color={T.success} />
          <Text style={styles.privacyText}>
            All location data is encrypted and only accessible to your authorized clinical team.
          </Text>
        </View>
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
  mapCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: T.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pulse: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: T.primary,
    opacity: 0.2,
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
  privacyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: T.success + '15',
    padding: 20,
    borderRadius: 20,
  },
  privacyText: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 13,
    color: T.success,
    fontWeight: T.w7,
    lineHeight: 18,
  },
});
