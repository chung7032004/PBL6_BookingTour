import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../Search/SearchScreen';
import SearchHeader from '../Search/Search.header';

const SearchStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{ headerTitle: () => <SearchHeader /> }}
      />
    </Stack.Navigator>
  );
};
export default SearchStack;
