import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onSearch: (keyword: string) => void;
}

const SearchHeader = ({ onSearch }: Props) => {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.searchContainer}>
        <Icon name="search" size={22} color="#666" style={styles.icon} />

        <TextInput
          style={styles.input}
          placeholder="Đà Nẵng, Phú Quốc, Hà Nội..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            if (text.trim() === '') onSearch('');
          }}
          onSubmitEditing={() => onSearch(searchText)}
          returnKeyType="search"
        />

        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
            <Icon name="close-circle" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* Có thể thêm nút lọc ở đây sau */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
});

export default SearchHeader;
