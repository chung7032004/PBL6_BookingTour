import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TourCardProps } from '../../types/experience';
import { RootStackParamList } from '../../types/route';
import { formatDuration } from '../api/experiences/experiences';

const TourCard = (props: TourCardProps) => {
  const {
    id,
    title,
    description,
    maxParticipants,
    address,
    category,
    adultPrice,
    childPrice,
    duration,
    averageRating = 0,
    totalReviews = 0,
    media,
  } = props;

  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const imageUrl =
    media?.[0]?.url || 'https://placehold.co/600x400/4285F4/ffffff?text=Tour';
  const durationFormat = formatDuration(duration);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('tourDetail', { id })}
      activeOpacity={0.85}
    >
      {/* Ảnh + overlay + rating badge */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Gradient overlay nhẹ ở dưới ảnh */}
        <View style={styles.overlay} />

        {/* Rating badge trên ảnh */}
        {averageRating > 0 && (
          <View style={styles.ratingBadge}>
            <Icon name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingBadgeText}>
              {averageRating.toFixed(1)}
            </Text>
          </View>
        )}

        {/* Thời gian tour */}
        <View style={styles.durationBadge}>
          <Icon name="access-time" size={12} color="#fff" />
          <Text style={styles.durationBadgeText}>{durationFormat}</Text>
        </View>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        {/* Category */}
        <Text style={styles.category}>{category?.name || 'Explore'}</Text>

        {/* Tiêu đề */}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {/* Địa chỉ */}
        <View style={styles.locationRow}>
          <Icon name="location-on" size={14} color="#888" />
          <Text style={styles.location} numberOfLines={1}>
            {address}
          </Text>
        </View>

        {/* Giá + số chỗ còn lại (nếu có) */}
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.price}>
              {adultPrice.toLocaleString('vi-VN')} VND
            </Text>
            <Text style={styles.perPerson}>/adult</Text>
          </View>

          {/* Số chỗ còn lại (tuỳ chọn) */}
          {maxParticipants && maxParticipants <= 10 && (
            <View style={styles.seatsLeft}>
              <Text style={styles.seatsLeftText}>
                Only {maxParticipants} spots left
              </Text>
            </View>
          )}
        </View>

        {/* Tổng review nhỏ dưới cùng */}
        {totalReviews > 0 && (
          <Text style={styles.reviewText}>{totalReviews} reviews</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  imageWrapper: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },
  durationBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    padding: 14,
  },
  category: {
    fontSize: 11,
    color: '#0066cc',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 22,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 11,
    color: '#888',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#e63946',
  },
  perPerson: {
    fontSize: 11,
    color: '#888',
  },
  seatsLeft: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  seatsLeftText: {
    fontSize: 11,
    color: '#c62828',
    fontWeight: '600',
  },
  reviewText: {
    fontSize: 11,
    color: '#999',
    marginTop: 8,
  },
});

export default TourCard;
