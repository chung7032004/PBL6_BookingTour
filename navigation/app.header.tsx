import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const AppHeader = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        placeholder="Search"
        onChangeText={text => setSearchText(text)}
      />
      <Button title="Search" onPress={() => {}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '60%',
  },
});
export default AppHeader;
