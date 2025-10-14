import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import images from '../../images';

interface ReviewCardProps {
  name: string;
  avatar: any;
  rating: number;
  time: string;
  content: string;
  width?: number;
}

const ReviewCard = ({
  name,
  avatar,
  rating,
  time,
  content,
  width = 260,
}: ReviewCardProps) => {
  const stars = Array.from({ length: rating }, (_, i) => i);

  return (
    <View style={[styles.card, { width }]}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={avatar} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      {/* Rating */}
      <View style={styles.starRow}>
        {stars.map(i => (
          <Image key={i} source={images.star} style={styles.star} />
        ))}
      </View>

      {/* Content */}
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
  star: {
    width: 16,
    height: 16,
    tintColor: '#FFD700',
    marginRight: 2,
  },
  content: {
    marginTop: 6,
    color: '#444',
    lineHeight: 18,
  },
});

export default ReviewCard;
