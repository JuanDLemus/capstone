import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Send, Sparkles, Database } from 'lucide-react-native';
import { T } from '@/theme';

export default function RAGChatScreen({ navigation }) {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([
    { role: 'ai', text: 'Hello Dr. Smith. I have indexed Maria\'s entire health file including 48 voice traces and recent lab work. How can I assist with your clinical review today?' }
  ]);

  const send = () => {
    if (!msg.trim()) return;
    const newChat = [...chat, { role: 'user', text: msg }];
    setChat(newChat);
    setMsg('');
    
    // SIMULATED AI RESPONSE
    setTimeout(() => {
      setChat(prev => [...prev, { role: 'ai', text: 'Analyzing database... Based on the Semantic Trace from Oct 24, there is a 22% increase in cortisol-related vocal markers. This matches the trend in her GAD-7 score from last week.' }]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={T.n700} />
          <View>
            <Text style={styles.headerTitle}>Clinical RAG Chat</Text>
            <View style={styles.statusRow}>
              <Database size={10} color={T.success} />
              <Text style={styles.statusText}>Health File Indexed</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView 
          style={styles.flex} 
          contentContainerStyle={styles.chatContent}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
        >
          {chat.map((m, i) => (
            <View key={i} style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              {m.role === 'ai' && (
                <View style={styles.aiIcon}>
                  <Sparkles size={14} color="#fff" />
                </View>
              )}
              <Text style={[styles.bubbleText, m.role === 'user' ? styles.userText : styles.aiText]}>
                {m.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputArea}>
          <View style={styles.inputBox}>
            <TextInput 
              style={styles.input}
              placeholder="Ask about patient data..."
              value={msg}
              onChangeText={setMsg}
              multiline
            />
            <TouchableOpacity style={styles.sendBtn} onPress={send}>
              <Send size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: T.n100,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: T.surf,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontFamily: T.fontSora,
    fontSize: 16,
    fontWeight: T.w8,
    color: T.n900,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  statusText: {
    fontFamily: T.fontNunito,
    fontSize: 10,
    fontWeight: T.w8,
    color: T.success,
    textTransform: 'uppercase',
  },
  chatContent: {
    padding: 20,
    gap: 16,
  },
  bubble: {
    maxWidth: '85%',
    padding: 16,
    borderRadius: 20,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: T.surf,
    borderBottomLeftRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: T.primary,
    borderBottomRightRadius: 4,
  },
  aiIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: T.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bubbleText: {
    fontFamily: T.fontNunito,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: T.w6,
  },
  aiText: {
    color: T.n900,
  },
  userText: {
    color: '#fff',
  },
  inputArea: {
    backgroundColor: T.surf,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: T.n200,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: T.n100,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  input: {
    fontFamily: T.fontNunito,
    flex: 1,
    fontSize: 15,
    color: T.n900,
    maxHeight: 100,
    fontWeight: T.w6,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: T.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
