// SearchScreen.tsx (đã nâng cấp toàn bộ UI)
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';
import SearchHeader from './Search.header';
import SearchCard from './SearchCard';
import images from '../../images';
import { useNavigation } from '@react-navigation/native';

const fakeTours = [
  {
    id: 1,
    image: images.banner1,
    desc: 'Tour Đà Nẵng – Hội An – Bà Nà Hills 3N2Đ',
    price: 1690000,
    originalPrice: 2490000,
    rating: 4.8,
    quantityRating: 128,
    isHot: true,
  },
  {
    id: 2,
    image: images.banner2,
    desc: 'Khách sạn 4 sao biển Mỹ Khê – Buffet sáng',
    price: 850000,
    originalPrice: 1200000,
    rating: 4.6,
    quantityRating: 62,
    isHot: false,
  },
  {
    id: 3,
    image: images.banner3,
    desc: 'Vòng quanh Phú Quốc 2 ngày 1 đêm – Cano 6 đảo',
    price: 1350000,
    originalPrice: 1890000,
    rating: 4.9,
    quantityRating: 210,
    isHot: true,
  },
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [filtered, setFiltered] = useState(fakeTours);

  const handleSearch = (keyword: string) => {
    const key = keyword.trim().toLowerCase();
    if (!key) return setFiltered(fakeTours);

    setFiltered(fakeTours.filter(t => t.desc.toLowerCase().includes(key)));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SearchHeader onSearch={handleSearch} />,
      headerStyle: { backgroundColor: '#fff' },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filtered.length > 0 ? (
          filtered.map(item => <SearchCard key={item.id} {...item} />)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không tìm thấy tour nào</Text>
            <Text style={styles.emptySubText}>Hãy thử từ khóa khác nhé!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
});

export default SearchScreen;
