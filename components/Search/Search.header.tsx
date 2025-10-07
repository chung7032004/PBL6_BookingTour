import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../images';
import CustomButton from '../component/CustomButton';

const SearchHeader = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearch = (searchText: string) => {
    Alert.alert('Search', `You searched for: ${searchText}`);
  };
  const handleClearSearch = () => {
    setSearchText('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={images.search} />
        <TextInput
          style={styles.input}
          value={searchText}
          placeholder="Tìm kiếm..."
          placeholderTextColor="#888"
          onChangeText={text => setSearchText(text)}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Image style={styles.icon_clear} source={images.close} />
          </TouchableOpacity>
        )}
      </View>
      <CustomButton title="Tìm kiếm" onPress={() => handleSearch(searchText)} />
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
    color: '#000',
    paddingVertical: 0,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: 'gray',
    marginRight: 6,
  },
  icon_clear: {
    width: 17,
    height: 17,
    tintColor: '#fff',
    backgroundColor: '#999',
    borderRadius: 10,
    padding: 3,
    marginLeft: 6,
  },
});
export default SearchHeader;
