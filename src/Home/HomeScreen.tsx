import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import TourCard from './TourCard';
import { getHot, getTopRated, getTours, Tour } from '../api/fakeTours';
import { Experience, TourCardProps } from '../../types/experience';
import { getExperiences } from '../api/experiences/experiences';
import { mapExperToTourCard } from '../api/experiences/mapExperToTourCard';
import CustomButton from '../components/CustomButton';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  // const [suggest, setSuggest] = useState<Tour[]>([]);
  // const [topRated, setTopRated] = useState<Tour[]>([]);
  // const [hot, setHot] = useState<Tour[]>([]);

  // useEffect(() => {
  // loadData();
  // }, []);
  // const loadData = async () => {
  // const suggestData = await getTours();
  // const topRatedData = await getTopRated();
  // const hotData = await getHot();

  // setSuggest(suggestData.slice(0, 10));
  // setTopRated(topRatedData);
  // setHot(hotData);
  // };

  const [suggest, setSuggest] = useState<TourCardProps[]>([]);
  const [topRated, setTopRated] = useState<TourCardProps[]>([]);
  const [hot, setHot] = useState<TourCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getExperiences(1, 10);
      if (res.messages) {
        setError(res.messages);
        return;
      }

      const tours = mapExperToTourCard(res.experiences);
      setSuggest(tours);
    } catch (error) {
      setError('Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingView />;
  }
  if (error) {
    return (
      <ErrorView
        message={error}
        onPress={() => {
          setError(null);
          loadData();
        }}
      />
    );
  }
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      >
        {/* {suggest.map(tour => (<TourCard key={tour.id} {...tour} />))} */}
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
