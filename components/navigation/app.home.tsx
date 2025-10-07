import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Home/HomeScreen';
import TourDetailScreen from '../Home/TourDetailScreen';
import AppHeader from './app.header';
import LoginScreen from '../Home/LoginScreen';
import SignUpScreen from '../Home/SignUpScreen';
import ForgotPasswordScreen from '../Home/ForgetPasswordScreen';
import SearchScreen from '../Search/SearchScreen';
import SearchHeader from '../Search/Search.header';

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
