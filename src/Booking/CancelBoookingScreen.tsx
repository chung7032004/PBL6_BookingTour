import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';
import Notification from '../components/Notification';
import { cancelBooking } from '../api/experiences/booking';

export default function CancelBookingScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, 'cancelBooking'> = useRoute();
  const bookingId = route.params.bookingId;
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const handleCancel = async () => {
    const trimmedReason = reason.trim();
    if (!trimmedReason) {
      setShowNotification('Please enter your cancellation reason.');
      return;
    }
    const res = await cancelBooking(reason, bookingId);
    if (!res.success) {
      setShowNotification(res.message);
      return;
    }
    navigation.navigate('cancelBookingSuccess');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back-ios" size={22} color="#333" />
            </TouchableOpacity>

            <Text style={styles.title}>Cancel Booking</Text>

            <View style={{ width: 40 }} />
          </View>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="cancel" size={70} color="#FF3B30" />
            </View>
          </View>

          <Text style={styles.mainTitle}>Are you absolutely sure?</Text>
          <Text style={styles.subtitle}>
            Once you cancel, this action cannot be undone.
          </Text>

          {/* Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Reason for cancellation{' '}
              <Text style={{ color: '#FF3B30' }}>*</Text>
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Share your reason... (at least 10 characters)"
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

            <Text style={styles.charCount}>{reason.length}/500</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {/* Secondary */}
            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.btnSecondaryText}>Keep Booking</Text>
            </TouchableOpacity>

            {/* Primary */}
            <TouchableOpacity
              style={[
                styles.btnPrimary,
                (!reason.trim() || loading) && styles.btnDisabled,
              ]}
              onPress={handleCancel}
              disabled={!reason.trim() || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.btnPrimaryText}>Confirm Cancel</Text>
                </>
              )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 50,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  backButton: {
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
  },

  // BIG ICON
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    backgroundColor: '#FFF1F0',
    padding: 24,
    borderRadius: 100,
  },

  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
    lineHeight: 22,
  },

  // INPUT
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
    color: '#444',
  },
  textInput: {
    backgroundColor: '#fafafa',
    borderWidth: 1.6,
    borderColor: '#e4e4e4',
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 13,
    color: '#888',
    marginTop: 8,
  },

  // BUTTONS
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnSecondaryText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  btnDisabled: {
    backgroundColor: '#d3d3d3',
  },
});
