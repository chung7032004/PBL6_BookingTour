import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppHeader from './app.header';
import BookingListScreen from '../Booking/BookingListScreen';
import BookingDetailScreen from '../Booking/BookingDetailScreen';
import ReviewScreen from '../Booking/ReviewScreen';
import TourDetailScreen from '../Home/TourDetailScreen';

const BookingStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="bookingListScreen"
        component={BookingListScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
      <Stack.Screen
        name="bookingDetail"
        component={BookingDetailScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
      <Stack.Screen
        name="reviewScreen"
        component={ReviewScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
      <Stack.Screen
        name="tourDetail"
        component={TourDetailScreen}
        options={{ title: 'Chi tiết tour', headerTitle: () => <AppHeader /> }}
      />
    </Stack.Navigator>
  );
};
export default BookingStack;
