import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types/route';
import { checkEmailExists, signup } from '../api/fakeAuth';

const SignUpScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [disable, setDisable] = useState(false);

  const handleEmailBlur = async () => {
    const check = await checkEmailExists(email);
    if (check) {
      setError('Email đã tồn tại');
      setDisable(true);
    } else {
      setError('');
      setDisable(false);
    }
  };

  const handleSignUp = async () => {
    if (email.length === 0) {
      setError('Email Không được để trống');
      return;
    }
    if (password.length === 0) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải dài ít nhất 6 ký tự');
      return;
    }
    if (confirmPassword.length === 0) {
      setError('Vui lòng nhập mật khẩu ');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    const name = 'Người dùng mới';
    const user = await signup(email, password, name);
    if (user) {
      navigation.navigate('login');
    } else {
      setError('Đăng kí thất bại , Email đã tồn tại');
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
        onBlur={handleEmailBlur}
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

      <Text style={styles.text}>Xác nhận mật khẩu</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, borderWidth: 0, marginVertical: 0 }]}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#888"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          keyboardType={confirmPasswordVisible ? 'visible-password' : 'default'}
          autoCapitalize="none"
          textContentType="password"
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Icon
            name={confirmPasswordVisible ? 'visibility-off' : 'visibility'}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {error.length > 0 && <Text style={styles.error}>* {error} *</Text>}

      <View style={styles.button}>
        <Button
          title="Đăng kí"
          onPress={() => handleSignUp()}
          disabled={disable}
        />
      </View>

      <View style={styles.loginRow}>
        <Text>Đã có tài khoản?</Text>
        <View style={styles.loginButton}>
          <Button
            title="Đăng nhập"
            onPress={() => navigation.navigate('login')}
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
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButton: {
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

export default SignUpScreen;
