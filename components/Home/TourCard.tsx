import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TourCardProps } from '../../types/experience';
import { RootStackParamList } from '../../types/route';

const TourCard = ({
  id,
  image,
  title,
  location,
  price,
  duration,
  cancellation,
  activityLevel,
  showFavorite = false,
}: TourCardProps) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('tourDetail', { id })}
      activeOpacity={0.8}
    >
      {/* Ảnh tour */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        {/*{popular && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Popular</Text>
          </View>
        )} */}
        {/* Icon yêu thích */}
        {showFavorite && (
          <Icon
            name="favorite-border"
            size={22}
            color="#ff4d4d"
            style={styles.favoriteIcon}
          />
        )}
      </View>

      {/* Nội dung dưới ảnh */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {location}
        </Text>

        <Text style={styles.price}>
          Chỉ từ{' '}
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            {price.toLocaleString('vi-VN')}₫
          </Text>{' '}
          / khách
        </Text>
        <Text style={styles.duration}>{duration}</Text>

        {cancellation && (
          <Text style={styles.cancellation}>{cancellation}</Text>
        )}

        {activityLevel && (
          <Text style={styles.level}>Độ hoạt động: {activityLevel}</Text>
        )}

        {/* <View style={styles.ratingRow}> */}
        {/* <Text style={styles.ratingText}>{rating}</Text> */}
        {/* <Icon name="star" size={18} color="#FFD700" style={styles.starIcon} /> */}
        {/* </View> */}
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
  cancellation: {
    marginTop: 2,
    fontSize: 12,
    color: '#28a745',
    fontWeight: '500',
  },
  level: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginLeft: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#333',
  },
});

export default TourCard;
