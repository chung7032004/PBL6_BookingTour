import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import images from '../../images';
import TourCard from './TourCard';
import ReviewCard from './ReviewCard';
import CustomButton from '../components/CustomButton';
import ReviewModal from './modals/Review.modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProviderScreen = () => {
  const suggestData = [
    {
      id: 1,
      image: images.banner1,
      title: 'Street Food Motorbike Tour',
      rating: 4.98,
      price: '₫730,000',
      popular: true,
    },
    {
      id: 2,
      image: images.banner2,
      title: 'Hue City Tour',
      rating: 4.91,
      price: '₫650,000',
    },
    {
      id: 3,
      image: images.banner3,
      title: 'Ha Long Bay Cruise',
      rating: 5.0,
      price: '₫1,000,000',
    },
  ];

  // Fake 10 reviews
  const reviews = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Người dùng ${i + 1}`,
    avatar: images.account,
    rating: Math.floor(Math.random() * 2) + 4,
    time: `${i + 1} ngày trước`,
    content:
      'Trải nghiệm tuyệt vời, hướng dẫn viên thân thiện, cảnh đẹp và đồ ăn ngon. Rất đáng để thử!',
  }));

  const [quantityReview] = useState<number>(164);
  const [showModalReview, setShowModalReview] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={images.account} style={styles.avatar} />
          <Text style={styles.hostName}>Nguyễn Minh An</Text>
          <Text style={styles.hostRole}>Host</Text>
        </View>

        {/* Info */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{quantityReview}</Text>
            <Text style={styles.infoLabel}>Đánh giá</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.infoValue}>4.66</Text>
              <Icon
                name="star"
                size={20}
                color="#FFD700"
                style={styles.starIcon}
              />
            </View>
            <Text style={styles.infoLabel}>Xếp hạng</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>5</Text>
            <Text style={styles.infoLabel}>năm kinh nghiệm</Text>
          </View>
        </View>
      </View>
      {/* Introduction */}
      <Text style={styles.introText}>
        Thật may mắn khi được gọi là SouthEast Asia, nhà của tôi!
      </Text>

      {/* Reviews Section */}
      <Text style={styles.sectionTitle}>Đánh giá của khách</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.reviewRow}
      >
        {reviews.slice(0, 4).map(item => (
          <ReviewCard key={item.id} {...item} />
        ))}
      </ScrollView>
      <CustomButton
        title="Hiển thị thêm đánh giá "
        style={styles.button}
        textStyle={{ fontSize: 16 }}
        onPress={() => setShowModalReview(true)}
      />

      {/* Tours Section */}
      <Text style={styles.sectionTitle}>Trải nghiệm của Trần Hải Nam</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      >
        {suggestData.map(tour => (
          <TourCard key={tour.id} {...tour} />
        ))}
      </ScrollView>
      <ReviewModal
        reviews={reviews}
        onClose={() => setShowModalReview(false)}
        quantityReview={quantityReview}
        visible={showModalReview}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },

  /** Profile Card **/
  profileContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    paddingBottom: 12,
  },

  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  hostName: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  hostRole: {
    color: '#888',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoLabel: {
    color: '#666',
    marginTop: 4,
  },
  starIcon: {
    marginLeft: 4,
  },
  introText: {
    marginHorizontal: 16,
    marginTop: 8,
    color: '#444',
    lineHeight: 20,
    fontSize: 15,
  },

  /** Section styles **/
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  reviewRow: {
    paddingLeft: 16,
    paddingBottom: 25,
  },
  cardRow: {
    paddingHorizontal: 10,
    paddingBottom: 25,
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
});

export default ProviderScreen;
