import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import images from '../../images';

const { width } = Dimensions.get('window');

const TourDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.section,
          { flexDirection: 'row', justifyContent: 'space-between' },
        ]}
      >
        <Text style={styles.title}>Tour</Text>
        <TouchableOpacity style={styles.favorite}>
          <Image source={images.favorite_fill} style={styles.favoriteImage} />
          <Text style={styles.favoriteText}>Yêu thích</Text>
        </TouchableOpacity>
      </View>

      {/* Hình ảnh & mô tả */}
      <View style={styles.section}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <Image source={images.banner4} style={styles.imageTour} />
          <Image source={images.banner4} style={styles.imageTour} />
          <Image source={images.banner4} style={styles.imageTour} />
          <Image source={images.banner4} style={styles.imageTour} />
        </ScrollView>
        <Text style={styles.descriptionTour}>
          Chìa khóa riêng của bạn để đến Hội An: mở khóa sự kỳ diệu của nó...
        </Text>
        <View style={styles.price}>
          <Text style={styles.priceText}>
            Giá từ: <Text style={{ color: '#e63946' }}>1.000.000 VND</Text>
            /khách
          </Text>
          <TouchableOpacity style={styles.touchButton}>
            <Text style={styles.touchText}>Chọn ngày</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hoạt động */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Những việc bạn sẽ làm</Text>

        <View style={styles.containerActive}>
          <Image source={images.banner4} style={styles.imageActive} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.titleActive}>Làng chài cổ</Text>
            <Text style={styles.subtitleActive}>
              Không khí mặn, bàn tay bận rộn, đánh bắt tươi được giao dịch, cuộc
              sống thực tại địa phương
            </Text>
          </View>
        </View>

        <View style={styles.containerActive}>
          <Image source={images.banner4} style={styles.imageActive} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.titleActive}>Làng chài cổ</Text>
            <Text style={styles.subtitleActive}>
              Không khí mặn, bàn tay bận rộn, đánh bắt tươi được giao dịch, cuộc
              sống thực tại địa phương
            </Text>
          </View>
        </View>

        <View style={styles.containerActive}>
          <Image source={images.banner4} style={styles.imageActive} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.titleActive}>Làng chài cổ</Text>
            <Text style={styles.subtitleActive}>
              Không khí mặn, bàn tay bận rộn, đánh bắt tươi được giao dịch, cuộc
              sống thực tại địa phương
            </Text>
          </View>
        </View>
      </View>

      {/* Địa điểm hẹn gặp */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Địa điểm hẹn gặp</Text>
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: 15.8801,
            longitude: 108.338,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: 15.8801, longitude: 108.338 }}
            title="Hội An"
          />
        </MapView> */}
      </View>

      {/* Host */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin Host</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Image
            source={images.banner4}
            style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10 }}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tên host</Text>
            <Text style={{ color: '#666' }}>Mô tả ngắn về host...</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Đánh giá */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đánh giá</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>5.0</Text>
          <Image
            source={images.star}
            style={{ width: 20, height: 20, marginLeft: 5 }}
          />
          <Text style={{ marginLeft: 5, color: '#666' }}>(1001 đánh giá)</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={images.banner4}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 10,
              }}
            />
            <Text style={{ fontWeight: '600' }}>Tên người đánh giá</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
          >
            <Text>Số sao</Text>
            <Text style={{ color: '#999' }}>2 ngày trước</Text>
          </View>
          <Text style={{ marginTop: 5, color: '#444' }}>
            Thế giới sẽ là một nơi tốt đẹp hơn với nhiều người như Ha trong đó.
            Nếu bạn đang cân nhắc đặt tour này và có chỗ trống, hãy thực hiện
            càng sớm càng tốt. Trải nghiệm 10/10. Tôi cảm thấy rất may mắn khi
            được tham gia vào trải nghiệm tuyệt vời này.
          </Text>
          <TouchableOpacity>
            <Text style={{ color: '#007bff', marginTop: 5 }}>
              Hiển thị thêm nếu có
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  favorite: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteText: {
    color: '#ff4d4f',
    fontWeight: '600',
  },
  favoriteImage: {
    tintColor: '#ff4d4f',
    height: 20,
    width: 20,
    marginRight: 2,
  },
  imageTour: {
    width: width * 0.9,
    height: 300,
    borderRadius: 15,
    marginRight: 10,
  },
  descriptionTour: {
    fontSize: 13,
    color: '#666',
    marginTop: 10,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  containerActive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  imageActive: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  titleActive: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  subtitleActive: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  touchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  touchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  map: {
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default TourDetailScreen;
