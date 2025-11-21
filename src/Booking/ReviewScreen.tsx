import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import { useAuthGuard } from '../hooks/useAuthGuard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { RootStackParamList } from '../../types/route';
type ReviewScreenRouteProp = RouteProp<RootStackParamList, 'reviewScreen'>;

const ReviewScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route = useRoute<ReviewScreenRouteProp>();
  const bookingId = route.params.bookingId;

  // Dữ liệu tour mẫu (thực tế sẽ fetch từ API)
  const booking = {
    id: bookingId,
    nameTour: 'Khám phá phố cổ Hội An về đêm',
    image: require('../../images/banner1.jpg'), // thay bằng ảnh thật của bạn
    date: new Date(2025, 9, 10),
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Oops!', 'Bạn chưa chọn số sao đánh giá nhé', [
        { text: 'OK' },
      ]);
      return;
    }

    Alert.alert(
      'Gửi đánh giá thành công!',
      'Cảm ơn bạn đã dành thời gian chia sẻ trải nghiệm. Đánh giá của bạn rất quý giá với chúng tôi và cộng đồng du khách khác!',
      [
        {
          text: 'Hoàn thành',
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false },
    );
  };

  const Star = ({
    filled,
    onPress,
  }: {
    filled: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <MaterialIcons
        name={filled ? 'star' : 'star-border'}
        size={48}
        color={filled ? '#FFB800' : '#E0E0E0'}
        style={{ marginHorizontal: 6 }}
      />
    </TouchableOpacity>
  );

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header với ảnh + tên tour */}
        <View style={styles.header}>
          <Image source={booking.image} style={styles.tourImage} />
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <Text style={styles.tourName}>{booking.nameTour}</Text>
            <Text style={styles.tourDate}>
              <MaterialIcons name="calendar-today" size={16} />{' '}
              {booking.date.toLocaleDateString('vi-VN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Tiêu đề đánh giá */}
        <View style={styles.section}>
          <Text style={styles.title}>Bạn thấy tour này thế nào?</Text>
          <Text style={styles.subtitle}>Chạm vào sao để đánh giá</Text>

          {/* 5 ngôi sao lớn, đẹp lung linh */}
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                filled={star <= rating}
                onPress={() => setRating(star)}
              />
            ))}
          </View>

          {/* Hiển thị text tương ứng với số sao */}
          <Text style={styles.ratingText}>
            {rating === 0
              ? 'Chưa chọn'
              : rating === 1
              ? 'Rất tệ'
              : rating === 2
              ? 'Tạm được'
              : rating === 3
              ? 'Bình thường'
              : rating === 4
              ? 'Hài lòng'
              : 'Tuyệt vời!'}
          </Text>
        </View>

        {/* Ô nhập nhận xét */}
        <View style={styles.section}>
          <Text style={styles.title}>Chia sẻ trải nghiệm của bạn</Text>
          <Text style={styles.hint}>
            Bạn thích nhất điều gì? Có góp ý gì để tour tốt hơn không?
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="Viết đánh giá của bạn ở đây... (tối thiểu 15 ký tự)"
            multiline
            numberOfLines={6}
            value={comment}
            onChangeText={setComment}
            textAlignVertical="top"
          />

          <Text style={styles.charCount}>{comment.length}/1000</Text>
        </View>

        {/* Nút gửi nổi bật cố định dưới */}
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <MaterialIcons name="send" size={22} color="#fff" />
            <Text style={styles.submitText}>Gửi đánh giá ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 260,
    position: 'relative',
  },
  tourImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  tourName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  tourDate: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.9,
  },

  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
  },
  hint: {
    fontSize: 14.5,
    color: '#777',
    lineHeight: 20,
    marginBottom: 8,
  },

  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  textInput: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 13,
    color: '#999',
    marginTop: 8,
  },

  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#E91E63',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
});
