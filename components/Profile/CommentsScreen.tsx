import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import images from '../../images';
import ReviewCard from './ReviewCard';
const { width } = Dimensions.get('window');
const CommentsScreen = () => {
  const reviews = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Người dùng ${i + 1}`,
    avatar: images.account,
    rating: Math.floor(Math.random() * 2) + 4,
    time: `${i + 1} ngày trước`,
    content:
      'Trải nghiệm tuyệt vời, hướng dẫn viên thân thiện, cảnh đẹp và đồ ăn ngon. Rất đáng để thử!',
    nameTour: 'Khám phá Vịnh Hạ Long',
    imageTour: images.banner3,
  }));
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.tabContent}
    >
      {reviews.map(review => (
        <ReviewCard width={width - 10} key={review.id} {...review} />
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});

export default CommentsScreen;
