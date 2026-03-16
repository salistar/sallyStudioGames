import { useState, useCallback, useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { CONFIG } from '../constants/config';

const { width, height } = Dimensions.get('window');
const SUN_X = width / 2;
const SUN_Y = height / 2;

export function useGameLogic() {
  const [planets, setPlanets] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const frameRef = useRef<number>(0);

  const spawnPlanet = useCallback((x: number, y: number) => {
    const dx = x - SUN_X;
    const dy = y - SUN_Y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Circular orbit velocity: v = sqrt(G*M/r)
    const v = Math.sqrt(CONFIG.G * CONFIG.SUN_MASS / dist);
    const vx = (dy / dist) * v;
    const vy = (-dx / dist) * v;

    const newPlanet = {
      id: Date.now(),
      x, y,
      vx, vy,
      radius: 5 + Math.random() * 5,
    };
    setPlanets(prev => [...prev, newPlanet]);
    setScore(s => s + 1);
  }, []);

  const update = useCallback(() => {
    setPlanets(prev => {
      let next = prev.map(p => {
        const dx = SUN_X - p.x;
        const dy = SUN_Y - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        
        if (dist < 20) return null; // Sun collision

        const force = (CONFIG.G * CONFIG.SUN_MASS) / distSq;
        const ax = (dx / dist) * force;
        const ay = (dy / dist) * force;

        return {
          ...p,
          vx: p.vx + ax,
          vy: p.vy + ay,
          x: p.x + p.vx,
          y: p.y + p.vy,
        };
      }).filter(p => p !== null);

      // Simple collision detection between planets
      for (let i = 0; i < next.length; i++) {
        for (let j = i + 1; j < next.length; j++) {
          const p1 = next[i]!;
          const p2 = next[j]!;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < p1.radius + p2.radius) {
            // Collision! (Reset game or handle as you wish)
          }
        }
      }

      return next;
    });
    frameRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
  }, [update]);

  return { planets, score, spawnPlanet, sunPos: { x: SUN_X, y: SUN_Y } };
}
