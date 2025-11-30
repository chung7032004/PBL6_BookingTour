import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import NoteDisplayModal from './modals/NoteDisplay.modal';
import NoteModal from './modals/Note.modal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface NoteItem {
  userId: string;
  text: string;
}
interface TourCardProps {
  title: string;
  subtitle: string;
  price: number;
  rating: string;
  reviews: string;
  image: any;
  label?: string;
  onPress?: () => void;
  onLongPress?: () => void;
}

const WishListDetailCard: React.FC<TourCardProps> = ({
  title,
  subtitle,
  price,
  rating,
  reviews,
  image,
  label,
  onPress,
  onLongPress,
}) => {
  // const [showModalNote, setShowModalNote] = useState(false);
  // const [showModalNoteDisplay, setShowModalNoteDisplay] = useState(false);
  // 🔹 Fake ghi chú để test
  {
    /*
  const [notes, setNotes] = useState<NoteItem[]>([
    { userId: 'user_1', text: 'Mang theo áo mưa và nước suối.' },
    { userId: 'user_2', text: 'Kiểm tra lại lịch trình ngày 2.' },
    { userId: 'user_3', text: 'Đặt thêm bữa trưa cho đoàn 5 người.' },
  ]);

  const currentUserNote = notes.find(n => n.userId === currentUserId);
  const noteCount = notes.length;

  const handleSaveNote = (text: string) => {
    if (text.trim() === '') {
      setNotes(prev => prev.filter(n => n.userId !== currentUserId));
    } else if (currentUserNote) {
      setNotes(prev =>
        prev.map(n => (n.userId === currentUserId ? { ...n, text } : n)),
      );
    } else {
      setNotes(prev => [...prev, { userId: currentUserId, text }]);
    }
    setShowModalNote(false);
  };
  */
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      {/* Ảnh */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        {label && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{label}</Text>
          </View>
        )}
        {/*
        <TouchableOpacity
          style={styles.heartButton}
          onPress={onLongPress}
        >
          <Icon name="favorite" size={28} color={'#ff4d4d'} />
        </TouchableOpacity>
        */}
        {/* Chỉ để trang trí */}
        <View style={styles.heartButton}>
          <Icon name="favorite" size={28} color={'#ff4d4d'} />
        </View>
      </View>

      {/* Thông tin */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.price}>
            Chỉ từ {price.toLocaleString('vi-VN')}₫ /khách{' '}
          </Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.price}> {rating} </Text>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.price}> ({reviews})</Text>
        </View>

        {/* Ghi chú */}
        {/* 
        {noteCount === 0 ? (
          <View style={styles.noteSection}>
            <TouchableOpacity
              style={styles.noteButton}
              onPress={() => setShowModalNote(true)}
            >
              <Icon name="add" size={18} color="#2c2c2c" />
              <Text style={styles.noteButtonText}> Thêm ghi chú</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.noteSection}>
            <TouchableOpacity
              style={styles.noteButton}
              onPress={() => setShowModalNoteDisplay(true)}
            >
              <Icon
                name="sticky-note-2"
                size={18}
                color="#2c2c2c"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.noteButtonText}>{noteCount} ghi chú</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setShowModalNote(true)}
            >
              <Icon
                name={currentUserNote ? 'edit' : 'add'}
                size={18}
                color="#007BFF"
              />
            </TouchableOpacity>
          </View>
        )}
*/}
      </View>

      {/* Modal ghi chú */}
      {/* 
      <NoteModal
        visible={showModalNote}
        onClose={() => setShowModalNote(false)}
        onSave={handleSaveNote}
        title="Ghi chú"
        initialValue={currentUserNote ? currentUserNote.text : ''}
      />
      
      <NoteDisplayModal
        visible={showModalNoteDisplay}
        notes={notes}
        onClose={() => setShowModalNoteDisplay(false)}
      />
      */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
    width: CARD_WIDTH,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: { position: 'relative', width: '100%', aspectRatio: 1.4 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#333' },
  heartButton: { position: 'absolute', top: 10, right: 10 },
  infoContainer: { padding: 12 },
  title: { fontSize: 16, fontWeight: '600', color: '#000' },
  subtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  price: { fontSize: 13, color: '#555' },
  dot: { marginHorizontal: 3, fontWeight: 'bold', color: '#777' },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  /** Ghi chú */
  noteSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  noteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  noteButtonText: {
    fontSize: 13,
    color: '#222',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#e6f0ff',
    padding: 8,
    borderRadius: 10,
  },
});

export default WishListDetailCard;
