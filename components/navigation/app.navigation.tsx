import BookingScreen from '../Booking/BookingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './app.home';
import { Image } from 'react-native';
import ProfileStack from './app.profile';
import images from '../../images';

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
        name={'home1'}
        component={HomeStack}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ size }) => (
            <Image
              source={images.home}
              style={{ width: size, height: size, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="booking"
        component={BookingScreen}
        options={{
          title: 'Booking',
          tabBarIcon: ({ size }) => (
            <Image
              source={images.calendar}
              style={{ width: size, height: size, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile1"
        component={ProfileStack}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ size }) => (
            <Image
              source={images.profile}
              style={{ width: size, height: size, resizeMode: 'contain' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
