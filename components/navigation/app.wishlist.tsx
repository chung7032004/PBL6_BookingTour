import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppHeader from './app.header';

import WishList from '../WishList/WishList';
import WishListDetailScreen from '../WishList/WishListDetailScreen';

const WishListStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="wishList"
        component={WishList}
        options={{ headerTitle: () => <AppHeader /> }}
      />
      <Stack.Screen
        name="wishListDetail"
        component={WishListDetailScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
    </Stack.Navigator>
  );
};
export default WishListStack;
