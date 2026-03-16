export interface Star {
  id: number;
  x: number;
  y: number;
}

export interface Constellation {
  name: string;
  stars: Star[];
  lines: [number, number][]; // pairs of star IDs
}

export const CONSTELLATIONS: Constellation[] = [
  {
    name: 'Grande Ourse',
    stars: [
      { id: 1, x: 50, y: 150 },
      { id: 2, x: 100, y: 130 },
      { id: 3, x: 150, y: 130 },
      { id: 4, x: 180, y: 160 },
      { id: 5, x: 280, y: 160 },
      { id: 6, x: 300, y: 220 },
      { id: 7, x: 200, y: 220 },
    ],
    lines: [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 4]],
  },
  {
    name: 'Cassiopée',
    stars: [
      { id: 1, x: 50, y: 100 },
      { id: 2, x: 100, y: 200 },
      { id: 3, x: 180, y: 130 },
      { id: 4, x: 250, y: 200 },
      { id: 5, x: 320, y: 100 },
    ],
    lines: [[1, 2], [2, 3], [3, 4], [4, 5]],
  },
  {
    name: 'Orion',
    stars: [
      { id: 1, x: 100, y: 50 },
      { id: 2, x: 250, y: 70 },
      { id: 3, x: 170, y: 150 },
      { id: 4, x: 180, y: 160 },
      { id: 5, x: 190, y: 170 },
      { id: 6, x: 120, y: 280 },
      { id: 7, x: 240, y: 270 },
    ],
    lines: [[1, 3], [2, 3], [3, 4], [4, 5], [5, 6], [5, 7], [1, 2], [6, 7]],
  },
];
