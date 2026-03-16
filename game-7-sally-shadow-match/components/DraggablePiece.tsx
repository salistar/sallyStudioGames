import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Svg, { Rect, Polygon } from 'react-native-svg';

interface Props {
  piece: any;
  state: { x: number; y: number; rotation: number };
  onUpdate: (id: string, x: number, y: number, r: number) => void;
}

export function DraggablePiece({ piece, state, onUpdate }: Props) {
  const tx = useSharedValue(state.x);
  const ty = useSharedValue(state.y);
  const rot = useSharedValue(state.rotation);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startRot = useSharedValue(0);

  const drag = Gesture.Pan()
    .onBegin(() => { startX.value = tx.value; startY.value = ty.value; })
    .onUpdate(e => { tx.value = startX.value + e.translationX; ty.value = startY.value + e.translationY; })
    .onEnd(() => onUpdate(piece.id, tx.value, ty.value, rot.value));

  const rotate = Gesture.Rotation()
    .onBegin(() => { startRot.value = rot.value; })
    .onUpdate(e => { rot.value = startRot.value + e.rotation * (180 / Math.PI); })
    .onEnd(() => onUpdate(piece.id, tx.value, ty.value, rot.value));

  const composed = Gesture.Simultaneous(drag, rotate);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: tx.value, top: ty.value,
    transform: [{ rotate: `${rot.value}deg` }],
  }));

  const size = piece.type === 'rect' ? { w: piece.width, h: piece.height } : { w: piece.base, h: piece.height };

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={style}>
        <Svg width={size.w} height={size.h}>
          {piece.type === 'rect'
            ? <Rect width={piece.width} height={piece.height} fill={piece.color} rx={4} />
            : <Polygon points={`${piece.base/2},0 0,${piece.height} ${piece.base},${piece.height}`} fill={piece.color} />
          }
        </Svg>
      </Animated.View>
    </GestureDetector>
  );
}
