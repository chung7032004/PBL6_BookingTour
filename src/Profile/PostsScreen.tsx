import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuthGuard } from '../hooks/useAuthGuard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import { userProfile } from '../../types/host';

interface CardProps {
  nameIcon: string;
  title: string;
  data: string;
}

const Card: React.FC<CardProps> = ({ nameIcon, title, data }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name={nameIcon as string} size={24} color="#333" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.dataText}>{data}</Text>
      </View>
    </View>
  );
};
interface PostsScreenProps {
  myProfile: userProfile | null | undefined;
}
const PostsScreen = (props: PostsScreenProps) => {
  const myProfile = props.myProfile;
  if (!myProfile)
    return <LoadingView message="Không tìm thấy dữ liệu hồ sơ." />;
  return (
    <ScrollView style={styles.container}>
      <Card
        nameIcon="person-outline"
        title="Tên đầy đủ"
        data={myProfile.fullName}
      />
      <Card nameIcon="email" title="Địa chỉ Email" data={myProfile.email} />
      <Card
        nameIcon="phone-iphone"
        title="Số điện thoại"
        data={myProfile?.phoneNumber ? myProfile.phoneNumber : 'Chưa cập nhật'}
      />
      <Card
        nameIcon="transgender"
        title="Giới tính"
        data={myProfile?.gender ? myProfile.gender : 'Chưa cập nhật'}
      />
      <Card
        nameIcon="date-range"
        title="Ngày sinh"
        data={myProfile?.dateOfBirth ? myProfile.dateOfBirth : 'Chưa cập nhật'}
      />
      <Card
        nameIcon="home"
        title="Quốc gia"
        data={myProfile?.country ? myProfile.country : 'Chưa cập nhật'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 70,
  } as ViewStyle,

  iconWrapper: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  } as ViewStyle,

  textContainer: {
    flex: 1,
    justifyContent: 'center',
  } as ViewStyle,

  titleText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  } as TextStyle,

  dataText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  } as TextStyle,
});
export default PostsScreen;
