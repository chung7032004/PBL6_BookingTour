import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Quantity } from '../Home/quantity';

interface BookingCardProps {
  nameTour: string;
  image: any;
  date: Date;
  quantity: Quantity;
  total: number;
  status: string;
}

const BookingCard = (props: BookingCardProps) => {
  const { nameTour, image, date, quantity, total, status } = props;
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

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.tourName}>{nameTour}</Text>
        <Text style={styles.date}> {date.toLocaleDateString('vi-VN')}</Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}> Người lớn: {quantity.adult}</Text>
          <Text style={styles.quantityText}> Trẻ em: {quantity.children}</Text>
          <Text style={styles.quantityText}> Tổng cộng: {quantity.total}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.price}> {total.toLocaleString('vi-VN')}₫</Text>
          <Text style={[styles.status, { color: getStatusColor() }]}>
            {status}
          </Text>
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
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 12,
  },
  tourName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  date: {
    color: '#666',
    marginBottom: 8,
  },
  quantityContainer: {
    marginBottom: 10,
  },
  quantityText: {
    color: '#444',
    marginVertical: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  status: {
    fontWeight: 'bold',
  },
});
