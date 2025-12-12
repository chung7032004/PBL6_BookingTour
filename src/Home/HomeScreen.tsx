import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Button,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import TourCard from './TourCard';
import { Category, TourCardProps } from '../../types/experience';
import { getCategories, getExperiences } from '../api/experiences/experiences';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { getMyWishLists } from '../api/experiences/wishlist';
import { MyWishListResponse } from '../../types/wishlist';
import WishListCard from '../WishList/WishListCard';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import images from '../../images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { categoryIcons } from '../constants/categoryIcons';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [category, setCategory] = useState<Category[] | null>(null);
  const [suggest, setSuggest] = useState<TourCardProps[]>([]);
  const [pageSuggest, setPageSuggest] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [topRated, setTopRated] = useState<TourCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wishLists, setWishLists] = useState<MyWishListResponse[]>([]);

  useEffect(() => {
    loadCategories();
    loadSuggest();
    loadWishLists();
  }, []);
  const loadCategories = async () => {
    const res = await getCategories();
    if (!res) return;
    setCategory(res);
  };
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
          {/* === DANH MỤC  === */}
          <Text style={styles.sectionTitle}>Danh mục</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {category?.map(item => {
              const iconName = categoryIcons[item.name] || 'explore';

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  style={styles.categoryItem}
                  onPress={() => {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'searchTab',
                            state: {
                              routes: [
                                {
                                  name: 'search',
                                  params: { categoryId: item.id },
                                },
                              ],
                            },
                          },
                        ],
                      }),
                    );
                  }}
                >
                  <View style={styles.iconCircle}>
                    <Icon name={iconName} size={36} color="#2563eb" />
                  </View>
                  <Text style={styles.categoryText} numberOfLines={2}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
            contentContainerStyle={styles.cardRow}
          />
          {loadingMore && <ActivityIndicator style={{ marginLeft: 10 }} />}
          {wishLists && wishLists.length > 0 && (
            <Text style={styles.sectionTitle}>Danh sách yêu thích</Text>
          )}
          <FlatList
            data={wishLists}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.wishListCard}>
                <WishListCard
                  title={item.name}
                  saved={item.experienceCount}
                  onPress={() => {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'wishListTab',
                            state: {
                              routes: [
                                { name: 'wishList' },
                                {
                                  name: 'wishListDetail',
                                  params: { wishListId: item.id },
                                },
                              ],
                              index: 1,
                            },
                          },
                        ],
                      }),
                    );
                  }}
                />
              </TouchableOpacity>
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
    paddingBottom: 10,
    paddingHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 10,
    color: '#1a1a1a',
  },

  categoriesContainer: {
    paddingLeft: 10,
    paddingVertical: 12,
  },

  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    marginRight: 18,
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ebf4ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 4,
  },

  categoryText: {
    fontSize: 13.5,
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
  cardRow: {
    paddingRight: 10,
    paddingBottom: 15,
  },
  wishListCard: { marginRight: 10 },
});
