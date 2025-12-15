import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/route';

export default function ReviewSuccessScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  return (
    <View style={styles.container}>
      {/* Icon lớn thay cho hình ảnh */}
      <MaterialIcons
        name="check-circle"
        size={120}
        color="#4CAF50"
        style={styles.icon}
      />

      <Text style={styles.title}>Review Submitted!</Text>
      <Text style={styles.subtitle}>
        Thank you for sharing your experience!
      </Text>

      {/* 2 nút nằm ngang */}
      <View style={styles.buttonContainer}>
        {/* Nút Back to Home */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('homeTab')}
        >
          <MaterialIcons name="home" size={22} color="#fff" />
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>

        {/* Nút thứ 2 (tùy nội dung sau này) */}
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => {}}>
          <Text style={styles.buttonTextSecondary}>View Review</Text>
          <MaterialIcons name="arrow-forward" size={22} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 50,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // Container để 2 nút nằm ngang
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    gap: 15,
  },

  buttonPrimary: {
    flex: 1,
    backgroundColor: '#FFB800',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 8,
  },
  buttonTextSecondary: {
    color: '#333',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 8,
  },
});
