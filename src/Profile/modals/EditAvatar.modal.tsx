import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface EditAvatarProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onSave: (imageUri: string) => void; // trả uri ra ngoài
}

const EditAvatarModal = (props: EditAvatarProps) => {
  const { visible, onClose, onSave, title = 'Choose profile picture' } = props;

  // mở camera
  const handleCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo' });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      onSave(result.assets[0].uri!); // truyền uri ra ngoài
      onClose();
    }
  };

  // mở thư viện
  const handleLibrary = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      onSave(result.assets[0].uri!); // truyền uri ra ngoài
      onClose();
    }
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
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            You can take a new photo or choose one from your library
          </Text>

          <CustomButton title="Take photo with camera" onPress={handleCamera} />
          <View style={{ height: 12 }} />
          <CustomButton
            title="Choose from photo library"
            onPress={handleLibrary}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 6,
    zIndex: 1,
  },
  closeText: {
    fontSize: 22,
    color: '#999',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
});

export default EditAvatarModal;
