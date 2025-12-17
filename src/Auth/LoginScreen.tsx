import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/route';

import { useEffect, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { login, validatePassword } from '../api/auth/login';
import LoadingOverlay from '../components/LoadingOverlay';
import Notification from '../components/Notification';

//Ở màn hình LoginScreen chỉ được gọi những route có trong RootStackParamList
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;
//Đây là thông tin của route login, có thể nhận params (nếu có).
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>(); //điều hướng giữa các màn hình
  const route = useRoute<LoginScreenRouteProp>(); //thông tin params được truyền vào màn hình hiện tại

  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  useEffect(() => {
    if (route.params?.message) {
      setShowNotification(route.params.message);
    }
  }, [route.params]);

  const handleLogin = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and include a letter, a number, and a special character',
      );
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(email, password);

    setLoading(false);

    if (result && !result.success) {
      setError(result.message || 'Login failed');
      return;
    }

    const redirect = route.params?.redirect;
    const nestedParams = route.params?.params as any;

    navigation.reset({
      index: 0,
      routes: [
        redirect
          ? {
              name: 'AppTabs',
              params: {
                screen: redirect,
                params: nestedParams,
              },
            }
          : { name: 'AppTabs' },
      ],
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>
        {/* Email */}
        <Text style={styles.text}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
            testID="login-input-email"
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
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            testID="login-input-password"
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

        {error.length > 0 && (
          <Text style={styles.error} testID="login-text-error">
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin()}
          testID="login-btn-submit"
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text>Forgot Password?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('forgotPassword')}
          >
            <Text style={styles.loginLink}> Reset Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginRow}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('signup')}
            testID="signup-link"
          >
            <Text style={styles.loginLink}> Sign up</Text>
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

export default LoginScreen;
