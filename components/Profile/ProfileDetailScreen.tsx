import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PostsScreen from './PostsScreen';
import CommentsScreen from './CommentsScreen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import images from '../../images';

const ProfileDetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');

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
          <Image style={styles.editIcon} source={images.edit} />
          <Text style={styles.editText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>

        <Text style={styles.userInfo}>0 bài viết</Text>
      </View>

      {/* Custom Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'posts' && styles.activeTab]}
          onPress={() => setActiveTab('posts')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'posts' && styles.activeTabText,
            ]}
          >
            Bài viết
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'comments' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('comments')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'comments' && styles.activeTabText,
            ]}
          >
            Nhận xét
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung theo tab */}
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
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  avatarImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
    marginBottom: 10,
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
  editIcon: { width: 18, height: 18, tintColor: '#007bff', marginRight: 6 },
  editText: { fontSize: 14, color: '#007bff', fontWeight: '500' },
  userInfo: { fontSize: 14, color: '#666' },

  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: { fontSize: 16, color: '#666', fontWeight: '500' },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: '700',
  },
});

export default ProfileDetailScreen;
