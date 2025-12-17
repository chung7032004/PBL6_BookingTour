import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';
import WishListCard from '../../WishList/WishListCard';
import CreateListModal from '../../WishList/modals/CreateList.modal';
import { useEffect, useState } from 'react';
import {
  addExpToWishList,
  createWishList,
  getMyWishLists,
} from '../../api/experiences/wishlist';
import Notification from '../../components/Notification';
import { MyWishListResponse } from '../../../types/wishlist';
interface WishListProps {
  visible: boolean;
  onClose: () => void;
  onSave: (wishListId: string) => void;
}
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const WishListModal = (props: WishListProps) => {
  const { visible, onClose, onSave } = props;
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [wishLists, setWishLists] = useState<MyWishListResponse[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [typeNotification, setTypeNotification] = useState<'success' | 'error'>(
    'success',
  );
  useEffect(() => {
    if (visible) {
      loadWishLists();
    }
  }, [visible]);

  const loadWishLists = async () => {
    const res = await getMyWishLists();
    if (res?.message) {
      setTypeNotification('error');
      setShowNotification(res?.message);
      return;
    }
    setWishLists(res?.myWishList ? res.myWishList : []);
  };
  const handleSave = (wishListId: string) => {
    onSave(wishListId);
    onClose();
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
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Save to wishlist</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={28} color="#666" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.cardListContainer}>
              {wishLists.map(item => (
                <TouchableOpacity
                  onPress={() => handleSave(item.id)}
                  key={item.id}
                  style={{ width: CARD_WIDTH, marginRight: 10 }}
                >
                  <WishListCard
                    title={item.name}
                    saved={item.experienceCount}
                    onPress={() => handleSave(item.id)}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {/* Button */}
          <CustomButton
            title="Create a new wishlist"
            style={styles.button}
            onPress={() => setShowCreateListModal(true)}
          />
        </View>
      </View>
      <CreateListModal
        visible={showCreateListModal}
        onClose={() => setShowCreateListModal(false)}
        onCreate={handleCreate}
      />
      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type={typeNotification}
          autoClose
          position="top"
          duration={3000}
        />
      )}
    </Modal>
  );
};
export default WishListModal;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  cardListContainer: {
    flexDirection: 'row',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#FF5A5F',
    borderRadius: 12,
    paddingVertical: 12,
  },
});
