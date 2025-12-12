import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../Search/SearchScreen';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{ headerTitle: '' }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
