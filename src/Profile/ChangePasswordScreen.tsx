import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/route';

import { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingOverlay from '../components/LoadingOverlay';
import Notification from '../components/Notification';
import { validatePassword } from '../api/auth/login';
import { changePassword } from '../api/auth/changePassword';

type ChangePasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'changePassword'
>;

const ChangePasswordScreen = () => {
  const navigation = useNavigation<ChangePasswordScreenNavigationProp>();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [visibleCurrent, setVisibleCurrent] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const handleChangePassword = async () => {
    // 1. Empty validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    // 2. Validate new password format
    if (!validatePassword(newPassword)) {
      setError(
        'Password must be at least 8 characters and include letters, numbers, and special characters',
      );
      return;
    }

    // 3. Confirm password match
    if (newPassword !== confirmPassword) {
      setError('Password confirmation does not match');
      return;
    }

    setLoading(true);
    setError('');
    const res = await changePassword(
      currentPassword,
      newPassword,
      confirmPassword,
    );
    if (res.success) {
      setLoading(false);
      setTimeout(() => {
        setLoading(false);
        setShowNotification('Password updated successfully!');
        setTimeout(() => navigation.goBack(), 2000);
      }, 1500);
      return;
    } else {
      setError(res.message || 'Change password failed');
      setLoading(false);
      return;
    }
  };

  const renderPasswordField = (
    label: string,
    value: string,
    onChange: (t: string) => void,
    visible: boolean,
    setVisible: (v: boolean) => void,
    placeholder: string,
  ) => (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon name="lock" size={20} color="#555" style={styles.inputIcon} />
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={!visible}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={styles.eyeIcon}
        >
          <Icon
            name={visible ? 'visibility-off' : 'visibility'}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Change Password</Text>
        </View>

        {renderPasswordField(
          'Current Password',
          currentPassword,
          setCurrentPassword,
          visibleCurrent,
          setVisibleCurrent,
          'Enter current password',
        )}

        {renderPasswordField(
          'New Password',
          newPassword,
          setNewPassword,
          visibleNew,
          setVisibleNew,
          'Enter new password',
        )}

        {renderPasswordField(
          'Confirm New Password',
          confirmPassword,
          setConfirmPassword,
          visibleConfirm,
          setVisibleConfirm,
          'Re-enter new password',
        )}

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <LoadingOverlay visible={loading} message={'Processing...'} />

      {showNotification && (
        <Notification
          message={showNotification}
          onClose={() => setShowNotification(null)}
          type="success"
          autoClose
          position="top"
          duration={3000}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  titleContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#222',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 5,
    marginBottom: 6,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1.2,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
  },
  eyeIcon: {
    padding: 5,
  },
  error: {
    color: '#FF5A5F',
    textAlign: 'center',
    marginVertical: 8,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontSize: 15,
  },
});

export default ChangePasswordScreen;
