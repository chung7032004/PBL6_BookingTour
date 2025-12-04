import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types/route';
import LoadingOverlay from '../components/LoadingOverlay';
import Notification from '../components/Notification';
import { resetPassword } from '../api/auth/forgotPassword';

const ResetPasswordScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'resetPassword'> = useRoute();
  const { email } = route.params;

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  useEffect(() => {
    if (route.params?.message) {
      setShowNotification(route.params.message);
    }
  }, [route.params]);

  const handleReset = async () => {
    if (password.length < 8) {
      setError('Mật khẩu phải dài ít nhất 8 ký tự');
      return;
    }
    if (code.length !== 6) return;
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    setLoading(true);
    const res = await resetPassword(email, code, password);
    setLoading(false);

    if (!res.success) {
      setError(res.message || 'Đổi mật khẩu thất bại');
      return;
    }

    navigation.navigate('login', {
      message: 'Đổi mật khẩu thành công, hãy đăng nhập lại',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tạo mật khẩu mới</Text>
        </View>

        {/* Email hiển thị (không chỉnh sửa) */}
        <Text style={styles.text}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            testID="emailDisplay"
            style={[styles.input, { color: '#666' }]}
            value={email}
            editable={false}
          />
        </View>
        <Text style={styles.text}>
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
        {/* Mật khẩu */}
        <Text style={styles.text}>Mật khẩu mới</Text>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            testID="newPasswordInput"
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            placeholderTextColor="#999"
            secureTextEntry={!visible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={visible ? 'visibility-off' : 'visibility'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* Xác nhận mật khẩu */}
        <Text style={styles.text}>Xác nhận mật khẩu</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="lock-outline"
            size={20}
            color="#555"
            style={styles.inputIcon}
          />
          <TextInput
            testID="confirmPasswordInput"
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry={!visibleConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setVisibleConfirm(!visibleConfirm)}
            style={styles.eyeIcon}
          >
            <Icon
              name={visibleConfirm ? 'visibility-off' : 'visibility'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {error.length > 0 && (
          <Text style={styles.error} testID="errorText">
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
          testID="resetPasswordButton"
        >
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text>Quay lại?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            testID="backToLoginLink"
          >
            <Text style={styles.loginLink}> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
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
    </ScrollView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  titleContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 22,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1.2,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
  },
  eyeIcon: {
    padding: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: '600',
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
});
