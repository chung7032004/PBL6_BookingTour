import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CustomRadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const CustomRadioButton = ({
  label,
  selected,
  onPress,
}: CustomRadioButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>
        <MaterialIcons
          name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={24}
          color={selected ? '#007AFF' : '#8E8E93'}
        />
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconWrapper: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  labelSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default CustomRadioButton;
