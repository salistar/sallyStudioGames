export const CONFIG = {
  INGREDIENTS: [
    { id: 'bun', emoji: '🍞', name: 'Pain' },
    { id: 'meat', emoji: '🥩', name: 'Viande' },
    { id: 'cheese', emoji: '🧀', name: 'Fromage' },
    { id: 'tomato', emoji: '🍅', name: 'Tomate' },
    { id: 'lettuce', emoji: '🥬', name: 'Salade' },
  ],
  RECIPES: [
    { id: 'burger', name: 'Burger', items: ['bun', 'meat', 'cheese'], points: 200 },
    { id: 'salad', name: 'Salade', items: ['lettuce', 'tomato', 'cheese'], points: 150 },
    { id: 'steak', name: 'Steak Grillé', items: ['meat', 'tomato'], points: 120 },
  ],
  TIME_LIMIT: 60,
  COLORS: {
    primary: '#4D96FF',
    success: '#2ED573',
    danger: '#FF4757',
    warning: '#FFA502',
    background: '#FFF9F0',
    surface: '#FFFFFF',
    text: '#2F3542',
  },
};
