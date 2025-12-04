import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const PaymentProcessingScreen = () => {
  const route = useRoute<any>();
  const { paymentUrl } = route.params;

  return (
    <View style={{ flex: 1 }}>
      {/* WebView mở link MoMo → đảm bảo hoạt động trên mọi thiết bị */}
      <WebView
        source={{ uri: paymentUrl }}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        userAgent="Mozilla/5.0 (Linux; Android 10)"
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#E31E7C" />
            <Text style={styles.loadingText}>Đang mở MoMo...</Text>
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
    color: '#C8197E',
    fontWeight: '600',
  },
});

export default PaymentProcessingScreen;
