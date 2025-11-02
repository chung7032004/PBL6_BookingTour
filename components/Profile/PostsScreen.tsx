import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

const PostsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* 1. Card Tên đầy đủ */}
      <Card nameIcon="person-outline" title="Tên đầy đủ" data="Nguyễn Văn A" />

      {/* 2. Card Email */}
      <Card
        nameIcon="email-outline"
        title="Địa chỉ Email"
        data="nguyenvana@example.com"
      />

      {/* 3. Card Số điện thoại */}
      <Card
        nameIcon="phone-iphone"
        title="Số điện thoại"
        data="(+84) 901 234 567"
      />

      {/* 4. Card Địa chỉ (ví dụ: sử dụng icon "home") */}
      <Card
        nameIcon="home"
        title="Địa chỉ"
        data="123 Đường ABC, Quận 1, TP.HCM"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
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
