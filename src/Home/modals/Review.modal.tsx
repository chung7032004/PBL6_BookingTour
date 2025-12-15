import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReviewCard from '../ReviewCard';
import CustomButton from '../../components/CustomButton';
import { Review } from '../../../types/booking';

interface ReviewModalProps {
  quantityReview: number;
  visible: boolean;
  onClose: () => void;
  reviews: Review[];
}
const { width } = Dimensions.get('window');

const ReviewModal = ({
  quantityReview,
  visible,
  onClose,
  reviews,
}: ReviewModalProps) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const displayedReviews = reviews.slice(0, visibleCount);
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, reviews.length)); // tăng thêm 4, nhưng không vượt quá tổng
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{quantityReview} đánh giá</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Danh sách review */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.reviewList}
          >
            {displayedReviews.map(item => (
              <View key={item.id} style={styles.reviewItem}>
                <ReviewCard width={width - 20} {...item} />
              </View>
            ))}

            {/* Nút "Hiển thị thêm" chỉ hiện nếu còn review chưa hiển thị */}
            {visibleCount < reviews.length && (
              <CustomButton
                title="Hiển thị thêm đánh giá"
                onPress={handleLoadMore}
                style={styles.button}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '85%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 22,
    color: '#666',
  },
  reviewList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  reviewItem: {
    marginBottom: 14,
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
});

export default ReviewModal;
