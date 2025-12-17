// SearchScreen.tsx (đã nâng cấp toàn bộ UI)
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import SearchHeader from './Search.header';
import SearchCard from './SearchCard';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import { search } from '../api/experiences/search';
import { Category, TourCardProps } from '../../types/experience';
import LoadingOverlay from '../components/LoadingOverlay';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { categoryIcons } from '../constants/categoryIcons';
import { getCategories } from '../api/experiences/experiences';

const SearchScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'search'> = useRoute();
  const categoryId = route.params?.categoryId;
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category[] | null>(null);
  // const [error, setError] = useState('');
  const [filtered, setFiltered] = useState<TourCardProps[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    categoryId ? [categoryId] : [],
  );
  const [currentKeyword, setCurrentKeyword] = useState<string>('');

  const handleSearch = useCallback(
    async (keyword: string) => {
      const trimmed = keyword.trim();
      setCurrentKeyword(trimmed);
      try {
        setLoading(true);
        const res = await search(keyword, 1, 10, selectedCategoryIds);
        if (res.message) {
          // setError(res.message);
          return;
        }
        const tours = res.experiences;
        setFiltered(tours);
      } catch (error) {
        // setError('Lỗi không xác định');
      } finally {
        setLoading(false);
      }
    },
    [selectedCategoryIds],
  );
  const toggleCategorySelection = useCallback((categoryId: string) => {
    setSelectedCategoryIds(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId],
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SearchHeader onSearch={handleSearch} />,
      headerStyle: { backgroundColor: '#fff' },
    });
  }, [navigation]);
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = async () => {
    const res = await getCategories();
    if (!res) return;
    setCategory(res);
  };
  useEffect(() => {
    handleSearch(currentKeyword);
  }, [selectedCategoryIds]);

  const categoriesUI = useMemo(() => {
    return category?.map(item => {
      const iconName = categoryIcons[item.name] || 'explore';
      const isSelected = selectedCategoryIds.includes(item.id);

      return (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          style={styles.categoryItem}
          onPress={() => toggleCategorySelection(item.id)}
        >
          <View
            style={[
              styles.outerCircle,
              isSelected && styles.outerCircleSelected,
            ]}
          >
            {/* Icon Circle */}
            <View
              style={[
                styles.iconCircle,
                isSelected && styles.iconCircleSelected,
              ]}
            >
              <Icon
                name={iconName}
                size={30}
                color={isSelected ? '#fff' : '#2563eb'}
              />
            </View>
            {/* Tick */}
            {isSelected && (
              <View style={styles.tickContainer}>
                <Icon name="check-circle" size={18} color="#2563eb" />
              </View>
            )}
          </View>

          <Text style={styles.categoryText} numberOfLines={2}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    });
  }, [category, selectedCategoryIds, toggleCategorySelection]);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categoriesUI}
      </ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filtered.length > 0 ? (
          filtered.map(item => <SearchCard key={item.id} {...item} />)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Not found experience</Text>
            <Text style={styles.emptySubText}>
              Please try a different keyword!
            </Text>
          </View>
        )}
      </ScrollView>
      <LoadingOverlay visible={loading} message={'Searching ...'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    marginTop: 0,
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
  categoriesContainer: {
    paddingLeft: 5,
    paddingVertical: 20,
  },

  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    marginRight: 18,
  },
  outerCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  outerCircleSelected: {
    borderColor: '#2563eb',
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#ebf4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconCircleSelected: {
    backgroundColor: '#2563eb',
  },

  tickContainer: {
    position: 'absolute',
    top: -2,
    left: -2,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 13.5,
    color: '#1f2937',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
});

export default SearchScreen;
