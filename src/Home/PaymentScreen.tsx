import React, { useEffect, useState } from 'react';
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import { formatVNDate, formatVNTimeRange } from '../components/FormatDate';
import EditGuests from './modals/EditGuests.modal';
import { Quantity } from './quantity';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PaymentMethodModal, {
  PaymentMethod,
} from './modals/PaymentMethod.modal';
import EditPhoneModal from './modals/EditPhone.modal';
import DiscountCodeModal from './modals/DiscountCode.modal';
import { RootStackParamList } from '../../types/route';
import Notification from '../components/Notification';
import ErrorView from '../components/ErrorView';
import CustomTextInput from '../components/CustomTextInput';
import { getMyProfile } from '../api/experiences/host';
import { userProfile } from '../../types/host';
import { CreateBookingRequest } from '../../types/booking';
import { createBooking } from '../api/experiences/booking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../components/LoadingOverlay';

const COLORS = {
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: {
    primary: '#0F1419',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
  },
  accent: '#007AFF',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  border: '#E5E7EB',
  divider: '#D1D5DB',
};

const TYPOGRAPHY = {
  h1: { fontSize: 24, fontWeight: '700' as const, lineHeight: 32 },
  h2: { fontSize: 20, fontWeight: '700' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 26 },
  subtitle1: { fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
  subtitle2: { fontSize: 15, fontWeight: '500' as const, lineHeight: 22 },
  body: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
};

const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 };

type PaymentRouteProp = RouteProp<RootStackParamList, 'paymentScreen'>;

const PaymentScreen = () => {
  const route = useRoute<PaymentRouteProp>();
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const {
    experienceId,
    tourName,
    image,
    adultPrice,
    childPrice,
    slot,
    quantity,
    total,
  } = route.params;
  const tabBarHeight = useBottomTabBarHeight();
  const [phone, setPhone] = useState<string>(''); // giá trị mặc định
  const [showEditPhoneModal, setShowEditPhoneModal] = useState(false);
  const [showEditGuests, setShowEditGuests] = useState(false);
  const [quantityGuest, setQuantityGuest] = useState<Quantity>(quantity);
  // const [discount, setDiscount] = useState<number>(100000);
  const [showDiscountCodeModal, setShowDiscountCodeModal] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  // const [modalVisible, setModalVisible] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>('momo');
  const [showNotif, setShowNotif] = useState<string | null>(null);
  const [note, setNote] = useState<string>(route.params.note || '');
  const [firstName, setFirstName] = useState<string>(
    route.params.firstName || '',
  );
  const [lastName, setLastName] = useState<string>(route.params.lastName || '');
  const [totalPrice, setTotalPrice] = useState<number>(total);

  const [myProfile, setMyProfile] = useState<userProfile | null>();
  const [errorProfile, setErrorProfile] = useState<string | null>(null);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (firstName === '' || lastName === '') {
      setShowNotif('Vui lòng nhập đầy đủ họ và tên');
      return;
    }
    if (phone === '') {
      setShowNotif('Vui lòng nhập số điện thoại để tiếp tục');
      return;
    }
    setLoading(true);
    // Xử lý thanh toán ở đây
    try {
      const payload: CreateBookingRequest = {
        experienceId,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        adults: quantityGuest.adult,
        children: quantityGuest.children || 0,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        contactEmail: myProfile?.email || '',
        contactPhone: phone,
        notes: note.trim() || undefined,
      };
      const booking = await createBooking(payload);
      // Lưu tạm để dùng khi MoMo trả về
      if (!booking) {
        throw new Error('Đặt chỗ thất bại, vui lòng thử lại');
      }
      // LƯU TOÀN BỘ DỮ LIỆU ĐẶT CHỖ ĐỂ DÙNG KHI QUAY LẠI
      await AsyncStorage.setItem(
        'pending_payment_data',
        JSON.stringify({
          experienceId,
          tourName,
          image,
          slot,
          adultPrice,
          childPrice,
          quantity: quantityGuest,
          totalPrice,
          firstName,
          lastName,
          phone,
          note,
        }),
      );
      // MỞ MOMO
      navigation.navigate('paymentProcessingScreen', {
        paymentUrl: booking.paymentUrl,
      });
    } catch (error: any) {
      console.log('Payment error:', error);
      setShowNotif(
        error.message.includes('mạng')
          ? 'Không có kết nối mạng'
          : error.message || 'Đặt chỗ thất bại, vui lòng thử lại',
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadDataCheckout();
  }, []);

  useEffect(() => {
    setTotalPrice(total);
    setQuantityGuest(quantity);
    setPhone(myProfile && myProfile.phoneNumber ? myProfile.phoneNumber : '');
  }, [myProfile]);
  const loadDataCheckout = async () => {
    // Load thông tin cần thiết cho checkout nếu có
    try {
      const myProfile = await getMyProfile();
      if (!myProfile) {
        setErrorLogin('Vui lòng đăng nhập để xem thông tin');
      }
      setMyProfile(myProfile);
    } catch (error: any) {
      setErrorProfile('Không tải được thông tin cá nhân');
      return;
    }
  };
  if (errorProfile)
    return (
      <ErrorView
        message={errorProfile}
        onPress={loadDataCheckout}
        textButton="Tải lại trang"
      />
    );

  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'homeTab',
      params: { screen: 'payment' },
    });
  };
  if (errorLogin)
    return (
      <ErrorView
        message={errorLogin}
        onPress={handleLogin}
        textButton="Đăng nhập"
      />
    );
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        showsVerticalScrollIndicator={false}
      >
        {/* TOUR CARD - Hero Section */}
        <View style={styles.tourCard}>
          <View style={styles.tourHeader}>
            <Image source={image} style={styles.tourImage} />
            <View style={{ flex: 1, marginLeft: SPACING.lg }}>
              <Text
                style={[styles.tourTitle, TYPOGRAPHY.subtitle1]}
                numberOfLines={2}
              >
                {tourName}
              </Text>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={16} color={COLORS.warning} />
                <Text style={[styles.ratingText, TYPOGRAPHY.caption]}>
                  5.0 (2.398 đánh giá)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CONTACT INFO SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, TYPOGRAPHY.subtitle1]}>
            Thông tin liên hệ
          </Text>

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: SPACING.sm }}>
              <Text style={[styles.label, TYPOGRAPHY.caption]}>Họ</Text>
              <CustomTextInput
                title="Nhập họ"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, TYPOGRAPHY.caption]}>Tên</Text>
              <CustomTextInput
                title="Nhập tên"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <Divider />

          <View>
            <Text style={[styles.label, TYPOGRAPHY.caption]}>Email</Text>
            <Text style={[styles.value, TYPOGRAPHY.body]}>
              {myProfile ? myProfile.email : '(Khách)'}
            </Text>
          </View>

          <Divider />

          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, TYPOGRAPHY.caption]}>
                Số điện thoại
              </Text>
              <Text
                style={[
                  styles.value,
                  TYPOGRAPHY.body,
                  { color: phone ? COLORS.text.primary : COLORS.text.tertiary },
                ]}
              >
                {phone || 'Chưa có số điện thoại'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowEditPhoneModal(true)}
            >
              <MaterialIcons
                name={phone ? 'edit' : 'add'}
                size={18}
                color={COLORS.accent}
              />
              <Text style={[styles.actionButtonText, TYPOGRAPHY.caption]}>
                {phone ? 'Sửa' : 'Thêm'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BOOKING DETAILS SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, TYPOGRAPHY.subtitle1]}>
            Chi tiết đặt chỗ
          </Text>

          <View style={styles.detailRow}>
            <MaterialIcons name="event" size={20} color={COLORS.accent} />
            <View style={{ marginLeft: SPACING.md, flex: 1 }}>
              <Text style={[styles.label, TYPOGRAPHY.caption]}>Ngày & Giờ</Text>
              <Text style={[styles.value, TYPOGRAPHY.body]}>
                {formatVNDate(slot.date)}
              </Text>
              <Text style={[styles.subValue, TYPOGRAPHY.caption]}>
                {slot.startTime} - {slot.endTime}
              </Text>
            </View>
          </View>

          <Divider />

          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <View style={styles.detailRow}>
                <MaterialIcons name="people" size={20} color={COLORS.accent} />
                <View style={{ marginLeft: SPACING.md }}>
                  <Text style={[styles.label, TYPOGRAPHY.caption]}>Khách</Text>
                  <Text style={[styles.value, TYPOGRAPHY.body]}>
                    {quantityGuest.adult} người lớn
                    {quantityGuest.children
                      ? `, ${quantityGuest.children} trẻ`
                      : ''}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowEditGuests(true)}
            >
              <MaterialIcons name="edit" size={18} color={COLORS.accent} />
              <Text style={[styles.actionButtonText, TYPOGRAPHY.caption]}>
                Sửa
              </Text>
            </TouchableOpacity>
          </View>

          <Divider />

          <Text style={[styles.label, TYPOGRAPHY.caption]}>
            Ghi chú (tùy chọn)
          </Text>
          <CustomTextInput
            title="Thêm ghi chú cho chuyến đi"
            multiline
            numberOfLines={3}
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* PAYMENT METHOD SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, TYPOGRAPHY.subtitle1]}>
            Phương thức thanh toán
          </Text>

          <TouchableOpacity
            style={[
              styles.paymentMethodCard,
              method === 'momo' && styles.paymentMethodCardMomo,
              // method === 'cash' && styles.paymentMethodCardCash,
            ]}
            // onPress={() => setModalVisible(true)}
          >
            <View style={styles.paymentMethodLeft}>
              <View
                style={[
                  styles.paymentMethodIconBox,
                  method === 'momo' && styles.iconBoxMomo,
                  // method === 'cash' && styles.iconBoxCash,
                ]}
              >
                <MaterialIcons name="smartphone" size={32} color="#d63384" />
              </View>
              <View style={{ marginLeft: SPACING.lg }}>
                <Text style={[styles.paymentMethodLabel, TYPOGRAPHY.caption]}>
                  Phương thức
                </Text>
                <Text
                  style={[
                    styles.paymentMethodValue,
                    TYPOGRAPHY.subtitle1,
                    {
                      color: '#d63384',
                    },
                  ]}
                >
                  Ví MoMo
                </Text>
              </View>
            </View>
            {/* <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              color={COLORS.text.tertiary}
            /> */}
          </TouchableOpacity>
        </View>

        {/* PRICE BREAKDOWN SECTION */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, TYPOGRAPHY.subtitle1]}>
            Chi tiết giá
          </Text>

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, TYPOGRAPHY.body]}>
              {adultPrice.toLocaleString('vi-VN')}₫ × {quantityGuest.adult}{' '}
              người lớn
            </Text>
            <Text style={[styles.priceValue, TYPOGRAPHY.body]}>
              {(quantityGuest.adult * adultPrice).toLocaleString('vi-VN')}₫
            </Text>
          </View>

          {quantityGuest.children ? (
            <View style={styles.priceRow}>
              <Text style={[styles.priceLabel, TYPOGRAPHY.body]}>
                {childPrice.toLocaleString('vi-VN')}₫ × {quantityGuest.children}{' '}
                trẻ em
              </Text>
              <Text style={[styles.priceValue, TYPOGRAPHY.body]}>
                {(quantityGuest.children * childPrice).toLocaleString('vi-VN')}₫
              </Text>
            </View>
          ) : null}

          <View style={styles.dividerPrice} />

          {/* TOTAL AMOUNT */}
          <View style={styles.totalSection}>
            <Text style={[styles.totalLabel, TYPOGRAPHY.body]}>
              Tổng thanh toán
            </Text>
            <Text style={[styles.totalAmount, TYPOGRAPHY.h2]}>
              {totalPrice.toLocaleString('vi-VN')}₫
            </Text>
          </View>
        </View>

        {/* CONFIRM BUTTON */}
        <View>
          <CustomButton
            title="Xác nhận và thanh toán"
            style={styles.payButton}
            textStyle={styles.textPayButton}
            onPress={handlePayment}
          />
        </View>
      </ScrollView>
      <LoadingOverlay visible={loading} message={'Đang xử lý...'} />
      {/* MODALS */}
      <EditGuests
        visible={showEditGuests}
        onClose={() => setShowEditGuests(false)}
        initialValue={quantity}
        onSave={newQuantity => {
          if (newQuantity.total <= slot.spotsAvailable) {
            setQuantityGuest(newQuantity);
            setTotalPrice(
              newQuantity.adult * adultPrice +
                newQuantity.children * childPrice,
            );
          } else
            setShowNotif(
              `Chỉ còn ${slot.spotsAvailable} chỗ trống cho ngày đã chọn`,
            );
        }}
        title="Chỉnh sửa số khách"
      />
      <DiscountCodeModal
        visible={showDiscountCodeModal}
        onClose={() => setShowDiscountCodeModal(false)}
        initialValue={discountCode ?? ''}
        onSave={newCode => setDiscountCode(newCode)}
      />
      {/* <PaymentMethodModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={selectedMethod => setMethod(selectedMethod)}
        initialMethod={method}
      /> */}
      <EditPhoneModal
        visible={showEditPhoneModal}
        onClose={() => setShowEditPhoneModal(false)}
        onSave={newPhone => setPhone(newPhone)}
        initialValue={phone}
      />

      {/* NOTIFICATION */}
      {showNotif && (
        <Notification
          type="error"
          message={showNotif}
          position="bottom"
          duration={3000}
          onClose={() => setShowNotif(null)}
        />
      )}
    </View>
  );
};

const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: COLORS.border,
      marginVertical: SPACING.md,
    }}
  />
);

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },

  tourCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xxl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  tourHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  tourImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: COLORS.border,
  },

  tourTitle: {
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },

  ratingText: {
    marginLeft: SPACING.sm,
    color: COLORS.text.secondary,
  },

  section: {
    backgroundColor: COLORS.card,
    padding: SPACING.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },

  sectionTitle: {
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },

  label: {
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  value: {
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },

  subValue: {
    color: COLORS.text.tertiary,
    marginTop: SPACING.xs,
  },

  row: {
    flexDirection: 'row',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  dividerPrice: {
    height: 2,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: `${COLORS.accent}15`,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${COLORS.accent}30`,
  },

  actionButtonText: {
    color: COLORS.accent,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },

  paymentMethodDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },

  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },

  paymentMethodCardMomo: {
    backgroundColor: '#fdf2f8',
    borderColor: '#d63384',
  },

  paymentMethodCardCash: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10B981',
  },

  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  paymentMethodIconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconBoxMomo: {
    backgroundColor: '#fce7f3',
  },

  iconBoxCash: {
    backgroundColor: '#dcfce7',
  },

  paymentMethodLabel: {
    color: COLORS.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  paymentMethodValue: {
    color: COLORS.text.primary,
    marginTop: SPACING.xs,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  priceLabel: {
    color: COLORS.text.secondary,
    flex: 1,
  },

  priceValue: {
    color: COLORS.text.primary,
    fontWeight: '600',
  },

  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: `${COLORS.accent}08`,
    padding: SPACING.lg,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },

  totalLabel: {
    color: COLORS.text.secondary,
  },

  totalAmount: {
    color: COLORS.accent,
  },

  noteInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    fontSize: 14,
    color: COLORS.text.primary,
    textAlignVertical: 'top',
    minHeight: 100,
    fontFamily: 'System',
  },

  payButton: {
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.lg,
    borderRadius: 12,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  textPayButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
