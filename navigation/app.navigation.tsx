import HomeScreen from '../components/HomeScreen';
import BookingScreen from '../components/BookingScreen';
import ProfileScreen from '../components/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './app.home';

const AppNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen name={'home1'} component={HomeStack} />
      <Tab.Screen name="booking" component={BookingScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
