import React, { useEffect, useRef, useState } from 'react';
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
import {
  Category,
  Experience,
  Recommendation,
  TourCardProps,
} from '../../types/experience';
import {
  getCategories,
  getExperiences,
  getPopular,
  getRecommendations,
} from '../api/experiences/experiences';
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
  const [recommendations, setRecommendations] = useState<
    Recommendation[] | null
  >();
  const [totalRecommendation, setTotalRecommendation] = useState(0);
  const [totalPopular, setTotalPopular] = useState(0);
  const [popular, setPopular] = useState<Recommendation[] | null>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const skipEndReachedRef = useRef(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    await Promise.all([
      loadRecommendation(),
      loadSuggest(),
      loadCategories(),
      loadWishLists(),
    ]);
  };
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
      setPageSuggest(1);
      skipEndReachedRef.current = true;
      const res = await getExperiences(1, 10);
      if (res.messages) {
        setError(res.messages);
        return;
      }
      setSuggest(res.experiences);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const loadRecommendation = async () => {
    const res = await getRecommendations();
    if (res.experience === null) {
      if (totalPopular === 0) {
        await loadPopular();
      }
      return;
    }
    setTotalRecommendation(res.experience.total);
    setRecommendations(res.experience.recommendations);
  };
  const loadPopular = async () => {
    const res = await getPopular();
    if (res.experience === null) {
      return;
    }
    setTotalPopular(res.experience.total);
    setPopular(res.experience.popularExperiences);
  };

  const loadMoreSuggest = async () => {
    if (loadingMore) return;
    if (skipEndReachedRef.current) {
      skipEndReachedRef.current = false; // chỉ skip 1 lần
      return;
    }
    setLoadingMore(true);
    try {
      const nextPage = pageSuggest + 1;
      const res = await getExperiences(nextPage, 10);
      if (!res.experiences) {
        return;
      }
      setSuggest(prev => [...prev, ...res.experiences]);
      setPageSuggest(res?.pageNumber ? res.pageNumber : 1);
    } catch (error) {
      console.log('Load more suggest error:', error);
    } finally {
      setLoadingMore(false);
    }
  };
  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setError(null);
    setPageSuggest(1);
    setSuggest([]);

    await Promise.all([
      loadRecommendation(),
      loadSuggest(),
      loadCategories(),
      loadWishLists(),
    ]);
    setIsRefreshing(false);
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
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      renderItem={() => (
        <>
          {recommendations && totalRecommendation > 0 && (
            <>
              <Text style={styles.sectionTitle}>Recommended for you</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardRow}
              >
                {recommendations.map(recommendation => (
                  <TourCard
                    key={recommendation.experience.id}
                    {...recommendation.experience}
                  />
                ))}
              </ScrollView>
            </>
          )}
          {popular && totalPopular > 0 && totalRecommendation === 0 && (
            <>
              <Text style={styles.sectionTitle}>Popular</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardRow}
              >
                {popular.map(p => (
                  <TourCard key={p.experience.id} {...p.experience} />
                ))}
              </ScrollView>
            </>
          )}
          {/* === DANH MỤC  === */}
          {category && (
            <>
              <Text style={styles.sectionTitle}>Categories</Text>
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
            </>
          )}
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

          <Text style={styles.sectionTitle}>Featured experiences</Text>
          <FlatList
            data={suggest}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <TourCard {...item} />}
            keyExtractor={item => item.id}
            onEndReached={loadMoreSuggest}
            onEndReachedThreshold={0.4}
            contentContainerStyle={styles.cardRow}
          />
          {loadingMore && <ActivityIndicator style={{ marginLeft: 10 }} />}
          {wishLists && wishLists.length > 0 && (
            <Text style={styles.sectionTitle}>Wishlists</Text>
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
