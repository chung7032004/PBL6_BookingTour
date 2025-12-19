import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import BookingCard from './BookingCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { RootStackParamList } from '../../types/route';
import { Booking } from '../../types/booking';
import { getMyBooking } from '../api/experiences/booking';

const BookingListScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [filter, setFilter] = useState('All');
  const [bookings, setBooking] = useState<Booking[]>([]);
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'bookingTab',
      params: { screen: 'bookingListScreen' },
    });
  };
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorType, setErrorType] = useState<
    'NOT_LOGGED_IN' | 'FETCH_FAILED' | null
  >(null);
  useFocusEffect(
    useCallback(() => {
      loadBooking();
    }, []),
  );
  const loadBooking = async () => {
    setLoading(true);
    const res = await getMyBooking();
    if (!res.bookingResponse && res.errorType) {
      setErrorType(res.errorType);
      setErrorMsg(res.message);
    } else {
      setBooking(res.bookingResponse.data);
    }
    setLoading(false);
  };
  if (loading) {
    return <LoadingView message="Loading list booking..." />;
  }
  if (errorType === 'FETCH_FAILED') {
    return (
      <ErrorView
        message={errorMsg}
        onPress={loadBooking}
        textButton="Reload page"
      />
    );
  }
  if (errorType === 'NOT_LOGGED_IN') {
    return (
      <ErrorView message={errorMsg} onPress={handleLogin} textButton="Login" />
    );
  }
  const filters = ['All', 'Confirmed', 'Cancelled', 'Completed'];
  const filteredBookings =
    filter === 'All' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <View style={styles.container}>
      {/* Thanh lọc trạng thái */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.activeFilter]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.activeFilterText,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Danh sách booking */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map(b => (
            <TouchableOpacity
              key={b.id}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('bookingDetail', { bookingId: b.id })
              }
            >
              {b.status !== 'Pending' && <BookingCard {...b} />}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="hourglass-empty" size={50} color="#aaa" />
            <Text style={styles.emptyText}>No bookings found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BookingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterContainer: {
    flexGrow: 0,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#00BFA5',
  },
  filterText: {
    color: '#333',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
});
