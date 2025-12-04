// screens/payment/PaymentSuccessScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  Share,
  Alert,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';

// optional clipboard - guard with try/catch so missing package won't break
let Clipboard: any = null;
try {
  // @ts-ignore
  Clipboard = require('@react-native-clipboard/clipboard').default;
} catch (e) {
  Clipboard = null;
}

const { width } = Dimensions.get('window');

type PaymentMethod = 'momo' | 'cash';

const PaymentSuccessScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route =
    useRoute<RouteProp<RootStackParamList, 'paymentSuccessScreen'>>();
  const {
    bookingCode = 'N/A',
    bookingId = 'BK20251202001',
    total = 0,
    method = 'momo',
  } = route.params || {};

  const paymentInfo: Record<
    PaymentMethod,
    { name: string; color: string; icon: string }
  > = {
    momo: { name: 'MoMo', color: '#C8197E', icon: 'phone-iphone' },
    cash: { name: 'Tiền mặt', color: '#10B981', icon: 'payments' },
  };

  const pay = paymentInfo[method as PaymentMethod] || paymentInfo['cash'];

  const qrSize = Math.min(width * 0.64, 260);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Mã đặt chỗ: ${bookingId}\nSố tiền: ${Number(
          total,
        ).toLocaleString('vi-VN')} ₫`,
      });
    } catch (err) {
      Alert.alert('Lỗi', 'Không thể chia sẻ lúc này');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
        {/* Header overlay (absolute) - sits above content */}
        <View
          style={[
            styles.headerOverlay,
            {
              top:
                Platform.OS === 'android'
                  ? (StatusBar.currentHeight ?? 8) + 6
                  : 12,
            },
          ]}
          pointerEvents="box-none"
        >
          <View style={{ flex: 1 }} />

          <TouchableOpacity
            onPress={onShare}
            style={styles.iconCircleLarge}
            accessibilityLabel="Chia sẻ vé"
          >
            <MaterialIcons name="share" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Success Icon với hiệu ứng nhẹ */}
          <View style={styles.successContainer}>
            <View style={styles.successCircle}>
              <MaterialIcons name="check" size={80} color="#FFF" />
            </View>
            <View style={styles.successGlow} />
          </View>

          <Text style={styles.mainTitle}>Thanh toán thành công!</Text>
          <Text style={styles.subTitle}>Vé của bạn đã được tạo thành công</Text>

          {/* Ticket Card */}
          <View style={styles.ticketCard}>
            {/* Header */}
            <View style={styles.headerRow}>
              <MaterialIcons
                name="confirmation-number"
                size={32}
                color="#10B981"
              />
              <Text style={styles.bookingId}>{bookingId}</Text>
            </View>

            {/* QR Code */}
            <View style={styles.qrContainer}>
              <View
                style={[
                  styles.qrBorder,
                  { padding: Math.max(12, (260 - qrSize) / 8) },
                ]}
              >
                <QRCode
                  value={bookingId}
                  size={qrSize}
                  color="#000"
                  backgroundColor="#FFF"
                />
              </View>
            </View>

            <Text style={styles.qrHint}>
              Xuất trình mã QR này tại điểm đón để check-in
            </Text>

            {/* Info */}
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phương thức</Text>
                <View style={styles.paymentRow}>
                  <MaterialIcons
                    name={pay.icon}
                    size={20}
                    color={pay.color}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[styles.value, { color: pay.color }]}>
                    {pay.name}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Số tiền thanh toán</Text>
                <Text style={styles.amount}>
                  {Number(total).toLocaleString('vi-VN')} ₫
                </Text>
              </View>
            </View>

            {/* Dotted Line */}
            <View style={styles.dottedLine} />

            <Text style={styles.footerText}>
              Vé đã được gửi qua email & tin nhắn • Không hoàn hủy
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => {}}>
              <Text style={styles.primaryBtnText}>Xem vé của tôi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => navigation.navigate('homeTab')}
            >
              <Text style={styles.secondaryBtnText}>Về trang chủ</Text>
              <MaterialIcons
                name="arrow-forward-ios"
                size={18}
                color="#007AFF"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 10, // Padding dưới để nút không bị che
    paddingHorizontal: 16,
  },
  successContainer: {
    position: 'relative',
    marginBottom: 8,
    alignItems: 'center',
  },
  successCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  successGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    top: -10,
    left: -10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1E293B',
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  ticketCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    width: width * 0.94,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bookingId: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1E293B',
    letterSpacing: 2,
  },
  qrContainer: { alignItems: 'center', marginVertical: 20 },
  qrBorder: {
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  qrHint: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  infoContainer: { marginTop: 16 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: { fontSize: 15, color: '#64748B' },
  paymentRow: { flexDirection: 'row', alignItems: 'center' },
  value: { fontSize: 16, fontWeight: '700' },
  amount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#DC2626',
  },

  dottedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginVertical: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 10,
  },

  buttonContainer: {
    width: '90%',
    marginTop: 20,
  },
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryBtn: {
    marginTop: 12,
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryBtnText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  /* header top */
  headerRowTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconCircleLarge: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  headerOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PaymentSuccessScreen;
