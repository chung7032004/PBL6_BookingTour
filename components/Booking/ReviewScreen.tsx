import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

interface ReviewScreenProps {
  bookingId: number;
}

const ReviewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ params: ReviewScreenProps }, 'params'>>();
  const bookingId = route.params?.bookingId;

  const booking = {
    id: bookingId,
    nameTour: 'Khám phá phố cổ Hội An',
    image: require('../../images/banner1.jpg'),
    date: new Date(2025, 9, 10),
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Chú ý', 'Vui lòng chọn số sao đánh giá.');
      return;
    }

    Alert.alert(
      'Đánh giá thành công!',
      'Cảm ơn bạn đã chia sẻ trải nghiệm của mình.',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => {
      const filled = i < rating;
      return (
        <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
          <MaterialIcons
            name={filled ? 'star' : 'star-border'}
            size={40}
            color={filled ? '#FFD700' : '#BDBDBD'}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Thông tin tour */}
        <View style={styles.tourInfo}>
          <Image source={booking.image} style={styles.image} />
          <Text style={styles.tourName}>{booking.nameTour}</Text>
          <Text style={styles.date}>
            <MaterialIcons name="calendar-today" size={16} color="#666" />{' '}
            {booking.date.toLocaleDateString('vi-VN')}
          </Text>
        </View>

        {/* Đánh giá sao */}
        <View style={styles.ratingContainer}>
          <Text style={styles.label}>Đánh giá của bạn</Text>
          <View style={styles.starRow}>{renderStars()}</View>
        </View>

        {/* Nhận xét */}
        <View style={styles.commentBox}>
          <Text style={styles.label}>Nhận xét</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Hãy chia sẻ cảm nhận của bạn về tour..."
            multiline
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Nút gửi */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <MaterialIcons name="send" size={20} color="#fff" />
          <Text style={styles.submitText}>Gửi đánh giá</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  tourInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  tourName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    color: '#666',
    marginTop: 4,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  starRow: {
    flexDirection: 'row',
  },
  commentBox: {
    marginBottom: 20,
  },
  textInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BFA5',
    borderRadius: 30,
    paddingVertical: 12,
    marginBottom: 40,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});
