import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppHeader from './app.header';
import BookingListScreen from '../Booking/BookingListScreen';
import BookingDetailScreen from '../Booking/BookingDetailScreen';
import ReviewScreen from '../Booking/ReviewScreen';
import TourDetailScreen from '../Home/TourDetailScreen';
import HeaderNotificationIcon from '../components/HeaderNotificationIcon';
import { useState } from 'react';
import ReviewSuccessScreen from '../Booking/ReviewSuccessScreen';
import CancelBookingScreen from '../Booking/CancelBoookingScreen';
import CancelBookingSuccessScreen from '../Booking/CancelBookingSuccess';

const BookingStack = () => {
  const [count, setCount] = useState(10);
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="bookingList"
        component={BookingListScreen}
        options={{
          // headerRight: () => <HeaderNotificationIcon count={count} />,
          headerTitle: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="bookingDetail"
        component={BookingDetailScreen}
        options={{
          // headerRight: () => <HeaderNotificationIcon count={count} />,
          headerTitle: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="reviewScreen"
        component={ReviewScreen}
        options={{
          // headerRight: () => <HeaderNotificationIcon count={count} />,
          headerTitle: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="tourDetail"
        component={TourDetailScreen}
        options={{
          // headerRight: () => <HeaderNotificationIcon count={count} />,
          headerTitle: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="reviewSuccess"
        component={ReviewSuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="cancelBooking"
        component={CancelBookingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cancelBookingSuccess"
        component={CancelBookingSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default BookingStack;
