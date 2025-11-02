import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../Search/SearchScreen';
import TourDetailScreen from '../Home/TourDetailScreen';
import AppHeader from './app.header';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="tourDetail"
        component={TourDetailScreen}
        options={{ title: 'Chi tiết tour', headerTitle: () => <AppHeader /> }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
