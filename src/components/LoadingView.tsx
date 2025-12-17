import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
interface LoadingViewProps {
  message?: string;
}

const LoadingView = (props: LoadingViewProps) => {
  const { message = 'Loading data...' } = props;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff4d4f" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
  },
});
export default LoadingView;
