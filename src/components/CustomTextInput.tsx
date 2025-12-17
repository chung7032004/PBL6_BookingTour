import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

interface CustomTextInputProps extends RNTextInputProps {
  title?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  title = 'Enter...',
  placeholderTextColor = '#aaa',
  ...rest
}) => {
  return (
    <RNTextInput
      style={styles.input}
      placeholder={title}
      placeholderTextColor={placeholderTextColor}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#fafafa',
  },
});

export default CustomTextInput;
