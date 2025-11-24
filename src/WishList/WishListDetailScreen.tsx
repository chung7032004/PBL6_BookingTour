import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import WishListDetailCard from './WishListDetailCard';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { useAuthGuard } from '../hooks/useAuthGuard';
import {
  getWishListDetail,
  removeExpToWishList,
} from '../api/experiences/wishlist';
import { WishListDetailResponse } from '../../types/wishlist';
import Notification from '../components/Notification';
import ConfirmModal from '../components/Confirm.modal';

const WishListDetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'wishListDetail'> = useRoute();
  const { loading, error } = useAuthGuard();
  const [wishListDetail, setWishListsDetail] =
    useState<WishListDetailResponse | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [typeNotification, setTypeNotification] = useState<'success' | 'error'>(
    'success',
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  useEffect(() => {
    loadWishListsDetail();
  }, []);

  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'homeTab',
      params: 'paymentScreen',
    });
  };
  if (loading) return <LoadingView message="Đang kiểm tra đăng nhập ..." />;
  if (error)
    return (
      <ErrorView
        message="Bạn cần đăng nhập để sử dụng tính năng này"
        onPress={handleLogin}
      />
    );
  const loadWishListsDetail = async () => {
    const res = await getWishListDetail(route?.params.wishListId);
    if (res?.message) {
      setTypeNotification('success');
      setWishListsDetail(res.wishListDetail);
    } else {
      setTypeNotification('error');
    }
    setShowNotification(res?.message);
  };
  const handleDelete = async () => {
    if (!wishListDetail?.id || !selectedId) {
      setTypeNotification('error');
      setShowNotification('Undefined Id WishList or Undefined Id Exp ');
      setShowDeleteConfirm(false);
      return;
    }
    const res = await removeExpToWishList(wishListDetail?.id, selectedId);
    if (res?.isSuccess) {
      setWishListsDetail(prev =>
        prev
          ? {
              ...prev,
              experiences: prev.experiences.filter(
                exp => exp.id !== selectedId,
              ),
            }
          : prev,
      );
      setTypeNotification('success');
    } else {
      setTypeNotification('error');
    }
    setShowNotification(res?.message);
    setShowDeleteConfirm(false);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tiêu đề + avatar thêm người */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>{wishListDetail?.name}</Text>
        <Text>{wishListDetail?.experiences.length}</Text>
        {/* 
        <TouchableOpacity style={styles.iconButton}>
          <Image source={images.account} style={styles.iconSmall} />
          <Icon name="add" size={16} color="#007bff" style={styles.iconAdd} />
        </TouchableOpacity>
        */}
      </View>

      {/* Thanh chọn ngày & khách */}
      {/*
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
      */}
      {wishListDetail?.experiences.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Danh sách này chưa có trải nghiệm nào
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('homeTab')}
          >
            <Text style={styles.emptyButtonText}>Khám phá trải nghiệm</Text>
          </TouchableOpacity>
        </View>
      )}
      {wishListDetail?.experiences.map(item => {
        return (
          <WishListDetailCard
            key={item.id}
            title={item.title}
            subtitle={item.description}
            price={item.adultPrice}
            rating="5.0"
            reviews="799 đánh giá"
            image={item.media[0]}
            onPress={() => navigation.navigate('tourDetail', { id: item.id })}
            onLongPress={() => {
              setSelectedId(item.id);
              setShowDeleteConfirm(true);
            }}
          />
        );
      })}
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
      <ConfirmModal
        visible={showDeleteConfirm}
        message="Bạn có chắc muốn xóa trải nghiệm này khỏi danh sách?"
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
      {/* 
      <EditGuests
        visible={showEditGuests}
        onClose={() => setShowEditGuests(false)}
        initialValue={quantity}
        onSave={newQuantity => setQuantity(newQuantity)}
        title="Chỉnh sửa số khách"
      />
      */}
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },

  emptyText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },

  emptyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },

  emptyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default WishListDetailScreen;
