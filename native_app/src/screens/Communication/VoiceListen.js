import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Easing,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mic, MicOff, Send, Edit3, Layers } from 'lucide-react-native';
import { T } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { WebView } from 'react-native-webview';
import { useAuth } from '@/context/AuthContext';
import { getStrings } from '@/services/strings';

// SPEECH RECOGNITION HTML
const buildSpeechHtml = () => `
<!DOCTYPE html>
<html>
<head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body>
<script>
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SR) {
  window.ReactNativeWebView.postMessage(JSON.stringify({type:'error',message:'Speech recognition not supported on this device'}));
} else {
  const r = new SR();
  r.continuous = true;
  r.interimResults = true;
  r.lang = navigator.language || 'es-CO';
  r.maxAlternatives = 1;
  r.onresult = function(e) {
    let interim = '';
    let final = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        final += e.results[i][0].transcript;
      } else {
        interim += e.results[i][0].transcript;
      }
    }
    window.ReactNativeWebView.postMessage(JSON.stringify({type:'result',interim,final}));
  };
  r.onerror = function(e) {
    window.ReactNativeWebView.postMessage(JSON.stringify({type:'error',message:e.error}));
  };
  r.onend = function() {
    window.ReactNativeWebView.postMessage(JSON.stringify({type:'end'}));
  };
  r.start();
  window.stopListening = function() { r.stop(); };
}
</script>
</body>
</html>
`;

export default function VoiceListenScreen({ navigation, route }) {
  const history = route?.params?.history ?? [];
  const { user } = useAuth();
  const strings = getStrings(user);

  const [phase, setPhase] = useState('idle');
  const [liveText, setLiveText] = useState('');
  const [finalText, setFinalText] = useState('');
  const [editText, setEditText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const webviewRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoopRef = useRef(null);
  const accumulatedFinal = useRef('');

  function startPulse() {
    pulseLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.25, duration: 600, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1.0, duration: 600, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    );
    pulseLoopRef.current.start();
  }

  function stopPulse() {
    pulseLoopRef.current?.stop();
    pulseAnim.setValue(1);
  }

  function startRecording() {
    accumulatedFinal.current = '';
    setLiveText('');
    setFinalText('');
    setErrorMsg('');
    setPhase('recording');
    setShowWebView(true);
    startPulse();
  }

  function stopRecording() {
    stopPulse();
    webviewRef.current?.injectJavaScript('if(window.stopListening) window.stopListening(); true;');
    setShowWebView(false);

    const captured = accumulatedFinal.current.trim() || liveText.trim();
    if (captured.length > 0) {
      setFinalText(captured);
      setEditText(captured);
      setPhase('confirm');
    } else {
      setPhase('edit');
      setEditText('');
    }
  }

  const onWebViewMessage = useCallback((event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === 'result') {
        if (msg.final && msg.final.trim().length > 0) {
          accumulatedFinal.current += (accumulatedFinal.current ? ' ' : '') + msg.final.trim();
        }
        const display = accumulatedFinal.current
          ? accumulatedFinal.current + (msg.interim ? ' ' + msg.interim : '')
          : msg.interim ?? '';
        setLiveText(display);
      } else if (msg.type === 'end') {
        const captured = accumulatedFinal.current.trim() || liveText.trim();
        if (captured.length > 0 && (phase === 'recording')) {
          setShowWebView(false);
          stopPulse();
          setFinalText(captured);
          setEditText(captured);
          setPhase('confirm');
        }
      } else if (msg.type === 'error') {
        setShowWebView(false);
        stopPulse();
        setErrorMsg(msg.message ?? 'Microphone error');
        setPhase('edit');
        setEditText('');
      }
    } catch {}
  }, [phase, liveText]);

  function handleConfirm() {
    const text = (phase === 'confirm' ? finalText : editText).trim();
    if (text.length === 0) return;
    navigation.navigate('VoiceProc', { transcript: text, isAac: false, history });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* STT WEBVIEW */}
          {showWebView && (
            <WebView
              ref={webviewRef}
              source={{ html: buildSpeechHtml() }}
              onMessage={onWebViewMessage}
              mediaPlaybackRequiresUserAction={false}
              allowsInlineMediaPlayback
              style={styles.hiddenWebView}
              javaScriptEnabled
              domStorageEnabled
            />
          )}

          {/* STATUS CHIP */}
          <View style={[styles.statusIndicator, {
            backgroundColor: phase === 'recording' ? T.dangerSoft : T.n200,
          }]}>
            <View style={[styles.dot, { backgroundColor: phase === 'recording' ? T.danger : T.n400 }]} />
            <Text style={[styles.statusText, { color: phase === 'recording' ? T.danger : T.n600 }]}>
              {phase === 'idle' && strings.ready}
              {phase === 'recording' && strings.listening}
              {phase === 'confirm' && strings.confirm}
              {phase === 'edit' && strings.type_message}
              {phase === 'error' && strings.error}
            </Text>
          </View>

          {/* MIC BUTTON */}
          {(phase === 'idle' || phase === 'recording') && (
            <View style={styles.micSection}>
              <Animated.View style={[styles.rippleOuter, { transform: [{ scale: pulseAnim }] }]} />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={phase === 'recording' ? stopRecording : startRecording}
                style={styles.micWrapper}
              >
                <LinearGradient
                  colors={phase === 'recording' ? [T.danger, '#b04040'] : [T.primary, T.primaryDark]}
                  style={styles.micButton}
                >
                  {phase === 'recording'
                    ? <MicOff size={38} color="#fff" />
                    : <Mic size={38} color="#fff" />}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* LIVE TRANSCRIPT */}
          {phase === 'recording' && (
            <View style={styles.liveCard}>
              <Text style={styles.cardLabel}>{strings.live_transcript || 'LIVE TRANSCRIPT'}</Text>
              <Text style={styles.liveText}>
                {liveText.length > 0 ? liveText : strings.mic_placeholder}
              </Text>
            </View>
          )}

          {/* CONFIRM SCREEN */}
          {phase === 'confirm' && (
            <View style={styles.confirmBox}>
              <Text style={styles.cardLabel}>{strings.what_we_heard}</Text>
              <Text style={styles.transcriptText}>"{finalText}"</Text>
              <TouchableOpacity onPress={() => setPhase('edit')} style={styles.editLink}>
                <Edit3 size={13} color={T.primary} />
                <Text style={styles.editLinkText}>{strings.edit_transcript}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* EDIT FALLBACK */}
          {phase === 'edit' && (
            <View style={styles.editBox}>
              {errorMsg.length > 0 && (
                <Text style={styles.errorHint}>
                  {errorMsg === 'not-allowed'
                    ? strings.mic_error_denied
                    : errorMsg === 'no-speech'
                    ? strings.mic_error_no_speech
                    : `${strings.mic_error_generic} (${errorMsg}).`}
                </Text>
              )}
              <Text style={styles.cardLabel}>{strings.your_message}</Text>
              <TextInput
                style={styles.textInput}
                value={editText}
                onChangeText={setEditText}
                placeholder={strings.idle_title}
                placeholderTextColor={T.n400}
                multiline
                autoFocus
              />
            </View>
          )}

          {/* FOOTER */}
          <View style={styles.footer}>
            {phase === 'idle' && (
              <Text style={styles.footerHint}>{strings.footerHint || 'Tap the mic to start'}</Text>
            )}
            {phase === 'recording' && (
              <Text style={styles.footerHint}>{strings.footerHintStop || 'Tap again to stop'}</Text>
            )}
            {(phase === 'confirm' || phase === 'edit') && (
              <TouchableOpacity
                style={[styles.sendBtn, {
                  opacity: (phase === 'edit' && editText.trim().length === 0) ? 0.4 : 1,
                }]}
                onPress={handleConfirm}
                disabled={phase === 'edit' && editText.trim().length === 0}
              >
                <Send size={18} color="#fff" />
                <Text style={styles.sendBtnText}>{strings.send_to_echovolt}</Text>
              </TouchableOpacity>
            )}
            {phase === 'edit' && (
              <TouchableOpacity onPress={startRecording} style={styles.retryRow}>
                <Mic size={14} color={T.primary} />
                <Text style={styles.retryText}>{strings.try_voice_again}</Text>
              </TouchableOpacity>
            )}

            {/* SWITCH TO AAC */}
            <TouchableOpacity onPress={() => {
              setShowWebView(false);
              navigation.navigate('AACMain', { history });
            }} style={styles.switchRow}>
              <Layers size={14} color={T.primary} />
              <Text style={styles.switchText}>{strings.use_aac_instead}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setShowWebView(false);
              navigation.navigate('VoiceIdle');
            }}>
              <Text style={styles.cancelText}>{strings.cancel}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: T.n100 },
  container: { flex: 1, alignItems: 'center', paddingHorizontal: 28, paddingTop: 28, paddingBottom: 20 },
  hiddenWebView: { position: 'absolute', width: 0, height: 0, opacity: 0 },
  statusIndicator: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 100,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontFamily: T.fontNunito, fontSize: 12, fontWeight: T.w9 },
  micSection: {
    position: 'relative', width: 200, height: 200,
    alignItems: 'center', justifyContent: 'center', marginTop: 40, marginBottom: 30,
  },
  rippleOuter: {
    position: 'absolute', width: 190, height: 190,
    borderRadius: 95, borderWidth: 2, borderColor: T.dangerSoft,
  },
  micWrapper: {
    zIndex: 10, shadowColor: T.danger,
    shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 10,
  },
  micButton: { width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center' },
  liveCard: {
    width: '100%', backgroundColor: T.surf, borderRadius: 14, padding: 18,
    borderWidth: 1, borderColor: T.dangerSoft + '88',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  confirmBox: {
    width: '100%', backgroundColor: T.surf, borderRadius: 16, padding: 20,
    marginTop: 32,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  editBox: { width: '100%', flex: 1, marginTop: 20 },
  cardLabel: {
    fontFamily: T.fontNunito, fontSize: 10, fontWeight: T.w9, color: T.n400,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  liveText: {
    fontFamily: T.fontNunito, color: T.n700, fontSize: 15, lineHeight: 24, fontStyle: 'italic', minHeight: 48,
  },
  transcriptText: { fontFamily: T.fontNunito, color: T.n700, fontSize: 15, lineHeight: 24, fontStyle: 'italic' },
  editLink: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12 },
  editLinkText: { fontFamily: T.fontNunito, color: T.primary, fontSize: 13, textDecorationLine: 'underline' },
  errorHint: {
    fontFamily: T.fontNunito, color: T.danger, fontSize: 12, lineHeight: 18,
    backgroundColor: T.dangerSoft, padding: 10, borderRadius: 10, marginBottom: 14, width: '100%',
  },
  textInput: {
    backgroundColor: T.surf, borderRadius: 14, padding: 16, fontSize: 15,
    fontFamily: T.fontNunito, color: T.n900, minHeight: 120, textAlignVertical: 'top',
    borderWidth: 1, borderColor: T.n300,
  },
  footer: { width: '100%', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 12 },
  footerHint: { fontFamily: T.fontNunito, color: T.n500, fontSize: 13 },
  sendBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: T.primary, paddingVertical: 14, paddingHorizontal: 32,
    borderRadius: 14, width: '100%', justifyContent: 'center',
  },
  sendBtnText: { fontFamily: T.fontNunito, color: '#fff', fontWeight: T.w9, fontSize: 16 },
  retryRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  retryText: { fontFamily: T.fontNunito, color: T.primary, fontWeight: T.w8, fontSize: 13 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  switchText: { fontFamily: T.fontNunito, color: T.primary, fontWeight: T.w8, fontSize: 13, textDecorationLine: 'underline' },
  cancelText: { fontFamily: T.fontNunito, color: T.n400, fontSize: 13, textDecorationLine: 'underline' },
});
