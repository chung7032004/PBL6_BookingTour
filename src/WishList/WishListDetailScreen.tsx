import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import WishListDetailCard from './WishListDetailCard';
import {
  CommonActions,
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
  const [wishListDetail, setWishListsDetail] =
    useState<WishListDetailResponse | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  useEffect(() => {
    loadWishListsDetail();
  }, []);
  const loadWishListsDetail = async () => {
    try {
      const res = await getWishListDetail(route.params.wishListId);

      // ĐÚNG: Kiểm tra wishListDetail có dữ liệu không (không cần kiểm tra message)
      if (res.wishListDetail) {
        setWishListsDetail(res.wishListDetail);
        console.log('Đã load thành công:', res.wishListDetail.name);
      } else {
        console.log('Không có dữ liệu:', res.message);
        // Có thể hiện thông báo lỗi nếu cần
      }
    } catch (err) {
      console.log('Lỗi load:', err);
    }
  };
  const handleDelete = async () => {
    try {
      if (!wishListDetail?.id || !selectedId) {
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
        setShowNotification('Đã xóa khỏi danh sách yêu thích');
      } else {
        setShowNotification(res?.message || 'Xóa thất bại, vui lòng thử lại');
      }
      setShowDeleteConfirm(false);
    } catch (error) {
      console.log('Lỗi xoá', error);
    }
  };
  const handleLongPress = (expId: string) => {
    setSelectedId(expId);
    setShowDeleteConfirm(true);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tiêu đề + avatar thêm người */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText} numberOfLines={2}>
          {wishListDetail?.name || 'Danh sách yêu thích'}
        </Text>

        <View style={styles.countBadge}>
          <Icon name="favorite" size={16} color="#FF3B30" />
          <Text style={styles.countNumber}>
            {wishListDetail?.experiences.length ?? 0}
          </Text>
        </View>
      </View>
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
      {wishListDetail?.experiences.map(item => (
        <WishListDetailCard
          key={item.id}
          title={item.title}
          subtitle={item.description}
          price={item.adultPrice}
          rating="5.0"
          reviews="799 đánh giá"
          image={item.media[0].url}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'homeTab',
                    state: {
                      routes: [
                        { name: 'home' },
                        {
                          name: 'tourDetail',
                          params: { id: item.id },
                        },
                      ],
                      index: 1,
                    },
                  },
                ],
              }),
            )
          }
          onLongPress={() => handleLongPress(item.id)}
        />
      ))}
      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type="success"
          autoClose
          position="top"
          duration={3000}
        />
      )}
      {showDeleteConfirm && (
        <ConfirmModal
          key={showDeleteConfirm ? 'delete-visible' : 'delete-hidden'}
          visible={showDeleteConfirm}
          message="Bạn có chắc muốn xóa trải nghiệm này khỏi danh sách?"
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    marginRight: 12,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  countNumber: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '600',
    color: '#FF3B30',
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
