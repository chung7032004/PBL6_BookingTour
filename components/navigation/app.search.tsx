import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../Search/SearchScreen';
import AppHeader from './app.header';

const SearchStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{ headerTitle: () => <AppHeader /> }}
      />
    </Stack.Navigator>
  );
};
export default SearchStack;
