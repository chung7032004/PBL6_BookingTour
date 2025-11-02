import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../component/CustomButton';
import { formatVNDate, formatVNTimeRange } from '../component/FormatDate';
import EditGuests from './modals/EditGuests.modal';
import { Quantity } from './quantity';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PaymentMethodModal, {
  PaymentMethod,
} from './modals/PaymentMethod.modal';
import EditPhoneModal from './modals/EditPhone.modal';
import DiscountCodeModal from './modals/DiscountCode.modal';
import { RootStackParamList } from '../../types/route';
import Notification from '../component/Notification';

type PaymentRouteProp = RouteProp<RootStackParamList, 'paymentScreen'>;

const PaymentScreen = () => {
  const route = useRoute<PaymentRouteProp>();
  const navigation = useNavigation<any>();
  const { tourName, image, date, time, pricePerGuest, quantity, total } =
    route.params;

  const tabBarHeight = useBottomTabBarHeight();

  const [phone, setPhone] = useState<string>(''); // giá trị mặc định
  const [showEditPhoneModal, setShowEditPhoneModal] = useState(false);

  const [showEditGuests, setShowEditGuests] = useState(false);
  const [quantityGuest, setQuantityGuest] = useState<Quantity>(quantity);
  useEffect(() => {
    setQuantityGuest(quantity);
  }, [quantity]);

  const [discount, setDiscount] = useState<number>(100000);
  const [showDiscountCodeModal, setShowDiscountCodeModal] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>('cash');
  const [showNotif, setShowNotif] = useState(false);
  const handlePayment = () => {
    if (phone === '') {
      setShowNotif(true);
      return;
    }
    navigation.navigate('paymentSuccessScreen', {
      total: total - discount,
      method: method,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Card */}
        <View style={styles.card}>
          {/* Tour Info */}
          <View style={styles.tourSection}>
            <Image source={image} style={styles.image} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.tourName}>{tourName}</Text>
              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={16} color="#f5a623" />
                <Text style={styles.ratingText}>5.0 (2398)</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />

          {/* Phone Section */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.sectionLabel}>Số điện thoại</Text>
              <Text style={styles.sectionSub}>
                {phone ? phone : 'Chưa có số điện thoại'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => setShowEditPhoneModal(true)}
            >
              <Text style={styles.smallButtonText}>
                {phone ? 'Thay đổi' : 'Thêm'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          {/* Date Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Ngày</Text>
            <Text style={styles.sectionValue}>{formatVNDate(date)}</Text>
            <Text style={styles.sectionSub}>
              {time ?? formatVNTimeRange(date)}
            </Text>
          </View>
          <View style={styles.separator} />

          {/* Guests */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.sectionLabel}>Khách</Text>
              <Text style={styles.sectionSub}>
                {quantityGuest.adult} người lớn
                {quantityGuest.children
                  ? `, ${quantityGuest.children} trẻ em`
                  : ''}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => setShowEditGuests(true)}
            >
              <Text style={styles.smallButtonText}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          {/* Discount Code */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.sectionLabel}>Mã giảm giá</Text>
              {discount >= 0 && (
                <Text style={styles.sectionSub}>
                  -{discount.toLocaleString('vi-VN')}₫
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => setShowDiscountCodeModal(true)}
            >
              <Text style={styles.smallButtonText}>Nhập mã</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          {/* Price Details */}
          <View style={{ marginBottom: 6 }}>
            <Text style={[styles.sectionLabel, { marginBottom: 8 }]}>
              Chi tiết giá
            </Text>
            <View style={styles.rowBetween}>
              <Text style={styles.detailText}>
                {pricePerGuest.toLocaleString('vi-VN')}₫ x {quantity.adult}{' '}
                người lớn
              </Text>
              <Text style={styles.priceText}>
                {(quantity.adult * pricePerGuest).toLocaleString('vi-VN')}₫
              </Text>
            </View>
            {quantity.children ? (
              <View style={styles.rowBetween}>
                <Text style={styles.detailText}>
                  {pricePerGuest.toLocaleString('vi-VN')}₫ x {quantity.children}{' '}
                  trẻ em
                </Text>
                <Text style={styles.priceText}>
                  {(quantity.children * pricePerGuest).toLocaleString('vi-VN')}₫
                </Text>
              </View>
            ) : null}
            {discount >= 0 && (
              <View style={styles.rowBetween}>
                <Text style={[styles.detailText, { color: '#ff4d4d' }]}>
                  Giảm giá
                </Text>
                <Text style={[styles.priceText, { color: '#ff4d4d' }]}>
                  -{discount.toLocaleString('vi-VN')}₫
                </Text>
              </View>
            )}
          </View>
          <View style={styles.separator} />

          {/* Payment Method */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.sectionLabel}>Phương thức thanh toán</Text>
              <View style={styles.creditCard}>
                <MaterialIcons name="credit-card" size={16} color="#666" />
                <Text style={[styles.sectionSub, { marginLeft: 2 }]}>
                  {method === 'cash'
                    ? 'Thanh toán trực tiếp'
                    : method === 'momo'
                    ? 'Thanh toán bằng Momo'
                    : 'Thanh toán qua ZaloPay'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.smallButtonText}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          {/* Total */}
          <View style={styles.rowBetween}>
            <Text style={styles.totalLabel}>Tổng thanh toán</Text>
            <Text style={styles.totalValue}>
              {(total - discount).toLocaleString('vi-VN')}₫
            </Text>
          </View>

          <Text style={styles.note}>Đặt chỗ này không được hoàn tiền.</Text>
        </View>

        {/* Continue Button */}
        <CustomButton
          title="Xác nhận và thanh toán"
          style={styles.payBtn}
          onPress={handlePayment}
        />
        <EditGuests
          visible={showEditGuests}
          onClose={() => setShowEditGuests(false)}
          initialValue={quantity}
          onSave={newQuantity => setQuantityGuest(newQuantity)}
          title="Chỉnh sửa số khách"
        />
        <DiscountCodeModal
          visible={showDiscountCodeModal}
          onClose={() => setShowDiscountCodeModal(false)}
          initialValue={discountCode ?? ''}
          onSave={newCode => setDiscountCode(newCode)}
        />
        <PaymentMethodModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={selectedMethod => setMethod(selectedMethod)}
          initialMethod={method}
        />
        <EditPhoneModal
          visible={showEditPhoneModal}
          onClose={() => setShowEditPhoneModal(false)}
          onSave={newPhone => setPhone(newPhone)}
          initialValue={phone}
        />
      </ScrollView>
      {showNotif && (
        <Notification
          type="error"
          message="Vui lòng nhập số điện thoại "
          position="bottom"
          duration={3000}
          onClose={() => setShowNotif(false)}
        />
      )}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tourSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  tourName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    flexShrink: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 12,
  },
  section: {
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
    fontWeight: '500',
  },
  sectionValue: {
    fontSize: 14,
    color: '#222',
  },
  sectionSub: {
    fontSize: 14,
    color: '#666',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallButton: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  smallButtonText: {
    color: '#444',
    fontSize: 14,
    fontWeight: '500',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  note: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  payBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
  },
  creditCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flex: 1,
  },
});
