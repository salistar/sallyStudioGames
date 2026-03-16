import { useState, useCallback } from 'react';
import { Die, INITIAL_DICE } from '../constants/dice';

export function useGameLogic() {
  const [dice, setDice] = useState<Die[]>(INITIAL_DICE);
  const [hp, setHp] = useState(20);
  const [enemyHp, setEnemyHp] = useState(20);
  const [logs, setLogs] = useState<string[]>([]);

  const rollDice = useCallback(() => {
    let totalAttack = 0;
    let totalDefense = 0;

    dice.forEach(d => {
      const roll = d.sides[Math.floor(Math.random() * d.sides.length)];
      if (d.type === 'attack') totalAttack += roll;
      else if (d.type === 'defense') totalDefense += roll;
    });

    const enemyAttack = Math.floor(Math.random() * 5) + 1;
    const damageTaken = Math.max(0, enemyAttack - totalDefense);
    
    setEnemyHp(prev => Math.max(0, prev - totalAttack));
    setHp(prev => Math.max(0, prev - damageTaken));
    
    setLogs(prev => [`Tu infliges ${totalAttack} dégâts. Tu bloques ${totalDefense}. Ennemi inflige ${enemyAttack}.`, ...prev].slice(0, 5));
  }, [dice]);

  const forgeDie = useCallback((dieId: number, sideIndex: number, newValue: number) => {
    setDice(prev => prev.map(d => {
      if (d.id === dieId) {
        const newSides = [...d.sides];
        newSides[sideIndex] = newValue;
        return { ...d, sides: newSides };
      }
      return d;
    }));
  }, []);

  return { dice, hp, enemyHp, logs, rollDice, forgeDie };
}
