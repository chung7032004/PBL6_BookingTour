import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import images from '../../images';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CustomCheckbox = ({ checked, onChange }: CustomCheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      activeOpacity={0.8}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <Image
          source={checked ? images.check_box : images.check_box_outline_blank}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    padding: 6,
    alignSelf: 'flex-start',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#007AFF',
  },
});
