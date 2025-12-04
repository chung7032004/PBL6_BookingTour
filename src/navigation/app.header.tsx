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
        <Icon name="search" size={24} style={styles.icon} />
        <Text style={styles.input}>Bạn muốn đi đâu...</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#999',
    paddingVertical: 0,
  },
  icon: {
    marginRight: 8,
    color: '#999',
  },
});

export default AppHeader;
