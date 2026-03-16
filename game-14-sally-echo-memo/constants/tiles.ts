export const TILES = [
  {
    id: 0,
    colorActive: '#FF4757',
    colorInactive: '#7f2330',
    sound: require('../assets/sounds/tile1.mp3'),
    haptic: 'light' as const,
    label: 'rouge',
  },
  {
    id: 1,
    colorActive: '#2ED573',
    colorInactive: '#176b3a',
    sound: require('../assets/sounds/tile2.mp3'),
    haptic: 'medium' as const,
    label: 'vert',
  },
  {
    id: 2,
    colorActive: '#1E90FF',
    colorInactive: '#0f4880',
    sound: require('../assets/sounds/tile3.mp3'),
    haptic: 'medium' as const,
    label: 'bleu',
  },
  {
    id: 3,
    colorActive: '#FFA502',
    colorInactive: '#7f5201',
    sound: require('../assets/sounds/tile4.mp3'),
    haptic: 'heavy' as const,
    label: 'jaune',
  },
];
