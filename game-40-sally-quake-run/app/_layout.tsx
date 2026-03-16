import { Stack } from 'expo-router';
import { CONFIG } from '../constants/config';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false, 
      animation: 'slide_from_bottom', 
      contentStyle: { backgroundColor: CONFIG.COLORS.background } 
    }} />
  );
}
