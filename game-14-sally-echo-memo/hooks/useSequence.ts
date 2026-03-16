import { useState, useRef, useCallback } from 'react';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { TILES } from '../constants/tiles';

type Phase = 'idle' | 'showing' | 'input' | 'success' | 'failed';

export function useSequence() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const soundsRef = useRef<Audio.Sound[]>([]);

  // Précharge tous les sons au démarrage
  const loadSounds = useCallback(async () => {
    const loaded = await Promise.all(
      TILES.map(tile => Audio.Sound.createAsync(tile.sound))
    );
    soundsRef.current = loaded.map(r => r.sound);
  }, []);

  // Joue le son + animation d'une tuile
  const activateTile = useCallback(async (id: number, durationMs = 500) => {
    setActiveTile(id);
    const hapticMap = { light: Haptics.ImpactFeedbackStyle.Light, medium: Haptics.ImpactFeedbackStyle.Medium, heavy: Haptics.ImpactFeedbackStyle.Heavy };
    await Haptics.impactAsync(hapticMap[TILES[id].haptic]);
    await soundsRef.current[id]?.replayAsync();
    await new Promise(res => setTimeout(res, durationMs));
    setActiveTile(null);
    await new Promise(res => setTimeout(res, 100));
  }, []);

  // Lance la lecture de toute la séquence
  const playSequence = useCallback(async (seq: number[]) => {
    setPhase('showing');
    const speed = Math.max(300, 500 - seq.length * 20); // accélère avec les rounds
    for (const id of seq) {
      await activateTile(id, speed);
    }
    setPhase('input');
    setPlayerIndex(0);
  }, [activateTile]);

  // Démarre un nouveau jeu
  const startGame = useCallback(async () => {
    await loadSounds();
    const firstSeq = [Math.floor(Math.random() * 4)];
    setSequence(firstSeq);
    setPlayerIndex(0);
    await playSequence(firstSeq);
  }, [loadSounds, playSequence]);

  // Appelé quand le joueur tape une tuile
  const handlePlayerTap = useCallback(async (id: number) => {
    if (phase !== 'input') return;
    await activateTile(id, 200);

    if (id !== sequence[playerIndex]) {
      setPhase('failed');
      return;
    }

    const nextIndex = playerIndex + 1;
    if (nextIndex === sequence.length) {
      // Séquence complète : ajoute un élément et rejoue
      setPhase('success');
      await new Promise(res => setTimeout(res, 800));
      const newSeq = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(newSeq);
      await playSequence(newSeq);
    } else {
      setPlayerIndex(nextIndex);
    }
  }, [phase, sequence, playerIndex, activateTile, playSequence]);

  return {
    sequence,
    activeTile,
    phase,
    round: sequence.length,
    startGame,
    handlePlayerTap,
  };
}
