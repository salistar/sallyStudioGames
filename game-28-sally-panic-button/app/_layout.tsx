import { Stack } from 'expo-router';
import { CONFIG } from '../constants/config';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false, 
      animation: 'fade', 
      contentStyle: { backgroundColor: CONFIG.COLORS.background } 
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="game" />
      <Stack.Screen name="results" />
    </Stack>
  );
}
