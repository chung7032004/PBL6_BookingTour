import { useNavigation } from '@react-navigation/native';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types/route';

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
  const id = 1;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('tourDetail', { id })}
    >
      <Image source={image} style={styles.thumbnail} />

      <View style={styles.rightContent}>
        <Text style={styles.desc} numberOfLines={2}>
          {desc}
        </Text>

        <View style={styles.ratingRow}>
          <MaterialIcon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.ratingCount}>({quantityRating})</Text>
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
    borderRadius: 12,
    padding: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },

  rightContent: {
    flex: 1,
    justifyContent: 'space-between',
  },

  desc: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  rating: {
    color: '#000',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 14,
  },

  ratingCount: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666',
  },

  price: {
    color: '#444',
    fontSize: 14,
    marginTop: 6,
  },

  priceValue: {
    color: '#000',
    fontWeight: '700',
  },
});
