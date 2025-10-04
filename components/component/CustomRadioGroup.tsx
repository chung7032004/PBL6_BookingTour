import React from 'react';
import { View } from 'react-native';
import CustomRadioButton from './CustomRadioButton';

interface RadioGroupProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RadioGroup = (props: RadioGroupProps) => {
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
