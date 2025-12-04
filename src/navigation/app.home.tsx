import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Home/HomeScreen';
import TourDetailScreen from '../Home/TourDetailScreen';
import AppHeader from './app.header';
import ProviderScreen from '../Home/ProviderScreen';
import PaymentScreen from '../Home/PaymentScreen';
import PaymentSuccessScreen from '../Home/PaymentSuccessScreen';
import NoticeScreen from '../Home/NoticeScreen';
import HeaderNotificationIcon from '../components/HeaderNotificationIcon';
import { useState } from 'react';
import PaymentProcessingScreen from '../Home/PaymentProcessingScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const [count, setCount] = useState(10);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerTitle: () => <AppHeader />,
          // headerRight: () => <HeaderNotificationIcon count={count} />,
        }}
      />
      <Stack.Screen
        name="tourDetail"
        component={TourDetailScreen}
        initialParams={{ id: undefined }}
        options={{
          title: 'Chi tiết tour',
          headerTitle: () => <AppHeader />,
          // headerRight: () => <HeaderNotificationIcon count={count} />,
        }}
      />
      <Stack.Screen
        name="provider"
        component={ProviderScreen}
        options={{
          // headerRight: () => <HeaderNotificationIcon count={count} />,
          title: 'Thông tin host',
          headerTitle: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="paymentScreen"
        component={PaymentScreen}
        options={{
          // headerRight: () => <HeaderNotificationIcon count={count} />,
          title: 'Xác nhận và thanh toán',
        }}
      />
      <Stack.Screen
        name="paymentSuccessScreen"
        component={PaymentSuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="paymentProcessingScreen"
        component={PaymentProcessingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
