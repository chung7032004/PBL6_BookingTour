// SearchScreen.tsx (đã nâng cấp toàn bộ UI)
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';
import SearchHeader from './Search.header';
import SearchCard from './SearchCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import { search } from '../api/experiences/search';
import { TourCardProps } from '../../types/experience';

const SearchScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');
  const [filtered, setFiltered] = useState<TourCardProps[]>([]);

  const handleSearch = async (keyword: string) => {
    search(keyword);
    try {
      // setLoading(true);
      const res = await search(keyword);
      if (res.message) {
        // setError(res.message);
        return;
      }
      const tours = res.experiences;
      setFiltered(tours);
    } catch (error) {
      // setError('Lỗi không xác định');
    } finally {
      // setLoading(false);
    }
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
