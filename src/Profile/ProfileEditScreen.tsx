import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../images';
import DescriptionModal from './modals/Description.modal';
import EditNameModal from './modals/EditName.modal';
import EditAvatarModal from './modals/EditAvatar.modal';
import EditGenderModal from './modals/EditGender.modal';
import BirthdayPicker from './BirthdayPicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuthGuard } from '../hooks/useAuthGuard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import { getMyProfile, updateMyProfile } from '../api/experiences/host';
import { userProfile } from '../../types/host';
import Notification from '../components/Notification';

const ProfileEditScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [infoState, setInfoState] = useState(true);
  const [phone, setPhone] = useState('');
  const [phoneState, setPhoneState] = useState(true);
  const [showModalDesc, setShowModalDesc] = useState(false);
  // const [description, setDescription] = useState('Chúng tôi biết về bạn');

  const [showModalEditAvatar, setShowModalEditAvatar] = useState(false);
  const [avatar, setAvatar] = useState<ImageSourcePropType>(images.account);

  const [showModalEditName, setShowModalEditName] = useState(false);
  const [name, setName] = useState('Tên của bạn');

  const [showModalEditGender, setShowModalEditGender] = useState(false);
  const [gender, SetGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  const [birthday, setBirthday] = useState<Date>(new Date(2000, 0, 1));
  const [country, setCountry] = useState('');
  const [showNotification, setShowNotification] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = async () => {
    const myProfile = await getMyProfile();
    if (!myProfile) return; // xử lý lỗi sau
    setName(myProfile.fullName ?? 'Tên của bạn');
    setBirthday(
      myProfile.dateOfBirth
        ? new Date(myProfile.dateOfBirth)
        : new Date(2000, 0, 1),
    );
    SetGender(myProfile.gender);
    setCountry(myProfile.country ?? 'Chưa cập nhật');
    setPhone(myProfile.phoneNumber ?? 'Chưa cập nhật');
    if (myProfile.avatarUrl) setAvatar({ uri: myProfile.avatarUrl });
  };

  const formatDateForBackend = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // → "1999-12-31"
  };
  const handleSaveInfo = async () => {
    const result = await updateMyProfile({
      FullName: name,
      DateOfBirth: formatDateForBackend(birthday),
      Gender: gender,
      Country: country,
      PhoneNumber: phone,
      Avatar: avatar,
    });

    if (result) {
      setInfoState(true);
      setShowNotification('Cập nhật thành công');
    }
  };
  const handleSavePhone = async () => {
    let phoneNumber = phone.replace(/\D/g, '');

    if (phoneNumber.startsWith('0')) {
      phoneNumber = '+84' + phoneNumber.slice(1);
    } else if (!phoneNumber.startsWith('+84') && phoneNumber.length >= 9) {
      phoneNumber = '+84' + phoneNumber;
    } else if (!phoneNumber) {
      setPhoneState(true);
      return;
    }

    const result = await updateMyProfile({
      FullName: name.trim() || 'Người dùng',
      PhoneNumber: phoneNumber,
      DateOfBirth: formatDateForBackend(birthday),
      Gender: gender,
      Country: country,
      Avatar: avatar,
    });

    if (result) {
      setPhone(phoneNumber); // hoặc setPhone('0' + phoneNumber.slice(3)) nếu muốn hiển thị 0...
      setPhoneState(true);
      setShowNotification('Lưu số điện thoại thành công');
    }
  };
  const handleSaveAvatar = async (uri: string) => {
    const avatarFile = {
      uri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    } as any;

    const result = await updateMyProfile({
      FullName: name,
      DateOfBirth: formatDateForBackend(birthday),
      Gender: gender,
      Country: country,
      PhoneNumber: phone,
      Avatar: avatarFile,
    });

    if (result) {
      setAvatar({ uri });
      setShowNotification('Cập nhật ảnh đại diện thành công');
    }
  };
  const { loading, error } = useAuthGuard();
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'homeTab',
      params: 'paymentScreen',
    });
  };
  if (loading) return <LoadingView message="Đang kiểm tra đăng nhập ..." />;
  if (error)
    return (
      <ErrorView
        message="Bạn cần đăng nhập để sử dụng tính năng này"
        onPress={handleLogin}
      />
    );
  return (
    <ScrollView style={styles.container}>
      {/* Header Profile */}
      <View style={styles.profileSection}>
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <Image style={styles.avatarImage} source={avatar} />
          <TouchableOpacity
            style={styles.editAvatarBtn}
            onPress={() => setShowModalEditAvatar(true)}
          >
            <Icon name="edit" size={14} color="#007bff" />
          </TouchableOpacity>
        </View>

        {/* User name */}
        <View style={styles.userNameRow}>
          <Text style={styles.userName}>{name}</Text>
          <TouchableOpacity
            style={styles.editNameBtn}
            onPress={() => setShowModalEditName(true)}
          >
            <Icon name="edit" size={20} color="#007bff" />
          </TouchableOpacity>
        </View>

        {/* Description 
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowModalDesc(true)}
        >
          <Text style={{ color: '#aaa' }}>{description}</Text>
        </TouchableOpacity>
        */}
      </View>

      {/* Dữ liệu cá nhân */}
      <View style={styles.card}>
        <View style={styles.updateContainer}>
          <Text style={styles.title}>Dữ liệu cá nhân</Text>
          <TouchableOpacity onPress={() => setInfoState(!infoState)}>
            {infoState ? (
              <Text style={styles.buttonAdd}>Thay đổi</Text>
            ) : (
              <Text style={styles.buttonCancel}>Hủy</Text>
            )}
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.subtitle}>Tên đầy đủ</Text>
          <TextInput
            value={name}
            style={styles.input}
            placeholder="Tên của bạn"
            placeholderTextColor="#aaa"
            onFocus={() => setInfoState(false)}
            onChangeText={setName}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.flexItem}>
            <Text style={styles.subtitle}>Ngày sinh</Text>
            <BirthdayPicker
              value={birthday}
              onChange={(date, state) => {
                setBirthday(date);
                setInfoState(state);
              }}
            />
          </View>
          <View style={styles.flexItem}>
            <Text style={styles.subtitle}>Giới tính</Text>
            <TouchableOpacity
              style={styles.genderTouch}
              onPress={() => {
                setShowModalEditGender(true);
                setInfoState(false);
              }}
            >
              <Text style={styles.genderText}>
                {' '}
                {gender === 'Male' ? 'Nam' : 'Nữ'}
              </Text>
              <Icon name="keyboard-arrow-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.subtitle}>Quốc gia</Text>
          <TextInput
            value={country}
            onChangeText={setCountry}
            style={styles.input}
            placeholder="Quốc gia"
            placeholderTextColor="#aaa"
            onFocus={() => setInfoState(false)}
          />
        </View>

        {!infoState && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveInfo}>
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Số điện thoại */}
      <View style={styles.card}>
        <View style={styles.updateContainer}>
          <Text style={styles.title}>Số điện thoại</Text>
          <TouchableOpacity onPress={() => setPhoneState(!phoneState)}>
            {phoneState ? (
              <Text style={styles.buttonAdd}>Thêm</Text>
            ) : (
              <Text style={styles.buttonCancel}>Hủy</Text>
            )}
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Số điện thoại của bạn"
          placeholderTextColor="#aaa"
          onFocus={() => setPhoneState(false)}
          onBlur={() => setPhoneState(true)}
        />

        {!phoneState && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePhone}>
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        )}
      </View>
      <EditAvatarModal
        title={'Chọn ảnh đại diện'}
        visible={showModalEditAvatar}
        onClose={() => setShowModalEditAvatar(false)}
        onSave={uri => handleSaveAvatar(uri)}
      />
      <EditNameModal
        visible={showModalEditName}
        onClose={() => setShowModalEditName(false)}
        onSave={text => setName(text)}
        title="Chỉnh sửa tên người dùng"
        initialValue={name}
      />
      {/* 
      <DescriptionModal
        visible={showModalDesc}
        onClose={() => setShowModalDesc(false)}
        onSave={text => setDescription(text)}
        title="Chỉnh sửa tiểu sử"
        initialValue={description}
      />
      */}
      <EditGenderModal
        visible={showModalEditGender}
        onClose={() => setShowModalEditGender(false)}
        onSave={value => SetGender(value)}
        title="Chọn giới tính"
        initialValue={gender}
      />
      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type={'success'}
          autoClose
          position="bottom"
          duration={3000}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  // Header
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  editNameBtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 6,
  },

  // Card style
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 15,
    color: '#000',
    backgroundColor: '#fafafa',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },

  updateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  flexItem: { flex: 1, marginRight: 10 },

  buttonAdd: {
    color: '#007bff',
    fontWeight: '500',
  },
  buttonCancel: {
    color: 'red',
    fontWeight: '500',
  },

  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  genderTouch: {
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
  genderText: {
    fontSize: 15,
    color: '#333',
  },
});

export default ProfileEditScreen;
