import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../component/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        {/* Icon tìm kiếm */}
        <Icon name="search" size={22} color="#555" style={styles.icon} />

        {/* Ô nhập liệu */}
        <TextInput
          style={styles.input}
          value={searchText}
          placeholder="Tìm kiếm..."
          placeholderTextColor="#888"
          onChangeText={text => setSearchText(text)}
        />

        {/* Nút xóa */}
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Icon
              name="close"
              size={16}
              color="#fff"
              style={styles.icon_clear}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Nút tìm kiếm */}
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
    marginRight: 6,
  },
  icon_clear: {
    backgroundColor: '#999',
    borderRadius: 20,
    padding: 2,
    marginLeft: 2,
    overflow: 'hidden',
  },
});

export default SearchHeader;
