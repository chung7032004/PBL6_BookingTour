import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import imagesDefault from '../../images';
interface WishListCardProps {
  title: string;
  saved: number;
  image?: any;
  images?: any[];
  onPress?: () => void;
  onLongPress?: () => void;
}

const WishListCard = (props: WishListCardProps) => {
  const {
    title,
    saved,
    image = imagesDefault.activity_default,
    images,
    onPress,
    onLongPress,
  } = props;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      {/* Vùng ảnh vuông */}
      <View style={styles.imageContainer}>
        {images ? (
          <View style={styles.gridContainer}>
            {images.slice(0, 4).map((img, index) => (
              <Image key={index} source={img} style={styles.gridImage} />
            ))}
          </View>
        ) : (
          image && <Image source={image} style={styles.singleImage} />
        )}
      </View>

      {/* Nội dung */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.saved}>{saved} đã lưu</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  gridImage: {
    width: '50%',
    height: '50%',
  },
  singleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  date: {
    color: '#777',
    fontSize: 13,
    marginTop: 2,
  },
  saved: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
});

export default WishListCard;
