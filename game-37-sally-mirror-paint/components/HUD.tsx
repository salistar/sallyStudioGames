import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CONFIG } from '../constants/config';

export const HUD = ({ mode, setMode, onClear, onSave }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.modes}>
        {['axial', 'radial', 'kaleidoscope'].map(m => (
          <Pressable key={m} onPress={() => setMode(m)} style={[styles.btn, mode === m && styles.active]}>
            <Text style={styles.btnText}>{m.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onClear} style={styles.actionBtn}>
          <Text style={styles.actionText}>🗑️ Clear</Text>
        </Pressable>
        <Pressable onPress={onSave} style={[styles.actionBtn, { backgroundColor: CONFIG.COLORS.primary }]}>
          <Text style={styles.actionText}>💾 Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 40, width: '100%', gap: 20, paddingHorizontal: 20 },
  modes: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: CONFIG.COLORS.surface },
  active: { backgroundColor: CONFIG.COLORS.warning },
  btnText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25, backgroundColor: '#333' },
  actionText: { color: '#fff', fontWeight: '700' },
});
