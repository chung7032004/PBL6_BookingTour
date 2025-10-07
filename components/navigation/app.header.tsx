import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import images from '../../images';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const AppHeader = () => {
  const navigation: NavigationProp<any> = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchContainer}
        // 👉 Chuyển sang tab "searchTab" thay vì mở màn mới
        onPress={() => navigation.navigate('searchTab')}
      >
        <Image source={images.search} />
        <Text style={styles.input}>Tìm kiếm...</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Image source={images.notifications} />
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
