import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import images from '../../images';
import WishListDetailCard from './WishListDetailCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import EditGuests from '../Home/modals/EditGuests.modal';
import { Quantity } from '../Home/quantity';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WishListDetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [quantity, setQuantity] = useState<Quantity>({
    adult: 1,
    children: 0,
    total: 1,
  });
  const [showEditGuests, setShowEditGuests] = useState(false);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tiêu đề + avatar thêm người */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Trải nghiệm 2025</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={images.account} style={styles.iconSmall} />
          <Icon name="add" size={16} color="#007bff" style={styles.iconAdd} />
        </TouchableOpacity>
      </View>

      {/* Thanh chọn ngày & khách */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Thêm ngày</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowEditGuests(true)}
        >
          <Text style={styles.filterText}>{quantity.total} khách</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách tour */}
      <WishListDetailCard
        title="Hành khách nữ - Ẩm thực và tham quan đường phố bằng xe máy"
        subtitle="Trải nghiệm ẩm thực · 3,5 giờ"
        price={650000}
        rating="4.96"
        reviews="799 đánh giá"
        label="Phổ biến"
        image={images.banner1}
        currentUserId="user_2"
        onPress={() => navigation.navigate('tourDetail')}
      />
      <WishListDetailCard
        title="Hành khách nữ - Ẩm thực và tham quan đường phố bằng xe máy"
        subtitle="Trải nghiệm ẩm thực · 3,5 giờ"
        price={650000}
        rating="4.96"
        reviews="799 đánh giá"
        label="Phổ biến"
        image={images.banner1}
        currentUserId="user_2"
        onPress={() => navigation.navigate('tourDetail')}
      />
      <WishListDetailCard
        title="Hành khách nữ - Ẩm thực và tham quan đường phố bằng xe máy"
        subtitle="Trải nghiệm ẩm thực · 3,5 giờ"
        price={650000}
        rating="4.96"
        reviews="799 đánh giá"
        label="Phổ biến"
        image={images.banner1}
        currentUserId="user_2"
        onPress={() => navigation.navigate('tourDetail')}
      />
      <EditGuests
        visible={showEditGuests}
        onClose={() => setShowEditGuests(false)}
        initialValue={quantity}
        onSave={newQuantity => setQuantity(newQuantity)}
        title="Chỉnh sửa số khách"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginRight: 10,
    flexShrink: 1,
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
    paddingVertical: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  filterText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },

  // 🔹 Avatar + icon add
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  iconSmall: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  iconAdd: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 2,
  },
});

export default WishListDetailScreen;
