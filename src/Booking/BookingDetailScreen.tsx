import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
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
    status: 'Đang xử lý' | 'Đã xác nhận' | 'Hoàn thành' | 'Đã hủy';
  };
}

const BookingDetailScreen = () => {
  const route = useRoute<RouteProp<{ params: BookingDetailProps }, 'params'>>();
  const navigation = useNavigation<any>();
  const booking = route.params?.booking;

  if (!booking) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>Không tìm thấy thông tin booking.</Text>
      </SafeAreaView>
    );
  }

  const { nameTour, image, quantity, total, status } = booking;
  const date = new Date(booking.date);

  const statusConfig = {
    'Đang xử lý': { color: '#FF8F00', icon: 'access-time', bg: '#FFF3E0' },
    'Đã xác nhận': { color: '#00C853', icon: 'check-circle', bg: '#E8F5E9' },
    'Hoàn thành': { color: '#00BFA5', icon: 'task-alt', bg: '#E0F2F1' },
    'Đã hủy': { color: '#F44336', icon: 'cancel', bg: '#FFEBEE' },
  };

  const config = statusConfig[status];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image + Dark Overlay tự làm bằng View */}
        <View style={styles.heroContainer}>
          <Image source={image} style={styles.heroImage} />

          {/* Overlay đen dần xuống dưới - KHÔNG cần LinearGradient */}
          <View style={styles.overlay} />

          {/* Nội dung trên ảnh */}
          <View style={styles.heroContent}>
            <Text style={styles.tourName}>{nameTour}</Text>
            <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
              <MaterialIcons
                name={config.icon}
                size={19}
                color={config.color}
              />
              <Text style={[styles.statusText, { color: config.color }]}>
                {status}
              </Text>
            </View>
          </View>
        </View>

        {/* Ghi chú khi đã xác nhận */}
        {status === 'Đã xác nhận' && (
          <View style={styles.successBox}>
            <MaterialIcons name="info-outline" size={22} color="#1976D2" />
            <Text style={styles.successText}>
              Hướng dẫn viên sẽ liên hệ bạn trong 24h. Hãy có mặt đúng giờ tại
              điểm đón nhé!
            </Text>
          </View>
        )}

        {/* Card thông tin chính */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Chi tiết đặt tour</Text>

          <View style={styles.row}>
            <MaterialIcons name="confirmation-number" size={24} color="#555" />
            <View style={styles.rowContent}>
              <Text style={styles.label}>Mã booking</Text>
              <Text style={styles.value}>
                BK{String(booking.id).padStart(6, '0')}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="event" size={24} color="#555" />
            <View style={styles.rowContent}>
              <Text style={styles.label}>Ngày khởi hành</Text>
              <Text style={styles.value}>
                {date.toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="people" size={24} color="#555" />
            <View style={styles.rowContent}>
              <Text style={styles.label}>Số lượng khách</Text>
              <Text style={styles.value}>
                {quantity.adult} người lớn
                {quantity.children > 0 && ` • ${quantity.children} trẻ em`}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Tổng thanh toán</Text>
            <Text style={styles.totalPrice}>
              {total.toLocaleString('vi-VN')}₫
            </Text>
          </View>
        </View>

        {/* Chính sách hủy */}
        <View style={styles.card}>
          <View style={styles.policyRow}>
            <MaterialIcons name="shield" size={26} color="#4CAF50" />
            <View>
              <Text style={styles.policyTitle}>Hủy miễn phí</Text>
              <Text style={styles.policyDesc}>
                Hủy trước 24 giờ • Hoàn tiền 100%
              </Text>
            </View>
          </View>
        </View>

        {/* Nút hành động */}
        <View style={styles.actionSection}>
          {status === 'Đang xử lý' && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                // Thêm logic hủy thật ở đây
                navigation.navigate('BookingList', { refresh: true });
              }}
            >
              <MaterialIcons name="cancel" size={22} color="#D32F2F" />
              <Text style={styles.cancelBtnText}>Hủy booking</Text>
            </TouchableOpacity>
          )}

          {status === 'Đã xác nhận' && (
            <TouchableOpacity style={styles.primaryBtn}>
              <MaterialIcons name="phone" size={22} color="#fff" />
              <Text style={styles.primaryBtnText}>Liên hệ hướng dẫn viên</Text>
            </TouchableOpacity>
          )}

          {status === 'Hoàn thành' && (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() =>
                navigation.navigate('reviewScreen', { bookingId: booking.id })
              }
            >
              <MaterialIcons name="star" size={24} color="#fff" />
              <Text style={styles.primaryBtnText}>Viết đánh giá</Text>
            </TouchableOpacity>
          )}

          {status === 'Đã hủy' && (
            <TouchableOpacity
              style={styles.rebookBtn}
              onPress={() =>
                navigation.navigate('tourDetail', { id: booking.id })
              }
            >
              <Text style={styles.rebookText}>Đặt lại tour này</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  errorText: { fontSize: 16, color: '#999' },

  heroContainer: { height: 320, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },

  // Tự làm gradient bằng View chồng lên
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    top: '50%',
  },

  heroContent: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  tourName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
    // textShadowColor: 'rgba(0,0,0,0.8)',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 30,
  },
  statusText: { marginLeft: 6, fontWeight: '700', fontSize: 14.5 },

  successBox: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 14,
    borderLeftWidth: 5,
    borderLeftColor: '#00C853',
  },
  successText: {
    flex: 1,
    marginLeft: 12,
    color: '#00695C',
    fontSize: 14.5,
    lineHeight: 21,
  },

  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111',
    marginBottom: 18,
  },
  row: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  rowContent: { marginLeft: 16, flex: 1 },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 16.5, fontWeight: '600', color: '#222', marginTop: 3 },
  divider: { height: 1.2, backgroundColor: '#eee', marginVertical: 8 },

  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { fontSize: 17, color: '#444' },
  totalPrice: { fontSize: 26, fontWeight: '900', color: '#E91E63' },

  policyRow: { flexDirection: 'row', alignItems: 'center' },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginLeft: 14,
  },
  policyDesc: { fontSize: 14, color: '#4CAF50', marginLeft: 14, marginTop: 2 },

  actionSection: { padding: 20, paddingTop: 10 },
  primaryBtn: {
    backgroundColor: '#E91E63',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    borderRadius: 16,
    shadowColor: '#E91E63',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },

  cancelBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#D32F2F',
    borderRadius: 16,
  },
  cancelBtnText: {
    color: '#D32F2F',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },

  rebookBtn: {
    backgroundColor: '#fff',
    borderWidth: 2.5,
    borderColor: '#E91E63',
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: 'center',
  },
  rebookText: { color: '#E91E63', fontWeight: '700', fontSize: 17 },
});
