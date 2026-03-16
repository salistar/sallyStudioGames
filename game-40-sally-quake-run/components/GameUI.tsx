import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { CONFIG } from '../constants/config';

const { width } = Dimensions.get('window');
const TRACK_WIDTH = width - 80;
const BALL_SIZE = 40;

export const GameUI = ({ balance }: { balance: number }) => {
  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring((balance / 100) * (TRACK_WIDTH / 2)) }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={styles.dangerZoneLeft} />
        <View style={styles.safeZone} />
        <View style={styles.dangerZoneRight} />
        <Animated.View style={[styles.ball, ballStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  track: { width: TRACK_WIDTH, height: 20, backgroundColor: '#333', borderRadius: 10, justifyContent: 'center', overflow: 'hidden' },
  safeZone: { position: 'absolute', alignSelf: 'center', width: '50%', height: '100%', backgroundColor: CONFIG.COLORS.success, opacity: 0.3 },
  dangerZoneLeft: { position: 'absolute', left: 0, width: '20%', height: '100%', backgroundColor: CONFIG.COLORS.danger, opacity: 0.5 },
  dangerZoneRight: { position: 'absolute', right: 0, width: '20%', height: '100%', backgroundColor: CONFIG.COLORS.danger, opacity: 0.5 },
  ball: { alignSelf: 'center', width: BALL_SIZE, height: BALL_SIZE, borderRadius: BALL_SIZE / 2, backgroundColor: CONFIG.COLORS.primary, elevation: 5 },
});
