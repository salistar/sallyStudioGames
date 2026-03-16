export interface Die {
  id: number;
  sides: number[];
  type: 'attack' | 'defense' | 'magic';
}

export const INITIAL_DICE: Die[] = [
  { id: 1, sides: [1, 2, 3, 4, 5, 6], type: 'attack' },
  { id: 2, sides: [1, 1, 2, 2, 3, 3], type: 'defense' },
];
