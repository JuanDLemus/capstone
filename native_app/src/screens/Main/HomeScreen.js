import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Mic, CheckCircle2, Activity, Zap, BedDouble, HeartPulse, FileText } from 'lucide-react-native';
import { T } from '@/theme';
import Ring from '@/components/Ring';
import { useAuth } from '@/context/AuthContext';
import { getWellnessScores, getCheckIns } from '@/services/checkinsService';
import { getDailyInsight } from '@/services/aiService';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const hr = new Date().getHours();
  const greet = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";

  const [latestScore, setLatestScore] = useState(null);
  const [recentCheckIns, setRecentCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState(null);
  const [insightLoading, setInsightLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [scoresRes, checkinsRes] = await Promise.all([
          getWellnessScores(),
          getCheckIns(),
        ]);
        const scores = scoresRes.data?.results ?? scoresRes.data ?? [];
        const checkins = checkinsRes.data?.results ?? checkinsRes.data ?? [];
        if (scores.length > 0) setLatestScore(scores[0]);
        setRecentCheckIns(checkins.slice(0, 3));
      } catch {
        // Keep UI functional even if API is down
      } finally {
        setLoading(false);
      }
    }

    async function loadInsight() {
      try {
        const res = await getDailyInsight();
        setInsight(res.data?.insight ?? null);
      } catch {
        // Fallback handled in render
      } finally {
        setInsightLoading(false);
      }
    }

    loadData();
    loadInsight();
  }, []);

  const aiScore = latestScore ? Math.round(Number(latestScore.score)) : null;
  const moodAvg = latestScore?.components?.mood ?? null;
  const energyAvg = latestScore?.components?.energy ?? null;

  const firstName = user?.full_name?.split(' ')[0] ?? 'there';

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
                <Text style={styles.heroAvatarText}>{firstName[0].toUpperCase()}</Text>
              </View>
              <View>
                <Text style={styles.heroSubtitle}>Your Dashboard</Text>
                <Text style={styles.heroTitle}>{greet}, {firstName}.</Text>
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
            {loading ? (
              <ActivityIndicator color={T.primary} style={{ paddingVertical: 24 }} />
            ) : (
              <View style={styles.ringsRow}>
                <View style={styles.ringCol}>
                  <Ring pct={aiScore ?? 0} col={T.primary} size={84} w={8} />
                  <Text style={styles.ringLbl}>AI Score</Text>
                </View>
                <View style={styles.ringCol}>
                  <Ring pct={moodAvg ? moodAvg * 10 : 0} col={T.success} size={84} w={8} />
                  <Text style={styles.ringLbl}>Mood</Text>
                </View>
                <View style={styles.ringCol}>
                  <Ring pct={energyAvg ? energyAvg * 10 : 0} col={T.accent} size={84} w={8} />
                  <Text style={styles.ringLbl}>Energy</Text>
                </View>
              </View>
            )}
          </View>

          <Text style={styles.sectionHeader}>Today's Snapshot</Text>

          {/* METADATA CARDS */}
          <View style={styles.metaRow}>
            <View style={[styles.card, styles.metaCard, { borderTopColor: T.primary }]}>
              <View style={styles.metaIconBox}><Mic size={20} color={T.primary} /></View>
              <Text style={styles.metaVal}>{recentCheckIns.length > 0 ? 'Active' : '—'}</Text>
              <Text style={styles.metaLbl}>Voice</Text>
            </View>
            <View style={[styles.card, styles.metaCard, { borderTopColor: T.success }]}>
              <View style={styles.metaIconBox}><CheckCircle2 size={20} color={T.success} /></View>
              <Text style={styles.metaVal}>{recentCheckIns.length}</Text>
              <Text style={styles.metaLbl}>Check-ins</Text>
            </View>
            <View style={[styles.card, styles.metaCard, { borderTopColor: T.accent }]}>
              <View style={styles.metaIconBox}><Activity size={20} color={T.accent} /></View>
              <Text style={styles.metaVal}>{aiScore ? (aiScore >= 70 ? 'High' : aiScore >= 40 ? 'Mid' : 'Low') : '—'}</Text>
              <Text style={styles.metaLbl}>Wellness</Text>
            </View>
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
            {insightLoading
              ? <ActivityIndicator color={T.primary} style={{ marginVertical: 8 }} />
              : <Text style={styles.aiInsightText}>
                  {insight
                    ?? (recentCheckIns.length === 0
                      ? "Start your first check-in to get personalized insights."
                      : `Your last check-in: mood ${recentCheckIns[0]?.mood ?? '—'}/10, energy ${recentCheckIns[0]?.energy ?? '—'}/10.`)
                  }
                </Text>
            }
          </View>

          {/* RECENT CHECK-INS */}
          {recentCheckIns.length > 0 && (
            <>
              <Text style={styles.sectionHeader}>Recent Check-ins</Text>
              <View style={styles.timelineList}>
                {recentCheckIns.map((ci) => (
                  <View key={ci.id} style={[styles.card, styles.timelineCard]}>
                    <View style={[styles.timelineIconBox, { backgroundColor: T.primary + '15' }]}>
                      <Mic size={22} color={T.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.headerRow}>
                        <Text style={styles.timelineType}>Check-in</Text>
                        <View style={styles.timelineDurBox}>
                          <Text style={styles.timelineDur}>Mood {ci.mood}/10</Text>
                        </View>
                      </View>
                      <Text style={styles.timelineTime}>
                        {new Date(ci.created_at).toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

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
  safeArea: { flex: 1, backgroundColor: T.n100 },
  container: { flex: 1, backgroundColor: T.n100 },
  heroSection: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: T.n300 + "44" },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  heroUserBox: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  heroAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: T.primaryDark, alignItems: 'center', justifyContent: 'center', shadowColor: T.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.44, shadowRadius: 12, elevation: 5 },
  heroAvatarText: { fontFamily: T.fontNunito, fontSize: 20, fontWeight: T.w9, color: '#fff' },
  heroSubtitle: { fontFamily: T.fontNunito, color: T.n500, fontSize: 13, fontWeight: T.w8, textTransform: 'uppercase', letterSpacing: 0.5 },
  heroTitle: { fontFamily: T.fontSora, fontSize: 22, fontWeight: T.w9, color: T.n900, lineHeight: 26 },
  bellBtn: { backgroundColor: T.surf, padding: 12, borderRadius: 25, borderWidth: 1, borderColor: T.n300, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
  scrollBody: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.03, shadowRadius: 30, elevation: 3 },
  ringsCard: { marginBottom: 24 },
  ringsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  ringCol: { alignItems: 'center' },
  ringLbl: { fontFamily: T.fontNunito, fontSize: 12, fontWeight: T.w8, color: T.n500, marginTop: 10 },
  sectionHeader: { fontFamily: T.fontNunito, fontSize: 12, fontWeight: T.w9, color: T.n500, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 10 },
  metaCard: { flex: 1, padding: 14, borderTopWidth: 3, alignItems: 'center', borderRadius: 16 },
  metaIconBox: { marginBottom: 6 },
  metaVal: { fontFamily: T.fontNunito, fontWeight: T.w9, fontSize: 14, color: T.n900 },
  metaLbl: { fontFamily: T.fontNunito, fontSize: 10, fontWeight: T.w7, color: T.n500, textTransform: 'uppercase', marginTop: 4 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  aiCard: { backgroundColor: T.primarySoft, borderColor: T.primary + "44", borderWidth: 1, padding: 20, marginBottom: 24 },
  aiHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiIconWrapper: { backgroundColor: T.primary, borderRadius: 10, padding: 8 },
  aiTitle: { fontFamily: T.fontNunito, fontWeight: T.w9, fontSize: 15, color: T.primaryDark },
  aiInsightText: { fontFamily: T.fontNunito, fontSize: 14, lineHeight: 22, color: T.n900, fontWeight: T.w6 },
  timelineList: { gap: 12, marginBottom: 24 },
  timelineCard: { flexDirection: 'row', padding: 16, gap: 14, alignItems: 'center', borderRadius: 16 },
  timelineIconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  timelineType: { fontFamily: T.fontNunito, fontWeight: T.w8, color: T.n900, fontSize: 14 },
  timelineDurBox: { backgroundColor: T.n100, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 50 },
  timelineDur: { fontFamily: T.fontNunito, fontSize: 11, fontWeight: T.w7, color: T.n500 },
  timelineTime: { fontFamily: T.fontNunito, fontSize: 12, color: T.n500, marginTop: 2 },
  quickActionRow: { flexDirection: 'row', gap: 12 },
  quickActionBtn: { flex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 20, alignItems: 'center', gap: 12, borderWidth: 1, borderColor: T.n300 },
  qaIconBox: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  qaLbl: { fontFamily: T.fontNunito, fontSize: 14, fontWeight: T.w8, color: T.n900 },
});
