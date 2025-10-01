import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from '../Checkbox';
import THEME from '../../global/styles/theme';

export type CheckboxOption = {
  value: string | number;
  label: string;
};

export type CheckboxGroupProps = {
  title?: string;
  value: Array<string | number>;
  options: CheckboxOption[];
  onChange: (next: Array<string | number>) => void;
  disabled?: boolean;
};

export default function CheckboxGroup({
  title,
  value,
  options,
  onChange,
  disabled,
}: CheckboxGroupProps) {
  const toggle = (optValue: string | number) => {
    const isChecked = value.includes(optValue);
    const next = isChecked ? value.filter(v => v !== optValue) : [...value, optValue];
    onChange(next);
  };

  return (
    <View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {options?.map((opt) => (
        <Checkbox
          key={String(opt.value)}
          label={opt.label}
          checked={value.includes(opt.value)}
          onChange={() => toggle(opt.value)}
          disabled={disabled}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: THEME.fonts?.semiBold,
    fontSize: THEME.fontSize?.normal ?? 16,
    marginBottom: 4,
    color: '#111',
  },
});
