import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    averageRating,
    totalReviews,
    media,
  } = props;
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const imageUrl = media?.[0]?.url || 'https://placehold.co/600x400';
  const durationFormat = formatDuration(duration);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('tourDetail', { id })}
      activeOpacity={0.8}
    >
      {/* Ảnh tour */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        {/*{popular && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Popular</Text>
          </View>
        )} */}
        {/* Icon yêu thích 
        {showFavorite && (
          <Icon
            name="favorite-border"
            size={22}
            color="#ff4d4d"
            style={styles.favoriteIcon}
          />
        )}
          */}
      </View>

      {/* Nội dung dưới ảnh */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.category}>{category?.name}</Text>
        <Text style={styles.location} numberOfLines={2}>
          {address}
        </Text>
        <Text style={styles.price}>
          Chỉ từ{' '}
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            {adultPrice.toLocaleString('vi-VN')}₫
          </Text>{' '}
          / khách
        </Text>
        <Text style={styles.duration}>{durationFormat}</Text>

        <View style={styles.ratingRow}>
          <Icon name="star" size={18} color="#FFD700" style={styles.starIcon} />
          <Text style={styles.ratingText}>
            {averageRating} ({totalReviews} đánh giá)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: '#777',
  },
  price: {
    color: '#666',
    fontSize: 13,
    marginBottom: 5,
  },
  duration: {
    fontSize: 12,
    color: '#444',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginLeft: 0,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 13,
    color: '#333',
  },
  category: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
    marginBottom: 3,
  },
});

export default TourCard;
