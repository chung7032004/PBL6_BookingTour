import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Home/HomeScreen';
import TourDetailScreen from '../Home/TourDetailScreen';
import AppHeader from './app.header';
import ProviderScreen from '../Home/ProviderScreen';
import PaymentScreen from '../Home/PaymentScreen';
import PaymentSuccessScreen from '../Home/PaymentSuccessScreen';
import NoticeScreen from '../Home/NoticeScreen';

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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="notice"
        component={NoticeScreen}
        options={{ title: 'Thông báo' }}
      />
    </Stack.Navigator>
  );
}
