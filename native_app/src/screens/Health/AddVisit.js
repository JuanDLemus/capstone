import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Calendar, User, FileText, Check } from 'lucide-react-native';
import { T } from '@/theme';

export default function AddVisitScreen({ navigation }) {
  const [form, setForm] = useState({ dr: '', type: '', date: '', notes: '' });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <Text style={styles.headerTitle}>Add Visit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGrp}>
            <Text style={styles.label}>Clinician Name</Text>
            <View style={styles.inputBox}>
              <User size={20} color={T.n400} />
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Dr. Elena Smith"
                value={form.dr}
                onChangeText={t => setForm({...form, dr: t})}
              />
            </View>
          </View>

          <View style={styles.inputGrp}>
            <Text style={styles.label}>Specialty / Type</Text>
            <View style={styles.inputBox}>
              <FileText size={20} color={T.n400} />
              <TextInput 
                style={styles.input} 
                placeholder="e.g. General Checkup"
                value={form.type}
                onChangeText={t => setForm({...form, type: t})}
              />
            </View>
          </View>

          <View style={styles.inputGrp}>
            <Text style={styles.label}>Date</Text>
            <View style={styles.inputBox}>
              <Calendar size={20} color={T.n400} />
              <TextInput 
                style={styles.input} 
                placeholder="YYYY-MM-DD"
                value={form.date}
                onChangeText={t => setForm({...form, date: t})}
              />
            </View>
          </View>

          <View style={styles.inputGrp}>
            <Text style={styles.label}>Notes & Observations</Text>
            <View style={[styles.inputBox, styles.textAreaBox]}>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Summary of the visit..."
                multiline
                numberOfLines={4}
                value={form.notes}
                onChangeText={t => setForm({...form, notes: t})}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveBtn}
          onPress={() => navigation.goBack()}
        >
          <Check size={24} color="#fff" strokeWidth={3} />
          <Text style={styles.saveText}>Save Record</Text>
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
    padding: 24,
  },
  form: {
    gap: 20,
    marginBottom: 40,
  },
  inputGrp: {
    gap: 8,
  },
  label: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    fontWeight: T.w9,
    color: T.n600,
    marginLeft: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: T.surf,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: T.n200,
    height: 56,
  },
  textAreaBox: {
    height: 120,
    alignItems: 'flex-start',
    paddingTop: 16,
  },
  input: {
    fontFamily: T.fontNunito,
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: T.w7,
    color: T.n900,
  },
  textArea: {
    marginLeft: 0,
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: T.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
    borderRadius: 9999,
    elevation: 4,
    shadowColor: T.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  saveText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontSize: 16,
    fontWeight: T.w9,
  },
});
