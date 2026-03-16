import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { useEffect, useRef } from 'react';
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
  const { targetTime, isHolding, feedback, score, startHolding, stopHolding } = useGameLogic();
  const fillAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isHolding) {
      Animated.timing(fillAnim, {
        toValue: 1,
        duration: targetTime * 1000,
        useNativeDriver: false,
      }).start();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      fillAnim.setValue(0);
    }
  }, [isHolding]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      
      <View style={styles.targetArea}>
        <Text style={styles.targetLabel}>Cible</Text>
        <Text style={styles.targetTimer}>{targetTime}s</Text>
      </View>

      <Text style={styles.feedback}>{feedback}</Text>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.mainButton} 
          onPressIn={startHolding} 
          onPressOut={stopHolding}
        >
          <Animated.View style={[styles.fill, { height: fillAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']
          }) }]} />
          <Text style={styles.buttonText}>{isHolding ? 'RELACHE !' : 'MAINTIENT'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 24, alignItems: 'center', justifyContent: 'center' },
  score: { color: '#00FFCC', fontSize: 24, fontWeight: '800', position: 'absolute', top: 50, right: 20 },
  targetArea: { alignItems: 'center', marginBottom: 50 },
  targetLabel: { color: '#444', textTransform: 'uppercase', letterSpacing: 2 },
  targetTimer: { color: '#fff', fontSize: 64, fontWeight: '900' },
  feedback: { color: '#00FFCC', fontSize: 20, fontWeight: '700', marginBottom: 40, height: 30 },
  buttonContainer: { width: 200, height: 200, borderRadius: 100, overflow: 'hidden', backgroundColor: '#111', borderWidth: 2, borderColor: '#333' },
  mainButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  fill: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#00FFCC', opacity: 0.3 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});
