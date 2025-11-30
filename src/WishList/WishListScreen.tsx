import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import WishListCard from './WishListCard';
import images from '../../images';
import {
  NavigationProp,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CreateListModal from './modals/CreateList.modal';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { MyWishListResponse } from '../../types/wishlist';
import {
  createWishList,
  deleteWishList,
  getMyWishLists,
} from '../api/experiences/wishlist';
import Notification from '../components/Notification';
import { Text } from 'react-native-gesture-handler';
import ConfirmModal from '../components/Confirm.modal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const WishListScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const { loading, error } = useAuthGuard();
  const isFocused = useIsFocused();
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const handleAdd = () => {
    setShowCreateListModal(true);
  };
  const [wishLists, setWishLists] = useState<MyWishListResponse[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [typeNotification, setTypeNotification] = useState<'success' | 'error'>(
    'success',
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  useEffect(() => {
    loadWishLists();
  }, []);
  const loadWishLists = async () => {
    const res = await getMyWishLists();
    if (res?.message) {
      setTypeNotification('error');
      setShowNotification(res?.message);
      return;
    }
    setWishLists(res?.myWishList ? res.myWishList : []);
  };
  const handleCreate = async (content: string) => {
    if (!content.trim()) {
      setTypeNotification('error');
      setShowNotification('Please enter the list name');
      return;
    }
    const res = await createWishList(content);
    if (res?.isSuccess) {
      setTypeNotification('success');
      await loadWishLists();
    } else {
      setTypeNotification('error');
    }
    setShowNotification(res?.message);
    setShowCreateListModal(false);
  };
  const handleDelete = async () => {
    if (!selectedId) {
      setTypeNotification('error');
      setShowNotification('Undefined Id WishList');
      setShowDeleteConfirm(false);
      return;
    }
    const res = await deleteWishList(selectedId);
    if (res?.isSuccess) {
      setWishLists(prev =>
        prev ? prev.filter(item => item.id !== selectedId) : prev,
      );
      setTypeNotification('success');
    } else {
      setTypeNotification('error');
    }
    setShowNotification(res?.message);
    setShowDeleteConfirm(false);
  };
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'bookingTab',
      params: { screen: 'bookingListScreen' },
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
      {wishLists.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Bạn chưa có danh sách yêu thích nào
          </Text>
          <Text style={styles.emptySubText}>
            Nhấn nút + để tạo danh sách đầu tiên
          </Text>
        </View>
      ) : (
        <FlatList
          data={wishLists}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ width: CARD_WIDTH }}>
              <WishListCard
                title={item.name}
                saved={item.experienceCount}
                onPress={() =>
                  navigation.navigate('wishListDetail', { wishListId: item.id })
                }
                onLongPress={() => {
                  setSelectedId(item.id);
                  setShowDeleteConfirm(true);
                }}
              />
            </View>
          )}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={handleAdd}
      >
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      <CreateListModal
        visible={showCreateListModal}
        onClose={() => setShowCreateListModal(false)}
        onCreate={handleCreate}
      />
      <ConfirmModal
        visible={showDeleteConfirm}
        message="Bạn có chắc muốn xóa danh wishlist này không?"
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
      {showNotification && isFocused && (
        <Notification
          key={showDeleteConfirm ? 'confirm-visible' : 'confirm-hidden'}
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type={typeNotification}
          autoClose
          position="bottom"
          duration={3000}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FF5A5F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 14,
  },
});
export default WishListScreen;
