import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../images';

interface ReviewCardProps {
  name: string;
  avatar: any;
  rating: number;
  time: string;
  content: string;
  nameTour: string;
  imageTour: any;
  width?: number;
}

const ReviewCard = ({
  name,
  avatar,
  rating,
  time,
  content,
  width = 260,
  nameTour,
  imageTour,
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
      <Text style={styles.content}>
        {'   '}
        {content}
      </Text>
      <View style={styles.line}></View>
      <TouchableOpacity style={styles.tourContainer}>
        <Image source={imageTour} style={styles.imageTour} />
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.contentTour}>
          {nameTour}
        </Text>
        <Icon
          name="chevron-right"
          size={24}
          color="#666"
          style={styles.nextIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  line: {
    height: 1,
    backgroundColor: '#CCC',
    marginVertical: 12,
    width: '100%',
  },
  tourContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageTour: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  nextIcon: {
    marginLeft: 5,
  },
  contentTour: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    flexShrink: 1,
  },
});

export default ReviewCard;
