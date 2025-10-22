import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Quantity } from '../Home/quantity';

interface BookingDetailProps {
  booking: {
    id: number;
    nameTour: string;
    image: any;
    date: Date;
    quantity: Quantity;
    total: number;
    status: string;
  };
}

const BookingDetailScreen = () => {
  const route = useRoute<RouteProp<{ params: BookingDetailProps }, 'params'>>();
  const navigation = useNavigation<any>();
  const booking = route.params?.booking;

  if (!booking) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Không tìm thấy thông tin booking.</Text>
      </View>
    );
  }

  const { nameTour, image, quantity, total, status } = booking;
  const date = new Date(booking.date);

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'đã xác nhận':
        return '#4CAF50';
      case 'đang xử lý':
        return '#FFA000';
      case 'đã hủy':
        return '#F44336';
      case 'hoàn thành':
        return '#00BCD4';
      default:
        return '#757575';
    }
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Xác nhận hủy booking',
      'Bạn có chắc chắn muốn hủy tour này không?',
      [
        { text: 'Không', style: 'cancel' },
        {
          text: 'Hủy tour',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Đã hủy', 'Booking của bạn đã được hủy thành công.', [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('BookingList', { refresh: true }),
              },
            ]);
          },
        },
      ],
    );
  };

  const handleWriteReview = () => {
    navigation.navigate('reviewScreen', { bookingId: booking.id });
  };

  const handleContactHost = () => {
    Alert.alert('Liên hệ', 'Hướng dẫn viên sẽ liên hệ bạn qua số điện thoại.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Ảnh tour */}
      <Image source={image} style={styles.image} resizeMode="cover" />

      {/* Tiêu đề + trạng thái */}
      <View style={styles.header}>
        <Text style={styles.tourName}>{nameTour}</Text>
        <View
          style={[
            styles.statusContainer,
            { backgroundColor: getStatusColor() + '22' },
          ]}
        >
          <MaterialIcons
            name={
              status === 'Đã xác nhận'
                ? 'check-circle'
                : status === 'Đang xử lý'
                ? 'hourglass-empty'
                : status === 'Đã hủy'
                ? 'cancel'
                : status === 'Hoàn thành'
                ? 'rate-review'
                : 'cancel'
            }
            size={18}
            color={getStatusColor()}
          />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {status}
          </Text>
        </View>
      </View>

      {/* Ghi chú hướng dẫn */}
      {status === 'Đã xác nhận' && (
        <View style={styles.noteBox}>
          <MaterialIcons name="info" size={22} color="#1E88E5" />
          <Text style={styles.noteText}>
            Vui lòng có mặt tại điểm tập trung trước 15 phút. Hướng dẫn viên sẽ
            liên hệ qua số điện thoại đã đăng ký.
          </Text>
        </View>
      )}

      {/* Thông tin chi tiết */}
      <View style={styles.detailBox}>
        <View style={styles.row}>
          <MaterialIcons name="confirmation-number" size={20} color="#666" />
          <Text style={styles.detailText}> Mã booking: BK-{booking.id}</Text>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="calendar-today" size={20} color="#666" />
          <Text style={styles.detailText}>
            {' '}
            Ngày đi: {date.toLocaleDateString('vi-VN')}
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="event-available" size={20} color="#666" />
          <Text style={styles.detailText}>
            {' '}
            Ngày đặt: {new Date().toLocaleDateString('vi-VN')}
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="people" size={20} color="#666" />
          <Text style={styles.detailText}>
            {' '}
            Người lớn: {quantity.adult} | Trẻ em: {quantity.children}
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="policy" size={20} color="#666" />
          <Text style={styles.detailText}>
            {' '}
            Chính sách hủy: Linh hoạt (trước 24h)
          </Text>
        </View>

        {/* Tổng thanh toán */}
        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>Tổng thanh toán</Text>
          <Text style={styles.priceValue}>
            {total.toLocaleString('vi-VN')}₫
          </Text>
        </View>
      </View>

      {/* Nút hành động */}
      <View style={styles.actionContainer}>
        {status === 'Đang xử lý' && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.actionButton, { backgroundColor: '#F44336' }]}
            onPress={handleCancelBooking}
          >
            <MaterialIcons name="cancel" size={20} color="#fff" />
            <Text style={styles.actionText}>Hủy booking</Text>
          </TouchableOpacity>
        )}

        {status === 'Đã xác nhận' && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.actionButton, { backgroundColor: '#1E88E5' }]}
            onPress={handleContactHost}
          >
            <MaterialIcons name="phone-in-talk" size={20} color="#fff" />
            <Text style={styles.actionText}>Liên hệ hướng dẫn viên</Text>
          </TouchableOpacity>
        )}

        {status === 'Hoàn thành' && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.actionButton, { backgroundColor: '#00BFA5' }]}
            onPress={handleWriteReview}
          >
            <MaterialIcons name="rate-review" size={20} color="#fff" />
            <Text style={styles.actionText}>Viết đánh giá</Text>
          </TouchableOpacity>
        )}
        {status === 'Đã hủy' && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.actionButton, { backgroundColor: '#1E88E5' }]}
            onPress={() => navigation.navigate('tourDetail')}
          >
            <Text style={styles.actionText}>Xem chi tiết trải nghiêm</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default BookingDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  image: {
    width: '100%',
    height: 220,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tourName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    marginLeft: 5,
    fontWeight: '600',
  },
  noteBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 12,
  },
  noteText: {
    flex: 1,
    color: '#1565C0',
    marginLeft: 8,
    fontSize: 14,
  },
  detailBox: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#444',
  },
  priceBox: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 10,
  },
  priceLabel: {
    color: '#555',
    fontSize: 15,
  },
  priceValue: {
    color: '#1E88E5',
    fontWeight: 'bold',
    fontSize: 17,
  },
  actionContainer: {
    marginTop: 10,
    marginBottom: 40,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#888',
  },
});
