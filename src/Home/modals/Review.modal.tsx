import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ReviewCard from '../ReviewCard';
import { Review } from '../../../types/booking';
import { getReviews } from '../../api/experiences/experiences';

interface ReviewModalProps {
  quantityReview: number;
  visible: boolean;
  onClose: () => void;
  reviews: Review[];
  experienceId: string;
}

const { width, height } = Dimensions.get('window');

const ReviewModal = ({
  quantityReview,
  visible,
  onClose,
  reviews,
  experienceId,
}: ReviewModalProps) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageReview, setPageReview] = useState(1);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);

  useEffect(() => {
    if (visible) {
      setReviewsData(reviews);
      setPageReview(1);
    }
  }, [visible, reviews]);

  const loadMoreReview = async () => {
    // Nếu đang tải, hoặc số lượng hiện tại đã đủ so với tổng số thì không tải thêm
    if (loadingMore || reviewsData.length >= quantityReview) return;

    setLoadingMore(true);
    try {
      const nextPage = pageReview + 1;
      const resReview = await getReviews(experienceId, nextPage, 10);

      const newData = resReview?.reviewResponse?.data || [];

      if (newData.length > 0) {
        setReviewsData(prev => [...prev, ...newData]);
        setPageReview(nextPage);
      }
    } catch (error) {
      console.error('Lỗi tải thêm đánh giá:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Component hiển thị vòng quay loading dưới đáy danh sách
  const renderFooter = () => {
    if (!loadingMore) return <View style={{ height: 20 }} />;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#FF5A5F" />
        <Text style={styles.footerText}>Loading...</Text>
      </View>
    );
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
            <Text style={styles.title}>{quantityReview} reviews</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Danh sách review bằng FlatList */}
          <FlatList
            data={reviewsData}
            keyExtractor={(item, index) => `${item.id}-${index}`} // Đảm bảo key duy nhất
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <ReviewCard width={width - 32} {...item} />
              </View>
            )}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            // Logic Load More
            onEndReached={loadMoreReview}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            // Trường hợp danh sách rỗng
            ListEmptyComponent={
              !loadingMore ? (
                <Text style={styles.emptyText}>No review</Text>
              ) : null
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: height * 0.85,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  reviewItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontSize: 16,
  },
});

export default ReviewModal;
