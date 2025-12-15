import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../images';
import {
  formatDate,
  formatENDate,
  formatENTime,
} from '../components/FormatDate';

interface ReviewCardProps {
  id: string;
  userId: string;
  experienceId: string;
  fullName: string;
  userAvatar: any;
  rating: number;
  createdAt: string;
  description: string;
  width?: number;
}

const ReviewCard = ({
  fullName,
  userAvatar,
  rating,
  createdAt,
  description,
  width = 260,
}: ReviewCardProps) => {
  const stars = Array.from({ length: rating }, (_, i) => i);

  return (
    <View style={[styles.card, { width }]}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={userAvatar ? { uri: userAvatar } : images.account}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.time}>
            {formatDate(createdAt)} - {formatENTime(createdAt)}
          </Text>
        </View>
      </View>

      {/* Rating */}
      <View style={styles.starRow}>
        {stars.map(i => (
          <Icon
            key={i}
            name="star"
            size={16}
            color="#FFD700"
            style={styles.starIcon}
          />
        ))}
      </View>

      {/* Content */}
      <Text style={styles.content}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f7f7f7',
    borderRadius: 14,
    padding: 14,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  starRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  starIcon: {
    marginRight: 2,
  },
  content: {
    marginTop: 6,
    color: '#444',
    lineHeight: 18,
  },
});

export default ReviewCard;
