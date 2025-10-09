import BookingScreen from '../Booking/BookingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './app.home';
import { Image } from 'react-native';
import ProfileStack from './app.profile';
import images from '../../images';
import SearchStack from './app.search';
import WishListScreen from '../WishList/WishListScreen';
import BookingStack from './app.booking';

const AppNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name={'homeTab'}
        component={HomeStack}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={images.home}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="searchTab"
        component={SearchStack}
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={images.search}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="bookingTab"
        component={BookingStack}
        options={{
          title: 'Booking',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={images.calendar}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="wishListTab"
        component={WishListScreen}
        options={{
          title: 'Yêu thích',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={images.favorite}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profileTab"
        component={ProfileStack}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={images.profile}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
