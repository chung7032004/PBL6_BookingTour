import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/route';

import { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { login } from '../api/fakeAuth';
import images from '../../images';

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

  const handleLogin = async () => {
    if (email.length === 0) {
      setError('Không được để trống email');
      return;
    } else if (password.length === 0) {
      setError('Mật khẩu không được để trống');
      return;
    } else if (password.length < 6) {
      setError('Mật khẩu phải dài ít nhất 6 ký tự');
      return;
    }

    // Gọi "fake API"
    const user = await login(email, password);
    if (user) {
      const redirect = route.params?.redirect;
      const redirectParams = route.params?.params;
      if (redirect) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'AppTabs',
              params: {
                screen: redirect,
                params: redirectParams,
              },
            },
          ],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppTabs' }],
        });
      }
    } else {
      setError('Email hoặc mật khẩu không đúng!');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Đăng nhập</Text>
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

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text>Quên mật khẩu?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('forgotPassword')}
          >
            <Text style={styles.loginLink}> Đặt lại mật khẩu</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginRow}>
          <Text>Không có tài khoảng</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.loginLink}> Đăng kí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: '#FFEBEC',
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
