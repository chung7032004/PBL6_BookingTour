import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import images from '../../images';

interface CustomRadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const CustomRadioButton = (props: CustomRadioButtonProps) => {
  const { label, selected, onPress } = props;
  const icons = {
    checked: images.radio_button_checked,
    unchecked: images.radio_button_unchecked,
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={selected ? icons.checked : icons.unchecked}
        style={styles.icon}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
  },
});

export default CustomRadioButton;
