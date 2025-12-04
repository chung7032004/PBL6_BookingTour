import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../images';
import { Text } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NoticeCardProps {
  title: string;
  content: string;
  time: string;
  type:
    | 'BOOKING_SUCCESS'
    | 'BOOKING_CANCEL'
    | 'PROMOTION'
    | 'PAYMENT'
    | 'SYSTEM'
    | 'TOUR_REMINDER';
  isRead: boolean;
  onPress: () => void;
}
const NoticeCard = (props: NoticeCardProps) => {
  const { title, content, time, type, isRead = false, onPress } = props;
  const iconMap = {
    BOOKING_SUCCESS: 'check-circle',
    BOOKING_CANCEL: 'cancel',
    PROMOTION: 'local-offer',
    PAYMENT: 'credit-card',
    SYSTEM: 'info',
    TOUR_REMINDER: 'notifications',
  };
  const iconType = iconMap[type] || 'notifications';
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, !isRead && styles.unread]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer]}>
        <Icon name={iconType} size={22} color="#1E75FF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content} numberOfLines={2}>
          {content}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Icon name="chevron-right" size={22} color="#999" />
    </TouchableOpacity>
  );
};

const fakeNotifications: NoticeCardProps[] = [
  {
    title: 'Đặt tour thành công!',
    content: 'Bạn đã đặt thành công Tour Đà Lạt 3N2Đ khởi hành ngày 24/11.',
    time: '2 giờ trước',
    type: 'BOOKING_SUCCESS',
    isRead: false,
    onPress: () => console.log('go to booking detail'),
  },
  {
    title: 'Ưu đãi 20% cho tour Phú Quốc',
    content:
      'Nhanh tay đặt ngay tour Phú Quốc 3N2Đ, giảm giá chỉ áp dụng trong 24h!',
    time: 'Hôm qua',
    type: 'PROMOTION',
    isRead: true,
    onPress: () => console.log('go to promotion'),
  },
  {
    title: 'Thanh toán thành công!',
    content: 'Bạn đã thanh toán 4,200,000đ cho tour Nha Trang.',
    time: '3 ngày trước',
    type: 'PAYMENT',
    isRead: false,
    onPress: () => console.log('go to payment'),
  },
  {
    title: 'Thanh toán thành công1!',
    content: 'Bạn đã thanh toán 4,200,000đ cho tour Nha Trang.',
    time: '3 ngày trước',
    type: 'PAYMENT',
    isRead: false,
    onPress: () => console.log('go to payment'),
  },
  {
    title: 'Thanh toán thành công2!',
    content: 'Bạn đã thanh toán 4,200,000đ cho tour Nha Trang.',
    time: '3 ngày trước',
    type: 'PAYMENT',
    isRead: false,
    onPress: () => console.log('go to payment'),
  },
  {
    title: 'Thanh toán thành công!',
    content: 'Bạn đã thanh toán 4,200,000đ cho tour Nha Trang.',
    time: '3 ngày trước',
    type: 'PAYMENT',
    isRead: false,
    onPress: () => console.log('go to payment'),
  },
  {
    title: 'Thanh toán thành công!',
    content: 'Bạn đã thanh toán 4,200,000đ cho tour Nha Trang.',
    time: '3 ngày trước',
    type: 'PAYMENT',
    isRead: false,
    onPress: () => console.log('go to payment'),
  },
  {
    title: 'Thanh toán thành công!',
    content: 'Bạn đã thanh toán 4,200,000đ cho tour Nha Trang.',
    time: '3 ngày trước',
    type: 'PAYMENT',
    isRead: false,
    onPress: () => console.log('go to payment'),
  },
  {
    title: 'Thanh toán thành công!',
    content: 'Bạn đã thanh toán 4,200,000đ cho tour Nha Trang.',
    time: '3 ngày trước',
    type: 'PAYMENT',
    isRead: false,
    onPress: () => console.log('go to payment'),
  },
];
const NoticeScreen = () => {
  const [notifications, setNotifications] = useState(fakeNotifications);
  if (notifications.length === 0) {
    return (
      <View style={styleNoNotice.container}>
        <Image source={images.noNotice} />
        <Text style={styleNoNotice.text}>Chưa có thông báo mới</Text>
        <Text style={styleNoNotice.subText}>
          Bạn có thể xem tất cả thông báo tại đây
        </Text>
      </View>
    );
  }
  return (
    <ScrollView>
      {notifications.map((item, index) => (
        <View key={index}>
          <NoticeCard
            title={item.title}
            content={item.content}
            time={item.time}
            type={item.type}
            isRead={item.isRead}
            onPress={item.onPress}
          />
          <View style={styles.line}></View>
        </View>
      ))}
    </ScrollView>
  );
};

export default NoticeScreen;

const styleNoNotice = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  text: {
    color: '#FF5A5F',
    fontSize: 24,
    paddingBottom: 10,
  },
  subText: {
    color: '#FF5A5F',
    fontSize: 14,
    fontWeight: '300',
  },
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  unread: {
    backgroundColor: '#FFEBEC',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
    color: '#222',
  },
  titleUnread: {
    fontWeight: '700',
  },
  content: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  line: {
    height: 1,
    backgroundColor: '#CCC',
    width: '100%',
  },
});
