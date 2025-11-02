import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../component/CustomButton';

interface Props {
  onSearch: (keyword: string) => void;
}

const SearchHeader = ({ onSearch }: Props) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => onSearch(searchText.trim());

  const handleClearSearch = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={22} color="#555" style={styles.icon} />

        <TextInput
          style={styles.input}
          value={searchText}
          placeholder="Tìm kiếm..."
          placeholderTextColor="#888"
          onChangeText={text => {
            setSearchText(text);
            if (text === '') onSearch('');
          }}
        />

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

      <CustomButton title="Tìm kiếm" onPress={handleSearch} />
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
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
