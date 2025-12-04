import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Button,
} from 'react-native';
import TourCard from './TourCard';
import { TourCardProps } from '../../types/experience';
import { getExperiences } from '../api/experiences/experiences';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { getMyWishLists } from '../api/experiences/wishlist';
import { MyWishListResponse } from '../../types/wishlist';
import WishListCard from '../WishList/WishListCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import images from '../../images';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [suggest, setSuggest] = useState<TourCardProps[]>([]);
  const [pageSuggest, setPageSuggest] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [topRated, setTopRated] = useState<TourCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wishLists, setWishLists] = useState<MyWishListResponse[]>([]);
  useEffect(() => {
    loadSuggest();
    loadWishLists();
  }, []);
  const loadWishLists = async () => {
    const res = await getMyWishLists();
    if (res?.message) {
      return;
    }
    setWishLists(res?.myWishList ? res.myWishList : []);
  };
  const loadSuggest = async () => {
    try {
      setLoading(true);
      const res = await getExperiences(pageSuggest, 10);
      if (res.messages) {
        setError(res.messages);
        return;
      }
      const tours = res.experiences;
      setSuggest(tours);
    } catch (error) {
      setError('Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };
  const loadMoreSuggest = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const nextPage = pageSuggest + 1;
      const res = await getExperiences(nextPage, 10);
      if (res.messages) {
        return;
      }
      setSuggest(prev => [...prev, ...res.experiences]);
      setPageSuggest(nextPage);
    } catch (error) {
      console.log('Load more suggest error:', error);
    } finally {
      setLoadingMore(false);
    }
  };
  if (loading) {
    return <LoadingView />;
  }
  if (error) {
    return (
      <>
        <ErrorView
          message={error}
          onPress={() => {
            setError(null);
            loadSuggest();
          }}
        />
        <Button
          title="thanh toan"
          onPress={() => {
            navigation.navigate('paymentScreen', {
              experienceId: '64b8f3f9677f4b001c3e4f5a',
              tourName: 'chung',
              image: images.banner1,
              slot: {
                date: '2023-10-01',
                startTime: '10:00',
                endTime: '12:00',
                spotsAvailable: 5,
              },
              adultPrice: 100,
              childPrice: 500,
              quantity: { adult: 2, children: 3, total: 5 },
              total: 1700,
            });
          }}
        />
      </>
    );
  }
  return (
    <FlatList
      data={[1]}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <>
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
          {topRated.length > 0 && (
            <>
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
            </>
          )}

          <Text style={styles.sectionTitle}>Trải nghiệm nổi bật</Text>
          <FlatList
            data={suggest}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <TourCard {...item} />}
            keyExtractor={item => item.id}
            onEndReached={loadMoreSuggest}
            onEndReachedThreshold={0.2}
          />
          {loadingMore && <ActivityIndicator style={{ marginLeft: 10 }} />}
          <Text style={styles.sectionTitle}>Danh sách yêu thích</Text>
          <FlatList
            data={wishLists}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <WishListCard
                title={item.name}
                saved={item.experienceCount}
                onPress={() =>
                  navigation.navigate('wishListDetail', { wishListId: item.id })
                }
              />
            )}
            keyExtractor={item => item.id}
          />
        </>
      )}
      contentContainerStyle={styles.scrollContent}
    />
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
    paddingBottom: 80,
    paddingHorizontal: 10,
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
    paddingBottom: 15,
  },
});
