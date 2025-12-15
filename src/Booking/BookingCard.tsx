import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Booking } from '../../types/booking';
import { formatDate, formatTimeWithoutSeconds } from '../components/FormatDate';

const BookingCard: React.FC<Booking> = props => {
  const {
    experienceTitle,
    imageUrl,
    bookingCode,
    date,
    startTime,
    endTime,
    adults,
    children,
    totalPrice,
    status,
  } = props;

  const statusColor = {
    Pending: '#FFA000',
    Confirmed: '#4CAF50',
    Cancelled: '#F44336',
    Completed: '#2196F3',
  };

  const color = statusColor[status] || '#757575';

  return (
    <View style={styles.card}>
      <Image
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {/* Tên tour + mã đặt */}
        <Text style={styles.tourName}>{experienceTitle}</Text>
        <Text style={styles.bookingCode}>Mã đặt: #{bookingCode}</Text>

        {/* Ngày giờ */}
        <View style={styles.row}>
          <Icon name="event" size={18} color="#666" />
          <Text style={styles.date}>
            {formatDate(date)} • {formatTimeWithoutSeconds(startTime)} -{' '}
            {formatTimeWithoutSeconds(endTime)}
          </Text>
        </View>

        {/* Số lượng */}
        <View style={styles.row}>
          <Icon name="group" size={18} color="#666" />
          <Text style={styles.date}>
            {adults} người lớn • {children} trẻ em
          </Text>
        </View>

        {/* Giá & trạng thái dưới cùng */}
        <View style={styles.footer}>
          <Text style={styles.price}>
            {totalPrice.toLocaleString('vi-VN')}₫
          </Text>

          <View style={[styles.statusBadge, { backgroundColor: color + '22' }]}>
            <Text style={[styles.statusText, { color }]}>{status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 170,
  },
  content: {
    padding: 14,
  },
  tourName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  bookingCode: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  date: {
    fontSize: 14,
    color: '#444',
  },
  footer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 19,
    fontWeight: '800',
    color: '#E63946',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    textTransform: 'capitalize',
    fontWeight: '700',
    fontSize: 12,
  },
});
