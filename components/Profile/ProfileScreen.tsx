import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../images';

const ProfileScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* Header Avatar */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('profileDetail')}>
          <Image style={styles.avatarImage} source={images.account} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>Tên của bạn </Text>
          <Text style={styles.userInfo}>0 Bài viết</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('profileEdit')}>
          <Image style={styles.editIcon} source={images.edit.png} />
        </TouchableOpacity>
      </View>

      {/* View profile button */}
      <TouchableOpacity
        style={styles.viewProfileButton}
        onPress={() => navigation.navigate('profileDetail')}
      >
        <Text style={styles.viewProfileText}>Xem trang cá nhân</Text>
      </TouchableOpacity>

      {/* Menu items */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.touch}>
          <Image style={styles.icon} source={images.creditCard} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Thanh toán</Text>
            <Text style={styles.subtitle}>
              Thêm hoặc quản lý các thẻ đã lưu
            </Text>
          </View>
          <Image style={styles.nextIcon} source={images.next} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <Image style={styles.icon} source={images.refund} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Hoàn tiền</Text>
            <Text style={styles.subtitle}>
              Theo dõi hoàn tiền và quản lý chi tiết ngân hàng
            </Text>
          </View>
          <Image style={styles.nextIcon} source={images.next} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <Image style={styles.icon} source={images.helpCenter} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Trung tâm hỗ trợ</Text>
            <Text style={styles.subtitle}>
              Nơi giải đáp mọi thắc mắc của bạn
            </Text>
          </View>
          <Image style={styles.nextIcon} source={images.next} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <Image style={styles.icon} source={images.contactPhone} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Liên hệ chúng tôi</Text>
            <Text style={styles.subtitle}>
              Yêu cầu hỗ trợ từ dịch vụ Chăm sóc khách hàng
            </Text>
          </View>
          <Image style={styles.nextIcon} source={images.next} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <Image style={styles.icon} source={images.setting} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Cài đặt</Text>
            <Text style={styles.subtitle}>
              Xem và tùy chỉnh cài đặt cho tài khoản
            </Text>
          </View>
          <Image style={styles.nextIcon} source={images.next} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // nền xám nhạt
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
    marginRight: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  userInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editIcon: {
    width: 22,
    height: 22,
    tintColor: '#007bff',
  },
  viewProfileButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'center',
    marginVertical: 20,
  },
  viewProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  nextIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
    marginLeft: 5,
  },
});

export default ProfileScreen;
