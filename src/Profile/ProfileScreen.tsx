import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useEffect, useState } from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../images';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { users } from '../api/fakeAuth';
import { checkLogin, logout } from '../api/auth/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../types/route';

const ProfileScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'profile'> = useRoute();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkLoginUI = async () => {
      const check = await checkLogin();
      const email = await AsyncStorage.getItem('email');
      const currentUser = users.find(u => u.email === email);
      if (check && currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    };
    checkLoginUI();
  }, []);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const currentUser = await getCurrentUser();
  //     if (currentUser) {
  //       setUser(currentUser);
  //     } else {
  //       setUser(null);
  //     }
  //   };
  //   checkLogin();
  // }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'profileTab',
      params: { screen: 'profile' },
    });
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header Avatar */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('profileDetail')}>
          <Image style={styles.avatarImage} source={images.account} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{user ? user.name : 'Khách'}</Text>
          {user && (
            <Text style={styles.userInfo}>{user ? user.email : ''}</Text>
          )}
          <Text style={styles.userInfo}>0 Đánh giá</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('profileEdit')}>
          <Icon name="edit" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Menu items */}
      <View style={styles.menuSection}>
        {!user && (
          <TouchableOpacity
            style={styles.touch}
            onPress={handleLogin}
            testID="tab-account"
          >
            <Icon
              name="login"
              size={24}
              color="#000000ff"
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Đăng nhập/ Đăng kí</Text>
            </View>
            <Icon
              name="chevron-right"
              size={24}
              color="#666"
              style={styles.nextIcon}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('profileDetail')}
        >
          <Icon name="person" size={24} color="#000000ff" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Xem hồ sơ</Text>
            <Text style={styles.subtitle}>
              Xem và chỉnh sửa thông tin cá nhân của bạn
            </Text>
          </View>
          <Icon
            name="chevron-right"
            size={24}
            color="#666"
            style={styles.nextIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch}>
          <Icon
            name="credit-card"
            size={24}
            color="#000000ff"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Thanh toán</Text>
            <Text style={styles.subtitle}>
              Thêm hoặc quản lý các thẻ đã lưu
            </Text>
          </View>
          <Icon
            name="chevron-right"
            size={24}
            color="#666"
            style={styles.nextIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <Icon
            name="attach-money"
            size={24}
            color="#000000ff"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Hoàn tiền</Text>
            <Text style={styles.subtitle}>
              Theo dõi hoàn tiền và quản lý chi tiết ngân hàng
            </Text>
          </View>
          <Icon
            name="chevron-right"
            size={24}
            color="#666"
            style={styles.nextIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <Icon
            name="help-outline"
            size={24}
            color="#000000ff"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Trung tâm hỗ trợ</Text>
            <Text style={styles.subtitle}>
              Nơi giải đáp mọi thắc mắc của bạn
            </Text>
          </View>
          <Icon
            name="chevron-right"
            size={24}
            color="#666"
            style={styles.nextIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('contact')}
        >
          <Icon name="call" size={24} color="#000000ff" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Liên hệ chúng tôi</Text>
            <Text style={styles.subtitle}>
              Yêu cầu hỗ trợ từ dịch vụ Chăm sóc khách hàng
            </Text>
          </View>
          <Icon
            name="chevron-right"
            size={24}
            color="#666"
            style={styles.nextIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <Icon
            name="settings"
            size={24}
            color="#000000ff"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Cài đặt</Text>
            <Text style={styles.subtitle}>
              Xem và tùy chỉnh cài đặt cho tài khoản
            </Text>
          </View>
          <Icon
            name="chevron-right"
            size={24}
            color="#666"
            style={styles.nextIcon}
          />
        </TouchableOpacity>
        {user && (
          <TouchableOpacity style={styles.touch} onPress={handleLogout}>
            <Icon
              name="logout"
              size={24}
              color="#000000ff"
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    marginLeft: 5,
  },
});

export default ProfileScreen;
