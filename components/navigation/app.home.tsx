import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Home/HomeScreen';
import TourDetailScreen from '../Home/TourDetailScreen';
import AppHeader from './app.header';
import LoginScreen from '../Home/LoginScreen';
import SignUpScreen from '../Home/SignUpScreen';
import ForgotPasswordScreen from '../Home/ForgetPasswordScreen';
import ProviderScreen from '../Home/ProviderScreen';
import PaymentScreen from '../Home/PaymentScreen';
import PaymentSuccessScreen from '../Home/PaymentSuccessScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerTitle: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="tourDetail"
        component={TourDetailScreen}
        options={{ title: 'Chi tiết tour', headerTitle: () => <AppHeader /> }}
      />
      <Stack.Screen
        name="provider"
        component={ProviderScreen}
        options={{ title: 'Thông tin host', headerTitle: () => <AppHeader /> }}
      />
      <Stack.Screen
        name="paymentScreen"
        component={PaymentScreen}
        options={{ title: 'Xác nhận và thanh toán' }}
      />
      <Stack.Screen
        name="paymentSuccessScreen"
        component={PaymentSuccessScreen}
        options={{ title: 'Thanh toán thành công' }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: 'Login', headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignUpScreen}
        options={{ title: 'Sign Up', headerShown: false }}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Forgot Password', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
