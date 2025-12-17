import { useCallback, useState } from 'react';
import {
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
import EditNameModal from './modals/EditName.modal';
import EditAvatarModal from './modals/EditAvatar.modal';
import EditGenderModal from './modals/EditGender.modal';
import BirthdayPicker from './BirthdayPicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import { getMyProfile, updateMyProfile } from '../api/experiences/host';
import Notification from '../components/Notification';
import ErrorView from '../components/ErrorView';
import LoadingView from '../components/LoadingView';

const ProfileEditScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [infoState, setInfoState] = useState(true);
  const [phoneState, setPhoneState] = useState(true);

  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const [showModalEditAvatar, setShowModalEditAvatar] = useState(false);
  const [avatar, setAvatar] = useState<ImageSourcePropType>(images.account);

  const [showModalEditName, setShowModalEditName] = useState(false);
  const [name, setName] = useState('Your name');

  const [showModalEditGender, setShowModalEditGender] = useState(false);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  const [birthday, setBirthday] = useState<Date>(new Date(2000, 0, 1));

  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [typeNotification, setTypeNotification] = useState<'success' | 'error'>(
    'success',
  );

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'profileTab',
      params: { screen: 'profileDetail' },
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, []),
  );

  const loadProfile = async () => {
    setLoadingProfile(true);
    setErrorProfile(null);
    setErrorLogin(null);

    try {
      const myProfile = await getMyProfile();
      if (!myProfile) {
        setErrorLogin('Please log in to view your profile');
        return;
      }

      setName(myProfile.fullName ?? 'Your name');
      setBirthday(
        myProfile.dateOfBirth
          ? new Date(myProfile.dateOfBirth)
          : new Date(2000, 0, 1),
      );
      setGender(myProfile.gender);
      setCountry(myProfile.country ?? '');
      setPhone(
        myProfile.phoneNumber
          ? ensureInternational(myProfile.phoneNumber) ?? ''
          : '',
      );

      if (myProfile.avatarUrl) {
        setAvatar({ uri: myProfile.avatarUrl });
      } else {
        setAvatar(images.account);
      }
    } catch (error: any) {
      setErrorProfile(error.message || 'Failed to load profile');
    } finally {
      setLoadingProfile(false);
    }
  };

  const formatDateForBackend = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  function ensureInternational(phone: string): string | null {
    if (!phone) return null;
    const raw = phone.trim();
    const digits = raw.replace(/[^0-9]/g, '');

    if (!digits) return null;

    if (raw.startsWith('+')) return '+' + digits;
    if (digits.length === 10 && digits.startsWith('0'))
      return '+84' + digits.slice(1);
    if (digits.length === 9) return '+84' + digits;
    if (digits.startsWith('84')) return '+' + digits;

    return '+' + digits;
  }

  const buildPayload = () => ({
    FullName: name.trim() || 'User',
    DateOfBirth: formatDateForBackend(birthday),
    Gender: gender,
    Country: country || '',
    PhoneNumber: phone ? ensureInternational(phone) || '' : '',
    Avatar: '',
  });

  const handleSaveInfo = async () => {
    if (phone && ensureInternational(phone) === null) {
      setTypeNotification('error');
      setShowNotification('Invalid phone number');
      return;
    }

    const result = await updateMyProfile(buildPayload());

    if (result) {
      setTypeNotification('success');
      setShowNotification('Profile updated successfully');
      setInfoState(true);
    } else {
      setTypeNotification('error');
      setShowNotification('Update failed');
    }
  };

  const handleSavePhone = async () => {
    const phoneRequest = ensureInternational(phone);
    if (phoneRequest === null) {
      setTypeNotification('error');
      setShowNotification('Invalid phone number');
      return;
    }

    const result = await updateMyProfile(buildPayload());

    if (result) {
      setTypeNotification('success');
      setShowNotification('Phone number saved successfully');
      setPhoneState(true);
    } else {
      setTypeNotification('error');
      setShowNotification('Update failed');
    }
  };

  const handleSaveAvatar = async (uri: string) => {
    setAvatar({ uri });

    const avatarFile = {
      uri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    } as any;

    const payload = {
      ...buildPayload(),
      Avatar: avatarFile,
    };

    const result = await updateMyProfile(payload);

    if (result) {
      setTypeNotification('success');
      setShowNotification('Avatar updated successfully');
      setShowModalEditAvatar(false);
    } else {
      loadProfile();
      setTypeNotification('error');
      setShowNotification('Update failed');
    }
  };

  if (loadingProfile) return <LoadingView message="Loading profile data..." />;

  if (errorProfile)
    return (
      <ErrorView
        message={errorProfile}
        onPress={loadProfile}
        textButton="Reload"
      />
    );

  if (errorLogin)
    return (
      <ErrorView
        message={errorLogin}
        onPress={handleLogin}
        textButton="Log in"
      />
    );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image style={styles.avatarImage} source={avatar} />
          <TouchableOpacity
            style={styles.editAvatarBtn}
            onPress={() => setShowModalEditAvatar(true)}
          >
            <Icon name="edit" size={14} color="#007bff" />
          </TouchableOpacity>
        </View>

        <View style={styles.userNameRow}>
          <Text style={styles.userName}>{name}</Text>
          <TouchableOpacity
            style={styles.editNameBtn}
            onPress={() => setShowModalEditName(true)}
          >
            <Icon name="edit" size={20} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Personal information */}
      <View style={styles.card}>
        <View style={styles.updateContainer}>
          <Text style={styles.title}>Personal information</Text>
          <TouchableOpacity onPress={() => setInfoState(!infoState)}>
            <Text style={infoState ? styles.buttonAdd : styles.buttonCancel}>
              {infoState ? 'Edit' : 'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Full name</Text>
        <TextInput
          value={name}
          style={styles.input}
          placeholder="Your name"
          onFocus={() => setInfoState(false)}
          onChangeText={setName}
        />

        <View style={styles.row}>
          <View style={styles.flexItem}>
            <Text style={styles.subtitle}>Date of birth</Text>
            <BirthdayPicker
              value={birthday}
              onChange={(date, state) => {
                setBirthday(date);
                setInfoState(state);
              }}
            />
          </View>

          <View style={styles.flexItem}>
            <Text style={styles.subtitle}>Gender</Text>
            <TouchableOpacity
              style={styles.genderTouch}
              onPress={() => {
                setShowModalEditGender(true);
                setInfoState(false);
              }}
            >
              <Text style={styles.genderText}>{gender}</Text>
              <Icon name="keyboard-arrow-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.subtitle}>Country</Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          style={styles.input}
          placeholder="Country"
          onFocus={() => setInfoState(false)}
        />

        {!infoState && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveInfo}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Phone number */}
      <View style={styles.card}>
        <View style={styles.updateContainer}>
          <Text style={styles.title}>Phone number</Text>
          <TouchableOpacity onPress={() => setPhoneState(!phoneState)}>
            <Text style={phoneState ? styles.buttonAdd : styles.buttonCancel}>
              {phoneState ? 'Add' : 'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={15}
          placeholder="Your phone number"
          onFocus={() => setPhoneState(false)}
          onBlur={() => {
            const intl = ensureInternational(phone);
            setPhone(intl ?? '');
            setPhoneState(true);
          }}
        />

        {!phoneState && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSavePhone}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      <EditAvatarModal
        title="Choose avatar"
        visible={showModalEditAvatar}
        onClose={() => setShowModalEditAvatar(false)}
        onSave={handleSaveAvatar}
      />

      <EditNameModal
        visible={showModalEditName}
        onClose={() => setShowModalEditName(false)}
        onSave={setName}
        title="Edit name"
        initialValue={name}
      />

      <EditGenderModal
        visible={showModalEditGender}
        onClose={() => setShowModalEditGender(false)}
        onSave={setGender}
        title="Select gender"
        initialValue={gender}
      />

      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type={typeNotification}
          autoClose
          position="bottom"
          duration={3000}
        />
      )}
    </ScrollView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatarImage: { height: 100, width: 100, borderRadius: 50 },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  userNameRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 20, fontWeight: '600', marginRight: 8 },
  editNameBtn: { backgroundColor: '#f0f0f0', borderRadius: 20, padding: 6 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 6,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 6 },
  updateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: { flexDirection: 'row', marginTop: 8 },
  flexItem: { flex: 1, marginRight: 10 },
  buttonAdd: { color: '#007bff' },
  buttonCancel: { color: 'red' },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  genderTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  genderText: { fontSize: 15 },
});
