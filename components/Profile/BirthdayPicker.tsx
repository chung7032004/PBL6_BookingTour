import React, { useState } from 'react';
import {
  Platform,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import images from '../../images';

interface BirthdayPickerProps {
  value: Date;
  onChange: (date: Date, state: boolean) => void;
}

const BirthdayPicker: React.FC<BirthdayPickerProps> = ({ value, onChange }) => {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate, false);
    }
    if (Platform.OS === 'android') setShow(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.touch} onPress={() => setShow(true)}>
        <Text style={styles.text}>{value.toLocaleDateString('vi-VN')}</Text>
        <Image source={images.date} style={styles.image} />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()} // chỉ cho chọn ngày <= hôm nay
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 6,
    backgroundColor: '#fafafa',
  },
  text: { fontSize: 15, color: '#333' },
  image: { width: 18, height: 18, tintColor: '#666' },
});
export default BirthdayPicker;
