import { StyleSheet, Text, View } from 'react-native';

const PostsScreen = () => (
  <View style={styles.tabContent}>
    <Text>Bài viết của bạn</Text>
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
export default PostsScreen;
