import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import images from '../../images';
import CustomButton from '../component/CustomButton';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface TourCardProps {
  title: string;
  subtitle: string;
  price: string;
  rating: string;
  reviews: string;
  image: any;
  label?: string;
  onPress?: () => void;
}

const WishListDetailCard: React.FC<TourCardProps> = ({
  title,
  subtitle,
  price,
  rating,
  reviews,
  image,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Hình ảnh */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />

        {/* Nhãn "Phổ biến" */}
        {label && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{label}</Text>
          </View>
        )}

        {/* Nút tim yêu thích */}
        <TouchableOpacity style={styles.heartButton}>
          <Image source={images.favorite} style={styles.heartIcon} />
        </TouchableOpacity>
      </View>

      {/* Thông tin */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
        <Text style={styles.price}>
          {price} <Text style={styles.dot}>·</Text> ⭐ {rating} ({reviews})
        </Text>
      </View>
      <CustomButton title="Thêm ghi chú" style={{ backgroundColor: '#ccc' }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
    width: CARD_WIDTH,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1.4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: '#ff4d4d',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  dot: {
    fontWeight: 'bold',
  },
});

export default WishListDetailCard;
