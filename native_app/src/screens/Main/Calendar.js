import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus } from 'lucide-react-native';
import { T } from '@/theme';

const EVENTS = [
  { id: '1', title: 'Therapy Session', time: '10:00 AM', type: 'Clinical', col: T.primary },
  { id: '2', title: 'Medication Review', time: '02:30 PM', type: 'Medical', col: T.accent },
  { id: '3', title: 'Weekly Group Support', time: '05:00 PM', type: 'Social', col: T.success },
];

export default function CalendarScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Connect & Calendar</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.calendarStrip}>
          <View style={styles.stripHeader}>
            <Text style={styles.month}>October 2025</Text>
            <View style={styles.stripNav}>
              <ChevronLeft size={20} color={T.n400} />
              <ChevronRight size={20} color={T.n400} />
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysScroll}>
            {[24, 25, 26, 27, 28, 29, 30].map((d, i) => (
              <View key={i} style={[styles.dayCard, d === 28 && styles.dayCardActive]}>
                <Text style={[styles.dayName, d === 28 && styles.dayTextActive]}>
                  {['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'][i]}
                </Text>
                <Text style={[styles.dayNum, d === 28 && styles.dayTextActive]}>{d}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={styles.eventList}>
          {EVENTS.map((e, i) => (
            <View key={i} style={styles.eventCard}>
              <View style={[styles.eventBar, { backgroundColor: e.col }]} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{e.title}</Text>
                <View style={styles.eventMeta}>
                  <Clock size={12} color={T.n400} />
                  <Text style={styles.metaText}>{e.time} • {e.type}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={[styles.joinText, { color: e.col }]}>Join</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.integrationCard}>
          <CalendarIcon size={24} color={T.primary} />
          <View style={styles.intInfo}>
            <Text style={styles.intTitle}>Google Calendar Sync</Text>
            <Text style={styles.intDesc}>Your clinical visits are automatically synced.</Text>
          </View>
          <Switch 
            value={true} 
            trackColor={{ false: T.n200, true: T.primary }}
            thumbColor="#fff"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// STUB FOR SWITCH
const Switch = ({ value, trackColor, thumbColor }) => (
  <View style={[styles.stubSwitch, { backgroundColor: value ? trackColor.true : trackColor.false }]}>
    <View style={[styles.stubThumb, { backgroundColor: thumbColor, alignSelf: value ? 'flex-end' : 'flex-start' }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.n100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: T.surf,
  },
  headerTitle: {
    fontFamily: T.fontSora,
    fontSize: 20,
    fontWeight: T.w9,
    color: T.n900,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: T.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  calendarStrip: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  stripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  month: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.n900,
  },
  stripNav: {
    flexDirection: 'row',
    gap: 16,
  },
  daysScroll: {
    gap: 12,
  },
  dayCard: {
    width: 54,
    height: 72,
    borderRadius: 16,
    backgroundColor: T.n100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dayCardActive: {
    backgroundColor: T.primary,
  },
  dayName: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w9,
    color: T.n500,
  },
  dayNum: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w9,
    color: T.n900,
  },
  dayTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  eventList: {
    gap: 12,
    marginBottom: 32,
  },
  eventCard: {
    backgroundColor: T.surf,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  eventBar: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  metaText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
  },
  joinBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: T.n100,
  },
  joinText: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
  },
  integrationCard: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  intInfo: {
    flex: 1,
  },
  intTitle: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    fontWeight: T.w8,
    color: T.n900,
  },
  intDesc: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w6,
    marginTop: 2,
  },
  stubSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  stubThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
