
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckboxProps } from './types';
import THEME from "../../global/styles/theme";

export default function Checkbox ({ checked, label, onChange }: CheckboxProps) {
  const handlePress = () => {
    onChange(!checked);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: THEME.colors.secondary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: THEME.colors.secondary,
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
  },
});

