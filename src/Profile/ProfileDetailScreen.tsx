import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PostsScreen from './PostsScreen';
import CommentsScreen from './CommentsScreen';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import images from '../../images';
import CustomTabs from '../components/CustomTabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types/route';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { userProfile } from '../../types/host';
import { getMyProfile } from '../api/experiences/host';

const ProfileDetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');

  const tabs = [
    { key: 'posts', label: 'Information' },
    { key: 'comments', label: 'Reviews' },
  ];

  const [myProfile, setMyProfile] = useState<userProfile | null>();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const avatarSource = myProfile?.avatarUrl
    ? { uri: myProfile.avatarUrl }
    : images.account;

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, []),
  );

  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const profile = await getMyProfile();

      if (!profile) {
        setErrorLogin('Please log in to view your profile');
        return;
      }

      setMyProfile(profile);
    } catch (error: any) {
      setErrorProfile(error.message || 'Failed to load profile');
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'homeTab',
      params: 'paymentScreen',
      message: errorLogin ?? '',
    });
  };

  if (loadingProfile) {
    return <LoadingView message="Loading profile data..." />;
  }

  if (errorProfile) {
    return (
      <ErrorView
        message={errorProfile}
        onPress={loadProfile}
        textButton="Reload"
      />
    );
  }

  if (errorLogin) {
    return (
      <ErrorView
        message={errorLogin}
        onPress={handleLogin}
        textButton="Log in"
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile header */}
      <View style={styles.profileSection}>
        <TouchableOpacity>
          <Image
            source={avatarSource}
            style={styles.avatarImage}
            resizeMode="cover"
            defaultSource={images.account}
          />
        </TouchableOpacity>

        <Text style={styles.userName}>{myProfile?.fullName}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('profileEdit')}
        >
          <Icon name="edit" size={20} color="#007bff" style={styles.editIcon} />
          <Text style={styles.editText}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onChangeTab={key => setActiveTab(key as 'posts' | 'comments')}
      />

      <View style={{ flex: 1 }}>
        {activeTab === 'posts' ? (
          <PostsScreen myProfile={myProfile} />
        ) : (
          <CommentsScreen />
        )}
      </View>
    </View>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  avatarImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
    marginBottom: 5,
    marginTop: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 10,
  },
  editIcon: {
    marginRight: 6,
  },
  editText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
  },
});
