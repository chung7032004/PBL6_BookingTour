import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/route';

import { useState } from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { login } from '../api/fakeAuth';

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
    }
    if (password.length < 6) {
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.text}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email của bạn"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />

      <Text style={styles.text}>Mật khẩu</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, borderWidth: 0, marginVertical: 0 }]}
          placeholder="Mật khẩu"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          keyboardType={passwordVisible ? 'visible-password' : 'default'}
          autoCapitalize="none"
          textContentType="password"
        />

        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'visibility-off' : 'visibility'}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {error.length > 0 && <Text style={styles.error}>* {error} *</Text>}

      <View style={styles.button}>
        <Button title="Đăng nhập" onPress={() => handleLogin()} />
      </View>

      <View style={styles.forgotRow}>
        <Text style={styles.text}>Quên mật khẩu?</Text>
        <View style={styles.forgotButton}>
          <Button
            title="Đặt lại mật khẩu"
            onPress={() => navigation.navigate('forgotPassword')}
          />
        </View>
      </View>

      <View style={styles.signupRow}>
        <Text style={styles.text}>Không có tài khoản?</Text>
        <View style={styles.signupButton}>
          <Button
            title="Đăng kí"
            onPress={() => navigation.navigate('signup')}
          />
        </View>
      </View>

      <View style={styles.socialSection}>
        <Text style={{ textAlign: 'center' }}>Hoặc đăng nhập với</Text>
        <View style={styles.socialButtons}>
          <Button title="Google" onPress={() => {}} />
          <Button title="Facebook" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
    color: '#000',
  },
  passwordContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginVertical: 8,
    paddingRight: 10,
  },
  button: {
    marginVertical: 12,
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotButton: {
    marginLeft: 8,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupButton: {
    marginLeft: 8,
  },
  socialSection: {
    marginTop: 20,
  },
  socialButtons: {
    marginTop: 10,
    gap: 8,
  },
  error: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LoginScreen;
