import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info' | 'loading';
  message: string;
  autoClose?: boolean;
  duration?: number;
  position?: 'top' | 'bottom';
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type = 'info',
  message,
  autoClose = true,
  duration = 2500,
  position = 'top',
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  const slideAnim = useRef(
    new Animated.Value(position === 'top' ? -100 : 100),
  ).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: position === 'top' ? -100 : 100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      onClose && onClose();
    });
  };

  useEffect(() => {
    // Hiện animation
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    if (autoClose) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const iconMap: Record<string, string> = {
    success: 'check-circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
    loading: 'hourglass-empty',
  };

  const colorMap: Record<string, string> = {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
    loading: '#9E9E9E',
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: position === 'top' ? 40 : undefined,
          bottom: position === 'bottom' ? 40 : undefined,
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
          backgroundColor: colorMap[type],
        },
      ]}
    >
      <View style={styles.content}>
        <MaterialIcons name={iconMap[type]} size={24} color="#fff" />
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={handleClose}>
        <MaterialIcons name="close" size={22} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
    zIndex: 999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  message: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 10,
    flexShrink: 1,
  },
});
