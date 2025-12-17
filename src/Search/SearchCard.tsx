import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TourCardProps } from '../../types/experience';
import { RootStackParamList } from '../../types/route';

const SearchCard = (props: TourCardProps) => {
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
  console.log(id);
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const imageUrl = media?.[0]?.url || 'https://placehold.co/600x400';
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'homeTab',
                state: {
                  routes: [
                    { name: 'home' },
                    {
                      name: 'tourDetail',
                      params: { id: id },
                    },
                  ],
                  index: 1,
                },
              },
            ],
          }),
        )
      }
    >
      <Image source={{ uri: imageUrl }} style={styles.thumbnail} />

      <View style={styles.right}>
        <Text style={styles.desc} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.ratingRow}>
          <MaterialIcon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{averageRating.toFixed(1)}</Text>
          <Text style={styles.count}>({totalReviews} reviews)</Text>
        </View>

        <Text style={styles.price}>
          From{' '}
          <Text style={styles.priceValue}>
            {adultPrice.toLocaleString('vi-VN')} VND
          </Text>{' '}
          / Guests
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
