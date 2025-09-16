import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../images';
import DescriptionModal from './description.modal';

const ProfileEditScreen = () => {
  const [infoState, setInfoState] = useState(true);
  const [phoneState, setPhoneState] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('Chúng tôi biết về bạn');

  return (
    <ScrollView style={styles.container}>
      {/* Header Profile */}
      <View style={styles.profileSection}>
        <Image style={styles.avatarImage} source={images.account} />
        <Text style={styles.userName}>Tên của bạn</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowModal(true)}
        >
          <Text style={{ color: '#aaa' }}>{description}</Text>
          <DescriptionModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onSave={text => setDescription(text)}
            title="Chỉnh sửa tiểu sử"
            initialValue={description}
          />
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
            <Text style={styles.valueText}>01/01/2000</Text>
          </View>
          <View style={styles.flexItem}>
            <Text style={styles.subtitle}>Giới tính</Text>
            <Text style={styles.valueText}>Nam</Text>
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
          <TouchableOpacity style={styles.saveButton}>
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
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        )}
      </View>
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
  avatarImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
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
  valueText: {
    fontSize: 15,
    color: '#333',
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
});

export default ProfileEditScreen;
