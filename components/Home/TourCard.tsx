import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import images from '../../images';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const TourCard = ({
  image,
  title,
  price,
  rating,
  popular,
  showFavorite = true,
}: any) => {
  const navigation: NavigationProp<any> = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('tourDetail')}
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
          <Image source={images.favorite} style={styles.favoriteIcon} />
        )}
      </View>

      {/* Nội dung dưới ảnh */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <Text style={styles.price}>
          From{' '}
          <Text style={{ color: '#000', fontWeight: 'bold' }}>{price}</Text> /
          guest
        </Text>

        <View style={styles.ratingRow}>
          <Image source={images.star} style={styles.starIcon} />
          <Text style={styles.ratingText}>{rating}</Text>
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
    width: 22,
    height: 22,
    tintColor: '#ff4d4d',
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
    width: 16,
    height: 16,
    tintColor: '#FFD700',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#333',
  },
});

export default TourCard;
