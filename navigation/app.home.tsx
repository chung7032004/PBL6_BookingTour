import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import TourDetailScreen from '../components/TourDetailScreen';
import AppHeader from './app.header';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';

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
        options={{ title: 'Chi tiết tour' }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="signup"
        component={SignUpScreen}
        options={{ title: 'Sign Up', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
