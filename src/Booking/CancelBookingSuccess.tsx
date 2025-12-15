import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';

export default function CancelBookingSuccessScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const handleGoToBookings = () => {
    navigation.navigate('bookingList', { refresh: true });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            {/* Using a success/check icon */}
            <MaterialIcons name="check-circle" size={70} color="#4CAF50" />
          </View>
        </View>

        <Text style={styles.mainTitle}>Booking Cancelled!</Text>
        <Text style={styles.subtitle}>
          Your booking has been successfully cancelled. You will receive a
          refund confirmation shortly based on the cancellation policy.
        </Text>
        <Text style={styles.infoText}>
          Thank you for using our service. We hope to see you again soon!
        </Text>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={handleGoToBookings}
          >
            <Text style={styles.btnPrimaryText}>View All Bookings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
    paddingBottom: 50,
  },

  // Success Icon
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    backgroundColor: '#E8F5E9', // Light green background
    padding: 24,
    borderRadius: 100,
  },

  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    lineHeight: 24,
    maxWidth: 350,
  },
  infoText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#888',
    marginBottom: 50,
  },

  // BUTTON
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  btnPrimary: {
    width: '100%',
    backgroundColor: '#4CAF50', // Success green color
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
