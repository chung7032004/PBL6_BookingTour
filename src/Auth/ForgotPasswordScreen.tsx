import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types/route';
import { forgotPassword } from '../api/auth/forgotPassword';
import LoadingOverlay from '../components/LoadingOverlay';

const ForgotPasswordScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendLink = async () => {
    if (!validateEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }

    setError('');
    setLoading(true);
    const res = await forgotPassword(email);
    setLoading(false);

    if (!res.success) {
      setError(res.message || '');
      return;
    }
    setTimeout(() => {
      navigation.navigate('resetPassword', {
        email,
        message: 'Liên kết xác nhận đã được gửi đến email của bạn',
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Đặt lại mật khẩu</Text>
          </View>

          {/* Mô tả */}
          <Text style={styles.instructionText}>
            Vui lòng nhập địa chỉ email bạn đã đăng ký. Chúng tôi sẽ gửi một
            liên kết đến hộp thư của bạn để bạn có thể tạo mật khẩu mới.
          </Text>

          {/* Input Email */}
          <View style={styles.inputWrapper}>
            <Icon
              name="email"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              testID="emailInput"
              style={styles.input}
              placeholder="Email đã đăng ký"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {!!error && (
            <Text
              style={{ color: 'red', textAlign: 'center' }}
              testID="errorText"
            >
              {error}
            </Text>
          )}

          <TouchableOpacity
            testID="sendLinkButton"
            style={styles.confirmButton}
            disabled={loading}
            onPress={handleSendLink}
          >
            <Text style={styles.confirmText}>Gửi liên kết xác nhận</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="backToLoginButton"
            style={styles.backToLoginButton}
            onPress={() => navigation.navigate('login')}
          >
            <Icon
              name="arrow-back"
              size={18}
              color="#333"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.textBackToLogin}>Quay lại Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingOverlay visible={loading} message={'Đang xử lý ...'} />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEC',
    justifyContent: 'center',
  },
  contentWrapper: {
    paddingHorizontal: 25,
    alignSelf: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  titleContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  instructionText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 22,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
  },
  confirmButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 8,
  },
  textBackToLogin: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
});
