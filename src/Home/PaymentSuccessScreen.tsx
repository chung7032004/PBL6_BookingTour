import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { RootStackParamList } from '../../types/route';

type PaymentSuccessRouteProp = RouteProp<
  RootStackParamList,
  'paymentSuccessScreen'
>;

const PaymentSuccessScreen = () => {
  const route = useRoute<PaymentSuccessRouteProp>();
  const navigation = useNavigation<any>();
  const { total, method } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="check-circle" size={100} color="#4CAF50" />
      </View>

      <Text style={styles.title}>Thanh toán thành công!</Text>
      <Text style={styles.message}>
        Cảm ơn bạn đã đặt tour. Chúng tôi sẽ liên hệ xác nhận trong thời gian
        sớm nhất.
      </Text>

      <View style={styles.detailBox}>
        <Text style={styles.detailText}>
          Phương thức:{' '}
          <Text style={styles.boldText}>
            {method === 'cash'
              ? 'Thanh toán trực tiếp'
              : method === 'momo'
              ? 'Momo'
              : method === 'zalo'
              ? 'ZaloPay'
              : 'Không xác định'}
          </Text>
        </Text>
        <Text style={styles.detailText}>
          Tổng tiền:{' '}
          <Text style={styles.boldText}>
            {(total ?? 0).toLocaleString('vi-VN')}₫
          </Text>
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Về trang chủ"
          style={[styles.button, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('home')}
        />
        <CustomButton
          title="Xem đơn đặt"
          style={[styles.button, { backgroundColor: '#2196F3' }]}
          onPress={() =>
            navigation.navigate('bookingTab', {
              screen: 'booking',
            })
          }
        />
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 8,
  },
  message: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
    marginVertical: 12,
    lineHeight: 22,
    maxWidth: 320,
  },
  detailBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 14,
    width: '85%',
    marginVertical: 16,
    elevation: 2,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  boldText: {
    fontWeight: '700',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
  },
});
