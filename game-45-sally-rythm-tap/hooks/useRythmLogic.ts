import { useState, useRef, useCallback, useEffect } from 'react';
import { CONFIG } from '../constants/config';
import { Dimensions } from 'react-native';

const { width: SW, height: SH } = Dimensions.get('window');

interface Note { id:number; x:number; y:number; time:number; hit:boolean; }

export function useRythmLogic() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const startTime = useRef(Date.now());
  const nextId = useRef(0);

  const spawnNote = useCallback(() => {
    const newNote: Note = {
      id: nextId.current++,
      x: Math.random() * (SW - 100) + 50,
      y: Math.random() * (SH - 200) + 100,
      time: Date.now() + 1000, // Taper dans 1 seconde
      hit: false,
    };
    setNotes(prev => [...prev, newNote]);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnNote, 60000 / CONFIG.BPM);
    return () => clearInterval(interval);
  }, [spawnNote]);

  const tap = useCallback((id: number) => {
    const now = Date.now();
    setNotes(prev => {
        const idx = prev.findIndex(n => n.id === id);
        if (idx === -1 || prev[idx].hit) return prev;
        
        const note = prev[idx];
        const diff = Math.abs(now - note.time);
        
        if (diff <= CONFIG.TOLERANCE) {
            setScore(s => s + 100 * (combo + 1));
            setCombo(c => c + 1);
            const next = [...prev];
            next[idx] = { ...note, hit: true };
            return next;
        } else {
            setCombo(0);
            return prev;
        }
    });
  }, [combo]);

  // Clean old notes
  useEffect(() => {
    const interval = setInterval(() => {
        const now = Date.now();
        setNotes(prev => {
            const expired = prev.filter(n => !n.hit && now > n.time + CONFIG.TOLERANCE);
            if (expired.length > 0) setCombo(0);
            return prev.filter(n => n.hit ? now < n.time + 300 : now < n.time + CONFIG.TOLERANCE);
        });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return { notes, score, combo, tap };
}
