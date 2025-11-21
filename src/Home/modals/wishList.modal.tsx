import {
  Dimensions,
  FlatList,
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
import images from '../../../images';
import CreateListModal from '../../WishList/modals/CreateList.modal';
import { useState } from 'react';
interface WishListProps {
  visible: boolean;
  onClose: () => void;
  onSave?: () => void;
}
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const WishListModal = (props: WishListProps) => {
  const { visible, onClose, onSave } = props;
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const data = [
    {
      id: '1',
      title: 'Đã xem gần đây',
      saved: 'Đã lưu 4 mục',
      images: [images.banner1, images.banner2, images.banner3, images.banner4],
    },
    {
      id: '2',
      title: 'Trải nghiệm 2026',
      saved: 'Đã lưu 9 mục',
      image: images.banner1,
    },
    {
      id: '3',
      title: 'Trải nghiệm 2025',
      saved: 'Đã lưu 2 mục',
      image: images.banner2,
    },
  ];
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
            <Text style={styles.title}>Lưu vào danh sách yêu thích</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={28} color="#666" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.cardListContainer}>
              {data.map(item => (
                <View
                  key={item.id}
                  style={{ width: CARD_WIDTH, paddingHorizontal: 5 }}
                >
                  <WishListCard
                    title={item.title}
                    saved={item.saved}
                    image={item.image}
                    images={item.images}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          {/* Button */}
          <CustomButton
            title="Tạo danh sách mong muốn mới"
            style={styles.button}
            onPress={() => setShowCreateListModal(true)}
          />
        </View>
      </View>
      <CreateListModal
        visible={showCreateListModal}
        onClose={() => setShowCreateListModal(false)}
        onCreate={() => setShowCreateListModal(false)}
      />
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
