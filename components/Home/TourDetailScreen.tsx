import {
  Alert,
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
import { useState } from 'react';
import ExpandableText from './ExpandableText';
import SelectDateModal from './SelectDate.modal';

const { width } = Dimensions.get('window');

const random = Math.floor(Math.random() * 5) + 1;
let randomArr: number[] = [];
for (let i = 0; i < random; i++) {
  randomArr.push(i);
}

const TourDetailScreen = () => {
  const handleFavorite = () => {
    Alert.alert('Thêm vào yêu thích thành công');
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const tourImages = [
    images.banner4,
    images.banner4,
    images.banner4,
    images.banner4,
  ];
  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.section,
          { flexDirection: 'row', justifyContent: 'space-between' },
        ]}
      >
        <Text style={styles.title}>Tour........</Text>
        <TouchableOpacity
          style={styles.favorite}
          onPress={() => handleFavorite()}
        >
          <Image source={images.favorite_fill} style={styles.favoriteImage} />
          <Text style={styles.favoriteText}>Yêu thích</Text>
        </TouchableOpacity>
      </View>

      {/* Hình ảnh */}
      <View style={styles.section}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {tourImages.map((img, index) => (
            <Image key={index} source={img} style={styles.imageTour} />
          ))}
        </ScrollView>

        {/* dot indicator */}
        <View style={styles.dotContainer}>
          {tourImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
        <ExpandableText
          text="Chìa khóa riêng của bạn để đến Hội An: mở khóa sự kỳ diệu của nó với sự hỗ trợ tận tâm của chúng tôi, đảm bảo rằng mỗi khoảnh khắc đều đáng nhớ và tràn ngập sự quyến rũ."
          limit={80}
        />
        <View style={styles.price}>
          <Text style={styles.priceText}>
            Giá từ: <Text style={{ color: '#e63946' }}>1.000.000 VND</Text>
            /khách
          </Text>
          <TouchableOpacity
            style={styles.touchButton}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.touchText}>Chọn ngày</Text>
            <SelectDateModal
              visible={showModal}
              onClose={() => setShowModal(false)}
              title="Chọn thời gian"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hoạt động */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Những việc bạn sẽ làm</Text>

        <TouchableOpacity style={styles.containerActive}>
          <Image source={images.banner4} style={styles.imageActive} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.titleActive}>Làng chài cổ</Text>
            <Text style={styles.subtitleActive}>
              Không khí mặn, bàn tay bận rộn, đánh bắt tươi được giao dịch, cuộc
              sống thực tại địa phương
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerActive}>
          <Image source={images.banner4} style={styles.imageActive} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.titleActive}>Làng chài cổ</Text>
            <Text style={styles.subtitleActive}>
              Không khí mặn, bàn tay bận rộn, đánh bắt tươi được giao dịch, cuộc
              sống thực tại địa phương
            </Text>
          </View>
        </TouchableOpacity>
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
            style={{
              width: 20,
              height: 20,
              marginLeft: 5,
              tintColor: '#FFD700',
            }}
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
            <View style={{ flexDirection: 'row' }}>
              {randomArr.map(index => (
                <Image
                  key={index}
                  source={images.star}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: '#FFD700',
                  }}
                />
              ))}
            </View>
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
    marginBottom: 3,
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
    width: width - 40, // bớt padding 2 bên
    height: 280,
    borderRadius: 15,
    marginRight: 10,
    resizeMode: 'cover',
  },
  dotContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ff4d4f',
    width: 10,
    height: 10,
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
