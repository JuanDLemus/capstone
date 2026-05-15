import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Mic, CheckCircle2, Activity, Zap, BedDouble, HeartPulse, FileText } from 'lucide-react-native';
import { T } from '@/theme';
import Ring from '@/components/Ring';

export default function HomeScreen({ navigation }) {
  const role = "user";
  const hr = new Date().getHours();
  const greet = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";

  const [insightText, setInsightText] = useState("I noticed you're speaking faster today. Doing a 5-minute breathing exercise can help calm your body down.");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const user = {
    name: "Maria",
    aiScore: 84,
    vocal: 72,
    physical: 65,
    metadata: [
      { label: "Voice", val: "Steady", col: T.success, Icn: Mic },
      { label: "Streak", val: "14 Days", col: T.primary, Icn: CheckCircle2 },
      { label: "High", val: "High", col: T.accent, Icn: Activity }
    ],
    timeline: [
      { time: "Today, 8:30 AM", type: "AI Voice Trace", dur: "2m 14s", inf: "Steady baseline detected.", Icn: Mic, col: T.primary },
      { time: "Yesterday, 11:00 PM", type: "Sleep Health", dur: "7h 20m", inf: "Deep sleep ratio optimal.", Icn: BedDouble, col: T.clin },
      { time: "Yesterday, 5:30 PM", type: "Google Fit Sync", dur: "4,200 Steps", inf: "Moderate activity block.", Icn: Zap, col: T.gad }
    ]
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        
        {/* HERO SECTION */}
        <LinearGradient
          colors={[T.n100, '#fff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <View style={styles.heroRow}>
            <View style={styles.heroUserBox}>
              <View style={styles.heroAvatar}>
                <Text style={styles.heroAvatarText}>M</Text>
              </View>
              <View>
                <Text style={styles.heroSubtitle}>Your Dashboard</Text>
                <Text style={styles.heroTitle}>{greet}, {user.name}.</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Settings')}>
              <Bell size={18} color={T.n900} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* MAIN CONTENT BODY */}
        <ScrollView style={styles.scrollBody} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* HEALTH RINGS */}
          <View style={[styles.card, styles.ringsCard]}>
            <View style={styles.ringsRow}>
              <View style={styles.ringCol}>
                <Ring pct={user.aiScore} col={T.primary} size={84} w={8} />
                <Text style={styles.ringLbl}>AI Score</Text>
              </View>
              <View style={styles.ringCol}>
                <Ring pct={user.vocal} col={T.success} size={84} w={8} />
                <Text style={styles.ringLbl}>Vocal Norm</Text>
              </View>
              <View style={styles.ringCol}>
                <Ring pct={user.physical} col={T.accent} size={84} w={8} />
                <Text style={styles.ringLbl}>Physical</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionHeader}>Today's Snapshot</Text>
          
          {/* METADATA CARDS */}
          <View style={styles.metaRow}>
            {user.metadata.map((m, i) => (
              <View key={i} style={[styles.card, styles.metaCard, { borderTopColor: m.col }]}>
                <View style={styles.metaIconBox}><m.Icn size={20} color={m.col} /></View>
                <Text style={styles.metaVal}>{m.val}</Text>
                <Text style={styles.metaLbl}>{m.label}</Text>
              </View>
            ))}
          </View>

          {/* AI INSIGHT BLOCK */}
          <View style={styles.headerRow}>
            <Text style={[styles.sectionHeader, { color: T.primary, marginBottom: 0 }]}>Your Health AI</Text>
          </View>
          
          <View style={[styles.card, styles.aiCard]}>
            <View style={[styles.headerRow, { marginBottom: 12 }]}>
              <View style={styles.aiHeaderLeft}>
                <View style={styles.aiIconWrapper}><Zap size={18} color="#fff" /></View>
                <Text style={styles.aiTitle}>Today's Insight</Text>
              </View>
            </View>
            <Text style={styles.aiInsightText}>{insightText}</Text>
            
            <View style={styles.aiInputRow}>
              <TextInput 
                style={styles.aiInput}
                placeholder="Type manual prompt for testing..."
                placeholderTextColor={T.n500}
              />
              <TouchableOpacity style={styles.aiSendBtn}>
                <Text style={styles.aiSendBtnTxt}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* MY PASSIVE DATA */}
          <Text style={styles.sectionHeader}>My Passive Data</Text>
          <View style={styles.timelineList}>
            {user.timeline.map((act, i) => (
              <View key={i} style={[styles.card, styles.timelineCard]}>
                <View style={[styles.timelineIconBox, { backgroundColor: act.col + "15" }]}>
                  <act.Icn size={22} color={act.col} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.headerRow}>
                    <Text style={styles.timelineType}>{act.type}</Text>
                    <View style={styles.timelineDurBox}><Text style={styles.timelineDur}>{act.dur}</Text></View>
                  </View>
                  <Text style={styles.timelineTime}>{act.time}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* QUICK ACTIONS */}
          <View style={styles.quickActionRow}>
            <TouchableOpacity 
              style={styles.quickActionBtn}
              onPress={() => navigation.navigate('Activities')}
            >
              <View style={[styles.qaIconBox, { backgroundColor: T.accentSoft }]}>
                <HeartPulse size={24} color={T.accent} />
              </View>
              <Text style={styles.qaLbl}>Activities</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionBtn}
              onPress={() => navigation.navigate('Dashboard', { screen: 'HealthHub' })}
            >
              <View style={[styles.qaIconBox, { backgroundColor: T.clinSoft }]}>
                <FileText size={24} color={T.clin} />
              </View>
              <Text style={styles.qaLbl}>Health File</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{height: 20}} />

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: T.n100,
  },
  container: {
    flex: 1,
    backgroundColor: T.n100,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: T.n300 + "44",
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroUserBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: T.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: T.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.44,
    shadowRadius: 12,
    elevation: 5,
  },
  heroAvatarText: {
    fontFamily: T.fontNunito,
    fontSize: 20,
    fontWeight: T.w9,
    color: '#fff',
  },
  heroSubtitle: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 13,
    fontWeight: T.w8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontFamily: T.fontSora,
    fontSize: 22,
    fontWeight: T.w9,
    color: T.n900,
    lineHeight: 26,
  },
  bellBtn: {
    backgroundColor: T.surf,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: T.n300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 30,
    elevation: 3,
  },
  ringsCard: {
    marginBottom: 24,
  },
  ringsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ringCol: {
    alignItems: 'center',
  },
  ringLbl: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w8,
    color: T.n500,
    marginTop: 10,
  },
  sectionHeader: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 10,
  },
  metaCard: {
    flex: 1,
    padding: 14,
    borderTopWidth: 3,
    alignItems: 'center',
    borderRadius: 16,
  },
  metaIconBox: {
    marginBottom: 6,
  },
  metaVal: {
    fontFamily: T.fontNunito,
    fontWeight: T.w9,
    fontSize: 14,
    color: T.n900,
  },
  metaLbl: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w7,
    color: T.n500,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiCard: {
    backgroundColor: T.primarySoft,
    borderColor: T.primary + "44",
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  aiHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  aiIconWrapper: {
    backgroundColor: T.primary,
    borderRadius: 10,
    padding: 8,
  },
  aiTitle: {
    fontFamily: T.fontNunito,
    fontWeight: T.w9,
    fontSize: 15,
    color: T.primaryDark,
  },
  aiInsightText: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    lineHeight: 22,
    color: T.n900,
    fontWeight: T.w6,
    marginBottom: 16,
  },
  aiInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  aiInput: {
    fontFamily: T.fontNunito,
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: T.n300,
    fontSize: 13,
    color: T.n900,
  },
  aiSendBtn: {
    backgroundColor: T.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiSendBtnTxt: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontWeight: T.w8,
  },
  timelineList: {
    gap: 12,
    marginBottom: 24,
  },
  timelineCard: {
    flexDirection: 'row',
    padding: 16,
    gap: 14,
    alignItems: 'center',
    borderRadius: 16,
  },
  timelineIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineType: {
    fontFamily: T.fontNunito,
    fontWeight: T.w8,
    color: T.n900,
    fontSize: 14,
  },
  timelineDurBox: {
    backgroundColor: T.n100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
  },
  timelineDur: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    fontWeight: T.w7,
    color: T.n500,
  },
  timelineTime: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    marginTop: 2,
  },
  quickActionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: T.n300,
  },
  qaIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qaLbl: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w8,
    color: T.n900,
  }
});
