import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import { verifyCode } from '../api/fakeAuth';
import LoadingOverlay from '../component/LoadingOverlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Notification from '../component/Notification';

const VerifyCodeScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'verifyCode'> = useRoute();
  const { email } = route.params;

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  useEffect(() => {
    if (route.params?.message) {
      setShowNotification(route.params.message);
    }
  }, [route.params]);

  const handleConfirm = async () => {
    if (code.length !== 6) return;

    setLoading(true);
    setError('');

    const res: any = await verifyCode(email, code);
    setLoading(false);

    if (!res.success) {
      setError(res.message);
      return;
    }

    navigation.navigate('resetPassword', {
      email,
      message: 'Xác nhận mã thành công, vui lòng đặt lại mật khẩu',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Nhập mã xác nhận</Text>
        <Text style={styles.description}>
          Mã gồm 6 số đã được gửi đến email: **{email}**
        </Text>

        <TextInput
          testID="codeInput"
          style={styles.codeInput}
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={t => {
            setError('');
            setCode(t);
          }}
        />

        {error ? (
          <Text
            style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}
            testID="errorText"
          >
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          testID="confirmButton"
          style={[
            styles.confirmButton,
            { opacity: code.length === 6 ? 1 : 0.5 },
          ]}
          disabled={code.length !== 6 || loading}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmText}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="backToForgotPassword"
          style={styles.backToLoginButton}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-back"
            size={18}
            color="#333"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.textBackToLogin}>Quay lại trang trước</Text>
        </TouchableOpacity>
      </View>
      <LoadingOverlay visible={loading} message={'Đang xử lý ...'} />
      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type="success"
          autoClose
          position="top"
          duration={3000}
        />
      )}
    </View>
  );
};

export default VerifyCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEC',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    textAlign: 'center',
    marginBottom: 25,
    color: '#666',
    lineHeight: 22,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: 8,
    paddingVertical: 12,
    marginBottom: 25,
  },
  confirmButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 14,
    borderRadius: 10,
  },
  confirmText: {
    textAlign: 'center',
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
