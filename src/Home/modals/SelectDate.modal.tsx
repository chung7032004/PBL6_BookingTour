import React, { use, useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Quantity } from '../quantity';
import EditGuests from './EditGuests.modal';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp } from '@react-navigation/native';
import { formatVNDate } from '../../components/FormatDate';
import { checkLoginAndRole } from '../../api/auth/login';
import { Slot } from '../../../types/experience';
import { getExperienceAvailability } from '../../api/experiences/experiences';
import { RootStackParamList } from '../../../types/route';

interface SelectDateModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  navigation: NavigationProp<RootStackParamList>;
  experienceId: string;
  adultPrice: number;
  childPrice: number;
  tourInfo: {
    name: string;
    image: any;
  };
}

const SelectDateCard = ({
  slot,
  selected,
  onPress,
  adultPrice,
  childPrice,
}: {
  slot: Slot;
  selected: boolean;
  onPress: () => void;
  adultPrice: number;
  childPrice: number;
}) => {
  return (
    <TouchableOpacity
      style={[styles.selectCard, selected && styles.selectedCard]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.cardDate}>{slot.date}</Text>
        <Text style={styles.cardTime}>
          {slot.startTime} - {slot.endTime}
        </Text>
        <Text style={styles.cardPrice}>
          {adultPrice.toLocaleString()}đ/ khách - {childPrice.toLocaleString()}
          đ/ trẻ em
        </Text>
      </View>
      <Text style={styles.cardQuantity}>{slot.spotsAvailable} chỗ trống</Text>
    </TouchableOpacity>
  );
};

const SelectDateModal = (props: SelectDateModalProps) => {
  const {
    visible,
    title = 'Chọn thời gian',
    onClose,
    adultPrice,
    childPrice,
    experienceId,
  } = props;
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [quantity, setQuantity] = useState<Quantity>({
    adult: 1,
    children: 0,
    total: 1,
  });
  const [showEditGuests, setShowEditGuests] = useState(false);

  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState<Slot[] | null>(null);

  const handleChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
  };

  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleChangeDate,
      mode: 'date',
      is24Hour: true,
      minimumDate: new Date(), // chỉ chọn >= hôm nay
    });
  };

  const checkLogin = async () => {
    const { isLoggedIn, isUserRole } = await checkLoginAndRole();
    if (!isLoggedIn || !isUserRole) {
      props.onClose();
      props.navigation.navigate('login', {
        redirect: 'homeTab',
        params: { screen: 'tourDetail' },
        message: 'Bạn cần đăng nhập để đặt tour',
      });
      return false;
    }
    return true;
  };
  useEffect(() => {
    loadSlots();
  }, [date]);

  const toYMD = (d: Date) => d.toISOString().split('T')[0];
  const loadSlots = async () => {
    const startDate = toYMD(date);
    const endDate = toYMD(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
    const slots = await getExperienceAvailability(
      experienceId,
      startDate,
      endDate,
    );
    setSlots(slots);
  };

  const handlePayment = async () => {
    {
      const allow = await checkLogin();
      if (!allow) return;
      if (selectedSlot) {
        const total =
          childPrice * quantity.children + adultPrice * quantity.adult;
        props.navigation.navigate('paymentScreen', {
          tourName: props.tourInfo.name,
          image: props.tourInfo.image,
          slot: selectedSlot,
          adultPrice: adultPrice,
          childPrice: childPrice,
          quantity: quantity,
          total: total,
        });
        props.onClose();
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Thông tin khách */}
          <View style={styles.editQuantity}>
            <View>
              <Text style={styles.subTitle}>{quantity.total} khách</Text>
              <Text style={styles.subText}>
                {quantity.adult} người lớn, {quantity.children} trẻ em
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowEditGuests(true)}>
              <Icon name="edit" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>

          {/* Chọn ngày */}
          <View style={styles.chooseDate}>
            <Text style={styles.subTitle}>
              {formatVNDate(date.toDateString())}
            </Text>
            <TouchableOpacity onPress={openDatePicker}>
              <Icon name="date-range" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>

          {/* Danh sách giờ */}
          <ScrollView style={{ marginTop: 10 }}>
            {/* <Text style={styles.sectionLabel}> */}
            {/* {formatVNDate(date.toDateString())} */}
            {/* </Text> */}
            {!slots ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Chưa có khung giờ</Text>
              </View>
            ) : (
              slots.map((slot, index) => (
                <SelectDateCard
                  key={index}
                  slot={slot}
                  selected={selectedSlot === slot}
                  onPress={() => setSelectedSlot(slot)}
                  adultPrice={adultPrice}
                  childPrice={childPrice}
                />
              ))
            )}
          </ScrollView>

          {/* Payment bar - chỉ hiển thị khi chọn */}
          {selectedSlot && (
            <View style={styles.payment}>
              {quantity.total > selectedSlot.spotsAvailable ? (
                <Text style={[styles.paymentText, { color: 'red' }]}>
                  Không có đủ chỗ cho khung giờ này
                </Text>
              ) : (
                <>
                  <Text style={styles.paymentText}>
                    {(
                      adultPrice * quantity.adult +
                      childPrice * quantity.children
                    ).toLocaleString()}{' '}
                    đ cho {quantity.total} khách
                  </Text>
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => handlePayment()}
                  >
                    <Text style={styles.payButtonText}>Thanh toán</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      </View>
      <EditGuests
        visible={showEditGuests}
        onClose={() => setShowEditGuests(false)}
        initialValue={quantity}
        onSave={newQuantity => setQuantity(newQuantity)}
        title="Chỉnh sửa số khách"
      />
    </Modal>
  );
};

export default SelectDateModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeBtn: {
    fontSize: 20,
    color: '#999',
  },
  editQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  chooseDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  subTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  subText: {
    color: '#666',
    fontSize: 14,
  },
  sectionLabel: {
    marginVertical: 8,
    fontWeight: '600',
    color: '#333',
  },
  selectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
  },
  selectedCard: {
    borderColor: '#007AFF',
    backgroundColor: '#E6F0FF',
  },
  cardDate: {
    fontWeight: '700',
    fontSize: 18,
  },
  cardTime: {
    fontWeight: '600',
    fontSize: 16,
  },
  cardPrice: {
    color: '#555',
    marginTop: 4,
  },
  cardQuantity: {
    alignSelf: 'center',
    color: '#007AFF',
    fontWeight: '500',
  },
  payment: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  payButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
});
