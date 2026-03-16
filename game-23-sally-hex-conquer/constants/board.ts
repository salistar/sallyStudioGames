export type Owner = 'none' | 'player' | 'ai';

export interface Hex {
  q: number;
  r: number;
  owner: Owner;
}

export const BOARD_RADIUS = 3;
