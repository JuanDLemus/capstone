import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Zap, Delete } from 'lucide-react-native';
import { T } from '@/theme';

const FITZ_CATS = [
  { l: "PRONOUNS", bg: T.aacY, w: ["I", "You", "He", "She", "We", "They", "It", "Me"] },
  { l: "NOUNS", bg: T.aacO, w: ["Apple", "Book", "Car", "House", "Dog", "Cat", "Water", "Food", "Toilet", "Football"] },
  { l: "VERBS", bg: T.aacG, w: ["Want", "Go", "Stop", "Think", "Am", "Is", "Have", "Like", "Make", "Look"] },
  { l: "ADJECTIVES", bg: T.aacB, w: ["Happy", "Sad", "Mad", "Good", "Bad", "Big", "Small", "Hot", "Cold", "Tired"] },
  { l: "PREP/SOCIAL", bg: T.aacP, w: ["In", "On", "Under", "Up", "Down", "Hello", "Bye", "Please", "Thanks", "With"] },
  { l: "QUESTIONS", bg: T.aacPu, w: ["Who", "What", "When", "Where", "Why", "How"] },
  { l: "NEGATION", bg: T.aacR, w: ["Not", "Don't", "Can't", "Won't"] },
  { l: "ADVERBS", bg: "#B8860B", w: ["Now", "Later", "Here", "There", "Fast", "Slow"] },
  { l: "CONJUNCTION", bg: T.aacW, brd: T.n300, w: ["And", "But", "Or", "Because"] },
  { l: "DETERMINERS", bg: "#555555", w: ["The", "A", "This", "That", "Some", "All"] }
];

const CORE_WORDS = ["Yes", "No", "Help"];
const QUICK_PHRASES = [
  { l: "I'm hungry", bg: T.aacP },
  { l: "Need a break", bg: T.aacG },
  { l: "Let's go", bg: T.aacG },
  { l: "I don't know", bg: T.aacR }
];

export default function AACMainScreen({ navigation }) {
  const [words, setWords] = useState([]);
  const [activeCat, setActiveCat] = useState(null);

  const addWord = (word, bg) => {
    setWords([...words, { l: word, bg }]);
  };

  const deleteLast = () => {
    setWords(words.slice(0, -1));
  };

  const clearAll = () => {
    setWords([]);
  };

  const handleSave = () => {
    const query = words.map(w => w.l).join(" ");
    if (query) {
      navigation.navigate('VoiceProc', { query });
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={[styles.aacCard, { backgroundColor: item.bg, borderColor: item.brd || 'transparent' }]} 
      onPress={() => setActiveCat(item)}
    >
      <Text style={[styles.aacWord, { color: item.bg === T.aacY || item.bg === T.aacW ? T.n900 : '#fff' }]}>
        {item.l}
      </Text>
    </TouchableOpacity>
  );

  const renderWord = ({ item }) => (
    <TouchableOpacity 
      style={[styles.aacCard, { backgroundColor: activeCat.bg, borderColor: activeCat.brd || 'transparent', minHeight: 80 }]} 
      onPress={() => addWord(item, activeCat.bg)}
    >
      <Text style={[styles.aacWord, { color: activeCat.bg === T.aacY || activeCat.bg === T.aacW ? T.n900 : '#fff' }]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  let interpreted = "";
  const wStr = words.map(w => w.l).join(" ").toLowerCase();
  if (words.length > 0) {
    if (wStr.includes("i") && wStr.includes("football")) interpreted = "I want to watch a football match.";
    else if (wStr.includes("i") && wStr.includes("think") && wStr.includes("happy")) interpreted = "I think I am feeling happy.";
    else interpreted = words.map(w => w.l).join(" ") + "...";
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Message Builder Bar */}
      <View style={styles.builderBar}>
        <View style={styles.builderInner}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wordsRow}>
            {words.length === 0 && <Text style={styles.placeholder}>Build your message...</Text>}
            {words.map((w, i) => (
              <View key={i} style={[styles.wordChip, { backgroundColor: w.bg || T.n300 }]}>
                <Text style={[styles.wordChipText, { color: w.bg === T.aacY || w.bg === T.aacW ? T.n900 : '#fff' }]}>{w.l}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.delBtn} onPress={deleteLast}>
            <Delete size={20} color={T.danger} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>SEND</Text>
          </TouchableOpacity>
        </View>
        {interpreted ? (
          <View style={styles.interpretationBar}>
            <Zap size={14} color={T.primary} />
            <Text style={styles.interpretationText}>{interpreted}</Text>
          </View>
        ) : null}
      </View>

      <ScrollView style={styles.board}>
        {!activeCat ? (
          <View style={styles.paddingContainer}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.grid}>
              {FITZ_CATS.map((item) => (
                <TouchableOpacity 
                  key={item.l}
                  style={[styles.aacCard, { backgroundColor: item.bg, borderColor: item.brd || 'transparent', width: '31%' }]} 
                  onPress={() => setActiveCat(item)}
                >
                  <Text style={[styles.aacWord, { color: item.bg === T.aacY || item.bg === T.aacW ? T.n900 : '#fff' }]}>
                    {item.l}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Quick Phrases</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {QUICK_PHRASES.map((q) => (
                <TouchableOpacity 
                  key={q.l} 
                  style={[styles.phraseCard, { backgroundColor: q.bg }]} 
                  onPress={() => addWord(q.l, q.bg)}
                >
                  <Text style={[styles.aacWord, { color: q.bg === T.aacY || q.bg === T.aacW ? T.n900 : '#fff' }]}>{q.l}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Core Words</Text>
            <View style={styles.grid}>
              {CORE_WORDS.map((cw) => (
                <TouchableOpacity 
                  key={cw} 
                  style={[styles.aacCard, { backgroundColor: T.aacR, width: '31%', minHeight: 60 }]} 
                  onPress={() => addWord(cw, T.aacR)}
                >
                  <Text style={styles.aacWordWhite}>{cw}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.catHeader}>
              <TouchableOpacity onPress={() => setActiveCat(null)} style={styles.backBtn}>
                <ChevronLeft size={24} color={T.primary} />
                <Text style={styles.backBtnText}>Categories</Text>
              </TouchableOpacity>
              <View style={[styles.catBadge, { backgroundColor: activeCat.bg }]}>
                <Text style={[styles.catBadgeText, { color: activeCat.bg === T.aacY || activeCat.bg === T.aacW ? T.n900 : '#fff' }]}>{activeCat.l}</Text>
              </View>
            </View>
            
            <View style={[styles.grid, styles.paddingContainer]}>
              {activeCat.w.map((w) => (
                <TouchableOpacity 
                  key={w} 
                  style={[styles.aacCard, { backgroundColor: activeCat.bg, borderColor: activeCat.brd || 'transparent', width: '31%', minHeight: 80 }]} 
                  onPress={() => addWord(w, activeCat.bg)}
                >
                  <Text style={[styles.aacWord, { color: activeCat.bg === T.aacY || activeCat.bg === T.aacW ? T.n900 : '#fff' }]}>
                    {w}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: T.n100,
  },
  builderBar: {
    padding: 12,
    backgroundColor: T.surf,
    borderBottomWidth: 1,
    borderBottomColor: T.n300,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  builderInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wordsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  wordChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  wordChipText: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    fontWeight: T.w8,
  },
  placeholder: {
    fontFamily: T.fontNunito,
    color: T.n500,
    fontSize: 14,
    fontWeight: T.w7,
  },
  delBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: T.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtn: {
    backgroundColor: T.success,
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontFamily: T.fontNunito,
    color: '#fff',
    fontWeight: T.w9,
    fontSize: 12,
  },
  interpretationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    backgroundColor: T.primarySoft,
    padding: 8,
    borderRadius: 8,
  },
  interpretationText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontSize: 12,
    fontWeight: T.w8,
  },
  board: {
    flex: 1,
  },
  paddingContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: T.fontNunito,
    fontSize: 12,
    fontWeight: T.w9,
    color: T.n500,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  aacCard: {
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    minHeight: 70,
  },
  aacWord: {
    fontFamily: T.fontNunito,
    fontSize: 11,
    fontWeight: T.w9,
    textAlign: 'center',
  },
  aacWordWhite: {
    fontFamily: T.fontNunito,
    fontSize: 13,
    fontWeight: T.w9,
    color: '#fff',
    textAlign: 'center',
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  phraseCard: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    marginRight: 10,
    justifyContent: 'center',
  },
  catHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: T.surf,
    borderBottomWidth: 1,
    borderBottomColor: T.n300,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtnText: {
    fontFamily: T.fontNunito,
    color: T.primary,
    fontWeight: T.w8,
    fontSize: 14,
  },
  catBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  catBadgeText: {
    fontFamily: T.fontNunito,
    fontWeight: T.w9,
    fontSize: 12,
  }
});
