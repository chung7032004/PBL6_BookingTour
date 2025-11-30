// CustomRadioGroup.tsx (hoặc RadioGroup.tsx)

import React from 'react';
import { View } from 'react-native';
import CustomRadioButton from './CustomRadioButton';

interface RadioGroupProps<T extends string> {
  options: { label: string; value: T }[];
  selectedValue: T;
  onValueChange: (value: T) => void;
}

const RadioGroup = <T extends string>(props: RadioGroupProps<T>) => {
  const { options, selectedValue, onValueChange } = props;

  return (
    <View>
      {options.map(option => (
        <CustomRadioButton
          key={option.value}
          label={option.label}
          selected={selectedValue === option.value}
          onPress={() => onValueChange(option.value)}
        />
      ))}
    </View>
  );
};

export default RadioGroup;
