import React, { memo } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import THEME from '../../global/styles/theme';

export type SingleCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  // opcional: id/valor se quiser reaproveitar este componente isoladamente
};

function CheckboxBase({ checked, label, onChange, disabled }: SingleCheckboxProps) {
  const handlePress = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.7 },
        disabled && { opacity: 0.4 },
      ]}
      hitSlop={8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

export default memo(CheckboxBase);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: THEME.colors.secondary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  boxChecked: {
    backgroundColor: THEME.colors.secondary,
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 18,
  },
  label: {
    fontSize: THEME.fontSize.normal ?? 16,
    color: '#111',
  },
});
