import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { CONFIG } from '../constants/config';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { grid, step, playing, setPlaying, toggleStep } = useGameLogic();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Beat Builder</Text>
        <Pressable 
          style={[styles.playBtn, playing && styles.playingBtn]} 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPlaying(!playing);
          }}
        >
          <Text style={styles.playBtnText}>{playing ? 'STOP' : 'PLAY'}</Text>
        </Pressable>
      </View>

      <ScrollView horizontal bounces={false}>
        <View style={styles.gridContainer}>
          {grid.map((track, tIdx) => (
            <View key={tIdx} style={styles.trackRow}>
              <View style={styles.trackLabel}>
                <Text style={styles.trackText}>{CONFIG.SAMPLES[tIdx]}</Text>
              </View>
              {track.map((active, sIdx) => (
                <Pressable
                  key={sIdx}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    toggleStep(tIdx, sIdx);
                  }}
                  style={[
                    styles.step,
                    active && styles.activeStep,
                    step === sIdx && styles.currentStep,
                    sIdx % 4 === 0 && styles.barBorder
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.bpm}>120 BPM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CONFIG.COLORS.background, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 30 },
  title: { color: '#fff', fontSize: 24, fontWeight: '900' },
  playBtn: { backgroundColor: CONFIG.COLORS.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 },
  playingBtn: { backgroundColor: CONFIG.COLORS.danger },
  playBtnText: { color: '#fff', fontWeight: '800' },
  gridContainer: { paddingHorizontal: 20 },
  trackRow: { flexDirection: 'row', marginBottom: 8, alignItems: 'center' },
  trackLabel: { width: 60, marginRight: 10 },
  trackText: { color: CONFIG.COLORS.muted, fontSize: 10, textTransform: 'uppercase' },
  step: { width: 30, height: 40, backgroundColor: CONFIG.COLORS.surface, borderRadius: 4, marginRight: 4, borderWidth: 1, borderColor: '#333' },
  activeStep: { backgroundColor: CONFIG.COLORS.success, borderColor: '#fff' },
  currentStep: { borderColor: CONFIG.COLORS.primary, borderWidth: 2 },
  barBorder: { marginLeft: 8 },
  footer: { padding: 30, alignItems: 'center' },
  bpm: { color: CONFIG.COLORS.muted, fontSize: 16 },
});
