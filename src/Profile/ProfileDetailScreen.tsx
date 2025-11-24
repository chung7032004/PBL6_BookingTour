import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PostsScreen from './PostsScreen';
import CommentsScreen from './CommentsScreen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import images from '../../images';
import CustomTabs from '../components/CustomTabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../types/route';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { useAuthGuard } from '../hooks/useAuthGuard';

const ProfileDetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');
  const tabs = [
    { key: 'posts', label: 'Thông tin' },
    { key: 'comments', label: 'Đánh giá' },
  ];
  const { loading, error } = useAuthGuard();
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'profileTab',
      params: { screen: 'profileDetail' },
    });
  };
  if (loading) {
    return <LoadingView message="Đang kiểm tra đăng nhập ..." />;
  }
  if (error) {
    return (
      <ErrorView
        textButton="Đăng nhập"
        message={error}
        onPress={() => {
          handleLogin();
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      {/* Header profile */}
      <View style={styles.profileSection}>
        <TouchableOpacity>
          <Image style={styles.avatarImage} source={images.account} />
        </TouchableOpacity>

        <Text style={styles.userName}>Tên của bạn</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('profileEdit')}
        >
          <Icon name="edit" size={20} color="#007bff" style={styles.editIcon} />
          <Text style={styles.editText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Tabs */}
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onChangeTab={key => setActiveTab(key as 'posts' | 'comments')}
      />

      <View style={{ flex: 1 }}>
        {activeTab === 'posts' ? <PostsScreen /> : <CommentsScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
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
  },
  userName: { fontSize: 20, fontWeight: '600', color: '#000', marginBottom: 8 },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 10,
  },
  editIcon: { marginRight: 6 },
  editText: { fontSize: 14, color: '#007bff', fontWeight: '500' },
  userInfo: { fontSize: 14, color: '#666' },
});

export default ProfileDetailScreen;
