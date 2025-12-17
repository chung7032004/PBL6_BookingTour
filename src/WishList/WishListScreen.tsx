import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import WishListCard from './WishListCard';
import images from '../../images';
import {
  NavigationProp,
  useNavigation,
  useIsFocused,
  useFocusEffect,
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
import ConfirmModal from '../components/Confirm.modal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const WishListScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const { loading, error } = useAuthGuard();
  const isFocused = useIsFocused();

  const [wishLists, setWishLists] = useState<MyWishListResponse[]>([]);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [typeNotification, setTypeNotification] = useState<'success' | 'error'>(
    'success',
  );
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadWishLists();
    }, []),
  );

  const loadWishLists = async () => {
    setLoadingWishlist(true);
    const res = await getMyWishLists();
    if (res?.message) {
      setTypeNotification('error');
      setShowNotification(res.message);
      setLoadingWishlist(true);
      return;
    }
    setWishLists(res?.myWishList ?? []);
    setLoadingWishlist(false);
  };

  const handleCreate = async (name: string) => {
    if (!name.trim()) {
      setTypeNotification('error');
      setShowNotification('Please enter a wishlist name');
      return;
    }

    const res = await createWishList(name);

    if (res?.isSuccess) {
      setTypeNotification('success');
      await loadWishLists();
    } else {
      setTypeNotification('error');
    }

    setShowNotification(res?.message ?? 'Something went wrong');
    setShowCreateListModal(false);
  };

  const handleDelete = async () => {
    if (!selectedId) {
      setTypeNotification('error');
      setShowNotification('Wishlist ID is undefined');
      setShowDeleteConfirm(false);
      return;
    }

    const res = await deleteWishList(selectedId);

    if (res?.isSuccess) {
      setWishLists(prev => prev.filter(item => item.id !== selectedId));
      setTypeNotification('success');
    } else {
      setTypeNotification('error');
    }

    setShowNotification(res?.message ?? 'Delete failed');
    setShowDeleteConfirm(false);
  };

  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'bookingTab',
      params: { screen: 'bookingListScreen' },
    });
  };

  if (loading) {
    return <LoadingView message="Checking login status..." />;
  }
  if (loadingWishlist) {
    return <LoadingView message="Loading wishlist..." />;
  }
  if (error) {
    return (
      <ErrorView textButton="Login" message={error} onPress={handleLogin} />
    );
  }

  return (
    <View style={styles.container}>
      {wishLists.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You don’t have any wishlists yet</Text>
          <Text style={styles.emptySubText}>
            Tap the + button to create your first wishlist
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
                  navigation.navigate('wishListDetail', {
                    wishListId: item.id,
                  })
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

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => setShowCreateListModal(true)}
      >
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      <CreateListModal
        visible={showCreateListModal}
        onClose={() => setShowCreateListModal(false)}
        onCreate={handleCreate}
      />

      <ConfirmModal
        title="Delete wishlist"
        visible={showDeleteConfirm}
        message="Are you sure you want to delete this wishlist?"
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />

      {showNotification && isFocused && (
        <Notification
          key={showDeleteConfirm ? 'confirm-open' : 'confirm-close'}
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
