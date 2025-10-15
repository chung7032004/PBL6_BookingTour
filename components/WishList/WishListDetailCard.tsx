import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
import NotepadModal from './Note.modal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface TourCardProps {
  title: string;
  subtitle: string;
  price: number;
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
  const [showModalNote, setShowModalNote] = useState(false);
  const [note, setNote] = useState('');
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
          <Icon
            name="favorite-border"
            size={24}
            color="#ff4d4d"
            style={styles.favoriteIcon}
          />
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.price}>
            Chỉ từ {price.toLocaleString('vi-VN')}₫ /khách{' '}
            <Text style={styles.dot}>·</Text>
          </Text>
          <Text style={styles.price}> {rating} </Text>
          <Icon name="star" size={16} color="#FFD700" style={styles.starIcon} />
          <Text style={styles.price}> ({reviews})</Text>
        </View>
      </View>
      <CustomButton
        title="Thêm ghi chú"
        style={{ backgroundColor: '#ccc' }}
        onPress={() => setShowModalNote(true)}
      />
      <NotepadModal
        visible={showModalNote}
        onClose={() => setShowModalNote(false)}
        onSave={text => setNote(text)}
        title="Thêm ghi chú"
        initialValue={note}
      />
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
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
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
    alignItems: 'center',
    alignContent: 'center',
  },
  dot: {
    fontWeight: 'bold',
  },
  starIcon: {
    marginLeft: 1,
  },
});

export default WishListDetailCard;
