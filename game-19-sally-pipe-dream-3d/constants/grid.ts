export type PipeType = 'straight' | 'corner' | 'empty' | 'start' | 'end';

export interface Tile {
  x: number;
  y: number;
  type: PipeType;
  rotation: number; // 0, 90, 180, 270
}

export const GRID_SIZE = 6;
