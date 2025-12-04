import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
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
import { signup } from '../api/auth/signup';

const SignUpScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailBlur = async () => {
    // const check = await checkEmailExists(email);
    // if (check) {
    // setError('Email đã tồn tại');
    // setDisable(true);
    // } else
    if (!isValidEmail(email)) {
      setError('Email không hợp lệ');
      setDisable(true);
    } else {
      setError('');
      setDisable(false);
    }
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    if (email.length === 0) {
      setError('Email không được để trống');
      return;
    } else if (fullName.length > 0 && fullName.length < 2) {
      setError('Họ và tên phải dài ít nhất 2 ký tự');
      return;
    } else if (password.length < 8) {
      setError('Mật khẩu phải dài ít nhất 8 ký tự');
      return;
    } else if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    setLoading(true);
    setError('');
    const result = await signup(email, password, fullName);
    setLoading(false);

    if (result != null) {
      if (result.accountId) {
        navigation.navigate('login', {
          message: 'Đăng ký thành công, vui lòng đăng nhập',
        });
      } else {
        setError(result.message || 'Đăng ký thất bại. Vui lòng thử lại!');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} testID="signup-title">
            Tạo tài khoản
          </Text>
        </View>

        {/* Email */}
        <Text style={styles.text}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email của bạn"
            placeholderTextColor="#999"
            keyboardType="email-address"
            onBlur={handleEmailBlur}
            testID="signup-input-email"
          />
        </View>

        {/* Fullname */}
        <Text style={styles.text}>Họ và tên</Text>
        <View style={styles.inputWrapper}>
          <Icon name="person" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholder="Họ và tên của bạn"
            placeholderTextColor="#999"
            testID="signup-input-name"
          />
        </View>

        {/* Password */}
        <Text style={styles.text}>Mật khẩu</Text>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry={!passwordVisible}
            testID="signup-input-password"
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={passwordVisible ? 'visibility-off' : 'visibility'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.text}>Xác nhận mật khẩu</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="lock-outline"
            size={20}
            color="#555"
            style={styles.inputIcon}
          />
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry={!confirmPasswordVisible}
            testID="signup-input-confirm-password"
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={confirmPasswordVisible ? 'visibility-off' : 'visibility'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {error.length > 0 && (
          <Text style={styles.error} testID="signup-text-error">
            {error}
          </Text>
        )}

        {/* Sign up button */}
        <TouchableOpacity
          style={[styles.button, disable && { backgroundColor: '#aaa' }]}
          onPress={handleSignUp}
          disabled={disable}
          testID="signup-btn-submit"
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        {/* Login link */}
        <View style={styles.loginRow}>
          <Text>Đã có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.loginLink}> Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingOverlay visible={loading} message="Đang xử lý..." />
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  titleContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: '#222',
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
    marginVertical: 8,
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
    marginTop: 16,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
