import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingScreen from '../Booking/BookingScreen';
import AppHeader from './app.header';

const BookingStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={BookingScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
    </Stack.Navigator>
  );
};
export default BookingStack;
