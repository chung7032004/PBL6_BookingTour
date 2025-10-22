import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import images from '../../images';

interface NoteItem {
  userId: string;
  text: string;
}

interface NoteDisplayModalProps {
  visible: boolean;
  notes: NoteItem[];
  onClose: () => void;
}

const NoteDisplayModal: React.FC<NoteDisplayModalProps> = ({
  visible,
  notes,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Danh sách ghi chú</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Danh sách ghi chú */}
          {notes.length > 0 ? (
            <FlatList
              data={notes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.noteItem}>
                  <View style={styles.noteHeader}>
                    <Image source={images.account} style={styles.avatar} />
                    <Text style={styles.userId}>{item.userId}</Text>
                  </View>
                  <Text style={styles.noteText}>{item.text}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.emptyText}>Chưa có ghi chú nào</Text>
          )}
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
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeBtn: {
    fontSize: 20,
    color: '#333',
  },
  noteItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  userId: {
    fontWeight: 'bold',
    color: '#007AFF',
    fontSize: 15,
  },
  noteText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 34, // thụt vào để căn theo avatar
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default NoteDisplayModal;
