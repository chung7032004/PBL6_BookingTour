import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import images from '../../images';
import TourCard from './TourCard';

const { width } = Dimensions.get('window');

const highlightData = [
  images.banner1,
  images.banner2,
  images.banner3,
  images.banner4,
];

const categoryData = [
  { id: 1, icon: images.food, name: 'Ẩm thực' },
  { id: 2, icon: images.culture, name: 'Văn hóa' },
  { id: 3, icon: images.nature, name: 'Thiên nhiên' },
  { id: 4, icon: images.workshop, name: 'Workshop' },
];

const suggestData = [
  {
    id: 1,
    image: images.banner1,
    title: 'Street Food Motorbike Tour',
    rating: 4.98,
    price: '₫730,000',
    popular: true,
  },
  {
    id: 2,
    image: images.banner2,
    title: 'Hue City Tour',
    rating: 4.91,
    price: '₫650,000',
  },
  {
    id: 3,
    image: images.banner3,
    title: 'Ha Long Bay Cruise',
    rating: 5.0,
    price: '₫1,000,000',
  },
];

const topRatedData = [
  {
    id: 4,
    image: images.banner4,
    title: 'Tour Hạ Long',
    rating: 5.0,
    price: '₫950,000',
  },
  {
    id: 5,
    image: images.banner1,
    title: 'Tour Phú Quốc',
    rating: 4.9,
    price: '₫880,000',
  },
];

const hotData = [
  {
    id: 6,
    image: images.banner2,
    title: 'Tour Hội An',
    rating: 4.9,
    price: '₫870,000',
  },
  {
    id: 7,
    image: images.banner3,
    title: 'Tour Sài Gòn đêm',
    rating: 4.95,
    price: '₫750,000',
  },
];

// ======================
// 📱 COMPONENT CHÍNH
// ======================
const HomeScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Nổi bật */}
      <Text style={styles.sectionTitle}>Nổi bật</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bannerContainer}
      >
        {highlightData.map((img, index) => (
          <Image key={index} source={img} style={styles.banner} />
        ))}
      </ScrollView>

      {/* Trải nghiệm */}
      <Text style={styles.sectionTitle}>Trải nghiệm</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categoryData.map(item => (
          <View key={item.id} style={styles.category}>
            <Image source={item.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Gợi ý cho bạn */}
      <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      >
        {suggestData.map(tour => (
          <TourCard key={tour.id} {...tour} />
        ))}
      </ScrollView>

      {/*  Đánh giá cao */}
      <Text style={styles.sectionTitle}>Đánh giá cao</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      >
        {topRatedData.map(tour => (
          <TourCard key={tour.id} {...tour} />
        ))}
      </ScrollView>

      {/* Hot */}
      <Text style={styles.sectionTitle}>Hot</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      >
        {hotData.map(tour => (
          <TourCard key={tour.id} {...tour} />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  bannerContainer: {
    paddingRight: 10,
    paddingBottom: 10,
  },
  banner: {
    width: width * 0.8,
    height: 150,
    borderRadius: 15,
    marginRight: 10,
  },
  categoriesContainer: {
    paddingRight: 10,
    paddingBottom: 15,
  },
  category: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
    borderRadius: 30,
  },
  categoryName: {
    fontSize: 13,
    color: '#333',
  },
  cardRow: {
    paddingRight: 10,
    paddingBottom: 25,
  },
});
