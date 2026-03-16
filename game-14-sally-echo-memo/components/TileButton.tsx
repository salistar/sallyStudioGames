import { Animated, Pressable, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { TILES } from '../constants/tiles';

interface Props {
  tileId: number;
  isActive: boolean;
  onPress: (id: number) => void;
  disabled: boolean;
}

export function TileButton({ tileId, isActive, onPress, disabled }: Props) {
  const brightness = useRef(new Animated.Value(0)).current;
  const tile = TILES[tileId];

  useEffect(() => {
    Animated.timing(brightness, {
      toValue: isActive ? 1 : 0,
      duration: 80,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const bgColor = brightness.interpolate({
    inputRange: [0, 1],
    outputRange: [tile.colorInactive, tile.colorActive],
  });

  return (
    <Pressable
      onPress={() => !disabled && onPress(tileId)}
      style={styles.wrapper}
    >
      <Animated.View style={[styles.tile, { backgroundColor: bgColor }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, padding: 6 },
  tile: { flex: 1, borderRadius: 16 },
});
