import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import TourDetailScreen from '../components/TourDetailScreen';
import AppHeader from './app.header';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerTitle: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="tourDetail"
        component={TourDetailScreen}
        options={{ title: 'Chi tiết tour' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
  },
});
