import { useState } from 'react';
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
import DescriptionModal from './description.modal';
import EditNameModal from './EditName.modal';
import EditAvatarModal from './EditAvatar.modal';
import EditGenderModal from './EditGender.modal';
import BirthdayPicker from './BirthdayPicker';

const ProfileEditScreen = () => {
  const [infoState, setInfoState] = useState(true);
  const [phoneState, setPhoneState] = useState(true);
  const [showModalDesc, setShowModalDesc] = useState(false);
  const [description, setDescription] = useState('Chúng tôi biết về bạn');

  const [showModalEditAvatar, setShowModalEditAvatar] = useState(false);
  const [avatar, setAvatar] = useState<ImageSourcePropType>(images.account);

  const [showModalEditName, setShowModalEditName] = useState(false);
  const [name, setName] = useState('Tên của bạn');

  const [showModalEditGender, setShowModalEditGender] = useState(false);
  const [gender, SetGender] = useState('male');

  const [birthday, setBirthday] = useState<Date>(new Date(2000, 0, 1));

  const handleSaveInfo = () => {
    setInfoState(true);
    Alert.alert('Lưu thành công');
  };

  const handleSavePhone = () => {
    setPhoneState(true);
    Alert.alert('Lưu số điện thoại thành công');
  };

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
            <Image source={images.edit} style={styles.editIconSmall} />
          </TouchableOpacity>
        </View>

        {/* User name */}
        <View style={styles.userNameRow}>
          <Text style={styles.userName}>{name}</Text>
          <TouchableOpacity
            style={styles.editNameBtn}
            onPress={() => setShowModalEditName(true)}
          >
            <Image source={images.edit} style={styles.editIcon} />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowModalDesc(true)}
        >
          <Text style={{ color: '#aaa' }}>{description}</Text>
        </TouchableOpacity>
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
            style={styles.input}
            placeholder="Tên của bạn"
            placeholderTextColor="#aaa"
            onFocus={() => setInfoState(false)}
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
                {gender === 'male' ? 'Nam' : 'Nữ'}
              </Text>
              <Image source={images.down} style={styles.genderIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.subtitle}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ của bạn"
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
        onSave={uri => setAvatar({ uri })}
      />
      <EditNameModal
        visible={showModalEditName}
        onClose={() => setShowModalEditName(false)}
        onSave={text => setName(text)}
        title="Chỉnh sửa tên người dùng"
        initialValue={name}
      />
      <DescriptionModal
        visible={showModalDesc}
        onClose={() => setShowModalDesc(false)}
        onSave={text => setDescription(text)}
        title="Chỉnh sửa tiểu sử"
        initialValue={description}
      />
      <EditGenderModal
        visible={showModalEditGender}
        onClose={() => setShowModalEditGender(false)}
        onSave={value => SetGender(value)}
        title="Chọn giới tính"
        initialValue={gender}
      />
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
  editIconSmall: { width: 16, height: 16, tintColor: '#007bff' },

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
  editIcon: { width: 18, height: 18, tintColor: '#007bff' },

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
  genderIcon: {
    width: 18,
    height: 18,
    tintColor: '#666',
  },
});

export default ProfileEditScreen;
