import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import { useAuthGuard } from '../hooks/useAuthGuard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { RootStackParamList } from '../../types/route';
import images from '../../images';
import Notification from '../components/Notification';
import { createReview } from '../api/experiences/booking';

type ReviewScreenRouteProp = RouteProp<RootStackParamList, 'reviewScreen'>;

const ReviewScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route = useRoute<ReviewScreenRouteProp>();
  const params = route.params;

  const booking = {
    id: params.experienceId,
    nameTour: params.title,
    image: params?.image ? { uri: params.image } : images.banner1,
    date: new Date(params.date),
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (rating === 0) {
      setShowNotification('You haven’t selected a rating yet.');
      return;
    }
    if (comment === '') {
      setShowNotification('Please enter your review.');
      return;
    }
    const res = await createReview({
      experienceId: booking.id,
      description: comment,
      rating: rating,
    });
    if (!res.reviewResponse) {
      setShowNotification(res.message);
    }
    navigation.navigate('reviewSuccess');
  };

  const Star = ({
    filled,
    onPress,
  }: {
    filled: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <MaterialIcons
        name={filled ? 'star' : 'star-border'}
        size={48}
        color={filled ? '#FFB800' : '#E0E0E0'}
        style={{ marginHorizontal: 6 }}
      />
    </TouchableOpacity>
  );

  const { loading, error } = useAuthGuard();
  const handleLogin = () => {
    navigation.navigate('login', {
      redirect: 'homeTab',
      params: 'paymentScreen',
    });
  };
  if (loading) return <LoadingView message="Checking login status..." />;
  if (error)
    return (
      <ErrorView
        message="You need to log in to use this feature"
        onPress={handleLogin}
      />
    );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Image source={booking.image} style={styles.tourImage} />
          <View style={styles.overlay} />
          <View style={styles.headerContent}>
            <Text style={styles.tourName}>{booking.nameTour}</Text>
            <Text style={styles.tourDate}>
              <MaterialIcons name="calendar-today" size={16} />{' '}
              {booking.date.toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.title}>How was this tour?</Text>
          <Text style={styles.subtitle}>Tap the stars to rate</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                filled={star <= rating}
                onPress={() => setRating(star)}
              />
            ))}
          </View>

          <Text style={styles.ratingText}>
            {rating === 0
              ? 'Not selected'
              : rating === 1
              ? 'Very bad'
              : rating === 2
              ? 'Fair'
              : rating === 3
              ? 'Average'
              : rating === 4
              ? 'Satisfied'
              : 'Excellent!'}
          </Text>
        </View>

        {/* Review Input */}
        <View style={styles.section}>
          <Text style={styles.title}>Share your experience</Text>
          <Text style={styles.hint}>
            What did you like the most? Any suggestions for improvement?
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="Write your review here... (minimum 15 characters)"
            multiline
            numberOfLines={6}
            value={comment}
            onChangeText={setComment}
            textAlignVertical="top"
          />

          <Text style={styles.charCount}>{comment.length}/1000</Text>
        </View>

        {/* Submit */}
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <MaterialIcons name="send" size={22} color="#fff" />
            <Text style={styles.submitText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type="error"
          autoClose
          position="top"
          duration={3000}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 260,
    position: 'relative',
  },
  tourImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  tourName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  tourDate: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.9,
  },

  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
  },
  hint: {
    fontSize: 14.5,
    color: '#777',
    lineHeight: 20,
    marginBottom: 8,
  },

  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  textInput: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 13,
    color: '#999',
    marginTop: 8,
  },

  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#FFB800',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
});
