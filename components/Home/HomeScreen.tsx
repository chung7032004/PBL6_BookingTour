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
import TourCard from './TourCard';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
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
      <Text style={styles.sectionTitle}>Trải nghiệm</Text>
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
          <Text>Thiên nhiên </Text>
        </View>
        <View style={styles.category}>
          <Image source={images.workshop} style={styles.categoryIcon} />
          <Text>Workshop</Text>
        </View>
      </ScrollView>

      {/* Trải nghiệm gợi ý */}
      <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
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
      <Text style={styles.sectionTitle}>Đánh giá cao</Text>
      <TourCard image={images.banner3} title="Tour Hạ Long" rating="5.0" />

      {/* Gần bạn */}
      <Text style={styles.sectionTitle}>Hot</Text>
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
    width: 55,
    height: 55,
    marginBottom: 5,
    borderRadius: 30,
  },
});

export default HomeScreen;
