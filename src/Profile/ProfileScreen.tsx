import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

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
import { checkLogin, logout } from '../api/auth/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../types/route';
import { userProfile } from '../../types/host';
import { getMyProfile } from '../api/experiences/host';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

const ProfileScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [myProfile, setMyProfile] = useState<userProfile | null>();
  const avatarSource = myProfile?.avatarUrl
    ? { uri: myProfile.avatarUrl } // Nếu có URL, sử dụng ảnh từ API
    : images.account; // Nếu không có, sử dụng ảnh mặc định
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, []),
  );
  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const myProfile = await getMyProfile();
      if (!myProfile) {
        setErrorLogin('Vui lòng đăng nhập để xem thông tin');
      }
      setMyProfile(myProfile);
    } catch (error: any) {
      setErrorProfile('Không tải được hồ sơ');
      return;
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setMyProfile(null);
  };
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'profileTab',
      params: { screen: 'profile' },
    });
  };
  if (loadingProfile) return <LoadingView message="Đang tải dữ liệu ..." />;
  if (errorProfile)
    return (
      <ErrorView
        message={errorProfile}
        onPress={loadProfile}
        textButton="Tải lại trang"
      />
    );
  if (errorLogin)
    return (
      <ErrorView
        message={errorLogin}
        onPress={handleLogin}
        textButton="Đăng nhập"
      />
    );
  return (
    <ScrollView style={styles.container}>
      {/* Header Avatar */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('profileDetail')}>
          <Image style={styles.avatarImage} source={avatarSource} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>
            {myProfile ? myProfile.fullName : 'Khách'}
          </Text>
          {myProfile && (
            <Text style={styles.userInfo}>
              {myProfile ? myProfile.email : ''}
            </Text>
          )}
          {/* <Text style={styles.userInfo}>0 Đánh giá</Text> */}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('profileEdit')}>
          <Icon name="edit" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Menu items */}
      <View style={styles.menuSection}>
        {!myProfile && (
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
        {myProfile && (
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
