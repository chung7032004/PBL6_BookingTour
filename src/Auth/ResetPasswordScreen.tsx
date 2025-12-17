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
import { validatePassword } from '../api/auth/login';

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
    if (code.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and include a letter, a number, and a special character',
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Password do not match');
      return;
    }

    setLoading(true);
    const res = await resetPassword(email, code, password);
    setLoading(false);

    if (!res.success) {
      setError(res.message || 'Password reset failed');
      return;
    }

    navigation.navigate('login', {
      message: 'Password reset successfully. Please sign in again',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Create New Password</Text>
        </View>

        {/* Email hiển thị */}
        <Text style={styles.text}>Email</Text>
        <View style={styles.inputWrapper}>
          <Icon name="email" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: '#666' }]}
            value={email}
            editable={false}
          />
        </View>

        {/* Nhập mã xác nhận */}
        <Text style={styles.text}>Verification Code</Text>

        <TextInput
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
        <Text style={styles.text}>New Password</Text>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} color="#555" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
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
        <Text style={styles.text}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Icon
            name="lock-outline"
            size={20}
            color="#555"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Re-enter password"
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

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text>Bạn muốn quay lại?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.loginLink}> Sync In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LoadingOverlay visible={loading} message={'Processing...'} />
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
    fontSize: 32,
    fontWeight: 'bold',
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
    marginBottom: 14,
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
  codeInput: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 8,
    paddingVertical: 12,
    marginBottom: 20,
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
});
