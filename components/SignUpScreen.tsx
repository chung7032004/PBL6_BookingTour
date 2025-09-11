import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUpScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const handleSignUp = () => {
    if (email.length === 0) {
      setError('Email is required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    // Handle sign-up logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

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

      <Text style={styles.text}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1, borderWidth: 0, marginVertical: 0 }]}
          placeholder="Confirm Password"
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
          <Image
            source={
              confirmPasswordVisible
                ? require('../images/visibility_off.png')
                : require('../images/visibility.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      {error.length > 0 && <Text style={styles.error}>* {error} *</Text>}
      <View style={styles.button}>
        <Button title="Sign Up" onPress={() => handleSignUp()} />
      </View>

      <View style={styles.loginRow}>
        <Text>Already have an account?</Text>
        <View style={styles.loginButton}>
          <Button title="Login" onPress={() => navigation.navigate('login')} />
        </View>
      </View>

      <View style={styles.socialSection}>
        <Text style={{ textAlign: 'center' }}>Or sign up with</Text>
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
    backgroundColor: '#fff',
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
  image: { width: 18, height: 18, tintColor: '#555' },
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
