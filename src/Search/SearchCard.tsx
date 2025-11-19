import { useNavigation } from '@react-navigation/native';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface SearchCardProps {
  image: any;
  price: number;
  rating: number;
  desc: string;
  quantityRating: number;
}

const SearchCard = ({
  image,
  price,
  rating,
  desc,
  quantityRating,
}: SearchCardProps) => {
  const navigation = useNavigation<any>();
  const id = 'a2b5d37e-bd40-447e-b7b6-b8351313f4ef';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('tourDetail', { id })}
    >
      <Image source={image} style={styles.thumbnail} />

      <View style={styles.right}>
        <Text style={styles.desc} numberOfLines={2}>
          {desc}
        </Text>

        <View style={styles.ratingRow}>
          <MaterialIcon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.count}>({quantityRating})</Text>
        </View>

        <Text style={styles.price}>
          Chỉ từ{' '}
          <Text style={styles.priceValue}>
            {price.toLocaleString('vi-VN')}₫
          </Text>{' '}
          / khách
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  thumbnail: {
    width: 78,
    height: 78,
    borderRadius: 10,
    marginRight: 12,
  },

  right: {
    flex: 1,
  },

  desc: {
    fontSize: 15.5,
    color: '#000',
    fontWeight: '600',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  rating: {
    marginLeft: 4,
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },

  count: {
    fontSize: 13,
    marginLeft: 4,
    color: '#666',
  },

  price: {
    marginTop: 6,
    fontSize: 14,
    color: '#444',
  },

  priceValue: {
    fontWeight: '700',
    color: '#000',
  },
});
