import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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
    rating: 4.8,
    quantityRating: 128,
  },
  {
    id: 2,
    image: images.banner2,
    desc: 'Khách sạn 4 sao biển Mỹ Khê – Buffet sáng',
    price: 850000,
    rating: 4.6,
    quantityRating: 62,
  },
  {
    id: 3,
    image: images.banner3,
    desc: 'Vòng quanh Phú Quốc 2 ngày 1 đêm – Cano 6 đảo',
    price: 1350000,
    rating: 4.9,
    quantityRating: 210,
  },
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [filtered, setFiltered] = useState(fakeTours);

  const handleSearch = (keyword: string) => {
    if (!keyword.trim()) {
      setFiltered(fakeTours);
      return;
    }

    const result = fakeTours.filter(item =>
      item.desc.toLowerCase().includes(keyword.toLowerCase()),
    );

    setFiltered(result);
  };

  // Gắn searchHeader vào header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <SearchHeader onSearch={handleSearch} />,
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filtered.length > 0 ? (
        filtered.map(item => (
          <SearchCard
            key={item.id}
            image={item.image}
            price={item.price}
            rating={item.rating}
            desc={item.desc}
            quantityRating={item.quantityRating}
          />
        ))
      ) : (
        <Text style={styles.noResult}> Không tìm thấy kết quả</Text>
      )}
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    paddingBottom: 30,
    backgroundColor: '#f5f5f5',
  },
  noResult: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#666',
  },
});
