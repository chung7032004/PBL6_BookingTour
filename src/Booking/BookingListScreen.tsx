import React, { useEffect, useState } from 'react';
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
import images from '../../images';
import { checkLoginAndRole } from '../api/auth/login';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { RootStackParamList } from '../../types/route';

const BookingListScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [filter, setFilter] = useState('Tất cả');

  const { loading, error } = useAuthGuard();
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'bookingTab',
      params: { screen: 'bookingListScreen' },
    });
  };
  // if (loading) {
  //   return <LoadingView message="Đang kiểm tra đăng nhập ..." />;
  // }
  // if (error) {
  //   return (
  //     <ErrorView
  //       textButton="Đăng nhập"
  //       message={error}
  //       onPress={() => {
  //         handleLogin();
  //       }}
  //     />
  //   );
  // }
  // === Dữ liệu demo ===
  // const bookings: any[] = []; // danh sách rỗng để hiển thị "Không có booking nào"
  const bookings = [
    {
      id: 1,
      nameTour: 'Khám phá phố cổ Hội An',
      image: images.banner1,
      date: new Date(2025, 9, 10),
      quantity: { adult: 2, children: 1, total: 3 },
      total: 1800000,
      status: 'Đã xác nhận',
    },
    {
      id: 2,
      nameTour: 'Trải nghiệm Bà Nà Hills',
      image: images.banner2,
      date: new Date(2025, 9, 20),
      quantity: { adult: 1, children: 0, total: 1 },
      total: 1200000,
      status: 'Đang xử lý',
    },
    {
      id: 3,
      nameTour: 'Tour khám phá Đà Lạt',
      image: images.banner3,
      date: new Date(2025, 8, 15),
      quantity: { adult: 2, children: 2, total: 4 },
      total: 3500000,
      status: 'Đã hủy',
    },
    {
      id: 4,
      nameTour: 'Tour khám phá Đà Lạt',
      image: images.banner3,
      date: new Date(2025, 8, 15),
      quantity: { adult: 2, children: 2, total: 4 },
      total: 3500000,
      status: 'Hoàn thành',
    },
  ];

  const filters = [
    'Tất cả',
    'Đã xác nhận',
    'Đang xử lý',
    'Đã hủy',
    'Hoàn thành',
  ];
  const filteredBookings =
    filter === 'Tất cả' ? bookings : bookings.filter(b => b.status === filter);

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
                navigation.navigate('bookingDetail', {
                  booking: {
                    ...b,
                    date: b.date.toISOString(),
                  },
                })
              }
            >
              <BookingCard
                nameTour={b.nameTour}
                image={b.image}
                date={b.date}
                quantity={b.quantity}
                total={b.total}
                status={b.status}
              />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="hourglass-empty" size={50} color="#aaa" />
            <Text style={styles.emptyText}>Không có booking nào.</Text>
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
