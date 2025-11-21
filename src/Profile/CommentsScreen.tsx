import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import images from '../../images';
import ReviewCard from './ReviewCard';
import { useAuthGuard } from '../hooks/useAuthGuard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
const { width } = Dimensions.get('window');
const CommentsScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
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

  const { loading, error } = useAuthGuard();
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'homeTab',
      params: 'paymentScreen',
    });
  };
  if (loading) return <LoadingView message="Đang kiểm tra đăng nhập ..." />;
  if (error)
    return (
      <ErrorView
        message="Bạn cần đăng nhập để sử dụng tính năng này"
        onPress={handleLogin}
      />
    );
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
