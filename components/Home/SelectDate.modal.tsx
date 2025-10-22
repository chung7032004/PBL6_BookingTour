import React, { use, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Quantity } from './quantity';
import EditGuests from './EditGuests.modal';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp } from '@react-navigation/native';
import { formatVNDate } from '../component/FormatDate';

interface SelectDateModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  navigation: NavigationProp<any>;
  tourInfo: {
    name: string;
    image: any;
  };
}

interface Slot {
  time: string;
  price: number;
  quantity: number;
}

const SelectDateCard = ({
  slot,
  selected,
  onPress,
}: {
  slot: Slot;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.selectCard, selected && styles.selectedCard]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.cardTime}>{slot.time}</Text>
        <Text style={styles.cardPrice}>
          {slot.price.toLocaleString()} đ / khách
        </Text>
      </View>
      <Text style={styles.cardQuantity}>{slot.quantity} chỗ trống</Text>
    </TouchableOpacity>
  );
};

const SelectDateModal = (props: SelectDateModalProps) => {
  const { visible, title = 'Chọn thời gian', onClose } = props;
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [quantity, setQuantity] = useState<Quantity>({
    adult: 2,
    children: 1,
    total: 3,
  });
  const [showEditGuests, setShowEditGuests] = useState(false);

  const [date, setDate] = useState(new Date());

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

  const slots: Slot[] = [
    { time: '18:00 - 22:00', price: 1000000, quantity: 10 },
    { time: '19:00 - 23:00', price: 1200000, quantity: 8 },
    { time: '20:00 - 23:59', price: 1500000, quantity: 5 },
  ];

  const handlePayment = () => {
    {
      if (selectedSlot) {
        const total = selectedSlot.price * quantity.total;
        props.navigation.navigate('paymentScreen', {
          tourName: props.tourInfo.name,
          image: props.tourInfo.image,
          date: date.toISOString(),
          time: selectedSlot.time,
          pricePerGuest: selectedSlot.price,
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
            <Text style={styles.sectionLabel}>
              {formatVNDate(date.toDateString())}
            </Text>
            {slots.map((slot, index) => (
              <SelectDateCard
                key={index}
                slot={slot}
                selected={selectedSlot?.time === slot.time}
                onPress={() => setSelectedSlot(slot)}
              />
            ))}
          </ScrollView>

          {/* Payment bar - chỉ hiển thị khi chọn */}
          {selectedSlot && (
            <View style={styles.payment}>
              {quantity.total > selectedSlot.quantity ? (
                <Text style={[styles.paymentText, { color: 'red' }]}>
                  Không có đủ chỗ cho khung giờ này
                </Text>
              ) : (
                <>
                  <Text style={styles.paymentText}>
                    {(selectedSlot.price * quantity.total).toLocaleString()} đ
                    cho {quantity.total} khách
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
});
