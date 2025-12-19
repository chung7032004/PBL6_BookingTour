import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../Profile/ProfileScreen';
import ProfileDetailScreen from '../Profile/ProfileDetailScreen';
import ProfileEditScreen from '../Profile/ProfileEditScreen';
import ContactScreen from '../Profile/ContactScreen';
import ChangePasswordScreen from '../Profile/ChangePasswordScreen';

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
          title: 'Personal Page',
          // headerRight: () => <HeaderNotificationIcon count={10} />,
        }}
      />
      <Stack.Screen
        name="profileEdit"
        component={ProfileEditScreen}
        options={{
          title: 'Account Information',
          // headerRight: () => <HeaderNotificationIcon count={10} />,
        }}
      />
      <Stack.Screen
        name="contact"
        component={ContactScreen}
        options={{
          title: 'Contact Us',
          // headerRight: () => <HeaderNotificationIcon count={10} />,
        }}
      />
      <Stack.Screen
        name="changePassword"
        component={ChangePasswordScreen}
        options={{
          title: 'Contact Us',
          // headerRight: () => <HeaderNotificationIcon count={10} />,
        }}
      />
    </Stack.Navigator>
  );
}
