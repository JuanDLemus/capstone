import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Users, AlertCircle, FileText, MessageSquare, TrendingUp, ChevronRight } from 'lucide-react-native';
import { T } from '@/theme';

export default function TakerHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.headerUser}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>DR</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Clinician Portal</Text>
            <Text style={styles.userName}>Dr. Elena Smith</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <AlertCircle size={22} color={T.danger} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>12</Text>
            <Text style={styles.statLbl}>Active Patients</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: T.danger }]}>3</Text>
            <Text style={styles.statLbl}>High Priority</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Patient Insights</Text>
        <TouchableOpacity 
          style={styles.patientCard}
          onPress={() => navigation.navigate('ClinicalBI')}
        >
          <View style={styles.patientHeader}>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>Maria Garcia</Text>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>High Alert</Text>
              </View>
            </View>
            <Text style={styles.lastSync}>Synced 5m ago</Text>
          </View>
          <View style={styles.insightBox}>
            <TrendingUp size={16} color={T.primary} />
            <Text style={styles.insightText}>Significant vocal frequency shift detected today.</Text>
          </View>
          <View style={styles.patientFooter}>
            <Text style={styles.viewDetails}>View Clinical BI</Text>
            <ChevronRight size={16} color={T.primary} />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Tools & Intelligence</Text>
        <View style={styles.toolsGrid}>
          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('AIFlags')}
          >
            <View style={[styles.toolIcon, { backgroundColor: T.dangerSoft }]}>
              <AlertCircle size={24} color={T.danger} />
            </View>
            <Text style={styles.toolName}>AI Flags</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('DrReport')}
          >
            <View style={[styles.toolIcon, { backgroundColor: T.primarySoft }]}>
              <FileText size={24} color={T.primary} />
            </View>
            <Text style={styles.toolName}>Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.toolCard}
            onPress={() => navigation.navigate('RAGChat')}
          >
            <View style={[styles.toolIcon, { backgroundColor: T.accentSoft }]}>
              <MessageSquare size={24} color={T.accent} />
            </View>
            <Text style={styles.toolName}>RAG Chat</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: T.surf,
  },
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: T.clin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontWeight: T.w9,
    fontSize: 16,
  },
  greeting: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w8,
    textTransform: 'uppercase',
  },
  userName: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.n900,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: T.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  statVal: {
    fontFamily: T.fontSora,
    fontSize: 28,
    fontWeight: T.w8,
    color: T.n900,
  },
  statLbl: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n500,
    fontWeight: T.w7,
    marginTop: 4,
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
  patientCard: {
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: T.danger + '22',
  },
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  patientInfo: {
    gap: 4,
  },
  patientName: {
    fontFamily: T.fontSora,
    fontSize: 18,
    fontWeight: T.w9,
    color: T.n900,
  },
  priorityBadge: {
    backgroundColor: T.danger,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 10,
    fontWeight: T.w9,
    textTransform: 'uppercase',
  },
  lastSync: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    color: T.n400,
    fontWeight: T.w6,
  },
  insightBox: {
    backgroundColor: T.primarySoft,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  insightText: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    color: T.primaryDark,
    fontWeight: T.w7,
    flex: 1,
  },
  patientFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  viewDetails: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    fontWeight: T.w8,
    color: T.primary,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    width: '48%',
    backgroundColor: T.surf,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  toolIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolName: {
    fontFamily: T.fontNunito,
    fontSize: 14,
    fontWeight: T.w8,
    color: T.n900,
  },
});
