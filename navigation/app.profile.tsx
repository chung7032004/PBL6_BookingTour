import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../components/ProfileScreen';
import ProfileDetailScreen from '../components/ProflieDetailScreen';
import ProfileEditScreen from '../components/ProfileEditScreen';

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
        }}
      />
      <Stack.Screen
        name="profileEdit"
        component={ProfileEditScreen}
        options={{
          title: 'Thông tin tài khoản',
        }}
      />
    </Stack.Navigator>
  );
}
