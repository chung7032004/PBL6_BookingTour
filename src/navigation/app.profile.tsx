import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../Profile/ProfileScreen';
import ProfileDetailScreen from '../Profile/ProfileDetailScreen';
import ProfileEditScreen from '../Profile/ProfileEditScreen';
import HeaderNotificationIcon from '../components/HeaderNotificationIcon';
import ContactScreen from '../Profile/ContactScreen';

export default function ProfileStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profileDetail"
        component={ProfileDetailScreen}
        options={{
          title: 'Trang cá nhân',
          // headerRight: () => <HeaderNotificationIcon count={10} />,
        }}
      />
      <Stack.Screen
        name="profileEdit"
        component={ProfileEditScreen}
        options={{
          title: 'Thông tin tài khoản',
          // headerRight: () => <HeaderNotificationIcon count={10} />,
        }}
      />
      <Stack.Screen
        name="contact"
        component={ContactScreen}
        options={{
          title: 'Liên hệ chúng tôi',
          // headerRight: () => <HeaderNotificationIcon count={10} />,
        }}
      />
    </Stack.Navigator>
  );
}
