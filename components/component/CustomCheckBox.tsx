import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        <MaterialIcons
          name={checked ? 'check-box' : 'check-box-outline-blank'}
          size={26}
          color={checked ? '#007AFF' : '#8E8E93'}
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
});
