import { Button, Text, TextInput, View } from 'react-native';

const ForgotPasswordScreen = () => {
  return (
    <View>
      <Text>Forgot Password Screen</Text>
      <Text>
        Please enter your email address to receive a link to create a new
        password via email
      </Text>
      <TextInput placeholder="Email" placeholderTextColor="#888" />
      <Button title="Xác nhận" onPress={() => {}} />
      <Text>Back to Login</Text>
    </View>
  );
};

export default ForgotPasswordScreen;
