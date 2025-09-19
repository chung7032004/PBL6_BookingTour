import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import images from '../../images';

const TourCard = ({
  image,
  title,
  rating,
  showFavorite = false,
  click,
}: any) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('tourDetail')}
    >
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.cardRow}>
          <Text style={{ color: '#fff' }}>{rating}</Text>
          <Image source={images.star} style={[styles.iconStar, styles.icon]} />
          {showFavorite && (
            <Image
              source={images.favorite_fill}
              style={[styles.icon, styles.iconFavorite]}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // cho Android
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 10,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  iconStar: {
    tintColor: '#FFD700',
  },
  iconFavorite: {
    tintColor: '#FF0000',
  },
});
export default TourCard;
