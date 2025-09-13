import HomeScreen from '../components/HomeScreen';
import BookingScreen from '../components/BookingScreen';
import ProfileScreen from '../components/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './app.home';
import { Image } from 'react-native';
import ProfileStack from './app.profile';

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
          title: 'Home',
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../images/home.png')}
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
              source={require('../images/calendar.png')}
              style={{ width: size, height: size, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile1"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../images/account.png')}
              style={{ width: size, height: size, resizeMode: 'contain' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
