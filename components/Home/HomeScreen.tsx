import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import images from '../../images';

const { width } = Dimensions.get('window');

const TourCard = ({ image, title, rating, showFavorite = false }: any) => (
  <TouchableOpacity style={styles.card}>
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

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <ScrollView style={styles.container}>
      {/* Banner nổi bật */}
      <Text style={styles.sectionTitle}>Nổi bật</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Image source={images.banner1} style={styles.banner} />
        <Image source={images.banner2} style={styles.banner} />
        <Image source={images.banner3} style={styles.banner} />
        <Image source={images.banner4} style={styles.banner} />
      </ScrollView>

      {/* Danh mục trải nghiệm */}
      <Text style={styles.sectionTitle}>Danh mục trải nghiệm</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        <View style={styles.category}>
          <Image source={images.food} style={styles.categoryIcon} />
          <Text>Ẩm thực</Text>
        </View>
        <View style={styles.category}>
          <Image source={images.culture} style={styles.categoryIcon} />
          <Text>Văn hóa</Text>
        </View>
        <View style={styles.category}>
          <Image source={images.nature} style={styles.categoryIcon} />
          <Text>Thiên nhiên</Text>
        </View>
        <View style={styles.category}>
          <Image source={images.workshop} style={styles.categoryIcon} />
          <Text>Workshop</Text>
        </View>
      </ScrollView>

      {/* Trải nghiệm gợi ý */}
      <Text style={styles.sectionTitle}>Trải nghiệm gợi ý cho bạn</Text>
      <TourCard
        image={images.banner1}
        title="Tour Đà Nẵng"
        rating="5.0"
        showFavorite
      />
      <TourCard
        image={images.banner2}
        title="Tour Huế"
        rating="4.8"
        showFavorite
      />

      {/* Top đánh giá cao */}
      <Text style={styles.sectionTitle}>Top đánh giá cao</Text>
      <TourCard image={images.banner3} title="Tour Hạ Long" rating="5.0" />

      {/* Gần bạn */}
      <Text style={styles.sectionTitle}>Gần bạn</Text>
      <TourCard image={images.banner4} title="Tour Hội An" rating="4.9" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  banner: {
    width: width * 0.8,
    height: 150,
    borderRadius: 15,
    marginRight: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  category: {
    flex: 1,
    alignItems: 'center',
    padding: 7,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
    borderRadius: 30,
  },
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

export default HomeScreen;
