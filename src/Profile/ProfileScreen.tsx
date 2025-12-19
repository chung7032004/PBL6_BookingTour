import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useCallback, useState } from 'react';
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
import { logout } from '../api/auth/login';
import { RootStackParamList } from '../../types/route';
import { userProfile } from '../../types/host';
import { getMyProfile } from '../api/experiences/host';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const insets = useSafeAreaInsets();
  // undefined = loading, null = guest, object = logged in
  const [myProfile, setMyProfile] = useState<userProfile | null | undefined>(
    undefined,
  );
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);

  const avatarSource = myProfile?.avatarUrl
    ? { uri: myProfile.avatarUrl }
    : images.account;

  const loadProfile = useCallback(async () => {
    try {
      setLoadingProfile(true);
      setErrorProfile(null);

      const res = await getMyProfile();

      if (!res) {
        setMyProfile(null); // guest
        return;
      }

      setMyProfile(res);
    } catch {
      setErrorProfile('Failed to load profile. Please try again.');
      setMyProfile(null);
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile]),
  );

  const handleLogout = async () => {
    await logout();
    setMyProfile(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'profile' }],
    });
  };

  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'profileTab',
      params: { screen: 'profile' },
    });
  };

  if (loadingProfile && myProfile === undefined) {
    return <LoadingView message="Loading profile..." />;
  }

  if (errorProfile && myProfile === undefined) {
    return (
      <ErrorView
        message={errorProfile}
        onPress={loadProfile}
        textButton="Reload"
      />
    );
  }

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]}>
      {/* PROFILE HEADER */}
      <View style={styles.profileContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!myProfile) {
              handleLogin();
              return;
            }
            navigation.navigate('profileDetail');
          }}
        >
          <Image style={styles.avatarImage} source={avatarSource} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>
            {myProfile ? myProfile.fullName : 'Guest'}
          </Text>

          {myProfile && <Text style={styles.userInfo}>{myProfile.email}</Text>}
        </View>

        {myProfile && (
          <TouchableOpacity onPress={() => navigation.navigate('profileEdit')}>
            <Icon name="edit" size={24} color="#007bff" />
          </TouchableOpacity>
        )}
      </View>

      {/* MENU */}
      <View style={styles.menuSection}>
        {!myProfile && (
          <TouchableOpacity style={styles.touch} onPress={handleLogin}>
            <Icon name="login" size={24} color="#000" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Login / Register</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            if (!myProfile) {
              handleLogin();
              return;
            }
            navigation.navigate('profileDetail');
          }}
        >
          <Icon name="person" size={24} color="#000" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>View Profile</Text>
            <Text style={styles.subtitle}>
              View and edit your personal information
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('changePassword')}
        >
          {/* Thay credit-card bằng vpn-key hoặc lock */}
          <Icon name="vpn-key" size={24} color="#000" style={styles.icon} />

          <View style={styles.textContainer}>
            <Text style={styles.title}>Change Password</Text>
            <Text style={styles.subtitle}>
              Update your password to keep your account secure
            </Text>
          </View>

          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.touch}>
          <Icon name="credit-card" size={24} color="#000" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Payments</Text>
            <Text style={styles.subtitle}>
              Manage your saved payment methods
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <Icon
            name="attach-money"
            size={24}
            color="#000"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Refunds</Text>
            <Text style={styles.subtitle}>
              Track refunds and manage bank details
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touch}>
          <Icon
            name="help-outline"
            size={24}
            color="#000"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Help Center</Text>
            <Text style={styles.subtitle}>Get answers to your questions</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.navigate('contact')}
        >
          <Icon name="call" size={24} color="#000" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.subtitle}>Reach out to customer support</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.touch}>
          <Icon name="settings" size={24} color="#000" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Customize your account settings</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity> */}

        {myProfile && (
          <TouchableOpacity style={styles.touch} onPress={handleLogout}>
            <Icon name="logout" size={24} color="#000" style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Logout</Text>
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
});

export default ProfileScreen;
