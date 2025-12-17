import React, { useEffect, useState } from 'react';
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
import { Slot } from '../../../types/experience';
import { getExperienceAvailability } from '../../api/experiences/experiences';
import { RootStackParamList } from '../../../types/route';
import {
  formatDate,
  formatENDate,
  formatTimeWithoutSeconds,
} from '../../components/FormatDate';

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
        <Text style={styles.cardQuantity}>{slot.spotsAvailable} chỗ trống</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.cardDate}>{formatDate(slot.date)}</Text>
          <Text style={styles.cardDate}> : </Text>
          <Text style={styles.cardTime}>
            {formatTimeWithoutSeconds(slot.startTime)} -{' '}
            {formatTimeWithoutSeconds(slot.endTime)}
          </Text>
        </View>

        <Text style={styles.cardPrice}>
          {adultPrice.toLocaleString()}đ/ khách - {childPrice.toLocaleString()}
          đ/ trẻ em
        </Text>
      </View>
    </TouchableOpacity>
  );
};

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
    image: string;
  };
}
const SelectDateModal = (props: SelectDateModalProps) => {
  const {
    visible,
    title = 'Select date & time',
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

  useEffect(() => {
    loadSlots();
  }, [date]);

  const toYMD = (d: Date) => d.toISOString().split('T')[0];
  const loadSlots = async () => {
    setSlots(null);
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
      if (selectedSlot) {
        const total =
          childPrice * quantity.children + adultPrice * quantity.adult;
        props.navigation.navigate('paymentScreen', {
          experienceId: experienceId,
          tourName: props.tourInfo.name,
          image: { uri: props.tourInfo.image },
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
              <Text style={styles.subTitle}>{quantity.total} Guest</Text>
              <Text style={styles.subText}>
                {quantity.adult} adult, {quantity.children} child
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowEditGuests(true)}>
              <Icon name="edit" size={24} color="#007bff" />
            </TouchableOpacity>
          </View>

          {/* Chọn ngày */}
          <View style={styles.chooseDate}>
            <Text style={styles.subTitle}>
              {formatENDate(date.toDateString())}
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
                <Text style={styles.emptyText}>No available time slots</Text>
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
                  Not enough spots available for this time slot
                </Text>
              ) : (
                <>
                  <Text style={styles.paymentText}>
                    {(
                      adultPrice * quantity.adult +
                      childPrice * quantity.children
                    ).toLocaleString()}{' '}
                    VND for {quantity.total} guests
                  </Text>
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => handlePayment()}
                  >
                    <Text style={styles.payButtonText}>Proceed to payment</Text>
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
        title="Edit guests"
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
    padding: 20,
    width: '100%',
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    flexWrap: 'wrap',
  },
  closeBtn: {
    fontSize: 22,
    color: '#999',
    padding: 4,
  },
  editQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 4,
  },
  chooseDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 4,
  },
  subTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#007AFF',
    lineHeight: 22,
  },
  subText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 18,
    flexWrap: 'wrap',
  },
  sectionLabel: {
    marginVertical: 8,
    fontWeight: '600',
    color: '#333',
  },
  selectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f7faff',
    minHeight: 70,
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#007AFF',
    backgroundColor: '#eaf6ff',
  },
  cardDate: {
    fontWeight: '700',
    fontSize: 17,
    color: '#222',
    marginBottom: 2,
  },
  cardTime: {
    fontWeight: '600',
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
  },
  cardPrice: {
    color: '#007AFF',
    marginTop: 2,
    fontSize: 13,
    fontWeight: '500',
  },
  cardQuantity: {
    alignSelf: 'center',
    color: '#007AFF',
    fontWeight: '500',
    fontSize: 13,
    marginLeft: 8,
    minWidth: 65,
    textAlign: 'right',
  },
  payment: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
  payButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#007AFF',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 150,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
    minHeight: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
});
