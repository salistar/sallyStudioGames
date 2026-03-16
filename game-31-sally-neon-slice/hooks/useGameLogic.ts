import { useState, useCallback, useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export function useGameLogic() {
  const [shapes, setShapes] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const frameRef = useRef<number>(0);

  const spawnShape = useCallback(() => {
    const size = 100 + Math.random() * 50;
    const newShape = {
      id: Date.now(),
      x: Math.random() * (width - size),
      y: -size,
      size,
      vy: 2 + Math.random() * 3,
      sliced: false,
    };
    setShapes(prev => [...prev, newShape]);
  }, []);

  const update = useCallback(() => {
    setShapes(prev => prev
      .map(s => ({ ...s, y: s.y + s.vy }))
      .filter(s => s.y < height)
    );
    if (Math.random() < 0.02) spawnShape();
    frameRef.current = requestAnimationFrame(update);
  }, [spawnShape]);

  const slice = useCallback((shapeId: number) => {
    setShapes(prev => prev.map(s => s.id === shapeId ? { ...s, sliced: true } : s));
    setScore(s => s + 100);
  }, []);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
  }, [update]);

  return { shapes, score, slice };
}
