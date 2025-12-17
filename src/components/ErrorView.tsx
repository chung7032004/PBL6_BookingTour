import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
interface ErrorViewProps {
  message: string;
  onPress: () => void;
  textButton?: string;
}
const ErrorView = (props: ErrorViewProps) => {
  const { message, onPress, textButton = 'Try again' } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>

      <CustomButton
        title={textButton}
        style={styles.button}
        onPress={onPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    color: 'red',
  },
  button: { backgroundColor: '#ff4d4f', paddingHorizontal: 20 },
});
export default ErrorView;
