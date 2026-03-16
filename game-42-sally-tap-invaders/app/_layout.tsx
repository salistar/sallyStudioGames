import { Stack } from 'expo-router';
import { COLORS } from '../constants/config';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false, 
      animation: 'fade', 
      contentStyle: { backgroundColor: COLORS.background } 
    }} />
  );
}
