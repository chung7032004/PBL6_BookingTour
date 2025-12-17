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

import NoteDisplayModal from './modals/NoteDisplay.modal';
import NoteModal from './modals/Note.modal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface NoteItem {
  userId: string;
  text: string;
}
interface TourCardProps {
  title: string;
  subtitle: string;
  price: number;
  rating: string;
  reviews: string;
  image: any;
  label?: string;
  onPress?: () => void;
  onLongPress?: () => void;
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
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      {/* Ảnh */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        {label && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{label}</Text>
          </View>
        )}
        {/*
        {/* Chỉ để trang trí */}
        <View style={styles.heartButton}>
          <Icon name="favorite" size={28} color={'#ff4d4d'} />
        </View>
      </View>

      {/* Thông tin */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>From </Text>
          <Text style={styles.mainPrice}>{price.toLocaleString('vi-VN')}</Text>
          <Text style={styles.priceUnit}> VND/Guest</Text>
          {/* <Text style={styles.dot}>·</Text>
          <Text style={styles.price}> {rating} </Text>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.price}> ({reviews})</Text> */}
        </View>
      </View>
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
  imageContainer: { position: 'relative', width: '100%', aspectRatio: 1.4 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#333' },
  heartButton: { position: 'absolute', top: 10, right: 10 },
  infoContainer: { padding: 12 },
  title: { fontSize: 16, fontWeight: '600', color: '#000' },
  subtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  price: { fontSize: 13, color: '#555' },
  dot: { marginHorizontal: 3, fontWeight: 'bold', color: '#777' },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  /** Ghi chú */
  noteSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  noteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  noteButtonText: {
    fontSize: 13,
    color: '#222',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#e6f0ff',
    padding: 8,
    borderRadius: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline', // Căn chỉnh các phần tử theo đường cơ sở chữ
    marginTop: 6,
  },
  priceLabel: {
    fontSize: 13,
    color: '#777', // Màu xám nhẹ cho chữ 'From'
    fontWeight: '400',
  },
  mainPrice: {
    fontSize: 18, // Kích thước lớn hơn
    fontWeight: '700', // In đậm hơn
    color: '#e63946', // Màu đen nổi bật
    marginHorizontal: 2,
  },
  priceUnit: {
    fontSize: 13,
    color: '#777', // Màu xám nhẹ cho đơn vị
    fontWeight: '400',
  },
});

export default WishListDetailCard;
