import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TourCard = ({
  id,
  image,
  title,
  price,
  rating,
  popular,
  showFavorite = false,
}: any) => {
  const navigation: NavigationProp<any> = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('tourDetail', { id })}
      activeOpacity={0.8}
    >
      {/* Ảnh tour */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.cardImage} />
        {/* Nhãn "Popular" */}
        {popular && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Popular</Text>
          </View>
        )}
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

        <Text style={styles.price}>
          Chỉ từ{' '}
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            {price.toLocaleString('vi-VN')}₫
          </Text>{' '}
          / khách
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>{rating}</Text>
          <Icon name="star" size={18} color="#FFD700" style={styles.starIcon} />
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
  price: {
    color: '#666',
    fontSize: 13,
    marginBottom: 5,
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
