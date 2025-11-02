import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import images from '../../images';
import TourCard from './TourCard';
import { getHot, getTopRated, getTours, Tour } from '../api/fakeTours';

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

const HomeScreen = () => {
  const [suggest, setSuggest] = useState<Tour[]>([]);
  const [topRated, setTopRated] = useState<Tour[]>([]);
  const [hot, setHot] = useState<Tour[]>([]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const suggestData = await getTours();
    const topRatedData = await getTopRated();
    const hotData = await getHot();

    setSuggest(suggestData.slice(0, 10));
    setTopRated(topRatedData);
    setHot(hotData);
  };
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Nổi bật */}
      {/*       
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
      </ScrollView> */}

      {/* Gợi ý cho bạn */}

      <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      >
        {suggest.map(tour => (
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
        {topRated.map(tour => (
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
        {hot.map(tour => (
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
