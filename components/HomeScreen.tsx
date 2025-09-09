import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

const HomeScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>🏠 Home Screen</Text>
      <Button
        title="Go tour detail"
        onPress={() => navigation.navigate('tourDetail')}
      />
    </View>
  );
};

export default HomeScreen;
