import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactScreen = () => {
  const [name] = useState('Nguyen Chung');
  const [phone] = useState('+84 02 3334 5556');

  return (
    <View style={styles.container}>
      {/* Greeting section */}
      <View style={styles.section}>
        <Text style={styles.title}>Xin chào {name},</Text>
        <Text style={styles.subTitle}>Chúng tôi có thể giúp gì cho bạn?</Text>
      </View>

      {/* Working hours card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="warning" size={26} color="#D9534F" />
          <Text style={styles.cardTitle}>Giờ hoạt động của trung tâm CSKH</Text>
        </View>

        <Text style={styles.text}>
          Tổng đài hoạt động: Thứ Hai - Chủ Nhật (08:00 - 22:00)
        </Text>
        <Text style={styles.phone}>{phone}</Text>
        <Text style={styles.text}>Tin nhắn: Hoạt động 24/7</Text>
      </View>

      {/* Support center */}
      <View style={styles.supportContainer}>
        <Text style={styles.supportTitle}>Bạn đang tìm thông tin khác?</Text>

        <View style={styles.supportRow}>
          <Icon name="help-outline" size={30} color="#000" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.supportHeader}>Trung tâm hỗ trợ</Text>
            <Text style={styles.text}>
              Trả lời nhanh các câu hỏi bạn đang quan tâm
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEC',
    padding: 20,
  },

  section: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
  },

  subTitle: {
    fontSize: 16,
    marginTop: 4,
    opacity: 0.8,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 17,
    marginLeft: 8,
    fontWeight: '600',
  },

  text: {
    fontSize: 15,
    marginTop: 4,
    opacity: 0.8,
  },

  phone: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: 'bold',
    color: '#000',
  },

  supportContainer: {
    marginTop: 10,
  },

  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  supportHeader: {
    fontSize: 16,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#FF6F70',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
