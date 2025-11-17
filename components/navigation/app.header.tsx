import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types/route';

const AppHeader = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => navigation.navigate('searchTab')}
      >
        <Icon name="search" size={24} />
        <Text style={styles.input}>Tìm kiếm...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  searchContainer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#888',
    paddingVertical: 0,
  },
});

export default AppHeader;
