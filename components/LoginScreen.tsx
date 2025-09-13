import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const LoginScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email.length === 0) {
      setError('Email is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    // Handle login logic here
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.text}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />

      <Text style={styles.text}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, borderWidth: 0, marginVertical: 0 }]}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          keyboardType={passwordVisible ? 'visible-password' : 'default'}
          autoCapitalize="none"
          textContentType="password"
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Image
            source={
              passwordVisible
                ? require('../images/visibility_off.png')
                : require('../images/visibility.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      {error.length > 0 && <Text style={styles.error}>* {error} *</Text>}
      <View style={styles.button}>
        <Button title="Login" onPress={() => handleLogin()} />
      </View>

      <View style={styles.forgotRow}>
        <Text style={styles.text}>Forgot your password?</Text>
        <View style={styles.forgotButton}>
          <Button
            title="Reset Password"
            onPress={() => navigation.navigate('forgotPassword')}
          />
        </View>
      </View>

      <View style={styles.signupRow}>
        <Text style={styles.text}>Don't have an account?</Text>
        <View style={styles.signupButton}>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('signup')}
          />
        </View>
      </View>

      <View style={styles.socialSection}>
        <Text style={{ textAlign: 'center' }}>Or login with</Text>
        <View style={styles.socialButtons}>
          <Button title="Google" onPress={() => {}} />
          <Button title="Facebook" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
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
  image: { width: 18, height: 18, tintColor: '#555' },
  error: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LoginScreen;
