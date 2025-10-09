import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BookingCard from './BookingCard';
import images from '../../images'; // file ảnh của bạn

const BookingScreen = () => {
  const [filter, setFilter] = useState('Tất cả');

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
  ];

  const filteredBookings =
    filter === 'Tất cả' ? bookings : bookings.filter(b => b.status === filter);

  const filters = ['Tất cả', 'Đã xác nhận', 'Đang xử lý', 'Đã hủy'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách đặt tour</Text>

      {/* Thanh lọc trạng thái */}
      <View style={styles.filterContainer}>
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
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredBookings.map(b => (
          <BookingCard
            key={b.id}
            nameTour={b.nameTour}
            image={b.image}
            date={b.date}
            quantity={b.quantity}
            total={b.total}
            status={b.status}
          />
        ))}

        {filteredBookings.length === 0 && (
          <Text style={styles.emptyText}>Không có booking nào.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
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
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
    fontSize: 16,
  },
});
