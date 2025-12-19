import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../../types/route';

const PaymentProcessingScreen = () => {
  const route: RouteProp<RootStackParamList, 'paymentProcessingScreen'> =
    useRoute();
  const { paymentUrl } = route.params;

  return (
    <View style={{ flex: 1 }}>
      {/* WebView mở link VNPay → đảm bảo hoạt động trên mọi thiết bị */}
      <WebView
        source={{ uri: paymentUrl }}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        userAgent="Mozilla/5.0 (Linux; Android 10)"
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#005BAC" />
            <Text style={styles.loadingText}>Opening VNPay...</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#005BAC',
    fontWeight: '600',
  },
});

export default PaymentProcessingScreen;
