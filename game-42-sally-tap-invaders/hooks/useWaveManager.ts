import { useState, useRef, useEffect, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { FALL_SPEED_BASE, WAVE_SIZE, SPAWN_COLS, ENEMY_SIZE, LIVES, ENEMIES } from '../constants/config';

const { width: SW, height: SH } = Dimensions.get('window');

interface Enemy { id:number; x:number; y:number; hp:number; maxHp:number; emoji:string; }

export function useWaveManager() {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [wave, setWave] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const nextId = useRef(0);
  const frameRef = useRef<number>(0);
  const enemiesRef = useRef<Enemy[]>([]);
  const livesRef = useRef(LIVES);
  const waveRef = useRef(1);

  const spawnWave = useCallback((waveNum: number) => {
    const count = WAVE_SIZE + waveNum * 2;
    const isBoss = waveNum % 5 === 0;
    const cols = Math.min(SPAWN_COLS, count);
    const newEnemies: Enemy[] = Array.from({ length: isBoss ? 1 : count }, (_, i) => ({
      id: nextId.current++,
      x: (SW / cols) * (i % cols) + (SW / cols) / 2,
      y: -ENEMY_SIZE * (Math.floor(i / cols) + 1),
      hp: isBoss ? 20 : 1,
      maxHp: isBoss ? 20 : 1,
      emoji: isBoss ? '💀' : ENEMIES[i % ENEMIES.length],
    }));
    enemiesRef.current = newEnemies;
    setEnemies(newEnemies);
  }, []);

  const tick = useCallback(() => {
      if (livesRef.current <= 0) return;
      const speed = FALL_SPEED_BASE + waveRef.current * 0.1;
      
      enemiesRef.current = enemiesRef.current.map(e => ({ ...e, y: e.y + speed }));
      
      const passed = enemiesRef.current.filter(e => e.y > SH);
      if (passed.length > 0) {
        livesRef.current = Math.max(0, livesRef.current - passed.length);
        setLives(livesRef.current);
        if (livesRef.current <= 0) {
            setGameOver(true);
            return;
        }
        enemiesRef.current = enemiesRef.current.filter(e => e.y <= SH);
      }
      
      setEnemies([...enemiesRef.current]);
      
      if (enemiesRef.current.length === 0 && !gameOver) {
        waveRef.current++;
        setWave(waveRef.current);
        spawnWave(waveRef.current);
      }
      frameRef.current = requestAnimationFrame(tick);
  }, [spawnWave, gameOver]);

  useEffect(() => {
    spawnWave(1);
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [spawnWave, tick]);

  const tap = useCallback((id: number) => {
    const idx = enemiesRef.current.findIndex(e => e.id === id);
    if (idx === -1) return;
    const enemy = enemiesRef.current[idx];
    const newHp = enemy.hp - 1;
    
    if (newHp <= 0) {
      enemiesRef.current = enemiesRef.current.filter(e => e.id !== id);
      setScore(s => s + (enemy.maxHp > 1 ? 500 : 100) * waveRef.current);
    } else {
      enemiesRef.current = enemiesRef.current.map(e => e.id === id ? { ...e, hp: newHp } : e);
    }
    setEnemies([...enemiesRef.current]);
  }, []);

  return { enemies, score, lives, wave, gameOver, tap };
}
