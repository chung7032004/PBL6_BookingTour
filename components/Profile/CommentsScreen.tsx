import { StyleSheet, Text, View } from 'react-native';

const CommentsScreen = () => (
  <View style={styles.tabContent}>
    <Text>Nhận xét của bạn</Text>
  </View>
);
const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CommentsScreen;
