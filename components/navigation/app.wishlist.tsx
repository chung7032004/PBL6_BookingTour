import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppHeader from './app.header';

import WishList from '../WishList/WishList';
import WishListDetailScreen from '../WishList/WishListDetailScreen';
import TourDetailScreen from '../Home/TourDetailScreen';
import HeaderNotificationIcon from '../component/HeaderNotificationIcon';
import { useState } from 'react';

const WishListStack = () => {
  const Stack = createNativeStackNavigator();
  const [count, setCount] = useState(10);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="wishList"
        component={WishList}
        options={{
          headerRight: () => <HeaderNotificationIcon count={count} />,
          headerTitle: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="wishListDetail"
        component={WishListDetailScreen}
        options={{
          headerRight: () => <HeaderNotificationIcon count={count} />,
          headerTitle: () => <AppHeader />,
        }}
      />
    </Stack.Navigator>
  );
};
export default WishListStack;
