import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../images';

const ForgotPasswordScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.text}>
        Please enter your email address to receive a link to create a new
        password via email
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.backToLoginButton}
          onPress={() => navigation.navigate('login')}
        >
          <Image style={styles.image} source={images.arrowBack} />
          <Text style={styles.textBackToLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={() => {}}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
    color: '#000',
  },
  button: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    shadowColor: '#000',
  },
  image: {
    height: 20,
    width: 20,
    marginRight: 8,
    tintColor: '#333',
  },
  textBackToLogin: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});
export default ForgotPasswordScreen;
