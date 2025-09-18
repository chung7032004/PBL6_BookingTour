import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../Search/SearchScreen';
import AppHeader from './app.header';
import WishListScreen from '../WishList/WishListScreen';

const WishListStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="wishList"
        component={WishListScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
    </Stack.Navigator>
  );
};
export default WishListStack;
